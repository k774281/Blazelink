import LegalPage from "../_components/LegalPage";
import { terms } from "../_data/legal";

export const metadata = {
  alternates: { canonical: "/martech/terms/" },
  title: "服務條款｜Blazelink 鏈客行銷",
  description: "使用鏈客網站與商城的服務條款，包含數位商品與課程的退換貨政策。",
};

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}
