import { parse } from 'node-html-parser';
import { siteConfig } from '../../config/site.ts';
import type { SitePageId } from '../payload/content.ts';
import type { SiteLocale } from './locale.ts';

type PublishedLoanTerms = {
  loanAmount: string;
  repaymentPeriod: string;
  maximumApr: string;
  flatRate: string;
  stampDuty: string;
  legalCharge: string;
  exampleCashReceived: string;
  exampleTerm: string;
  financedBalance: string;
  interestBase: string;
  exampleInterest: string;
  exampleInstallments: string;
  exampleTotalRepaid: string;
  exampleApr: string;
  upfrontFees: string;
};

/** Numerical terms approved for publication from the compliance brief. */
export const loanComplianceStatus = {
  costsPublished: true,
  applicationsEnabled: false,
  appointmentEnquiriesEnabled: true,
  verifiedTerms: {
    en: {
      loanAmount: 'Available amounts are limited to combinations verified at or below 18% APR. The advertised RM500 minimum is withheld pending fee validation.',
      repaymentPeriod: 'Available terms are limited to combinations verified at or below 18% APR. The advertised six-month minimum is withheld pending fee validation.',
      maximumApr: 'The maximum Annual Percentage Rate (APR) is 18%.',
      flatRate: 'Flat interest rates from 8% per annum, subject to credit assessment and lender approval.',
      stampDuty: 'RM5 per RM1,000 or part thereof, assessed on the lender’s actual agreement amount. The exact amount must be confirmed by the lender; RM25 is not assumed.',
      legalCharge: 'The lender’s documented legal or witnessing charge. The exact amount must be confirmed because there is no single fixed fee for every lender.',
      exampleCashReceived: 'RM5,000',
      exampleTerm: '12 months',
      financedBalance: 'RM5,000 plus the lender-confirmed stamp duty and legal/witnessing charge',
      interestBase: 'The confirmed financed balance',
      exampleInterest: '8% flat annual interest × confirmed financed balance × 12/12',
      exampleInstallments: '12 equal instalments — exact amount pending the lender’s signed repayment schedule',
      exampleTotalRepaid: 'Pending the lender’s signed repayment schedule and fee assessment',
      exampleApr: 'To be calculated against the RM5,000 cash received; it must not exceed 18%',
      upfrontFees: 'No fee is collected upfront. Confirmed charges are added to the financed balance.',
    },
    bm: {
      loanAmount: 'Jumlah yang tersedia dihadkan kepada kombinasi yang disahkan pada atau di bawah APR 18%. Minimum RM500 tidak diterbitkan sementara menunggu pengesahan fi.',
      repaymentPeriod: 'Tempoh yang tersedia dihadkan kepada kombinasi yang disahkan pada atau di bawah APR 18%. Minimum enam bulan tidak diterbitkan sementara menunggu pengesahan fi.',
      maximumApr: 'Kadar Peratusan Tahunan (APR) maksimum ialah 18%.',
      flatRate: 'Kadar faedah rata bermula daripada 8% setahun, tertakluk pada penilaian kredit dan kelulusan pemberi pinjam.',
      stampDuty: 'RM5 bagi setiap RM1,000 atau sebahagiannya, berdasarkan jumlah sebenar dalam perjanjian pemberi pinjam. Jumlah tepat mesti disahkan oleh pemberi pinjam; RM25 tidak diandaikan.',
      legalCharge: 'Caj guaman atau penyaksian yang didokumenkan oleh pemberi pinjam. Jumlah tepat mesti disahkan kerana tiada satu fi tetap untuk semua pemberi pinjam.',
      exampleCashReceived: 'RM5,000',
      exampleTerm: '12 bulan',
      financedBalance: 'RM5,000 ditambah duti setem dan caj guaman/penyaksian yang disahkan oleh pemberi pinjam',
      interestBase: 'Baki pembiayaan yang disahkan',
      exampleInterest: 'Faedah rata tahunan 8% × baki pembiayaan yang disahkan × 12/12',
      exampleInstallments: '12 ansuran sama rata — jumlah tepat menunggu jadual bayaran balik yang ditandatangani oleh pemberi pinjam',
      exampleTotalRepaid: 'Menunggu jadual bayaran balik yang ditandatangani dan penilaian fi pemberi pinjam',
      exampleApr: 'Akan dikira berdasarkan RM5,000 tunai diterima; ia tidak boleh melebihi 18%',
      upfrontFees: 'Tiada fi dikutip terlebih dahulu. Caj yang disahkan ditambah kepada baki pembiayaan.',
    },
    cn: {
      loanAmount: '可提供的金额仅限于经核实APR不超过18%的组合。在费用验证完成前，不公布RM500最低金额。',
      repaymentPeriod: '可提供的期限仅限于经核实APR不超过18%的组合。在费用验证完成前，不公布六个月最低期限。',
      maximumApr: '最高年利率（APR）为18%。',
      flatRate: '固定利率每年8%起，须通过信贷评估并获得贷款机构批准。',
      stampDuty: '每RM1,000或不足RM1,000的部分征收RM5，并按贷款机构实际协议金额评定。确切金额须由贷款机构确认；不预设为RM25。',
      legalCharge: '贷款机构记录的法律或见证费用。由于各贷款机构并无统一固定费用，确切金额须由贷款机构确认。',
      exampleCashReceived: 'RM5,000',
      exampleTerm: '12个月',
      financedBalance: 'RM5,000加上贷款机构确认的印花税及法律／见证费用',
      interestBase: '经确认的融资余额',
      exampleInterest: '每年8%固定利率 × 经确认的融资余额 × 12/12',
      exampleInstallments: '12期等额还款——确切金额以贷款机构签署的还款表为准',
      exampleTotalRepaid: '等待贷款机构签署的还款表及费用评估',
      exampleApr: '按实际收到的RM5,000计算；不得超过18%',
      upfrontFees: '不预先收取任何费用。经确认的费用将计入融资余额。',
    },
  },
} satisfies {
  costsPublished: boolean;
  applicationsEnabled: boolean;
  appointmentEnquiriesEnabled: boolean;
  verifiedTerms: Record<SiteLocale, PublishedLoanTerms>;
};

type ComplianceCopy = {
  heading: string;
  intro: string;
  loanAmountLabel: string;
  repaymentLabel: string;
  maximumAprLabel: string;
  flatRateLabel: string;
  exampleHeading: string;
  cashReceivedLabel: string;
  termLabel: string;
  stampDutyLabel: string;
  legalChargeLabel: string;
  financedBalanceLabel: string;
  interestBaseLabel: string;
  interestLabel: string;
  installmentsLabel: string;
  totalLabel: string;
  aprLabel: string;
  upfrontFeesLabel: string;
  identityHeading: string;
  legalNameLabel: string;
  relationshipLabel: string;
  serviceModelLabel: string;
  licenceLabel: string;
  permitLabel: string;
  addressLabel: string;
  pendingValue: string;
  costsButton: string;
  applicationPaused: string;
  correctedHomeHeading: string;
  correctedHomeDescription: string;
  correctedEligibilityTitle: string;
  correctedEligibilityDescription: string;
  generalDisclaimer: string;
  readyDescription: string;
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
    flatRateLabel: 'Flat interest rate',
    exampleHeading: 'Representative example pending lender confirmation',
    cashReceivedLabel: 'Cash received',
    termLabel: 'Term',
    stampDutyLabel: 'Stamp duty',
    legalChargeLabel: 'Legal / witnessing charge',
    financedBalanceLabel: 'Financed balance',
    interestBaseLabel: 'Interest calculation base',
    interestLabel: 'Interest calculation',
    installmentsLabel: '12 instalments',
    totalLabel: 'Total repaid',
    aprLabel: 'APR against cash received',
    upfrontFeesLabel: 'Upfront fees',
    identityHeading: 'Lender and service identity',
    legalNameLabel: 'Registered lender legal name',
    relationshipLabel: 'Relationship to Metro Pinjaman Berlesen',
    serviceModelLabel: 'Direct lender or enquiry service',
    licenceLabel: 'Moneylender licence number and validity',
    permitLabel: 'Advertising permit number and validity',
    addressLabel: 'Business address',
    pendingValue: 'Awaiting lender verification — not currently published',
    costsButton: 'Loan costs',
    applicationPaused: 'Applications paused',
    correctedHomeHeading: 'Personal loans for eligible applicants',
    correctedHomeDescription: 'Personal loans may be used for major expenses, short-term cash needs or debt consolidation. Eligibility and final terms are subject to income, document and lender checks.',
    correctedEligibilityTitle: 'For eligible Malaysian applicants',
    correctedEligibilityDescription: 'Personal-loan applicants must be Malaysian, have a steady source of income and earn at least RM3,000 per month.',
    generalDisclaimer: 'The maximum APR and representative example are disclosed on the Personal Loan page. Final terms remain subject to eligibility, document verification and lender approval.',
    readyDescription: `Contact us on WhatsApp at ${siteConfig.contact.phone} for general enquiries about personal and business loans.`,
    rateRange: 'Flat interest rates from 8% per annum, subject to credit assessment and lender approval.',
    businessDetails: 'Contact us for business-loan details',
  },
  bm: {
    heading: 'Kos pinjaman peribadi',
    intro: 'Semak tempoh bayaran balik, APR maksimum, fi dan contoh perwakilan sebelum memohon.',
    loanAmountLabel: 'Jumlah pinjaman peribadi',
    repaymentLabel: 'Tempoh bayaran balik minimum dan maksimum',
    maximumAprLabel: 'Kadar Peratusan Tahunan (APR) maksimum',
    flatRateLabel: 'Kadar faedah rata',
    exampleHeading: 'Contoh perwakilan menunggu pengesahan pemberi pinjam',
    cashReceivedLabel: 'Tunai diterima',
    termLabel: 'Tempoh',
    stampDutyLabel: 'Duti setem',
    legalChargeLabel: 'Caj guaman / penyaksian',
    financedBalanceLabel: 'Baki pembiayaan',
    interestBaseLabel: 'Asas pengiraan faedah',
    interestLabel: 'Pengiraan faedah',
    installmentsLabel: '12 ansuran',
    totalLabel: 'Jumlah dibayar balik',
    aprLabel: 'APR berdasarkan tunai diterima',
    upfrontFeesLabel: 'Fi pendahuluan',
    identityHeading: 'Identiti pemberi pinjam dan perkhidmatan',
    legalNameLabel: 'Nama sah pemberi pinjam berdaftar',
    relationshipLabel: 'Hubungan dengan Metro Pinjaman Berlesen',
    serviceModelLabel: 'Pemberi pinjam langsung atau perkhidmatan pertanyaan',
    licenceLabel: 'Nombor dan tempoh sah lesen pemberi pinjam wang',
    permitLabel: 'Nombor dan tempoh sah permit iklan',
    addressLabel: 'Alamat perniagaan',
    pendingValue: 'Menunggu pengesahan pemberi pinjam — belum diterbitkan',
    costsButton: 'Kos pinjaman',
    applicationPaused: 'Permohonan dihentikan sementara',
    correctedHomeHeading: 'Pinjaman peribadi untuk pemohon yang layak',
    correctedHomeDescription: 'Pinjaman peribadi boleh digunakan untuk perbelanjaan utama, keperluan tunai jangka pendek atau penyatuan hutang. Kelayakan dan terma akhir tertakluk pada semakan pendapatan, dokumen dan pemberi pinjam.',
    correctedEligibilityTitle: 'Untuk pemohon Malaysia yang layak',
    correctedEligibilityDescription: 'Pemohon pinjaman peribadi mestilah rakyat Malaysia, mempunyai sumber pendapatan tetap dan berpendapatan sekurang-kurangnya RM3,000 sebulan.',
    generalDisclaimer: 'APR maksimum dan contoh perwakilan dinyatakan di halaman Pinjaman Peribadi. Terma akhir tertakluk pada kelayakan, pengesahan dokumen dan kelulusan pemberi pinjam.',
    readyDescription: `Hubungi kami melalui WhatsApp di ${siteConfig.contact.phone} untuk pertanyaan umum mengenai pinjaman peribadi dan perniagaan.`,
    rateRange: 'Kadar faedah rata bermula daripada 8% setahun, tertakluk pada penilaian kredit dan kelulusan pemberi pinjam.',
    businessDetails: 'Hubungi kami untuk butiran pinjaman perniagaan',
  },
  cn: {
    heading: '个人贷款费用',
    intro: '申请前，请先查看还款期限、最高APR、费用和代表性示例。',
    loanAmountLabel: '个人贷款金额',
    repaymentLabel: '最短和最长还款期限',
    maximumAprLabel: '最高年利率（APR）',
    flatRateLabel: '固定利率',
    exampleHeading: '待贷款机构确认的代表性示例',
    cashReceivedLabel: '实际收到现金',
    termLabel: '期限',
    stampDutyLabel: '印花税',
    legalChargeLabel: '法律／见证费用',
    financedBalanceLabel: '融资余额',
    interestBaseLabel: '利息计算基数',
    interestLabel: '利息计算',
    installmentsLabel: '12期还款',
    totalLabel: '偿还总额',
    aprLabel: '按实际收到现金计算的APR',
    upfrontFeesLabel: '预付费用',
    identityHeading: '贷款机构与服务身份',
    legalNameLabel: '注册贷款机构法定名称',
    relationshipLabel: '与 Metro Pinjaman Berlesen 的关系',
    serviceModelLabel: '直接贷款机构或咨询服务',
    licenceLabel: '放贷人执照号码及有效期',
    permitLabel: '广告准证号码及有效期',
    addressLabel: '营业地址',
    pendingValue: '等待贷款机构核实——目前尚未公布',
    costsButton: '贷款费用',
    applicationPaused: '申请暂时停止',
    correctedHomeHeading: '为符合资格的申请人提供个人贷款',
    correctedHomeDescription: '个人贷款可用于大额开支、短期资金需求或债务整合。申请资格和最终条款须经收入、文件及贷款机构审核。',
    correctedEligibilityTitle: '适用于符合资格的马来西亚申请人',
    correctedEligibilityDescription: '个人贷款申请人必须是马来西亚公民，拥有稳定收入来源，且月薪至少为RM3,000。',
    generalDisclaimer: '最高APR和代表性示例已在个人贷款页面列明。最终条款须视申请资格、文件核实及贷款机构批准而定。',
    readyDescription: `如需咨询个人或商业贷款，请通过 WhatsApp ${siteConfig.contact.phone} 联系我们。`,
    rateRange: '固定利率每年8%起，须通过信贷评估并获得贷款机构批准。',
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

export function personalLoanDisclosureSection(locale: SiteLocale): string {
  const labels = copy[locale];
  const terms = loanComplianceStatus.verifiedTerms[locale];
  const value = (verifiedValue: string) => escapeHtml(verifiedValue);

  return `
    <section id="personal-loan-costs" class="py-12 lg:py-16 bg-teal-50 border-y border-teal-900" aria-labelledby="personal-loan-costs-heading">
      <div class="container mx-auto px-4"><div class="max-w-6xl mx-auto">
        <div class="mb-8"><p class="text-sm font-bold uppercase tracking-wide text-teal-900 mb-2">${escapeHtml(siteConfig.name)}</p><h2 id="personal-loan-costs-heading" class="font-heading text-4xl lg:text-5xl tracking-tight text-teal-900 mb-3">${escapeHtml(labels.heading)}</h2><p class="text-lg text-gray-700">${escapeHtml(labels.intro)}</p></div>
        <div class="grid sm:grid-cols-2 gap-4 mb-8">
          <div class="bg-white rounded-2xl border border-gray-300 p-5"><h3 class="font-semibold text-teal-900 mb-2">${escapeHtml(labels.loanAmountLabel)}</h3><p>${value(terms.loanAmount)}</p></div>
          <div class="bg-white rounded-2xl border border-gray-300 p-5"><h3 class="font-semibold text-teal-900 mb-2">${escapeHtml(labels.repaymentLabel)}</h3><p>${value(terms.repaymentPeriod)}</p></div>
          <div class="bg-white rounded-2xl border-2 border-teal-900 p-5"><h3 class="font-semibold text-teal-900 mb-2">${escapeHtml(labels.maximumAprLabel)}</h3><p>${value(terms.maximumApr)}</p></div>
          <div class="bg-white rounded-2xl border border-gray-300 p-5"><h3 class="font-semibold text-teal-900 mb-2">${escapeHtml(labels.flatRateLabel)}</h3><p>${value(terms.flatRate)}</p></div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-300 p-6"><h3 class="font-heading text-2xl text-teal-900 mb-4">${escapeHtml(labels.exampleHeading)}</h3><dl class="grid sm:grid-cols-2 gap-x-8 gap-y-5"><div><dt class="font-semibold">${escapeHtml(labels.cashReceivedLabel)}</dt><dd>${value(terms.exampleCashReceived)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.termLabel)}</dt><dd>${value(terms.exampleTerm)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.stampDutyLabel)}</dt><dd>${value(terms.stampDuty)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.legalChargeLabel)}</dt><dd>${value(terms.legalCharge)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.financedBalanceLabel)}</dt><dd>${value(terms.financedBalance)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.interestBaseLabel)}</dt><dd>${value(terms.interestBase)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.interestLabel)}</dt><dd>${value(terms.exampleInterest)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.installmentsLabel)}</dt><dd>${value(terms.exampleInstallments)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.totalLabel)}</dt><dd>${value(terms.exampleTotalRepaid)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.aprLabel)}</dt><dd>${value(terms.exampleApr)}</dd></div><div class="sm:col-span-2 rounded-xl bg-lime-50 p-4"><dt class="font-semibold">${escapeHtml(labels.upfrontFeesLabel)}</dt><dd>${value(terms.upfrontFees)}</dd></div></dl></div>
      </div></div>
    </section>`;
}

export function calculateRepresentativeCheck({
  cashReceived,
  stampDuty,
  legalCharge,
  flatAnnualRate,
  termMonths,
}: {
  cashReceived: number;
  stampDuty: number;
  legalCharge: number;
  flatAnnualRate: number;
  termMonths: number;
}) {
  const financedBalance = cashReceived + stampDuty + legalCharge;
  const interest = financedBalance * flatAnnualRate * (termMonths / 12);
  const totalRepaid = financedBalance + interest;
  const installment = totalRepaid / termMonths;

  let low = 0;
  let high = 1;
  for (let iteration = 0; iteration < 100; iteration += 1) {
    const monthlyRate = (low + high) / 2;
    const presentValue = installment * (1 - (1 + monthlyRate) ** -termMonths) / monthlyRate;
    if (presentValue > cashReceived) low = monthlyRate;
    else high = monthlyRate;
  }

  const roundCurrency = (value: number) => Math.round(value * 100) / 100;
  return {
    financedBalance: roundCurrency(financedBalance),
    interest: roundCurrency(interest),
    installment: roundCurrency(installment),
    totalRepaid: roundCurrency(totalRepaid),
    nominalAprPercent: Math.round(((low + high) / 2) * 12 * 10000) / 100,
  };
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
  const disclosureTarget = `/${locale}/personal-loan#personal-loan-costs`;

  const forcedLocalizedCopy: Array<[string, string]> = [
    ['#home-hero-main-heading', labels.correctedHomeHeading],
    ['#home-hero-description', labels.correctedHomeDescription],
    ['#home-why-choose-us-feature-2-title', labels.correctedEligibilityTitle],
    ['#home-why-choose-us-feature-2-description', labels.correctedEligibilityDescription],
    ['#home-ready-to-get-started-description', labels.readyDescription],
    ['#loan-comparison-disclaimer', labels.generalDisclaimer],
    ['#loan-comparison-row-2-personal', labels.rateRange],
    ['#loan-comparison-row-2-business', labels.businessDetails],
    ['#loan-personal-feature-1-title', labels.loanAmountLabel],
    ['#loan-comparison-row-3-personal', loanComplianceStatus.verifiedTerms[locale].loanAmount],
    ['#loan-comparison-row-3-business', labels.businessDetails],
    ['#loan-comparison-row-4-personal', loanComplianceStatus.verifiedTerms[locale].repaymentPeriod],
    ['#loan-comparison-row-4-business', labels.businessDetails],
    ['#loan-interest-rates-feature-1-description', labels.rateRange],
    ['#loan-interest-rates-feature-2-description', loanComplianceStatus.verifiedTerms[locale].repaymentPeriod],
    ['#loan-interest-rates-feature-3-description', loanComplianceStatus.verifiedTerms[locale].loanAmount],
    ['#loan-interest-rates-amount-value', loanComplianceStatus.verifiedTerms[locale].exampleCashReceived],
    ['#loan-interest-rates-example-description', `${loanComplianceStatus.verifiedTerms[locale].exampleTerm}. ${loanComplianceStatus.verifiedTerms[locale].exampleInterest}. ${loanComplianceStatus.verifiedTerms[locale].exampleInstallments}. ${labels.totalLabel}: ${loanComplianceStatus.verifiedTerms[locale].exampleTotalRepaid}. ${labels.aprLabel}: ${loanComplianceStatus.verifiedTerms[locale].exampleApr}.`],
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
  }

  if (!loanComplianceStatus.appointmentEnquiriesEnabled) {
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
  }

  if (!loanComplianceStatus.applicationsEnabled) {
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
