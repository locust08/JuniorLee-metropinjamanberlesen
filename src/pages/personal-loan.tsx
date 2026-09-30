import LegacyPage, { type LegacyPageProps } from '../lib/legacyPage';
import { loadPersonalLoanPage } from '../lib/personalLoanPageData';

export async function getStaticProps() {
  return { props: await loadPersonalLoanPage('en') };
}

export default function PersonalLoan(props: LegacyPageProps) {
  return <LegacyPage {...props} canonicalPath="/en/personal-loan" />;
}
