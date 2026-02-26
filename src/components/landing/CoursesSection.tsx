import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CourseItem } from "@/src/data/mockData";

import { courseIconMap } from "./iconMap";
import { SectionContainer } from "./SectionContainer";

export interface CoursesSectionProps {
  readonly title: string;
  readonly description: string;
  readonly items: readonly CourseItem[];
  readonly enrollLabel: string;
}

export function CoursesSection({
  title,
  description,
  items,
  enrollLabel,
}: Readonly<CoursesSectionProps>) {
  return (
    <section id="courses" className="relative bg-brand-background-dark py-24">
      <SectionContainer>
        <div className="mb-14 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">{description}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item) => {
            const Icon = courseIconMap[item.icon];

            return (
              <Card
                key={item.title}
                className="glass-card flex h-full flex-col gap-0 overflow-hidden rounded-2xl py-0 transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="relative flex h-40 items-center justify-center bg-slate-900/80">
                  <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-brand-surface-dark/80 px-3 py-1 text-xs font-semibold text-brand-primary">
                    {item.level}
                  </span>
                  <Icon className="text-brand-primary/90" size={56} />
                </div>

                <CardContent className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">{item.description}</p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs text-slate-500">{item.duration}</span>
                    <Button
                      asChild
                      size="sm"
                      className="rounded-lg border border-brand-primary/25 bg-brand-primary/10 px-4 text-sm font-bold text-brand-primary shadow-none hover:bg-brand-primary/20"
                    >
                      <Link href={item.href}>{enrollLabel}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
