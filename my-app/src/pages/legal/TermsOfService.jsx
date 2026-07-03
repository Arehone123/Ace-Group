import { legalPages } from "../../data/legal";
import LegalLayout from "./LegalLayout";

export default function TermsOfService() {
  return <LegalLayout page={legalPages.terms} />;
}
