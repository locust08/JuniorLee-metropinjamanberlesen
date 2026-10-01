import test from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'node-html-parser';

import { loadLegacyPage } from '../src/lib/legacyPageData.ts';
import { loadPersonalLoanPage } from '../src/lib/personalLoanPageData.ts';
import { calculateRepresentativeCheck } from '../src/lib/loanCompliance.ts';

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test('loadLegacyPage exposes Payload SEO title and a compliance-safe description to Next Head props', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({
    homePage: {
      seo: {
        title: 'Payload SEO title',
        description: 'Payload SEO description',
      },
    },
  }));

  const page = await loadLegacyPage('index.html', 'home');

  assert.equal(page.title, 'Payload SEO title');
  assert.equal(page.description, 'Personal and business loan information for eligible Malaysian applicants, with application support from Metro Pinjaman Berlesen.');
  assert.match(page.bodyHtml, /id="home-hero-main-heading"/);
});

test('loadLegacyPage protects the approved enquiry heading from stale published Payload copy', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({
    homePage: {
      hero: {
        mainHeading: 'Pay Off Your Debts',
      },
    },
  }));

  const page = await loadLegacyPage('index.html', 'home');

  assert.match(page.bodyHtml, /Quick loan enquiries\. Clear costs\. Personal assistance\./);
  assert.doesNotMatch(page.bodyHtml, /Pay Off Your Debts/);
  assert.doesNotMatch(page.bodyHtml, /Powering Tomorrow|Simple Loans,/);
});

test('loadLegacyPage presents the Metro Pinjaman Berlesen brand across localized customer pages', async () => {
  globalThis.fetch = async () => {
    throw new Error('use the checked-in fallback content');
  };

  for (const locale of ['en', 'bm', 'cn']) {
    const page = await loadLegacyPage('index.html', 'home', locale);
    const renderedPage = `${page.title}\n${page.metaDescription}\n${page.bodyHtml}`;

    assert.match(renderedPage, /Metro Pinjaman Berlesen/);
    assert.doesNotMatch(renderedPage, /Alfa Pinjaman|Junior Lee/i);
  }
});

test('every English page exposes descriptive Metro Pinjaman Berlesen SEO without former brand names', async () => {
  globalThis.fetch = async () => {
    throw new Error('use the checked-in fallback content');
  };

  const pages = [
    ['index.html', 'home'],
    ['about_us.html', 'aboutUs'],
    ['loan.html', 'loan'],
    ['how_to_apply.html', 'howToApply'],
    ['contact.html', 'contactUs'],
  ];

  for (const [fileName, pageId] of pages) {
    const page = await loadLegacyPage(fileName, pageId, 'en');
    const seoCopy = `${page.title}\n${page.metaDescription}`;

    assert.match(page.title, /Metro Pinjaman Berlesen/);
    assert.ok(page.metaDescription.length >= 70, `${pageId} description is too short`);
    assert.doesNotMatch(seoCopy, /Alfa Pinjaman|Junior Lee/i);
  }
});

test('loadLegacyPage keeps the white logo in the header and uses the dark supplied logo in the footer', async () => {
  globalThis.fetch = async () => {
    throw new Error('use the checked-in fallback content');
  };

  const page = await loadLegacyPage('index.html', 'home');
  const root = parse(page.bodyHtml);
  const headerLogo = root.querySelector('#site-header-logo');
  const footerLogo = root.querySelector('#site-footer-logo');

  assert.equal(headerLogo?.getAttribute('src'), '/brand/junior-lee-logo.png');
  assert.equal(headerLogo?.getAttribute('width'), '154');
  assert.equal(headerLogo?.getAttribute('height'), '53');
  assert.equal(footerLogo?.getAttribute('src'), '/brand/metro-footer-logo.png');
  assert.equal(footerLogo?.getAttribute('width'), '176');
  assert.equal(footerLogo?.getAttribute('height'), '64');
  assert.doesNotMatch(page.bodyHtml, /id="site-(?:header|footer)[^"]*-logo"[^>]*class="[^"]*brightness-0/);
  assert.match(page.bodyHtml, /id="site-header-mobile-drawer-primary-logo"/);
});

test('loadLegacyPage renders the centralized Metro Pinjaman Berlesen contact details and link destinations', async () => {
  globalThis.fetch = async () => {
    throw new Error('use the checked-in fallback content');
  };

  const page = await loadLegacyPage('contact.html', 'contactUs');

  assert.match(page.bodyHtml, /\+60 10-215 0037/);
  assert.match(page.bodyHtml, /href="tel:\+60102150037"/);
  assert.match(page.bodyHtml, /metropinjamanberlesan@gmail\.com/);
  assert.match(page.bodyHtml, /href="mailto:metropinjamanberlesan@gmail\.com"/);
  assert.match(
    page.bodyHtml,
    /Jalan Metro 1, Metro Prima, 52100 Kuala Lumpur, Federal Territory of Kuala Lumpur/,
  );
  assert.doesNotMatch(
    page.bodyHtml,
    /017-5392449|60175392449|alfa\.pinjaman@gmail\.com|Jalan Batu Nilam 1/,
  );
});

test('localized pages keep navigation and footer routes consistent', async () => {
  globalThis.fetch = async () => {
    throw new Error('use the checked-in fallback content');
  };

  const pages = [
    ['index.html', 'home'],
    ['about_us.html', 'aboutUs'],
    ['loan.html', 'loan'],
    ['how_to_apply.html', 'howToApply'],
    ['contact.html', 'contactUs'],
  ];

  for (const locale of ['en', 'bm', 'cn']) {
    const expectedRoutes = {
      home: `/${locale}`,
      aboutUs: `/${locale}/about-us`,
      loan: `/${locale}/loan`,
      howToApply: `/${locale}/how-to-apply`,
      contactUs: `/${locale}/contact`,
    };

    for (const [filename, pageId] of pages) {
      const page = await loadLegacyPage(filename, pageId, locale);
      const root = parse(page.bodyHtml);

      assert.equal(root.querySelector('#site-header-logo')?.closest('a')?.getAttribute('href'), expectedRoutes.home);
      assert.equal(root.querySelector('#site-header-nav-about-us')?.getAttribute('href'), expectedRoutes.aboutUs);
      assert.equal(root.querySelector('#site-header-nav-loan')?.getAttribute('href'), expectedRoutes.loan);
      assert.equal(root.querySelector('#site-header-nav-how-to-apply')?.getAttribute('href'), expectedRoutes.howToApply);
      assert.equal(root.querySelector('#site-header-nav-contact-us')?.getAttribute('href'), expectedRoutes.contactUs);
      assert.equal(root.querySelector('#site-header-mobile-drawer-primary-nav-about-us')?.getAttribute('href'), expectedRoutes.aboutUs);
      assert.equal(root.querySelector('#site-header-mobile-drawer-primary-nav-loan')?.getAttribute('href'), expectedRoutes.loan);
      assert.equal(root.querySelector('#site-header-mobile-drawer-primary-nav-how-to-apply')?.getAttribute('href'), expectedRoutes.howToApply);
      assert.equal(root.querySelector('#site-header-mobile-drawer-primary-nav-contact-us')?.getAttribute('href'), expectedRoutes.contactUs);
      assert.equal(root.querySelector('#site-footer-link-home')?.getAttribute('href'), expectedRoutes.home);
      assert.equal(root.querySelector('#site-footer-link-about-us')?.getAttribute('href'), expectedRoutes.aboutUs);
      assert.equal(root.querySelector('#site-footer-link-loan-options')?.getAttribute('href'), expectedRoutes.loan);
      assert.equal(root.querySelector('#site-footer-link-how-to-apply')?.getAttribute('href'), expectedRoutes.howToApply);
      assert.equal(root.querySelector('#site-footer-link-contact-us')?.getAttribute('href'), expectedRoutes.contactUs);

      const legacyInternalLinks = root.querySelectorAll('a[href]').filter((anchor) =>
        /(?:index|about_us|loan|how_to_apply|contact)\.html/.test(anchor.getAttribute('href') || ''),
      );
      assert.equal(legacyInternalLinks.length, 0, `${locale}/${pageId} retained a legacy .html link`);
    }
  }
});

test('contact page metadata uses the configured Kuala Lumpur location', async () => {
  globalThis.fetch = async () => {
    throw new Error('use the checked-in fallback content');
  };

  const page = await loadLegacyPage('contact.html', 'contactUs', 'en');

  assert.match(page.metaDescription, /Kuala Lumpur/);
  assert.doesNotMatch(page.metaDescription, /Pelabuhan Klang|Selangor/);
});

test('only the localized Personal Loan page shows the loan-cost disclosure', async () => {
  globalThis.fetch = async () => {
    throw new Error('use the checked-in fallback content');
  };

  const pages = [
    ['index.html', 'home'],
    ['about_us.html', 'aboutUs'],
    ['loan.html', 'loan'],
    ['how_to_apply.html', 'howToApply'],
    ['contact.html', 'contactUs'],
  ];
  const removedPauseMessage = /Applications (?:remain temporarily paused|are paused) while the lender identity|Permohonan (?:kekal )?dihentikan sementara semasa identiti pemberi pinjam|在贷款机构身份、执照和广告准证资料获得确认前，(?:贷款)?申请(?:仍)?暂时停止/;
  for (const locale of ['en', 'bm', 'cn']) {
    for (const [fileName, pageId] of pages) {
      const page = await loadLegacyPage(fileName, pageId, locale);
      const root = parse(page.bodyHtml);
      const disclosure = root.querySelector('#personal-loan-costs');
      assert.equal(disclosure, null, `${locale}/${pageId} should not show the disclosure`);
      assert.doesNotMatch(page.bodyHtml, removedPauseMessage);
      if (locale === 'en' || locale === 'bm') {
        assert.equal(
          root.querySelector('#site-header-apply-now-label')?.getAttribute('href'),
          'https://wa.me/60102150037?text=Hi%20Metro%2C%20I%20would%20like%20to%20check%20my%20eligibility%20for%20a%20personal%20loan.%20Please%20explain%20the%20required%20documents%2C%20repayment%20costs%20and%20expected%20processing%20time.',
        );
      } else {
        assert.equal(
          root.querySelector('#site-header-apply-now-label')?.getAttribute('href'),
          `/${locale}/personal-loan#personal-loan-costs`,
        );
      }
      if (pageId === 'home') {
        assert.equal(
          root.querySelector('#home-loan-option-1-title')?.closest('a')?.getAttribute('href'),
          `/${locale}/personal-loan`,
        );
      }
      root.querySelectorAll('a').forEach((anchor) => {
        assert.doesNotMatch(anchor.text, /^\s*(Apply Now|Mohon Sekarang|立即申请)\s*$/i);
      });
    }

    const personalLoanPage = await loadPersonalLoanPage(locale);
    const personalLoanRoot = parse(personalLoanPage.bodyHtml);
    const disclosure = personalLoanRoot.querySelector('#personal-loan-costs');
    assert.ok(disclosure, `${locale}/personal-loan is missing the disclosure`);
    assert.match(disclosure.text, /18%/);
    assert.match(disclosure.text, /RM5,000/);
    assert.match(disclosure.text, /12/);
    assert.equal(disclosure.querySelector('[role="status"]'), null);
    assert.doesNotMatch(personalLoanPage.bodyHtml, removedPauseMessage);
    assert.doesNotMatch(disclosure.text, /Estimated stamp duty: RM25|RM5,625|RM600 at 12%|RM600 pada kadar 12%|利息为RM600/);
    assert.equal(personalLoanPage.localizedPaths[locale], `/${locale}/personal-loan`);
  }
});

test('calculation check matches the conditional RM10 legal and RM30 stamp-duty scenario', () => {
  assert.deepEqual(calculateRepresentativeCheck({
    cashReceived: 5000,
    stampDuty: 30,
    legalCharge: 10,
    flatAnnualRate: 0.08,
    termMonths: 12,
  }), {
    financedBalance: 5040,
    interest: 403.2,
    installment: 453.6,
    totalRepaid: 5443.2,
    nominalAprPercent: 15.98,
  });
});

test('published loan terms replace inconsistent pricing while appointment enquiries remain enabled', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({
    loanPage: {
      comparison: { rows: [{}, { personalValue: '8%–12% APR', businessValue: '8%–12% APR' }] },
      interestRates: {
        features: [{ description: '8%–12% APR' }],
        exampleDescription: '180-day period. Interest: RM448. Total payable: RM5,448.',
      },
    },
  }));

  const personalLoanPage = await loadPersonalLoanPage('en');
  const loanPage = await loadLegacyPage('loan.html', 'loan', 'en');
  const appointmentPages = await Promise.all([
    loadLegacyPage('how_to_apply.html', 'howToApply', 'en'),
    loadLegacyPage('contact.html', 'contactUs', 'en'),
  ]);
  const loanRoot = parse(loanPage.bodyHtml);

  assert.doesNotMatch(loanPage.bodyHtml, /8%–12% APR|RM448|RM5,448|180-day period/);
  assert.match(personalLoanPage.bodyHtml, /The maximum Annual Percentage Rate \(APR\) is 18%/);
  assert.match(personalLoanPage.bodyHtml, /Flat interest rates from 8% per annum/);
  assert.doesNotMatch(personalLoanPage.bodyHtml, /Estimated stamp duty: RM25|RM5,625|RM600 at 12%/);
  assert.doesNotMatch(loanPage.bodyHtml, /6–60 months|RM500–RM100,000/);
  assert.match(loanRoot.querySelector('#loan-comparison-disclaimer')?.text || '', /disclosed on the Personal Loan page/);
  const appointmentButtonIds = ['#how-to-apply-ready-submit-label', '#contact-form-submit-label'];
  appointmentPages.forEach((appointmentPage, index) => {
    const appointmentRoot = parse(appointmentPage.bodyHtml);
    const button = appointmentRoot.querySelector(appointmentButtonIds[index]);
    const form = button?.closest('form');
    assert.ok(button);
    assert.equal(button.getAttribute('disabled'), undefined);
    assert.equal(button.getAttribute(':disabled'), 'loading');
    assert.ok(form);
    assert.equal(form.getAttribute('action'), '');
    assert.equal(form.getAttribute('x-on:submit.prevent'), 'submitBooking()');
  });
});
