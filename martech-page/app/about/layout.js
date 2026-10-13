import { pageMeta } from "../_lib/seo";
export const metadata = pageMeta("about", "/about/");

export default function AboutLayout({ children }) {
  return children;
}
