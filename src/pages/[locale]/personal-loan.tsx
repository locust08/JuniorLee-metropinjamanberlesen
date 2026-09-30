import type { GetStaticProps } from 'next';
import LegacyPage, { type LegacyPageProps } from '../../lib/legacyPage';
import { localizedStaticPaths } from '../../lib/localizedPage';
import { siteLocales, type SiteLocale } from '../../lib/locale';
import { loadPersonalLoanPage } from '../../lib/personalLoanPageData';

export const getStaticPaths = localizedStaticPaths;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale;
  if (!siteLocales.includes(locale as SiteLocale)) return { notFound: true };
  return { props: await loadPersonalLoanPage(locale as SiteLocale) };
};

export default function LocalizedPersonalLoan(props: LegacyPageProps) {
  return <LegacyPage {...props} />;
}
