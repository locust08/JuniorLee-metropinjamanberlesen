import { parse } from 'node-html-parser';
import { siteConfig } from '../../config/site.ts';
import type { SitePageId } from '../payload/content.ts';
import type { SiteLocale } from './locale.ts';

export const approvedLoanFigures = {
  minimumAmount: 'RM500', maximumAmount: 'RM100,000', minimumMonths: 6, maximumMonths: 60,
  unsecuredFlatRate: '8%', unsecuredMaximumApr: '18%', securedFlatRate: '4%', securedMaximumAnnualInterest: '12%',
  stampDutyUnit: 'RM5', stampDutyBasis: 'RM1,000', cashReceived: 'RM5,000.00', stampDuty: 'RM30.00',
  financedBalance: 'RM5,030.00', interest: 'RM402.40', installment: 'RM452.70', totalRepaid: 'RM5,432.40',
  borrowingCost: 'RM432.40', otherFees: 'RM0', exampleMonths: 12, firstPaymentDays: 30,
} as const;
const f = approvedLoanFigures;

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
  upfrontFees: string;
  securedRate: string;
  exampleDescription: string;
  disbursement: string;
  borrowingCost: string;
  quotation: string;
};

/** Numerical terms approved for publication from the compliance brief. */
export const loanComplianceStatus = {
  costsPublished: true,
  applicationsEnabled: false,
  appointmentEnquiriesEnabled: true,
  verifiedTerms: {
    en: {
      loanAmount: `Personal loans range from ${f.minimumAmount} to ${f.maximumAmount}, with repayment periods from ${f.minimumMonths} to ${f.maximumMonths} months. Secured and unsecured options are available, subject to credit assessment and approval.`,
      repaymentPeriod: `Minimum repayment period: ${f.minimumMonths} months. Maximum repayment period: ${f.maximumMonths} months. Terms are subject to credit assessment and approval.`,
      maximumApr: `The maximum Annual Percentage Rate (APR) is ${f.unsecuredMaximumApr}, including interest and applicable fees, for unsecured personal and business loans.`,
      flatRate: `Flat interest rates for unsecured personal and business loans start from ${f.unsecuredFlatRate} per annum, subject to credit assessment and approval. Approved flat interest rates and repayment terms must meet the maximum APR ceiling. Your quotation will disclose the approved rate, financed charges, repayment schedule and total repayment.`,
      securedRate: `Flat interest rates for secured loans start from ${f.securedFlatRate} per annum, subject to credit assessment and approval. The maximum annual interest rate is ${f.securedMaximumAnnualInterest}. Your quotation will disclose applicable charges, APR, repayment terms and total repayment.`,
      stampDuty: `${f.stampDutyUnit} per ${f.stampDutyBasis} or part thereof, based on the applicable assessed agreement amount. Stamp duty financed in this example: ${f.stampDuty}.`,
      legalCharge: `${f.otherFees}`,
      exampleTerm: `${f.exampleMonths} months`,
      interestBase: `The entire financed balance: ${f.financedBalance}`,
      exampleInstallments: `${f.exampleMonths} × ${f.installment}`,
      exampleDescription: `For an unsecured personal loan providing ${f.cashReceived} cash received over ${f.exampleMonths} months, ${f.stampDuty} stamp duty is added to the financed balance, bringing it to ${f.financedBalance}. At ${f.unsecuredFlatRate} flat interest per annum, total interest is ${f.interest}. Repayments are ${f.exampleMonths} monthly instalments of ${f.installment}, totalling ${f.totalRepaid}. The first instalment is due ${f.firstPaymentDays} days after disbursement, followed by monthly repayments. Actual loan terms are subject to credit assessment and approval.`,
      upfrontFees: `Legal/witnessing, application, processing/administration and early-settlement fees are ${f.otherFees}. Stamp duty is added to the financed balance rather than deducted from the cash received. Interest is calculated on the entire financed balance.`,
      disbursement: `Eligible applicants may receive funds within 24 hours after all required documents, approval, verification and agreement completion. Timing is not guaranteed.`,
      borrowingCost: `Total borrowing cost: ${f.borrowingCost}. Other specified fees: ${f.otherFees}.`,
      quotation: `Your quotation will show the cash received, itemised financed charges, approved interest rate, APR, repayment schedule and total repayment. Stamp duty is added to the financed balance rather than deducted from the cash received. Review the example above and your quotation before accepting the loan.`,
      exampleCashReceived: `${f.cashReceived}`,
      financedBalance: `${f.financedBalance}`,
      exampleInterest: `${f.interest}`,
      exampleTotalRepaid: `${f.totalRepaid}`,
    },
    bm: {
      loanAmount: `Pinjaman peribadi antara ${f.minimumAmount} hingga ${f.maximumAmount}, dengan tempoh bayaran balik antara ${f.minimumMonths} hingga ${f.maximumMonths} bulan. Pilihan bercagar dan tanpa cagaran tersedia, tertakluk kepada penilaian kredit dan kelulusan.`,
      repaymentPeriod: `Tempoh bayaran balik minimum: ${f.minimumMonths} bulan. Tempoh bayaran balik maksimum: ${f.maximumMonths} bulan. Terma tertakluk kepada penilaian kredit dan kelulusan.`,
      maximumApr: `Kadar Peratusan Tahunan (APR) maksimum ialah ${f.unsecuredMaximumApr}, termasuk faedah dan fi yang berkenaan, bagi pinjaman peribadi dan perniagaan tanpa cagaran.`,
      flatRate: `Kadar faedah rata bagi pinjaman peribadi dan perniagaan tanpa cagaran bermula daripada ${f.unsecuredFlatRate} setahun, tertakluk kepada penilaian kredit dan kelulusan. Kadar faedah rata dan terma bayaran balik yang diluluskan mesti mematuhi had APR maksimum. Sebut harga anda akan menyatakan kadar diluluskan, caj yang dibiayai, jadual bayaran balik dan jumlah bayaran balik.`,
      securedRate: `Kadar faedah rata bagi pinjaman bercagar bermula daripada ${f.securedFlatRate} setahun, tertakluk kepada penilaian kredit dan kelulusan. Kadar faedah tahunan maksimum ialah ${f.securedMaximumAnnualInterest}. Sebut harga anda akan menyatakan caj berkenaan, APR, terma dan jumlah bayaran balik.`,
      stampDuty: `${f.stampDutyUnit} bagi setiap ${f.stampDutyBasis} atau sebahagiannya, berdasarkan jumlah perjanjian yang ditaksir. Duti setem yang dibiayai dalam contoh ini: ${f.stampDuty}.`,
      legalCharge: `${f.otherFees}`,
      exampleTerm: `${f.exampleMonths} bulan`,
      interestBase: `Keseluruhan baki pembiayaan: ${f.financedBalance}`,
      exampleInstallments: `${f.exampleMonths} × ${f.installment}`,
      exampleDescription: `Bagi pinjaman peribadi tanpa cagaran dengan tunai diterima ${f.cashReceived} selama ${f.exampleMonths} bulan, duti setem ${f.stampDuty} ditambah kepada baki pembiayaan menjadi ${f.financedBalance}. Pada faedah rata ${f.unsecuredFlatRate} setahun, jumlah faedah ialah ${f.interest}. Bayaran balik ialah ${f.exampleMonths} ansuran bulanan sebanyak ${f.installment}, berjumlah ${f.totalRepaid}. Ansuran pertama perlu dibayar ${f.firstPaymentDays} hari selepas penyaluran dana, diikuti bayaran bulanan. Terma sebenar tertakluk kepada penilaian kredit dan kelulusan.`,
      upfrontFees: `Fi guaman/penyaksian, permohonan, pemprosesan/pentadbiran dan penyelesaian awal ialah ${f.otherFees}. Duti setem ditambah kepada baki pembiayaan, bukan ditolak daripada tunai diterima. Faedah dikira atas keseluruhan baki pembiayaan.`,
      disbursement: `Pemohon yang layak mungkin menerima dana dalam masa 24 jam selepas semua dokumen yang diperlukan, kelulusan, pengesahan dan penyempurnaan perjanjian selesai. Tempoh ini tidak dijamin.`,
      borrowingCost: `Jumlah kos pinjaman: ${f.borrowingCost}. Fi lain yang dinyatakan: ${f.otherFees}.`,
      quotation: `Sebut harga anda akan menunjukkan tunai diterima, pecahan caj yang dibiayai, kadar faedah diluluskan, APR, jadual dan jumlah bayaran balik. Duti setem ditambah kepada baki pembiayaan, bukan ditolak daripada tunai diterima. Semak contoh di atas dan sebut harga sebelum menerima pinjaman.`,
      exampleCashReceived: `${f.cashReceived}`,
      financedBalance: `${f.financedBalance}`,
      exampleInterest: `${f.interest}`,
      exampleTotalRepaid: `${f.totalRepaid}`,
    },
    cn: {
      loanAmount: `个人贷款金额从${f.minimumAmount}至${f.maximumAmount}，还款期限为${f.minimumMonths}至${f.maximumMonths}个月。提供有抵押及无抵押选项，须经过信用评估及批准。`,
      repaymentPeriod: `最短还款期限：${f.minimumMonths}个月。最长还款期限：${f.maximumMonths}个月。条款须经过信用评估及批准。`,
      maximumApr: `无抵押个人及商业贷款的最高年百分率（APR）为${f.unsecuredMaximumApr}，包括利息及适用费用。`,
      flatRate: `无抵押个人及商业贷款的平息利率每年${f.unsecuredFlatRate}起，须经过信用评估及批准。获批平息利率及还款条款必须符合最高APR限制。报价将列明获批利率、计入融资的费用、还款安排及偿还总额。`,
      securedRate: `有抵押贷款的平息利率每年${f.securedFlatRate}起，须经过信用评估及批准。最高年度利息率为${f.securedMaximumAnnualInterest}。报价将列明适用费用、APR、还款条款及偿还总额。`,
      stampDuty: `按适用的已评定协议金额，每${f.stampDutyBasis}或不足该金额的部分收取${f.stampDutyUnit}。本例计入融资的印花税：${f.stampDuty}。`,
      legalCharge: `${f.otherFees}`,
      exampleTerm: `${f.exampleMonths}个月`,
      interestBase: `全部融资余额：${f.financedBalance}`,
      exampleInstallments: `${f.exampleMonths} × ${f.installment}`,
      exampleDescription: `本无抵押个人贷款示例实际收到现金${f.cashReceived}，期限为${f.exampleMonths}个月。印花税${f.stampDuty}计入融资余额，使其达到${f.financedBalance}。按每年${f.unsecuredFlatRate}平息利率计算，总利息为${f.interest}。分${f.exampleMonths}期每月偿还${f.installment}，偿还总额为${f.totalRepaid}。首期于放款后${f.firstPaymentDays}天到期，其后按月偿还。实际贷款条款须经过信用评估及批准。`,
      upfrontFees: `法律/见证、申请、处理/行政及提前结清费用均为${f.otherFees}。印花税计入融资余额，不从实际收到的现金中扣除。利息按全部融资余额计算。`,
      disbursement: `符合资格的申请人可能在所有所需文件、批准、核实及协议签署完成后24小时内收到款项。时间不作保证。`,
      borrowingCost: `总借款成本：${f.borrowingCost}。其他列明费用：${f.otherFees}。`,
      quotation: `报价将列明实际收到现金、计入融资的费用明细、获批利率、APR、还款安排及偿还总额。印花税计入融资余额，不从实际收到现金中扣除。接受贷款前请查看上方示例及您的报价。`,
      exampleCashReceived: `${f.cashReceived}`,
      financedBalance: `${f.financedBalance}`,
      exampleInterest: `${f.interest}`,
      exampleTotalRepaid: `${f.totalRepaid}`,
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
    maximumAprLabel: 'Maximum APR — unsecured loans',
    flatRateLabel: 'Unsecured personal and business loans',
    exampleHeading: 'Representative example — unsecured personal loan',
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
    maximumAprLabel: 'APR maksimum — pinjaman tanpa cagaran',
    flatRateLabel: 'Pinjaman peribadi dan perniagaan tanpa cagaran',
    exampleHeading: 'Contoh perwakilan — pinjaman peribadi tanpa cagaran',
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
    maximumAprLabel: '最高年百分率（APR）——无抵押贷款',
    flatRateLabel: '无抵押个人及商业贷款',
    exampleHeading: '代表性示例——无抵押个人贷款',
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
        <div class="bg-white rounded-2xl border border-gray-300 p-5 mb-8"><h3 class="font-semibold text-teal-900 mb-2">${escapeHtml({ en: "Secured loans", bm: "Pinjaman bercagar", cn: "有抵押贷款" }[locale])}</h3><p>${value(terms.securedRate)}</p></div>
        <div class="bg-white rounded-2xl border border-gray-300 p-6"><p class="mb-5">${value(terms.exampleDescription)}</p><h3 class="font-heading text-2xl text-teal-900 mb-4">${escapeHtml(labels.exampleHeading)}</h3><dl class="grid sm:grid-cols-2 gap-x-8 gap-y-5"><div><dt class="font-semibold">${escapeHtml(labels.cashReceivedLabel)}</dt><dd>${value(terms.exampleCashReceived)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.termLabel)}</dt><dd>${value(terms.exampleTerm)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.stampDutyLabel)}</dt><dd>${value(terms.stampDuty)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.legalChargeLabel)}</dt><dd>${value(terms.legalCharge)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.financedBalanceLabel)}</dt><dd>${value(terms.financedBalance)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.interestBaseLabel)}</dt><dd>${value(terms.interestBase)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.interestLabel)}</dt><dd>${value(terms.exampleInterest)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.installmentsLabel)}</dt><dd>${value(terms.exampleInstallments)}</dd></div><div><dt class="font-semibold">${escapeHtml(labels.totalLabel)}</dt><dd>${value(terms.exampleTotalRepaid)}</dd></div><div><dt class="font-semibold">${escapeHtml({ en: "Total borrowing cost", bm: "Jumlah kos pinjaman", cn: "总借款成本" }[locale])}</dt><dd>${value(terms.borrowingCost)}</dd></div><div class="sm:col-span-2 rounded-xl bg-lime-50 p-4"><dt class="font-semibold">${escapeHtml({ en: "Fees and financed costs", bm: "Fi dan kos yang dibiayai", cn: "费用及融资成本" }[locale])}</dt><dd>${value(terms.upfrontFees)}</dd></div></dl></div>
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
    ['#loan-comparison-disclaimer', { en: 'Review the loan-cost example below. Final terms are subject to credit assessment and approval.', bm: 'Semak contoh kos pinjaman di bawah. Terma akhir tertakluk kepada penilaian kredit dan kelulusan.', cn: '请查看下方贷款费用示例。最终条款须经过信用评估及批准。' }[locale]],
    ['#loan-comparison-row-2-personal', `${loanComplianceStatus.verifiedTerms[locale].flatRate} ${loanComplianceStatus.verifiedTerms[locale].maximumApr} ${loanComplianceStatus.verifiedTerms[locale].securedRate}`],
    ['#loan-comparison-row-2-business', `${loanComplianceStatus.verifiedTerms[locale].flatRate} ${loanComplianceStatus.verifiedTerms[locale].maximumApr}`],
    ['#loan-personal-feature-1-title', labels.loanAmountLabel],
    ['#loan-comparison-row-3-personal', loanComplianceStatus.verifiedTerms[locale].loanAmount],
    ['#loan-comparison-row-3-business', { en: 'Business-loan amount limits have not been separately confirmed. Contact us for a quotation.', bm: 'Had jumlah pinjaman perniagaan belum disahkan secara berasingan. Hubungi kami untuk sebut harga.', cn: '商业贷款金额限制尚未单独确认。请联系我们索取报价。' }[locale]],
    ['#loan-comparison-row-4-personal', loanComplianceStatus.verifiedTerms[locale].repaymentPeriod],
    ['#loan-comparison-row-4-business', { en: 'Business-loan repayment periods have not been separately confirmed. Contact us for a quotation.', bm: 'Tempoh bayaran balik pinjaman perniagaan belum disahkan secara berasingan. Hubungi kami untuk sebut harga.', cn: '商业贷款还款期限尚未单独确认。请联系我们索取报价。' }[locale]],
    ['#loan-interest-rates-feature-1-description', labels.rateRange],
    ['#loan-interest-rates-feature-2-description', loanComplianceStatus.verifiedTerms[locale].repaymentPeriod],
    ['#loan-interest-rates-feature-3-description', loanComplianceStatus.verifiedTerms[locale].loanAmount],
    ['#loan-interest-rates-amount-value', loanComplianceStatus.verifiedTerms[locale].exampleCashReceived],
    ['#loan-interest-rates-example-description', loanComplianceStatus.verifiedTerms[locale].exampleDescription],
  ];
  if (pageId === 'loan') {
    const section = root.querySelector('#interest-rate');
    section?.set_content(personalLoanDisclosureSection(locale));
  }
  if (pageId === 'contactUs') {
    root.querySelector('#contact-form-heading')?.closest('section')?.insertAdjacentHTML('beforebegin', personalLoanDisclosureSection(locale));
    if (locale === 'cn') {
      replaceElementText(root.querySelector('#contact-faq-2-answer'), loanComplianceStatus.verifiedTerms[locale].disbursement);
      root.querySelector('#contact-faq-heading')?.closest('section')?.insertAdjacentHTML('beforeend', `<div class="max-w-4xl mx-auto px-6 py-8"><h3 class="font-semibold mb-3">我会收到多少款项，需要偿还多少？</h3><p>${escapeHtml(loanComplianceStatus.verifiedTerms[locale].quotation)}</p></div>`);
    }
  }
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
