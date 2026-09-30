import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parse } from 'node-html-parser';

const assetUrl = new URL('../public/forms/whatsapp-lead-form.html', import.meta.url);

test('the global WhatsApp lead form preserves its capture and handoff contract', async () => {
  const html = await readFile(assetUrl, 'utf8');
  const root = parse(html);
  const host = root.querySelector('.locus-html-form');
  const form = host?.querySelector('form');
  const script = host?.querySelector('script')?.textContent ?? '';
  const configMatch = script.match(/var config=(\{[^;]+\});/);

  assert.ok(host, 'the embeddable form host should exist');
  assert.ok(host.querySelector('.lr-overlay[hidden]'), 'the modal should start hidden');
  assert.equal(host.querySelector('.lr-dialog')?.getAttribute('role'), 'dialog');
  assert.ok(form, 'the lead capture form should exist');
  assert.deepEqual(
    form.querySelectorAll('[data-input]').map((input) => input.getAttribute('name')),
    ['name', 'email', 'phone'],
  );
  assert.ok(form.querySelector('[data-captcha]'), 'the Turnstile mount should exist');
  assert.equal(form.querySelector('button[type="submit"]')?.textContent.trim(), 'Continue to WhatsApp');
  assert.ok(configMatch, 'the form runtime configuration should be embedded');

  const config = JSON.parse(configMatch[1]);
  assert.equal(config.id, '443b4bd3-bf3a-4244-9e88-5735c2fba5f6');
  assert.equal(config.endpoint, 'https://website-lead-routes.easondev.workers.dev/v1/html-leads');
  assert.equal(config.route, '01de841d-dbe8-4179-b51f-a12987517398');
  assert.equal(config.turnstile, true);
  assert.equal(config.whatsapp, 'https://wa.me/60102150037?text=Hi%2C%20I%E2%80%99d%20like%20to%20find%20out%20more.');
  assert.match(script, /event==='lead_form_success'&&testLead===false&&typeof window\.alfaTrack==='function'/);
  assert.match(script, /window\.alfaTrack\('lead_form_submit',\{booking_id:submissionId,submission_id:submissionId/);
  assert.match(script, /transaction_id:submissionId/);
  assert.match(script, /eventData\.value=1;eventData\.currency='MYR'/);
  assert.match(script, /track\('lead_form_attempt'\)/);
  assert.doesNotMatch(script, /input\.disabled=true;\}\);track\('lead_form_submit'\)/);
});
