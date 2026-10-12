import LegalPage from "../_components/LegalPage";
import { privacy } from "../_data/legal";

export const metadata = {
  alternates: { canonical: "/web-design/privacy-policy/" },
  title: "隱私權政策｜Blazelink 鏈客",
  description: "鏈客策略行銷如何蒐集、使用與保護你的個人資料，以及你對這些資料的權利。",
};

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
