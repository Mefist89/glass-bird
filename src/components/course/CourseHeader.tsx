import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { NavLink } from "@/src/data/mockData";

import { SectionContainer } from "../landing/SectionContainer";

export interface CourseHeaderProps {
  readonly brandName: string;
  readonly navLinks: readonly NavLink[];
  readonly userName: string;
  readonly userRole: string;
  readonly dashboardLabel: string;
  readonly dashboardHref: string;
}

export function CourseHeader({
  brandName,
  navLinks,
  userName,
  userRole,
  dashboardLabel,
  dashboardHref,
}: Readonly<CourseHeaderProps>) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/75 backdrop-blur-md dark:border-brand-border-dark/70 dark:bg-brand-background-dark/80">
      <SectionContainer className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand-primary/15 text-sm font-bold text-brand-primary">
            gb
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {brandName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-3 border-r border-slate-200 pr-3 dark:border-brand-border-dark sm:flex">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900 dark:text-white">{userName}</p>
              <p className="text-[10px] text-slate-500">{userRole}</p>
            </div>
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-brand-primary/30 bg-brand-surface-dark text-xs font-bold text-brand-primary">
              {userName
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
          </div>

          <Button
            asChild
            className="h-9 rounded-lg bg-brand-primary/10 px-3 text-sm font-bold text-brand-primary hover:bg-brand-primary hover:text-brand-background-dark"
          >
            <Link href={dashboardHref}>{dashboardLabel}</Link>
          </Button>
        </div>
      </SectionContainer>
    </header>
  );
}
