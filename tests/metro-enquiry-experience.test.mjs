import test from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'node-html-parser';

import { loadLegacyPage } from '../src/lib/legacyPageData.ts';
import { siteConfig } from '../config/site.ts';

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

const useFallbackContent = () => {
  globalThis.fetch = async () => { throw new Error('use checked-in fallback'); };
};

test('EN and BM home pages lead with the approved enquiry proposition and four benefits', async () => {
  useFallbackContent();
  const en = parse((await loadLegacyPage('index.html', 'home', 'en')).bodyHtml);
  const bm = parse((await loadLegacyPage('index.html', 'home', 'bm')).bodyHtml);

  assert.equal(en.querySelector('#home-hero-main-heading')?.text, 'Quick loan enquiries. Clear costs. Personal assistance.');
  assert.equal(bm.querySelector('#home-hero-main-heading')?.text, 'Pertanyaan pinjaman pantas. Kos jelas. Bantuan peribadi.');
  assert.equal(en.querySelectorAll('#home-key-benefits article').length, 4);
  assert.equal(bm.querySelectorAll('#home-key-benefits article').length, 4);
  assert.match(en.querySelector('#home-hero-description')?.text || '', /after Metro receives all required documents/);
  assert.match(bm.querySelector('#home-hero-description')?.text || '', /selepas Metro menerima semua dokumen yang diperlukan/);
});

test('WhatsApp is the primary EN and BM enquiry action with separate personal and business messages', async () => {
  useFallbackContent();
  for (const locale of ['en', 'bm']) {
    const page = parse((await loadLegacyPage('loan.html', 'loan', locale)).bodyHtml);
    const expectedLabel = locale === 'en' ? 'Check Eligibility on WhatsApp' : 'Semak Kelayakan di WhatsApp';
    assert.equal(page.querySelector('#site-header-apply-now-label')?.text, expectedLabel);
    assert.equal(page.querySelector('#loan-personal-whatsapp-label')?.getAttribute('href'), siteConfig.social.personalLoanWhatsapp);
    assert.equal(page.querySelector('#loan-business-whatsapp-label')?.getAttribute('href'), siteConfig.social.businessLoanWhatsapp);
    assert.notEqual(siteConfig.social.personalLoanWhatsapp, siteConfig.social.businessLoanWhatsapp);
  }
});

test('home process, office trust block, response-hours distinction and contact FAQs are present', async () => {
  useFallbackContent();
  const home = parse((await loadLegacyPage('index.html', 'home', 'en')).bodyHtml);
  const contact = parse((await loadLegacyPage('contact.html', 'contactUs', 'en')).bodyHtml);

  assert.equal(home.querySelector('#home-how-it-works-step-1-title')?.text, 'Contact us on WhatsApp');
  assert.match(home.querySelector('.metro-process-note')?.text || '', /Approval and disbursement times depend/);
  assert.match(home.querySelector('#metro-office-trust')?.text || '', /Visit our Kuala Lumpur office/);
  assert.match(home.querySelector('#metro-office-trust')?.text || '', /Awaiting lender verification/);
  assert.match(home.querySelector('#metro-office-trust iframe')?.getAttribute('src') || '', /google\.com\/maps/);
  assert.match(home.querySelector('#site-footer-business-hours')?.text || '', /Staffed response hours/);
  assert.equal(contact.querySelectorAll('.metro-faq-item').length, 7);
  assert.match(contact.querySelector('#contact-faq-2-answer')?.text || '', /not an “IC-only” approval promise/);
  assert.match(contact.querySelector('#contact-faq-7-answer')?.text || '', /business registration documents/);
});
