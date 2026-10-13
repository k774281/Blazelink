import { pageMeta } from "../_lib/seo";
import LegalPage from "../_components/LegalPage";
import { terms } from "../_data/legal";

export const metadata = pageMeta("terms", "/terms/");

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}
