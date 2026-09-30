import { parse } from 'node-html-parser';
import { siteConfig } from '../../config/site.ts';
import type { SitePageId } from '../payload/content.ts';
import type { SiteLocale } from './locale.ts';

type PublishedLoanTerms = {
  loanAmount: string;
  repaymentPeriod: string;
  maximumApr: string;
  fees: string;
  exampleAmount: string;
  exampleSchedule: string;
  exampleInterest: string;
  exampleFees: string;
  exampleTotalPayable: string;
};

/** Numerical terms approved for publication from the compliance brief. */
export const loanComplianceStatus = {
  costsPublished: true,
  applicationsEnabled: false,
  verifiedTerms: {
    en: {
      loanAmount: 'RM500–RM100,000',
      repaymentPeriod: '6–60 months',
      maximumApr: 'The maximum Annual Percentage Rate (APR) is 18%.',
      fees: 'Application, processing and administration fees: RM0. Stamp duty: approximately 0.5% of the loan amount. Actual legal costs may apply. Early-settlement fee: RM0.',
      exampleAmount: 'RM5,000',
      exampleSchedule: '12 monthly repayments of RM468.75',
      exampleInterest: 'RM600 at 12% per annum, calculated on a flat/simple basis',
      exampleFees: 'Estimated stamp duty: RM25. Other fees: RM0.',
      exampleTotalPayable: 'RM5,625',
    },
    bm: {
      loanAmount: 'RM500–RM100,000',
      repaymentPeriod: '6–60 bulan',
      maximumApr: 'Kadar Peratusan Tahunan (APR) maksimum ialah 18%.',
      fees: 'Fi permohonan, pemprosesan dan pentadbiran: RM0. Duti setem: kira-kira 0.5% daripada jumlah pinjaman. Kos guaman sebenar mungkin dikenakan. Fi penyelesaian awal: RM0.',
      exampleAmount: 'RM5,000',
      exampleSchedule: '12 bayaran bulanan sebanyak RM468.75',
      exampleInterest: 'RM600 pada kadar 12% setahun, dikira secara kadar rata/mudah',
      exampleFees: 'Anggaran duti setem: RM25. Fi lain: RM0.',
      exampleTotalPayable: 'RM5,625',
    },
    cn: {
      loanAmount: 'RM500–RM100,000',
      repaymentPeriod: '6–60个月',
      maximumApr: '最高年利率（APR）为18%。',
      fees: '申请费、处理费和行政费：RM0。印花税：约为贷款金额的0.5%。可能收取实际法律费用。提前结清费用：RM0。',
      exampleAmount: 'RM5,000',
      exampleSchedule: '每月偿还RM468.75，共12期',
      exampleInterest: '按每年12%的固定／单利计算，利息为RM600',
      exampleFees: '预计印花税：RM25。其他费用：RM0。',
      exampleTotalPayable: 'RM5,625',
    },
  },
} satisfies {
  costsPublished: boolean;
  applicationsEnabled: boolean;
  verifiedTerms: Record<SiteLocale, PublishedLoanTerms>;
};

type ComplianceCopy = {
  heading: string;
  intro: string;
  loanAmountLabel: string;
  repaymentLabel: string;
  maximumAprLabel: string;
  feesLabel: string;
  exampleHeading: string;
  amountLabel: string;
  scheduleLabel: string;
  interestLabel: string;
  exampleFeesLabel: string;
  totalLabel: string;
  identityHeading: string;
  legalNameLabel: string;
  relationshipLabel: string;
  serviceModelLabel: string;
  licenceLabel: string;
  permitLabel: string;
  addressLabel: string;
  pendingValue: string;
  pausedNotice: string;
  costsButton: string;
  applicationPaused: string;
  correctedHomeHeading: string;
  correctedHomeDescription: string;
  correctedEligibilityTitle: string;
  correctedEligibilityDescription: string;
  generalDisclaimer: string;
  pausedReadyDescription: string;
  rateRange: string;
  businessDetails: string;
};

const copy: Record<SiteLocale, ComplianceCopy> = {
  en: {
    heading: 'Personal loan costs',
    intro: 'Review the repayment terms, maximum APR, fees and representative example before applying.',
    loanAmountLabel: 'Personal-loan amount',
    repaymentLabel: 'Minimum and maximum repayment period',
    maximumAprLabel: 'Maximum APR',
    feesLabel: 'All applicable fees',
    exampleHeading: 'Representative example',
    amountLabel: 'Amount borrowed',
    scheduleLabel: 'Repayment schedule',
    interestLabel: 'Interest',
    exampleFeesLabel: 'Fees',
    totalLabel: 'Total payable',
    identityHeading: 'Lender and service identity',
    legalNameLabel: 'Registered lender legal name',
    relationshipLabel: 'Relationship to Metro Pinjaman Berlesen',
    serviceModelLabel: 'Direct lender or enquiry service',
    licenceLabel: 'Moneylender licence number and validity',
    permitLabel: 'Advertising permit number and validity',
    addressLabel: 'Business address',
    pendingValue: 'Awaiting lender verification — not currently published',
    pausedNotice: 'Applications remain temporarily paused while the lender identity, licence and advertising permit details are confirmed.',
    costsButton: 'Loan costs',
    applicationPaused: 'Applications paused',
    correctedHomeHeading: 'Personal loans for eligible applicants',
    correctedHomeDescription: 'Personal loans may be used for major expenses, short-term cash needs or debt consolidation. Eligibility and final terms are subject to income, document and lender checks.',
    correctedEligibilityTitle: 'For eligible Malaysian applicants',
    correctedEligibilityDescription: 'Personal-loan applicants must be Malaysian, have a steady source of income and earn at least RM3,000 per month.',
    generalDisclaimer: 'The maximum APR and representative example are disclosed on the homepage. Final terms remain subject to eligibility, document verification and lender approval.',
    pausedReadyDescription: `Applications are paused while the lender identity, licence and advertising permit details are confirmed. You may contact us on WhatsApp at ${siteConfig.contact.phone} for general enquiries.`,
    rateRange: '8%–12% annual interest (flat/simple basis)',
    businessDetails: 'Contact us for business-loan details',
  },
  bm: {
    heading: 'Kos pinjaman peribadi',
    intro: 'Semak tempoh bayaran balik, APR maksimum, fi dan contoh perwakilan sebelum memohon.',
    loanAmountLabel: 'Jumlah pinjaman peribadi',
    repaymentLabel: 'Tempoh bayaran balik minimum dan maksimum',
    maximumAprLabel: 'Kadar Peratusan Tahunan (APR) maksimum',
    feesLabel: 'Semua fi yang dikenakan',
    exampleHeading: 'Contoh perwakilan',
    amountLabel: 'Jumlah pinjaman',
    scheduleLabel: 'Jadual bayaran balik',
    interestLabel: 'Faedah',
    exampleFeesLabel: 'Fi',
    totalLabel: 'Jumlah perlu dibayar',
    identityHeading: 'Identiti pemberi pinjam dan perkhidmatan',
    legalNameLabel: 'Nama sah pemberi pinjam berdaftar',
    relationshipLabel: 'Hubungan dengan Metro Pinjaman Berlesen',
    serviceModelLabel: 'Pemberi pinjam langsung atau perkhidmatan pertanyaan',
    licenceLabel: 'Nombor dan tempoh sah lesen pemberi pinjam wang',
    permitLabel: 'Nombor dan tempoh sah permit iklan',
    addressLabel: 'Alamat perniagaan',
    pendingValue: 'Menunggu pengesahan pemberi pinjam — belum diterbitkan',
    pausedNotice: 'Permohonan kekal dihentikan sementara semasa identiti pemberi pinjam, lesen dan butiran permit iklan disahkan.',
    costsButton: 'Kos pinjaman',
    applicationPaused: 'Permohonan dihentikan sementara',
    correctedHomeHeading: 'Pinjaman peribadi untuk pemohon yang layak',
    correctedHomeDescription: 'Pinjaman peribadi boleh digunakan untuk perbelanjaan utama, keperluan tunai jangka pendek atau penyatuan hutang. Kelayakan dan terma akhir tertakluk pada semakan pendapatan, dokumen dan pemberi pinjam.',
    correctedEligibilityTitle: 'Untuk pemohon Malaysia yang layak',
    correctedEligibilityDescription: 'Pemohon pinjaman peribadi mestilah rakyat Malaysia, mempunyai sumber pendapatan tetap dan berpendapatan sekurang-kurangnya RM3,000 sebulan.',
    generalDisclaimer: 'APR maksimum dan contoh perwakilan dinyatakan di halaman utama. Terma akhir tertakluk pada kelayakan, pengesahan dokumen dan kelulusan pemberi pinjam.',
    pausedReadyDescription: `Permohonan dihentikan sementara semasa identiti pemberi pinjam, lesen dan butiran permit iklan disahkan. Anda boleh menghubungi kami melalui WhatsApp di ${siteConfig.contact.phone} untuk pertanyaan umum.`,
    rateRange: 'Faedah tahunan 8%–12% (kadar rata/mudah)',
    businessDetails: 'Hubungi kami untuk butiran pinjaman perniagaan',
  },
  cn: {
    heading: '个人贷款费用',
    intro: '申请前，请先查看还款期限、最高APR、费用和代表性示例。',
    loanAmountLabel: '个人贷款金额',
    repaymentLabel: '最短和最长还款期限',
    maximumAprLabel: '最高年利率（APR）',
    feesLabel: '所有适用费用',
    exampleHeading: '代表性示例',
    amountLabel: '借款金额',
    scheduleLabel: '还款安排',
    interestLabel: '利息',
    exampleFeesLabel: '费用',
    totalLabel: '应还总额',
    identityHeading: '贷款机构与服务身份',
    legalNameLabel: '注册贷款机构法定名称',
    relationshipLabel: '与 Metro Pinjaman Berlesen 的关系',
    serviceModelLabel: '直接贷款机构或咨询服务',
    licenceLabel: '放贷人执照号码及有效期',
    permitLabel: '广告准证号码及有效期',
    addressLabel: '营业地址',
    pendingValue: '等待贷款机构核实——目前尚未公布',
    pausedNotice: '在贷款机构身份、执照和广告准证资料获得确认前，贷款申请仍暂时停止。',
    costsButton: '贷款费用',
    applicationPaused: '申请暂时停止',
    correctedHomeHeading: '为符合资格的申请人提供个人贷款',
    correctedHomeDescription: '个人贷款可用于大额开支、短期资金需求或债务整合。申请资格和最终条款须经收入、文件及贷款机构审核。',
    correctedEligibilityTitle: '适用于符合资格的马来西亚申请人',
    correctedEligibilityDescription: '个人贷款申请人必须是马来西亚公民，拥有稳定收入来源，且月薪至少为RM3,000。',
    generalDisclaimer: '最高APR和代表性示例已在主页列明。最终条款须视申请资格、文件核实及贷款机构批准而定。',
    pausedReadyDescription: `在贷款机构身份、执照和广告准证资料获得确认前，申请暂时停止。一般咨询可通过 WhatsApp ${siteConfig.contact.phone} 联系我们。`,
    rateRange: '每年8%–12%利息（固定／单利计算）',
    businessDetails: '商业贷款详情请联系我们',
  },
};

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function disclosureSection(locale: SiteLocale): string {
  const labels = copy[locale];
  const terms = loanComplianceStatus.verifiedTerms[locale];
  const value = (verifiedValue: string) => escapeHtml(verifiedValue);

  return `
    <section id="personal-loan-costs" class="py-12 lg:py-16 bg-teal-50 border-y border-teal-900" aria-labelledby="personal-loan-costs-heading">
      <div class="container mx-auto px-4"><div class="max-w-6xl mx-auto">
        <div class="mb-8"><p class="text-sm font-bold uppercase tracking-wide text-teal-900 mb-2">${escapeHtml(siteConfig.name)}</p><h2 id="personal-loan-costs-heading" class="font-heading text-4xl lg:text-5xl tracking-tight text-teal-900 mb-3">${escapeHtml(labels.heading)}</h2><p class="text-lg text-gray-700">${escapeHtml(labels.intro)}</p></div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-2xl border border-gray-300 p-5"><h3 class="font-semibold text-teal-900 mb-2">${escapeHtml(labels.loanAmountLabel)}</h3><p>${value(terms.loanAmount)}</p></div>
          <div class="bg-white rounded-2xl border border-gray-300 p-5"><h3 class="font-semibold text-teal-900 mb-2">${escapeHtml(labels.repaymentLabel)}</h3><p>${value(terms.repaymentPeriod)}</p></div>
          <div class="bg-white rounded-2xl border-2 border-teal-900 p-5"><h3 class="font-semibold text-teal-900 mb-2">${escapeHtml(labels.maximumAprLabel)}</h3><p>${value(terms.maximumApr)}</p></div>
          <div class="bg-white rounded-2xl border border-gray-300 p-5"><h3 class="font-semibold text-teal-900 mb-2">${escapeHtml(labels.feesLabel)}</h3><p>${value(terms.fees)}</p></div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-300 p-6"><h3 class="font-heading text-2xl text-teal-900 mb-4">${escapeHtml(labels.exampleHeading)}</h3><dl class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4"><div><dt class="font-semibold">${escapeHtml(labels.amountLabel)}</dt><dd>${value(terms.exampleAmount)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.scheduleLabel)}</dt><dd>${value(terms.exampleSchedule)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.interestLabel)}</dt><dd>${value(terms.exampleInterest)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.exampleFeesLabel)}</dt><dd>${value(terms.exampleFees)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.totalLabel)}</dt><dd>${value(terms.exampleTotalPayable)}</dd></div></dl></div>
        ${loanComplianceStatus.applicationsEnabled ? '' : `<p class="mt-6 rounded-xl bg-orange-50 border border-teal-900 p-4 font-semibold text-teal-900" role="status">${escapeHtml(labels.pausedNotice)}</p>`}
      </div></div>
    </section>`;
}

type ParsedElement = NonNullable<ReturnType<ReturnType<typeof parse>['querySelector']>>;

function replaceElementText(element: ParsedElement | null, text: string): void {
  if (!element) return;
  const span = element.querySelector('span');
  if (span) {
    span.removeAttribute('x-text');
    span.textContent = text;
  }
  else element.textContent = text;
}

export function applyLoanCompliance(html: string, locale: SiteLocale, pageId: SitePageId): string {
  const root = parse(html, { blockTextElements: { script: true, style: true, pre: true, noscript: true } });
  const labels = copy[locale];
  if (loanComplianceStatus.costsPublished && pageId === 'home') {
    root.querySelector('#home-ready-to-get-started-heading')
      ?.closest('section')
      ?.insertAdjacentHTML('afterend', disclosureSection(locale));
  }

  const disclosureTarget = pageId === 'home'
    ? '#personal-loan-costs'
    : `/${locale}#personal-loan-costs`;

  const forcedLocalizedCopy: Array<[string, string]> = [
    ['#home-hero-main-heading', labels.correctedHomeHeading],
    ['#home-hero-description', labels.correctedHomeDescription],
    ['#home-why-choose-us-feature-2-title', labels.correctedEligibilityTitle],
    ['#home-why-choose-us-feature-2-description', labels.correctedEligibilityDescription],
    ['#home-ready-to-get-started-description', labels.pausedReadyDescription],
    ['#loan-comparison-disclaimer', labels.generalDisclaimer],
    ['#loan-comparison-row-2-personal', labels.rateRange],
    ['#loan-comparison-row-2-business', labels.businessDetails],
    ['#loan-comparison-row-3-personal', loanComplianceStatus.verifiedTerms[locale].loanAmount],
    ['#loan-comparison-row-3-business', labels.businessDetails],
    ['#loan-comparison-row-4-personal', loanComplianceStatus.verifiedTerms[locale].repaymentPeriod],
    ['#loan-comparison-row-4-business', labels.businessDetails],
    ['#loan-interest-rates-feature-1-description', labels.rateRange],
    ['#loan-interest-rates-feature-2-description', loanComplianceStatus.verifiedTerms[locale].repaymentPeriod],
    ['#loan-interest-rates-feature-3-description', loanComplianceStatus.verifiedTerms[locale].loanAmount],
    ['#loan-interest-rates-amount-value', loanComplianceStatus.verifiedTerms[locale].exampleAmount],
    ['#loan-interest-rates-example-description', `${loanComplianceStatus.verifiedTerms[locale].exampleSchedule}. ${loanComplianceStatus.verifiedTerms[locale].exampleInterest}. ${loanComplianceStatus.verifiedTerms[locale].exampleFees} ${labels.totalLabel}: ${loanComplianceStatus.verifiedTerms[locale].exampleTotalPayable}.`],
  ];
  forcedLocalizedCopy.forEach(([selector, value]) => replaceElementText(root.querySelector(selector), value));

  if (!loanComplianceStatus.applicationsEnabled) {
    const applicationLabels = /^(Apply Now|Mohon Sekarang|立即申请)$/i;
    root.querySelectorAll('a').forEach((anchor) => {
      if (!applicationLabels.test(anchor.text.trim())) return;
      anchor.setAttribute('href', disclosureTarget);
      anchor.removeAttribute('target');
      replaceElementText(anchor, labels.applicationPaused);
    });
    root.querySelectorAll('button[type="submit"]').forEach((button) => {
      button.removeAttribute(':disabled');
      button.removeAttribute('x-bind:disabled');
      button.setAttribute('disabled', 'disabled');
      button.setAttribute('aria-disabled', 'true');
      replaceElementText(button, labels.applicationPaused);
    });
    root.querySelectorAll('form').forEach((form) => {
      form.setAttribute('action', disclosureTarget);
      form.setAttribute('x-on:submit.prevent', '');
      form.removeAttribute('aria-describedby');
    });
    ['site-header-apply-now-label', 'site-header-mobile-drawer-primary-apply-now-label', 'site-header-mobile-drawer-secondary-apply-now-label'].forEach((id) => {
      const link = root.querySelector(`#${id}`);
      if (!link) return;
      link.setAttribute('href', disclosureTarget);
      replaceElementText(link, labels.costsButton);
    });
    root.querySelector('#about-us-statistic-3-value')?.closest('div')?.remove();
  }
  return root.toString();
}
