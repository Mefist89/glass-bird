import type { StatItem } from "@/src/data/mockData";

import { Card, CardContent } from "@/components/ui/card";
import { SectionContainer } from "./SectionContainer";

export interface StatsSectionProps {
  readonly items: readonly StatItem[];
}

export function StatsSection({ items }: Readonly<StatsSectionProps>) {
  return (
    <section className="bg-brand-background-light py-12 dark:bg-brand-background-dark">
      <SectionContainer>
        <Card className="glass-card rounded-2xl py-0">
          <CardContent className="grid grid-cols-1 gap-2 p-6 sm:grid-cols-3 sm:divide-x sm:divide-brand-border-dark/80">
            {items.map((item) => (
              <article key={item.label} className="flex flex-col items-center gap-2 py-4">
                <p className="font-display text-4xl font-bold text-brand-primary">{item.value}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {item.label}
                </p>
              </article>
            ))}
          </CardContent>
        </Card>
      </SectionContainer>
    </section>
  );
}
