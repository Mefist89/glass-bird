import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CourseDetailItem } from "@/src/data/mockData";
import { Clock3, Globe, LibraryBig, Play, Signal, Twitter, Users } from "lucide-react";
import Link from "next/link";

export interface CourseSidebarProps {
  readonly progressTitle: string;
  readonly progressPercent: number;
  readonly progressLabel: string;
  readonly progressButtonLabel: string;
  readonly progressButtonHref: string;
  readonly instructorTitle: string;
  readonly instructorName: string;
  readonly instructorRole: string;
  readonly instructorBio: string;
  readonly detailsTitle: string;
  readonly detailsItems: readonly CourseDetailItem[];
  readonly skillsTitle: string;
  readonly skills: readonly string[];
}

const detailsIcons = [Signal, LibraryBig, Clock3, Users] as const;

export function CourseSidebar({
  progressTitle,
  progressPercent,
  progressLabel,
  progressButtonLabel,
  progressButtonHref,
  instructorTitle,
  instructorName,
  instructorRole,
  instructorBio,
  detailsTitle,
  detailsItems,
  skillsTitle,
  skills,
}: Readonly<CourseSidebarProps>) {
  return (
    <aside className="space-y-6">
      <Card className="glass-card relative overflow-hidden rounded-xl py-0">
        <CardContent className="p-6">
          <h3 className="font-display text-xl font-bold text-white">{progressTitle}</h3>

          <div className="mb-2 mt-4 flex items-end justify-between">
            <span className="text-4xl font-bold text-brand-primary">{progressPercent}%</span>
            <span className="text-sm text-slate-400">{progressLabel}</span>
          </div>

          <div className="mb-6 h-2 w-full rounded-full bg-brand-surface-dark">
            <div
              className="h-2 rounded-full bg-brand-primary"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <Button
            asChild
            className="h-11 w-full rounded-lg bg-brand-primary text-base font-bold text-brand-background-dark hover:bg-brand-primary-dark"
          >
            <Link href={progressButtonHref}>
              <Play size={16} />
              {progressButtonLabel}
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="glass-card rounded-xl py-0">
        <CardContent className="p-6">
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">{instructorTitle}</h4>

          <div className="mb-4 flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-brand-surface-dark text-sm font-bold text-brand-primary">
              SC
            </span>
            <div>
              <h3 className="font-bold text-white">{instructorName}</h3>
              <p className="text-xs text-brand-primary">{instructorRole}</p>
            </div>
          </div>

          <p className="mb-4 text-sm text-slate-400">{instructorBio}</p>

          <div className="flex gap-2">
            <Button
              size="icon-sm"
              className="h-8 w-8 rounded bg-white/5 text-slate-400 shadow-none hover:bg-white/10 hover:text-white"
            >
              <Twitter size={14} />
            </Button>
            <Button
              size="icon-sm"
              className="h-8 w-8 rounded bg-white/5 text-slate-400 shadow-none hover:bg-white/10 hover:text-white"
            >
              <Globe size={14} />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card rounded-xl py-0">
        <CardContent className="p-6">
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">{detailsTitle}</h4>

          <div className="space-y-4">
            {detailsItems.map((item, index) => {
              const Icon = detailsIcons[index] ?? Signal;

              return (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-slate-400">
                    <Icon size={16} />
                    {item.label}
                  </span>

                  {item.tone === "success" ? (
                    <span className="rounded border border-green-400/20 bg-green-400/10 px-2 py-0.5 text-sm font-semibold text-green-400">
                      {item.value}
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-white">{item.value}</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t border-white/5 pt-6">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">{skillsTitle}</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
