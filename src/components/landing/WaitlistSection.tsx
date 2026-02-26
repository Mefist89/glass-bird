import { SectionContainer } from "./SectionContainer";
import { WaitlistForm } from "./WaitlistForm";

export interface WaitlistSectionProps {
  readonly title: string;
  readonly description: string;
  readonly inputPlaceholder: string;
  readonly buttonLabel: string;
  readonly successMessage: string;
  readonly policyText: string;
  readonly policyLabel: string;
  readonly policyHref: string;
}

export function WaitlistSection({
  title,
  description,
  inputPlaceholder,
  buttonLabel,
  successMessage,
  policyText,
  policyLabel,
  policyHref,
}: Readonly<WaitlistSectionProps>) {
  return (
    <section id="waitlist" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-brand-background-light dark:bg-brand-background-dark" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand-primary/10 blur-[96px]" />

      <SectionContainer className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            {description}
          </p>

          <WaitlistForm
            inputPlaceholder={inputPlaceholder}
            buttonLabel={buttonLabel}
            successMessage={successMessage}
            policyText={policyText}
            policyLabel={policyLabel}
            policyHref={policyHref}
          />
        </div>
      </SectionContainer>
    </section>
  );
}
