import assert from 'node:assert/strict';
import test from 'node:test';

import { onRequestPost } from '../functions/api/bookings.js';
import { onRequestGet } from '../functions/api/bookings/booked-slots.js';
import {
  googleSheetsDateTimeSerial,
  normalizeMalaysiaPhone,
} from '../functions/_lib/booking.js';

const env = {
  NOTION_TOKEN: 'test-token',
  NOTION_BOOKING_DATABASE_ID: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  BOOKING_EMAILS_ENABLED: 'true',
  RESEND_API_KEY: 'test-resend',
  RESEND_TO_EMAIL: 'admin@example.com',
  RESEND_CC_EMAIL: 'ava@locus-t.com.my',
  WHATSAPP_ACCESS_TOKEN: 'test-whatsapp',
  WHATSAPP_PHONE_NUMBER_ID: '12345',
};

const validPayload = {
  name: 'Metro QA',
  email: 'metro.qa@example.com',
  phone: '01100000099',
  loanType: 'Personal Loan',
  location: 'Selangor',
  date: '2026-08-15',
  time: '09:00',
  message: 'Internal regression test.',
};

function notionPage(id = 'page-id') {
  return {
    id,
    url: `https://notion.so/${id}`,
    properties: {
      Booking: { title: [{ plain_text: 'Metro QA' }] },
      'Customer Name': { rich_text: [{ plain_text: 'Metro QA' }] },
      Phone: { phone_number: '+601100000099' },
      Email: { email: 'metro.qa@example.com' },
      'Loan Type': { select: { name: 'Personal Loan' } },
      'Message / Enquiry': { rich_text: [{ plain_text: 'Internal regression test.' }] },
      'Preferred Slot': {
        date: {
          start: '2026-08-15T09:00:00+08:00',
          end: '2026-08-15T09:30:00+08:00',
        },
      },
      'Slot Key': { rich_text: [{ plain_text: '2026-08-15|09:00' }] },
      Status: { select: { name: 'Confirmed - Booked' } },
      'Cancel Token': { rich_text: [{ plain_text: 'test-token' }] },
      'Cancel URL': { url: '' },
      Source: { select: { name: 'Website' } },
    },
  };
}

test('normalizes supported Malaysian mobile number formats to E.164', () => {
  for (const value of ['0175392449', '175392449', '60175392449', '+60175392449']) {
    assert.equal(normalizeMalaysiaPhone(value), '+60175392449');
  }

  assert.equal(normalizeMalaysiaPhone('+65175392449'), '');
  assert.equal(normalizeMalaysiaPhone('not-a-number'), '');
  assert.equal(normalizeMalaysiaPhone('1234'), '');
});

test('converts submission timestamps to native Google Sheets Malaysia time', () => {
  const serial = googleSheetsDateTimeSerial('2026-07-31T08:30:00.000Z');
  assert.equal(serial, 46234.6875);
  assert.equal(googleSheetsDateTimeSerial('invalid'), '');
});

test('booking API succeeds when post-booking notifications fail', async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];
  const resendPayloads = [];
  let createdPagePayload;
  let updatedPagePayload;
  let queryPayload;
  let d1Backup;
  const bookingBackupDatabase = {
    prepare(sql) {
      return {
        bind(...values) {
          d1Backup = { sql, values };
          return { run: async () => ({ success: true }) };
        },
      };
    },
  };

  globalThis.fetch = async (url, options = {}) => {
    calls.push(String(url));
    if (String(url).includes('/databases/') && String(url).endsWith('/query')) {
      queryPayload = JSON.parse(options.body);
      return Response.json({ results: [] });
    }
    if (String(url).endsWith('/pages') && options.method === 'POST') {
      createdPagePayload = JSON.parse(options.body);
      return Response.json(notionPage('created-page'));
    }
    if (String(url).includes('/pages/created-page') && options.method === 'PATCH') {
      updatedPagePayload = JSON.parse(options.body);
      return Response.json(notionPage('created-page'));
    }
    if (String(url).includes('api.resend.com')) {
      resendPayloads.push(JSON.parse(options.body));
      throw new Error('notification transport unavailable');
    }
    if (String(url).includes('graph.facebook.com')) {
      throw new Error('notification transport unavailable');
    }
    throw new Error(`Unexpected fetch: ${url}`);
  };

  try {
    const response = await onRequestPost({
      env: { ...env, BOOKING_BACKUP_DB: bookingBackupDatabase },
      request: new Request('https://metropinjamanberlesen.pages.dev/api/bookings', {
        method: 'POST',
        body: JSON.stringify(validPayload),
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 201);
    assert.equal(body.message, 'Booking submitted.');
    assert.equal(body.booking.id, 'created-page');
    assert.deepEqual(body.warnings, [
      'Your booking was saved, but the company email notification could not be sent.',
      'Your booking was saved, but your confirmation email could not be sent.',
      'Your booking was saved, but a WhatsApp notification could not be sent.',
    ]);
    assert.ok(calls.some((url) => url.includes('/pages')));
    assert.deepEqual(queryPayload.filter, {
      property: 'Slot Key',
      rich_text: { equals: '2026-08-15|09:00' },
    });
    assert.equal(createdPagePayload.parent.database_id, env.NOTION_BOOKING_DATABASE_ID);
    assert.equal(createdPagePayload.properties.Booking.title[0].text.content, 'Metro QA');
    assert.equal(createdPagePayload.properties['Customer Name'].rich_text[0].text.content, 'Metro QA');
    assert.equal(createdPagePayload.properties.Phone.phone_number, '+601100000099');
    assert.deepEqual(createdPagePayload.properties['Preferred Slot'].date, {
      start: '2026-08-15T09:00:00+08:00',
      end: '2026-08-15T09:30:00+08:00',
    });
    assert.equal(createdPagePayload.properties['Slot Key'].rich_text[0].text.content, '2026-08-15|09:00');
    assert.equal(createdPagePayload.properties.Status.select.name, 'Confirmed - Booked');
    assert.equal(createdPagePayload.properties.Source.select.name, 'Website');
    assert.equal(createdPagePayload.properties['Cancel Token'].rich_text[0].text.content.length, 48);
    assert.match(updatedPagePayload.properties['Cancel URL'].url, /\/api\/bookings\/cancel\?id=created-page&token=/);
    assert.equal(Object.hasOwn(createdPagePayload.properties, 'Location'), false);
    assert.equal(Object.hasOwn(createdPagePayload.properties, 'submission_timestamp'), false);
    assert.match(d1Backup.sql, /INSERT INTO appointment_booking_backups/);
    assert.deepEqual(d1Backup.values.slice(0, 10), [
      'created-page',
      'Metro QA',
      'metro.qa@example.com',
      '+601100000099',
      'Personal Loan',
      'Selangor',
      '2026-08-15',
      '09:00',
      '2026-08-15|09:00',
      'Internal regression test.',
    ]);
    assert.equal(resendPayloads.length, 2);
    assert.deepEqual(resendPayloads.map((payload) => payload.to), [
      ['admin@example.com'],
      ['metro.qa@example.com'],
    ]);
    assert.deepEqual(resendPayloads.map((payload) => payload.cc), [
      ['ava@locus-t.com.my'],
      undefined,
    ]);
    const applicantEmail = resendPayloads[1];
    assert.doesNotMatch(applicantEmail.text, /Confirm appointment|Cancel appointment/i);
    assert.doesNotMatch(applicantEmail.html, /Confirm Appointment|Cancel Appointment/i);
    assert.match(applicantEmail.html, /WhatsApp Us/);
    assert.equal(
      Object.hasOwn(createdPagePayload.properties, 'Preferred Date'),
      false,
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('booking API returns controlled 409 for an already booked slot', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ results: [notionPage('existing')] });

  try {
    const response = await onRequestPost({
      env,
      request: new Request('https://metropinjamanberlesen.pages.dev/api/bookings', {
        method: 'POST',
        body: JSON.stringify(validPayload),
      }),
    });

    assert.equal(response.status, 409);
    assert.match((await response.json()).message, /already been booked/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('booking API returns controlled 400 for invalid form data', async () => {
  const response = await onRequestPost({
    env,
    request: new Request('https://metropinjamanberlesen.pages.dev/api/bookings', {
      method: 'POST',
      body: JSON.stringify({ ...validPayload, email: 'invalid' }),
    }),
  });

  assert.equal(response.status, 400);
  assert.match((await response.json()).message, /valid email/i);
});

test('booking API returns a safe 500 response for a Notion failure', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response('{"object":"error","message":"private detail"}', { status: 400 });

  try {
    const response = await onRequestPost({
      env,
      request: new Request('https://metropinjamanberlesen.pages.dev/api/bookings', {
        method: 'POST',
        body: JSON.stringify(validPayload),
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 500);
    assert.doesNotMatch(JSON.stringify(body), /private detail|Notion/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('booked slots API returns controlled 500 when Notion lookup fails', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ message: 'bad database' }, { status: 404 });

  try {
    const response = await onRequestGet({
      env,
      request: new Request('https://metropinjamanberlesen.pages.dev/api/bookings/booked-slots?date=2026-07-24'),
    });
    const body = await response.json();

    assert.equal(response.status, 500);
    assert.equal(body.message, 'Booked times are temporarily unavailable. Please try again.');
  } finally {
    globalThis.fetch = originalFetch;
  }
});
