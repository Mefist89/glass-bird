import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import type { FeatureItem } from "@/src/data/mockData";

import { featureIconMap } from "./iconMap";
import { SectionContainer } from "./SectionContainer";

export interface FeaturesSectionProps {
  readonly title: string;
  readonly description: string;
  readonly ctaLabel: string;
  readonly items: readonly FeatureItem[];
}

export function FeaturesSection({
  title,
  description,
  ctaLabel,
  items,
}: Readonly<FeaturesSectionProps>) {
  return (
    <section id="features" className="border-y border-brand-border-dark/50 bg-brand-background-dark py-20">
      <SectionContainer>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{description}</p>
          </div>
          <Link href="#" className="text-sm font-bold text-brand-primary transition-colors hover:text-brand-primary-dark">
            {ctaLabel}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item) => {
            const Icon = featureIconMap[item.icon];

            return (
              <Card
                key={item.title}
                className="glass-card group rounded-2xl py-0 transition-colors hover:border-brand-primary/50"
              >
                <CardContent className="p-7">
                  <span className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary ring-1 ring-brand-primary/20 transition-colors group-hover:bg-brand-primary group-hover:text-brand-background-dark">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
