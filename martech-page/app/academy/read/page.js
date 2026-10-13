import { Suspense } from "react";
import LiveReader from "../../_components/LiveReader";

// Opened only for items newer than the build; the real page is indexed instead.
export const metadata = { robots: { index: false } };

export default function Read() {
  return (
    <Suspense>
      <LiveReader kind="lecture" />
    </Suspense>
  );
}
