import { legalPages } from "../../data/legal";
import LegalLayout from "./LegalLayout";

export default function RefundPolicy() {
  return <LegalLayout page={legalPages.refund} />;
}
