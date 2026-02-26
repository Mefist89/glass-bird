import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { LessonNavLink } from "@/src/data/mockData";

import { SectionContainer } from "../landing/SectionContainer";

export interface LessonHeaderProps {
  readonly brandName: string;
  readonly navLinks: readonly LessonNavLink[];
}

export function LessonHeader({ brandName, navLinks }: Readonly<LessonHeaderProps>) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/75 backdrop-blur-md dark:border-brand-border-dark/70 dark:bg-brand-background-dark/80">
      <SectionContainer className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-slate-900 dark:text-white">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
            <span className="text-xs font-bold">gb</span>
          </span>
          <span className="font-display text-xl font-bold tracking-tight">{brandName}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "text-sm font-medium text-brand-primary"
                  : "text-sm font-medium text-slate-600 transition-colors hover:text-brand-primary dark:text-slate-300"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          size="icon"
          className="size-8 rounded-full bg-gradient-to-tr from-brand-primary to-blue-500 p-[2px]"
        >
          <span className="flex h-full w-full items-center justify-center rounded-full bg-brand-background-dark text-xs font-bold text-brand-primary">
            AM
          </span>
        </Button>
      </SectionContainer>
    </header>
  );
}
