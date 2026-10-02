import { parse } from 'node-html-parser';
import type { LegacyPageContent } from './legacyPage.tsx';
import { loadLegacyPage } from './legacyPageData.ts';
import {
  getLocalizedPersonalLoanPath,
  type SiteLocale,
} from './locale.ts';
import { personalLoanDisclosureSection } from './loanCompliance.ts';
import { siteConfig } from '../../config/site.ts';

const pageCopy: Record<SiteLocale, {
  title: string;
  description: string;
  heading: string;
  heroDescription: string;
  imageAlt: string;
}> = {
  en: {
    title: `Personal Loan Rates, Fees & APR | ${siteConfig.name}`,
    description: 'Review personal-loan flat interest, the maximum APR for unsecured loans, financed charges and the representative example.',
    heading: 'Personal Loan',
    heroDescription: 'Review the flat interest rate, maximum APR, financed charges and representative example before making an enquiry.',
    imageAlt: 'Customer reviewing personal-loan rates and repayment information with an adviser',
  },
  bm: {
    title: `Kadar, Fi & APR Pinjaman Peribadi | ${siteConfig.name}`,
    description: 'Semak kadar faedah rata pinjaman peribadi, APR maksimum bagi pinjaman tanpa cagaran, caj pembiayaan dan contoh perwakilan.',
    heading: 'Pinjaman Peribadi',
    heroDescription: 'Semak kadar faedah rata, APR maksimum, caj pembiayaan dan contoh perwakilan sebelum membuat pertanyaan.',
    imageAlt: 'Pelanggan menyemak kadar pinjaman peribadi dan maklumat bayaran balik bersama penasihat',
  },
  cn: {
    title: `个人贷款利率、费用与APR | ${siteConfig.name}`,
    description: '查看个人贷款固定利率、无抵押贷款最高APR、融资费用及代表性示例。',
    heading: '个人贷款',
    heroDescription: '咨询前，请查看固定利率、最高APR、融资费用及代表性示例。',
    imageAlt: '客户与顾问查看个人贷款利率及还款资料',
  },
};

export async function loadPersonalLoanPage(locale: SiteLocale = 'en'): Promise<LegacyPageContent> {
  const base = await loadLegacyPage('loan.html', 'loan', locale);
  const root = parse(base.bodyHtml, {
    blockTextElements: { script: true, style: true, pre: true, noscript: true },
  });
  const copy = pageCopy[locale];
  const hero = root.querySelector('#loan-hero-main-heading')?.closest('section');

  root.querySelectorAll('section').forEach((section) => {
    if (section.parentNode === root && section !== hero) section.remove();
  });

  const heading = root.querySelector('#loan-hero-main-heading');
  if (heading) heading.textContent = copy.heading;
  const description = root.querySelector('#loan-hero-description');
  if (description) description.textContent = copy.heroDescription;
  root.querySelectorAll('img[src*="loan-hero-adviser"]').forEach((image) => {
    image.setAttribute('alt', copy.imageAlt);
    image.setAttribute('title', copy.imageAlt);
  });

  const personalLoanPath = getLocalizedPersonalLoanPath(locale);
  root.querySelectorAll('button[onclick]').forEach((button) => {
    const onclick = button.getAttribute('onclick');
    if (onclick) button.setAttribute('onclick', onclick.replace(/\/(en|bm|cn)\/loan/g, '/$1/personal-loan'));
  });
  root.querySelector('#site-footer-link-personal-loan')?.setAttribute('href', personalLoanPath);

  const footer = root.querySelector('footer');
  footer?.insertAdjacentHTML('beforebegin', personalLoanDisclosureSection(locale));

  return {
    ...base,
    title: copy.title,
    description: copy.description,
    metaDescription: copy.description,
    bodyHtml: root.toString(),
    localizedPaths: {
      en: getLocalizedPersonalLoanPath('en'),
      bm: getLocalizedPersonalLoanPath('bm'),
      cn: getLocalizedPersonalLoanPath('cn'),
    },
  };
}
