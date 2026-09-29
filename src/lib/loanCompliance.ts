import { parse } from 'node-html-parser';
import { siteConfig } from '../../config/site.ts';
import type { SiteLocale } from './locale.ts';

/** Enable only after the lender has approved every value below. */
export const loanComplianceStatus = {
  verified: false,
  verifiedTerms: null as null | {
    repaymentPeriod: string;
    maximumApr: string;
    fees: string;
    exampleAmount: string;
    exampleSchedule: string;
    exampleInterest: string;
    exampleFees: string;
    exampleTotalPayable: string;
    legalLenderName: string;
    brandRelationship: string;
    serviceModel: string;
    licenceNumberAndValidity: string;
    advertisingPermitNumberAndValidity: string;
  },
} as const;

type ComplianceCopy = {
  heading: string;
  intro: string;
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
};

const copy: Record<SiteLocale, ComplianceCopy> = {
  en: {
    heading: 'Personal loan costs',
    intro: 'Review the full cost and lender details before applying.',
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
    pausedNotice: 'Applications are temporarily paused until the lender approves and publishes complete loan costs and identity details.',
    costsButton: 'Loan costs',
    applicationPaused: 'Applications paused',
    correctedHomeHeading: 'Personal loans for eligible applicants',
    correctedHomeDescription: 'Personal loans may be used for major expenses, short-term cash needs or debt consolidation. Eligibility and final terms are subject to income, document and lender checks.',
    correctedEligibilityTitle: 'For eligible Malaysian applicants',
    correctedEligibilityDescription: 'Personal-loan applicants must be Malaysian, have a steady source of income and earn at least RM3,000 per month.',
    generalDisclaimer: 'Published loan terms must be confirmed by the registered lender after document verification. Applications remain paused while complete costs and lender details are being verified.',
    pausedReadyDescription: `Applications are paused while complete loan costs and lender details are verified. You may contact us on WhatsApp at ${siteConfig.contact.phone} for general enquiries.`,
  },
  bm: {
    heading: 'Kos pinjaman peribadi',
    intro: 'Semak jumlah kos dan butiran pemberi pinjam sebelum memohon.',
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
    pausedNotice: 'Permohonan dihentikan sementara sehingga pemberi pinjam meluluskan dan menerbitkan kos pinjaman serta butiran identiti yang lengkap.',
    costsButton: 'Kos pinjaman',
    applicationPaused: 'Permohonan dihentikan sementara',
    correctedHomeHeading: 'Pinjaman peribadi untuk pemohon yang layak',
    correctedHomeDescription: 'Pinjaman peribadi boleh digunakan untuk perbelanjaan utama, keperluan tunai jangka pendek atau penyatuan hutang. Kelayakan dan terma akhir tertakluk pada semakan pendapatan, dokumen dan pemberi pinjam.',
    correctedEligibilityTitle: 'Untuk pemohon Malaysia yang layak',
    correctedEligibilityDescription: 'Pemohon pinjaman peribadi mestilah rakyat Malaysia, mempunyai sumber pendapatan tetap dan berpendapatan sekurang-kurangnya RM3,000 sebulan.',
    generalDisclaimer: 'Terma pinjaman yang diterbitkan mesti disahkan oleh pemberi pinjam berdaftar selepas pengesahan dokumen. Permohonan kekal dihentikan sementara semasa kos lengkap dan butiran pemberi pinjam disahkan.',
    pausedReadyDescription: `Permohonan dihentikan sementara semasa kos pinjaman lengkap dan butiran pemberi pinjam disahkan. Anda boleh menghubungi kami melalui WhatsApp di ${siteConfig.contact.phone} untuk pertanyaan umum.`,
  },
  cn: {
    heading: '个人贷款费用',
    intro: '申请前，请先查看完整费用和贷款机构资料。',
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
    pausedNotice: '贷款申请暂时停止，直至贷款机构批准并公布完整的贷款费用和身份资料。',
    costsButton: '贷款费用',
    applicationPaused: '申请暂时停止',
    correctedHomeHeading: '为符合资格的申请人提供个人贷款',
    correctedHomeDescription: '个人贷款可用于大额开支、短期资金需求或债务整合。申请资格和最终条款须经收入、文件及贷款机构审核。',
    correctedEligibilityTitle: '适用于符合资格的马来西亚申请人',
    correctedEligibilityDescription: '个人贷款申请人必须是马来西亚公民，拥有稳定收入来源，且月薪至少为RM3,000。',
    generalDisclaimer: '已公布的贷款条款须由注册贷款机构在文件核实后确认。在完整费用和贷款机构资料完成核实前，申请将继续暂停。',
    pausedReadyDescription: `在完整贷款费用和贷款机构资料完成核实前，申请暂时停止。一般咨询可通过 WhatsApp ${siteConfig.contact.phone} 联系我们。`,
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
  const terms = loanComplianceStatus.verifiedTerms;
  const value = (verifiedValue?: string) => escapeHtml(terms && verifiedValue ? verifiedValue : labels.pendingValue);

  return `
    <section id="personal-loan-costs" class="py-12 lg:py-16 bg-teal-50 border-y border-teal-900" aria-labelledby="personal-loan-costs-heading">
      <div class="container mx-auto px-4"><div class="max-w-6xl mx-auto">
        <div class="mb-8"><p class="text-sm font-bold uppercase tracking-wide text-teal-900 mb-2">${escapeHtml(siteConfig.name)}</p><h2 id="personal-loan-costs-heading" class="font-heading text-4xl lg:text-5xl tracking-tight text-teal-900 mb-3">${escapeHtml(labels.heading)}</h2><p class="text-lg text-gray-700">${escapeHtml(labels.intro)}</p></div>
        <div class="grid md:grid-cols-3 gap-4 mb-8">
          <div class="bg-white rounded-2xl border border-gray-300 p-5"><h3 class="font-semibold text-teal-900 mb-2">${escapeHtml(labels.repaymentLabel)}</h3><p>${value(terms?.repaymentPeriod)}</p></div>
          <div class="bg-white rounded-2xl border-2 border-teal-900 p-5"><h3 class="font-semibold text-teal-900 mb-2">${escapeHtml(labels.maximumAprLabel)}</h3><p>${value(terms?.maximumApr)}</p></div>
          <div class="bg-white rounded-2xl border border-gray-300 p-5"><h3 class="font-semibold text-teal-900 mb-2">${escapeHtml(labels.feesLabel)}</h3><p>${value(terms?.fees)}</p></div>
        </div>
        <div class="grid lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-2xl border border-gray-300 p-6"><h3 class="font-heading text-2xl text-teal-900 mb-4">${escapeHtml(labels.exampleHeading)}</h3><dl class="space-y-3"><div><dt class="font-semibold">${escapeHtml(labels.amountLabel)}</dt><dd>${value(terms?.exampleAmount)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.scheduleLabel)}</dt><dd>${value(terms?.exampleSchedule)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.interestLabel)}</dt><dd>${value(terms?.exampleInterest)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.exampleFeesLabel)}</dt><dd>${value(terms?.exampleFees)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.totalLabel)}</dt><dd>${value(terms?.exampleTotalPayable)}</dd></div></dl></div>
          <div class="bg-white rounded-2xl border border-gray-300 p-6"><h3 class="font-heading text-2xl text-teal-900 mb-4">${escapeHtml(labels.identityHeading)}</h3><dl class="space-y-3"><div><dt class="font-semibold">${escapeHtml(labels.legalNameLabel)}</dt><dd>${value(terms?.legalLenderName)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.relationshipLabel)}</dt><dd>${value(terms?.brandRelationship)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.serviceModelLabel)}</dt><dd>${value(terms?.serviceModel)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.licenceLabel)}</dt><dd>${value(terms?.licenceNumberAndValidity)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.permitLabel)}</dt><dd>${value(terms?.advertisingPermitNumberAndValidity)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.addressLabel)}</dt><dd>${escapeHtml(siteConfig.contact.address)}</dd></div></dl></div>
        </div>
        ${loanComplianceStatus.verified ? '' : `<p class="mt-6 rounded-xl bg-orange-50 border border-teal-900 p-4 font-semibold text-teal-900" role="status">${escapeHtml(labels.pausedNotice)}</p>`}
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

export function applyLoanCompliance(html: string, locale: SiteLocale): string {
  const root = parse(html, { blockTextElements: { script: true, style: true, pre: true, noscript: true } });
  const labels = copy[locale];
  if (loanComplianceStatus.verified) {
    root.querySelector('nav')?.insertAdjacentHTML('afterend', disclosureSection(locale));
  }

  const forcedLocalizedCopy: Array<[string, string]> = [
    ['#home-hero-main-heading', labels.correctedHomeHeading],
    ['#home-hero-description', labels.correctedHomeDescription],
    ['#home-why-choose-us-feature-2-title', labels.correctedEligibilityTitle],
    ['#home-why-choose-us-feature-2-description', labels.correctedEligibilityDescription],
    ['#home-ready-to-get-started-description', labels.pausedReadyDescription],
    ['#loan-comparison-disclaimer', labels.generalDisclaimer],
  ];
  forcedLocalizedCopy.forEach(([selector, value]) => replaceElementText(root.querySelector(selector), value));

  if (!loanComplianceStatus.verified) {
    const applicationLabels = /^(Apply Now|Mohon Sekarang|立即申请)$/i;
    root.querySelectorAll('a').forEach((anchor) => {
      if (!applicationLabels.test(anchor.text.trim())) return;
      anchor.setAttribute('href', '#');
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
      form.setAttribute('action', '#');
      form.setAttribute('x-on:submit.prevent', '');
      form.removeAttribute('aria-describedby');
    });
    ['site-header-apply-now-label', 'site-header-mobile-drawer-primary-apply-now-label', 'site-header-mobile-drawer-secondary-apply-now-label'].forEach((id) => {
      const link = root.querySelector(`#${id}`);
      if (!link) return;
      link.setAttribute('href', '#');
      replaceElementText(link, labels.applicationPaused);
    });
    [
      '#loan-comparison-row-2-personal',
      '#loan-comparison-row-2-business',
      '#loan-comparison-row-3-personal',
      '#loan-comparison-row-3-business',
      '#loan-comparison-row-4-personal',
      '#loan-comparison-row-4-business',
      '#loan-interest-rates-feature-1-description',
      '#loan-interest-rates-feature-2-description',
      '#loan-interest-rates-feature-3-description',
      '#loan-interest-rates-amount-value',
      '#loan-interest-rates-example-description',
      '#loan-personal-feature-1-title',
    ].forEach((selector) => {
      const element = root.querySelector(selector);
      if (element) element.textContent = labels.pendingValue;
    });
    root.querySelector('#about-us-statistic-3-value')?.closest('div')?.remove();
  }
  return root.toString();
}
