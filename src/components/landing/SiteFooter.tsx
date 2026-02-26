import Link from "next/link";

import type { SocialLink } from "@/src/data/mockData";

import { socialIconMap } from "./iconMap";
import { SectionContainer } from "./SectionContainer";

export interface SiteFooterProps {
  readonly brandName: string;
  readonly copyright: string;
  readonly socialLinks: readonly SocialLink[];
}

export function SiteFooter({
  brandName,
  copyright,
  socialLinks,
}: Readonly<SiteFooterProps>) {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 dark:border-brand-border-dark dark:bg-brand-background-dark">
      <SectionContainer className="flex flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500">
          <span className="inline-flex size-6 items-center justify-center rounded-md bg-brand-primary/15 text-xs font-bold text-brand-primary">
            gb
          </span>
          <span className="font-display text-lg font-bold tracking-tight">{brandName}</span>
        </div>

        <p className="text-sm text-slate-500">{copyright}</p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = socialIconMap[link.icon];

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="text-slate-400 transition-colors hover:text-brand-primary"
              >
                <Icon size={18} />
              </Link>
            );
          })}
        </div>
      </SectionContainer>
    </footer>
  );
}
