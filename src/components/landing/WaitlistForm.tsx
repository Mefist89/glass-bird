"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWaitlistForm } from "@/src/hooks/useWaitlistForm";

export interface WaitlistFormProps {
  readonly inputPlaceholder: string;
  readonly buttonLabel: string;
  readonly successMessage: string;
  readonly policyText: string;
  readonly policyLabel: string;
  readonly policyHref: string;
}

export function WaitlistForm({
  inputPlaceholder,
  buttonLabel,
  successMessage,
  policyText,
  policyLabel,
  policyHref,
}: Readonly<WaitlistFormProps>) {
  const {
    email,
    statusMessage,
    isSubmitting,
    handleEmailChange,
    handleSubmit,
  } = useWaitlistForm({ successMessage });

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Input
          className="h-14 min-w-0 flex-1 rounded-lg border-brand-border-dark bg-white px-4 py-3.5 text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:border-brand-primary focus-visible:ring-brand-primary/20 dark:bg-brand-surface-dark dark:text-white"
          placeholder={inputPlaceholder}
          type="email"
          value={email}
          onChange={(event) => handleEmailChange(event.target.value)}
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-14 rounded-lg bg-brand-primary px-8 py-3.5 text-sm font-bold text-brand-background-dark hover:bg-brand-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : buttonLabel}
        </Button>
      </form>

      {statusMessage && <p className="mt-3 text-sm text-brand-primary">{statusMessage}</p>}

      <p className="mt-4 text-xs text-slate-500">
        {policyText}{" "}
        <Link href={policyHref} className="text-brand-primary hover:underline">
          {policyLabel}
        </Link>
        .
      </p>
    </>
  );
}
