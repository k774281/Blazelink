import "../globals.css";
import t from "../_data/zh";
import { metadataFor, RootHtml } from "../_lib/root-layout";

export const metadata = metadataFor(t);

export default function Layout({ children }) {
  return <RootHtml t={t}>{children}</RootHtml>;
}
