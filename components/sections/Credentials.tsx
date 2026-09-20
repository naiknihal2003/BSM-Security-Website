import { FileCheck2 } from "lucide-react";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";

/**
 * Credentials are listed as fields, not as claims. Each row names a document a
 * client is entitled to ask a security agency for; the value stays a
 * placeholder until BSM supplies the real one. Nothing here is asserted on
 * BSM's behalf.
 */
const records = [
  { label: "PSARA licence", value: "[LICENCE NUMBER]", note: "Private Security Agencies (Regulation) Act" },
  { label: "Registered entity", value: "[LEGAL ENTITY NAME]", note: "Name as registered" },
  { label: "GST registration", value: "[GSTIN]", note: "Goods and Services Tax" },
  { label: "PF / ESIC registration", value: "[REGISTRATION NUMBERS]", note: "Statutory employee cover" },
  { label: "Insurance cover", value: "[POLICY DETAILS]", note: "Liability and workmen's compensation" },
  { label: "Personnel verification", value: "[VERIFICATION PROCESS]", note: "Police verification and background checks" },
];

export default function Credentials() {
  return (
    <Section id="credentials" label="Credentials and compliance" className="bg-ink">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionLabel index="07">Credentials</SectionLabel>
          <h2 data-split className="mt-8 text-display font-semibold text-bone">
            Ask for the paperwork. Always.
          </h2>
          <p data-reveal="up" className="mt-8 max-w-md text-lead text-mist">
            A security agency should be able to produce its licence, registrations and insurance on
            request — before a contract, not after an incident. These are the documents to ask BSM
            for.
          </p>
          <div
            className="mt-8 flex items-start gap-3 border-l border-brass/50 pl-4 text-sm text-dim"
            data-reveal="up"
          >
            <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
            <p>
              This site publishes no credential it has not been given. Every field below is a
              placeholder until BSM supplies the verified document.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <dl className="border-t border-line" data-stagger>
            {records.map((record) => (
              <div
                key={record.label}
                data-stagger-item
                className="grid grid-cols-1 gap-2 border-b border-line py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6"
              >
                <dt className="sm:col-span-5">
                  <span className="block font-display text-base font-semibold text-bone">
                    {record.label}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                    {record.note}
                  </span>
                </dt>
                <dd className="sm:col-span-7">
                  <Placeholder>{record.value}</Placeholder>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
