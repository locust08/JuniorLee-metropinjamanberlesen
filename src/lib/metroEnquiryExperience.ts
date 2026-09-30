import { parse } from 'node-html-parser';
import { siteConfig } from '../../config/site.ts';
import type { SitePageId } from '../payload/content.ts';
import type { SiteLocale } from './locale.ts';

type ExperienceCopy = {
  headline: string;
  supporting: string;
  whatsappLabel: string;
  benefitsHeading: string;
  benefits: Array<{ title: string; description: string }>;
  processHeading: string;
  processIntro: string;
  steps: Array<{ title: string; description: string }>;
  processNote: string;
  anytime: string;
  staffedHours: string;
  officeHeading: string;
  officeBody: string;
  mapLabel: string;
  photoPending: string;
  trustHeading: string;
  legalName: string;
  licence: string;
  permit: string;
  verificationPending: string;
  faqHeading: string;
  faqIntro: string;
  faqs: Array<{ question: string; answer: string }>;
};

const experienceCopy: Record<'en' | 'bm', ExperienceCopy> = {
  en: {
    headline: 'Quick loan enquiries. Clear costs. Personal assistance.',
    supporting: 'Start your eligibility enquiry on WhatsApp with your MyKad. For eligible products and service areas, eligible applicants may receive loan funds in as little as 24 hours after Metro receives all required documents, subject to credit assessment, approval, verification and completion of the loan agreement. Our team will confirm whether the timeframe applies to your enquiry.',
    whatsappLabel: 'Check Eligibility on WhatsApp',
    benefitsHeading: 'A clearer way to start your loan enquiry',
    benefits: [
      { title: 'Potential funding within 24 hours', description: 'For eligible applicants and supported products or service areas. The timeframe starts after all required documents are received and remains subject to assessment and approval.' },
      { title: 'Simple initial enquiry', description: 'Start with your MyKad; our team will explain any additional documents needed. A MyKad starts the enquiry—it does not guarantee approval.' },
      { title: 'Clear repayment costs', description: 'Understand your instalments, interest, applicable charges and total repayment before agreeing.' },
      { title: 'Real people, real office', description: 'Speak with our team on WhatsApp or arrange a visit to our Kuala Lumpur office.' },
    ],
    processHeading: 'Three clear steps',
    processIntro: 'An initial eligibility enquiry is not final loan approval. We will explain each required step before you agree.',
    steps: [
      { title: 'Contact us on WhatsApp', description: 'Tell us whether you need a personal or business loan, your requested amount, and your preferred contact time.' },
      { title: 'Check eligibility and review your quotation', description: 'Our team explains the requirements and provides the proposed repayment details following assessment.' },
      { title: 'Complete the agreement and receive funds', description: 'Approved applicants complete the required agreement and verification before disbursement.' },
    ],
    processNote: 'Contact us early so our team can begin reviewing your enquiry sooner. Approval and disbursement times depend on your application and completion of the required steps.',
    anytime: 'Send an enquiry anytime on WhatsApp.',
    staffedHours: 'Staffed response hours: awaiting lender confirmation. Messages received outside staffed hours will be answered when the team is available.',
    officeHeading: 'Visit our Kuala Lumpur office',
    officeBody: 'Contact us on WhatsApp to arrange your visit and confirm the documents to bring.',
    mapLabel: 'Open in Google Maps',
    photoPending: 'Verified office photographs are awaiting supply by Metro and are not represented by stock imagery.',
    trustHeading: 'Lender and licence details',
    legalName: 'Exact registered legal name',
    licence: 'Current moneylender licence number and validity',
    permit: 'Current advertising-permit number and validity',
    verificationPending: 'Awaiting lender verification — not currently published',
    faqHeading: 'Loan enquiry FAQs',
    faqIntro: 'Answers explain the enquiry stage separately from assessment, approval and disbursement.',
    faqs: [
      { question: 'Can I receive funds within 24 hours?', answer: 'Potentially, for eligible applicants using products and service areas that support this timeframe. The 24-hour period starts after Metro receives all required documents. Credit assessment, approval, verification and completion of the loan agreement are still required, so timing is not guaranteed.' },
      { question: 'Can I start with my MyKad?', answer: 'Yes. Your MyKad is enough to start an eligibility enquiry. It is not an “IC-only” approval promise; our team will explain any additional documents needed before assessment can be completed.' },
      { question: 'What additional documents might be required?', answer: 'For a personal loan, these may include recent payslips, bank statements, utility bills, an EPF statement and supporting property or tenancy documents where applicable. Requirements depend on your circumstances and the lender’s assessment.' },
      { question: 'Am I eligible with a monthly salary of RM3,000?', answer: 'RM3,000 is the stated minimum monthly salary for a personal-loan enquiry, together with a steady source of income and Malaysian eligibility. Meeting this threshold lets you enquire but does not guarantee approval or a particular loan amount.' },
      { question: 'How much will I receive and repay?', answer: 'Your quotation will show the cash received, any charges added to the financed balance, interest, monthly instalment, tenure, total repayment and APR. Review these figures before agreeing; confirmed financed charges are included in repayment.' },
      { question: 'Can I visit your office?', answer: `Yes. The office is at ${siteConfig.contact.address}. Contact us on WhatsApp first to arrange your visit and confirm the documents to bring.` },
      { question: 'What documents are needed for a business loan?', answer: 'Business applicants receive a separate checklist. Depending on the business and assessment, it may include the applicant’s MyKad, business registration documents, relevant statutory forms, recent business bank statements, utility bills, EPF records and other financial or supporting documents.' },
    ],
  },
  bm: {
    headline: 'Pertanyaan pinjaman pantas. Kos jelas. Bantuan peribadi.',
    supporting: 'Mulakan pertanyaan kelayakan melalui WhatsApp dengan MyKad anda. Bagi produk dan kawasan perkhidmatan yang layak, pemohon yang layak berpeluang menerima dana pinjaman dalam masa seawal 24 jam selepas Metro menerima semua dokumen yang diperlukan, tertakluk pada penilaian kredit, kelulusan, pengesahan dan penyempurnaan perjanjian pinjaman. Pasukan kami akan mengesahkan sama ada tempoh ini terpakai untuk pertanyaan anda.',
    whatsappLabel: 'Semak Kelayakan di WhatsApp',
    benefitsHeading: 'Cara yang lebih jelas untuk memulakan pertanyaan pinjaman',
    benefits: [
      { title: 'Potensi dana dalam masa 24 jam', description: 'Untuk pemohon serta produk atau kawasan perkhidmatan yang layak. Tempoh bermula selepas semua dokumen yang diperlukan diterima dan masih tertakluk pada penilaian serta kelulusan.' },
      { title: 'Pertanyaan awal yang mudah', description: 'Mulakan dengan MyKad anda; pasukan kami akan menerangkan dokumen tambahan yang diperlukan. MyKad memulakan pertanyaan—ia bukan jaminan kelulusan.' },
      { title: 'Kos bayaran balik yang jelas', description: 'Fahami ansuran, faedah, caj yang berkenaan dan jumlah bayaran balik sebelum bersetuju.' },
      { title: 'Pasukan sebenar, pejabat sebenar', description: 'Berbual dengan pasukan kami melalui WhatsApp atau aturkan lawatan ke pejabat Kuala Lumpur kami.' },
    ],
    processHeading: 'Tiga langkah yang jelas',
    processIntro: 'Pertanyaan kelayakan awal bukan kelulusan pinjaman muktamad. Kami akan menerangkan setiap langkah yang diperlukan sebelum anda bersetuju.',
    steps: [
      { title: 'Hubungi kami melalui WhatsApp', description: 'Beritahu kami sama ada anda memerlukan pinjaman peribadi atau perniagaan, jumlah yang diminta dan masa pilihan untuk dihubungi.' },
      { title: 'Semak kelayakan dan teliti sebut harga anda', description: 'Pasukan kami menerangkan keperluan dan memberikan butiran cadangan bayaran balik selepas penilaian.' },
      { title: 'Lengkapkan perjanjian dan terima dana', description: 'Pemohon yang diluluskan melengkapkan perjanjian dan pengesahan yang diperlukan sebelum penyaluran dana.' },
    ],
    processNote: 'Hubungi kami lebih awal supaya pasukan kami boleh mula menyemak pertanyaan anda dengan lebih cepat. Masa kelulusan dan penyaluran bergantung pada permohonan anda serta penyempurnaan langkah yang diperlukan.',
    anytime: 'Hantar pertanyaan pada bila-bila masa melalui WhatsApp.',
    staffedHours: 'Waktu respons petugas: menunggu pengesahan pemberi pinjam. Mesej di luar waktu petugas akan dijawab apabila pasukan tersedia.',
    officeHeading: 'Kunjungi pejabat Kuala Lumpur kami',
    officeBody: 'Hubungi kami melalui WhatsApp untuk mengatur lawatan anda dan mengesahkan dokumen yang perlu dibawa.',
    mapLabel: 'Buka di Google Maps',
    photoPending: 'Foto pejabat yang disahkan masih menunggu bekalan daripada Metro dan tidak digantikan dengan imej stok.',
    trustHeading: 'Butiran pemberi pinjam dan lesen',
    legalName: 'Nama sah berdaftar yang tepat',
    licence: 'Nombor dan tempoh sah lesen pemberi pinjam wang semasa',
    permit: 'Nombor dan tempoh sah permit iklan semasa',
    verificationPending: 'Menunggu pengesahan pemberi pinjam — belum diterbitkan',
    faqHeading: 'Soalan lazim pertanyaan pinjaman',
    faqIntro: 'Jawapan membezakan peringkat pertanyaan daripada penilaian, kelulusan dan penyaluran dana.',
    faqs: [
      { question: 'Bolehkah saya menerima dana dalam masa 24 jam?', answer: 'Berpotensi, untuk pemohon yang layak serta produk dan kawasan perkhidmatan yang menyokong tempoh ini. Tempoh 24 jam bermula selepas Metro menerima semua dokumen yang diperlukan. Penilaian kredit, kelulusan, pengesahan dan penyempurnaan perjanjian masih diperlukan, jadi tempoh tersebut tidak dijamin.' },
      { question: 'Bolehkah saya bermula dengan MyKad?', answer: 'Ya. MyKad anda memadai untuk memulakan pertanyaan kelayakan. Ini bukan janji kelulusan “IC sahaja”; pasukan kami akan menerangkan dokumen tambahan yang diperlukan sebelum penilaian boleh diselesaikan.' },
      { question: 'Apakah dokumen tambahan yang mungkin diperlukan?', answer: 'Untuk pinjaman peribadi, dokumen mungkin termasuk slip gaji terkini, penyata bank, bil utiliti, penyata KWSP dan dokumen hartanah atau sewaan jika berkenaan. Keperluan bergantung pada keadaan anda dan penilaian pemberi pinjam.' },
      { question: 'Adakah saya layak dengan gaji bulanan RM3,000?', answer: 'RM3,000 ialah gaji bulanan minimum yang dinyatakan untuk pertanyaan pinjaman peribadi, bersama sumber pendapatan tetap dan kelayakan sebagai rakyat Malaysia. Memenuhi ambang ini membolehkan anda membuat pertanyaan tetapi tidak menjamin kelulusan atau jumlah pinjaman tertentu.' },
      { question: 'Berapakah jumlah yang akan saya terima dan bayar balik?', answer: 'Sebut harga anda akan menunjukkan tunai diterima, sebarang caj yang ditambah pada baki pembiayaan, faedah, ansuran bulanan, tempoh, jumlah bayaran balik dan APR. Semak angka ini sebelum bersetuju; caj pembiayaan yang disahkan termasuk dalam bayaran balik.' },
      { question: 'Bolehkah saya mengunjungi pejabat anda?', answer: `Ya. Pejabat terletak di ${siteConfig.contact.address}. Hubungi kami melalui WhatsApp terlebih dahulu untuk mengatur lawatan dan mengesahkan dokumen yang perlu dibawa.` },
      { question: 'Apakah dokumen yang diperlukan untuk pinjaman perniagaan?', answer: 'Pemohon perniagaan menerima senarai semak berasingan. Bergantung pada perniagaan dan penilaian, dokumen mungkin termasuk MyKad pemohon, dokumen pendaftaran perniagaan, borang berkanun yang berkaitan, penyata bank perniagaan terkini, bil utiliti, rekod KWSP serta dokumen kewangan atau sokongan lain.' },
    ],
  },
};

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function replaceText(root: ReturnType<typeof parse>, selector: string, value: string): void {
  const element = root.querySelector(selector);
  if (!element) return;
  element.querySelectorAll('[x-text]').forEach((child) => child.removeAttribute('x-text'));
  element.textContent = value;
}

function setWhatsAppLink(root: ReturnType<typeof parse>, selector: string, url: string, label: string): void {
  const anchor = root.querySelector(selector);
  if (!anchor) return;
  anchor.setAttribute('href', url);
  anchor.setAttribute('target', '_blank');
  anchor.setAttribute('rel', 'noopener');
  replaceText(root, selector, label);
}

function benefitsSection(labels: ExperienceCopy): string {
  return `<section id="home-key-benefits" class="metro-benefits-section py-12 lg:py-16 bg-white" aria-labelledby="home-key-benefits-heading"><div class="max-w-7xl mx-auto px-6 lg:px-12"><h2 id="home-key-benefits-heading" class="font-heading text-4xl xs:text-5xl tracking-tight mb-8 text-teal-900 text-center">${escapeHtml(labels.benefitsHeading)}</h2><div class="metro-benefits-grid">${labels.benefits.map((benefit, index) => `<article class="metro-benefit-card"><span aria-hidden="true" class="metro-benefit-number">0${index + 1}</span><h3>${escapeHtml(benefit.title)}</h3><p>${escapeHtml(benefit.description)}</p></article>`).join('')}</div></div></section>`;
}

function officeSection(labels: ExperienceCopy): string {
  const trustRows = [[labels.legalName, labels.verificationPending], [labels.licence, labels.verificationPending], [labels.permit, labels.verificationPending]];
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.address)}&output=embed`;
  return `<section id="metro-office-trust" class="metro-office-section py-16 lg:py-24" aria-labelledby="metro-office-heading"><div class="max-w-7xl mx-auto px-6 lg:px-12"><div class="metro-office-grid"><div><p class="metro-section-kicker">Kuala Lumpur</p><h2 id="metro-office-heading" class="font-heading text-5xl tracking-tight text-teal-900 mb-5">${escapeHtml(labels.officeHeading)}</h2><address class="not-italic text-lg text-gray-700 mb-4">${escapeHtml(siteConfig.contact.address)}</address><p class="text-gray-700 mb-6">${escapeHtml(labels.officeBody)}</p><div class="flex flex-wrap gap-3"><a class="metro-primary-link" href="${escapeHtml(siteConfig.social.personalLoanWhatsapp)}" target="_blank" rel="noopener">${escapeHtml(labels.whatsappLabel)}</a><a class="metro-secondary-link" href="${escapeHtml(siteConfig.contact.googleMapsUrl)}" target="_blank" rel="noopener">${escapeHtml(labels.mapLabel)}</a></div><div class="metro-hours-panel"><strong>${escapeHtml(labels.anytime)}</strong><span>${escapeHtml(labels.staffedHours)}</span></div><p class="metro-photo-note">${escapeHtml(labels.photoPending)}</p></div><div class="metro-trust-card"><h3>${escapeHtml(labels.trustHeading)}</h3><dl>${trustRows.map(([term, value]) => `<div><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}<div><dt>${escapeHtml(labels.officeHeading)}</dt><dd>${escapeHtml(siteConfig.contact.address)}</dd></div></dl><p>${escapeHtml(labels.photoPending)}</p></div></div><div class="metro-office-map"><iframe title="${escapeHtml(labels.officeHeading)}" src="${escapeHtml(mapEmbedUrl)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div></div></section>`;
}

function faqSection(labels: ExperienceCopy): string {
  return `<div class="max-w-4xl mx-auto px-6 lg:px-12"><div class="text-center mb-10"><h2 id="contact-faq-heading" class="font-heading text-5xl tracking-tight mb-4 text-teal-900">${escapeHtml(labels.faqHeading)}</h2><p id="contact-faq-description" class="text-lg text-gray-600">${escapeHtml(labels.faqIntro)}</p></div><div class="metro-faq-list">${labels.faqs.map((faq, index) => `<details class="metro-faq-item" ${index === 0 ? 'open' : ''}><summary id="contact-faq-${index + 1}-question">${escapeHtml(faq.question)}</summary><p id="contact-faq-${index + 1}-answer">${escapeHtml(faq.answer)}</p></details>`).join('')}</div></div>`;
}

export function applyMetroEnquiryExperience(html: string, locale: SiteLocale, pageId: SitePageId): string {
  if (locale !== 'en' && locale !== 'bm') return html;
  const root = parse(html, { blockTextElements: { script: true, style: true, pre: true, noscript: true } });
  const labels = experienceCopy[locale];

  ['#site-header-apply-now-label', '#site-header-mobile-drawer-primary-apply-now-label', '#site-header-mobile-drawer-secondary-apply-now-label'].forEach((selector) => {
    setWhatsAppLink(root, selector, siteConfig.social.personalLoanWhatsapp, labels.whatsappLabel);
  });

  root.querySelectorAll('#site-footer-business-hours').forEach((element) => { element.textContent = labels.staffedHours; });

  if (pageId === 'home') {
    replaceText(root, '#home-hero-main-heading', labels.headline);
    replaceText(root, '#home-hero-description', labels.supporting);
    setWhatsAppLink(root, '#home-hero-primary-button-label', siteConfig.social.personalLoanWhatsapp, labels.whatsappLabel);
    setWhatsAppLink(root, '#home-ready-to-get-started-apply-label', siteConfig.social.personalLoanWhatsapp, labels.whatsappLabel);
    setWhatsAppLink(root, '#home-ready-to-get-started-whatsapp-label', siteConfig.social.businessLoanWhatsapp, labels.whatsappLabel);
    replaceText(root, '#home-ready-to-get-started-description', `${labels.anytime} ${labels.staffedHours}`);

    labels.steps.forEach((step, index) => {
      replaceText(root, `#home-how-it-works-step-${index + 1}-title`, step.title);
      replaceText(root, `#home-how-it-works-step-${index + 1}-description`, step.description);
    });
    replaceText(root, '#home-how-it-works-heading', labels.processHeading);
    replaceText(root, '#home-how-it-works-description', labels.processIntro);
    const processGrid = root.querySelector('#home-how-it-works-heading')?.closest('section')?.querySelector('.grid');
    processGrid?.insertAdjacentHTML('afterend', `<p class="metro-process-note">${escapeHtml(labels.processNote)}</p>`);

    const heroSection = root.querySelector('#home-hero-main-heading')?.closest('section');
    heroSection?.insertAdjacentHTML('afterend', benefitsSection(labels));
    const readySection = root.querySelector('#home-ready-to-get-started-heading')?.closest('section');
    readySection?.insertAdjacentHTML('beforebegin', officeSection(labels));
  }

  if (pageId === 'loan') {
    setWhatsAppLink(root, '#loan-hero-primary-button-label', siteConfig.social.personalLoanWhatsapp, labels.whatsappLabel);
    setWhatsAppLink(root, '#loan-personal-apply-label', siteConfig.social.personalLoanWhatsapp, labels.whatsappLabel);
    setWhatsAppLink(root, '#loan-personal-whatsapp-label', siteConfig.social.personalLoanWhatsapp, labels.whatsappLabel);
    setWhatsAppLink(root, '#loan-business-apply-label', siteConfig.social.businessLoanWhatsapp, labels.whatsappLabel);
    setWhatsAppLink(root, '#loan-business-whatsapp-label', siteConfig.social.businessLoanWhatsapp, labels.whatsappLabel);
  }

  if (pageId === 'howToApply') {
    labels.steps.forEach((step, index) => {
      replaceText(root, `#how-to-apply-step-${index + 1}-title`, step.title);
      replaceText(root, `#how-to-apply-step-${index + 1}-description`, step.description);
    });
    replaceText(root, '#how-to-apply-steps-heading', labels.processHeading);
    replaceText(root, '#how-to-apply-steps-description', labels.processIntro);
    root.querySelector('#how-to-apply-steps-heading')?.closest('section')?.querySelector('.grid')?.insertAdjacentHTML('afterend', `<p class="metro-process-note">${escapeHtml(labels.processNote)}</p>`);
    setWhatsAppLink(root, '#how-to-apply-hero-primary-button-label', siteConfig.social.personalLoanWhatsapp, labels.whatsappLabel);
    setWhatsAppLink(root, '#how-to-apply-ready-whatsapp-label', siteConfig.social.personalLoanWhatsapp, labels.whatsappLabel);
  }

  if (pageId === 'aboutUs') {
    setWhatsAppLink(root, '#about-us-hero-primary-button-label', siteConfig.social.personalLoanWhatsapp, labels.whatsappLabel);
    setWhatsAppLink(root, '#about-us-ready-apply-label', siteConfig.social.personalLoanWhatsapp, labels.whatsappLabel);
    setWhatsAppLink(root, '#about-us-ready-whatsapp-label', siteConfig.social.businessLoanWhatsapp, labels.whatsappLabel);
  }

  if (pageId === 'contactUs') {
    replaceText(root, '#contact-form-description', `${labels.anytime} ${labels.staffedHours}`);
    replaceText(root, '#contact-method-phone-description', `${labels.anytime} ${labels.staffedHours}`);
    replaceText(root, '#contact-method-office-heading', labels.officeHeading);
    replaceText(root, '#contact-method-office-description', labels.officeBody);
    const faq = root.querySelector('#contact-faq-heading')?.closest('section');
    if (faq) {
      faq.setAttribute('class', 'py-16 lg:py-24 bg-gray-50');
      faq.set_content(faqSection(labels));
    }
  }

  return root.toString();
}
