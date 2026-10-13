import { pageMeta } from "../_lib/seo";
import LegalPage from "../_components/LegalPage";
import { privacy } from "../_data/legal";

export const metadata = pageMeta("privacy", "/privacy-policy/");

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
