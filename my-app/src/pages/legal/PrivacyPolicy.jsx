import { legalPages } from "../../data/legal";
import LegalLayout from "./LegalLayout";

export default function PrivacyPolicy() {
  return <LegalLayout page={legalPages.privacy} />;
}
