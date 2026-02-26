import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { HeroCta, SocialProofPerson } from "@/src/data/mockData";

import { SectionContainer } from "./SectionContainer";

export interface HeroSectionProps {
  readonly badge: string;
  readonly titleStart: string;
  readonly titleAccent: string;
  readonly description: string;
  readonly ctas: readonly HeroCta[];
  readonly socialProofPeople: readonly SocialProofPerson[];
  readonly socialProofText: string;
  readonly terminalHeading: string;
  readonly terminalLines: readonly string[];
}

export function HeroSection({
  badge,
  titleStart,
  titleAccent,
  description,
  ctas,
  socialProofPeople,
  socialProofText,
  terminalHeading,
  terminalLines,
}: Readonly<HeroSectionProps>) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,249,249,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-brand-primary/10 blur-3xl" />

      <SectionContainer className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary">
              <span className="size-2 rounded-full bg-brand-primary" />
              {badge}
            </p>

            <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              {titleStart} <span className="text-brand-primary">{titleAccent}</span>
            </h1>

            <p className="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              {description}
            </p>

            <div className="flex flex-wrap gap-4">
              {ctas.map((cta) => (
                <Button
                  asChild
                  key={cta.label}
                  className={
                    cta.variant === "primary"
                      ? "h-12 rounded-lg bg-brand-primary px-6 text-base font-bold text-brand-background-dark transition-all hover:scale-[1.02] hover:bg-brand-primary-dark"
                      : "h-12 rounded-lg border border-slate-300 bg-transparent px-6 text-base font-bold text-slate-900 shadow-none transition-colors hover:bg-slate-100 dark:border-brand-border-dark dark:text-white dark:hover:bg-brand-surface-dark"
                  }
                >
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              ))}
            </div>

            <div className="mt-2 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-500">
              <div className="flex -space-x-2">
                {socialProofPeople.map((person) => (
                  <span
                    key={person.initials}
                    className="inline-flex size-8 items-center justify-center rounded-full border-2 border-white bg-slate-300 text-[10px] font-bold text-slate-700 dark:border-brand-background-dark dark:bg-brand-surface-dark dark:text-slate-300"
                  >
                    {person.initials}
                  </span>
                ))}
              </div>
              <span>{socialProofText}</span>
            </div>
          </div>

          <Card className="glass-card relative overflow-hidden rounded-2xl border-white/8 py-0 shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,249,249,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,249,249,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <CardContent className="relative z-10 p-6">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex gap-2">
                  <span className="size-3 rounded-full bg-red-400/80" />
                  <span className="size-3 rounded-full bg-yellow-400/80" />
                  <span className="size-3 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[10px] font-mono text-slate-500">{terminalHeading}</span>
              </div>

              <div className="space-y-2 rounded-lg bg-brand-background-dark/70 p-3 font-mono text-sm text-slate-400">
                {terminalLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className="mt-8 grid h-20 grid-cols-8 items-end gap-1 rounded bg-brand-primary/5 px-3 pb-1">
                {[40, 66, 30, 82, 54, 90, 63, 98].map((height) => (
                  <span
                    key={height}
                    className="rounded-t-sm bg-brand-primary/45"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionContainer>
    </section>
  );
}
