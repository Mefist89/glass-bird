import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { NavLink } from "@/src/data/mockData";

import { SectionContainer } from "./SectionContainer";

export interface SiteHeaderProps {
  readonly brandName: string;
  readonly navLinks: readonly NavLink[];
  readonly loginLabel: string;
  readonly loginHref: string;
  readonly signupLabel: string;
  readonly signupHref: string;
}

export function SiteHeader({
  brandName,
  navLinks,
  loginLabel,
  loginHref,
  signupLabel,
  signupHref,
}: Readonly<SiteHeaderProps>) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-brand-border-dark/70 dark:bg-brand-background-dark/80">
      <SectionContainer className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand-primary/15 text-sm font-bold text-brand-primary">
            gb
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {brandName}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-primary dark:text-slate-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="link"
            className="hidden h-auto p-0 text-sm font-semibold text-slate-600 no-underline hover:text-brand-primary hover:no-underline sm:inline-flex dark:text-slate-300"
          >
            <Link href={loginHref}>{loginLabel}</Link>
          </Button>
          <Button
            asChild
            className="h-9 rounded-lg bg-brand-primary px-4 text-sm font-bold text-brand-background-dark hover:bg-brand-primary-dark"
          >
            <Link href={signupHref}>{signupLabel}</Link>
          </Button>
        </div>
      </SectionContainer>
    </header>
  );
}
