import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import type { LessonModuleItem } from "@/src/data/mockData";
import { CircleCheckBig, Lock, PlayCircle } from "lucide-react";

export interface LessonSidebarProps {
  readonly progressTitle: string;
  readonly moduleLabel: string;
  readonly percentLabel: string;
  readonly progressPercent: number;
  readonly moduleContentTitle: string;
  readonly moduleItems: readonly LessonModuleItem[];
  readonly instructorTitle: string;
  readonly instructorName: string;
  readonly instructorRole: string;
  readonly instructorInitials: string;
}

function ModuleStatusIcon({ state }: Readonly<{ state: LessonModuleItem["state"] }>) {
  if (state === "completed") {
    return <CircleCheckBig className="text-green-400" size={18} />;
  }

  if (state === "current") {
    return <PlayCircle className="text-brand-primary" size={18} />;
  }

  return <Lock className="text-slate-600" size={18} />;
}

export function LessonSidebar({
  progressTitle,
  moduleLabel,
  percentLabel,
  progressPercent,
  moduleContentTitle,
  moduleItems,
  instructorTitle,
  instructorName,
  instructorRole,
  instructorInitials,
}: Readonly<LessonSidebarProps>) {
  return (
    <div className="sticky top-24 space-y-6">
      <Card className="glass-card rounded-2xl border border-white/5 py-0">
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-bold text-white">{progressTitle}</h3>
          <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
            <span>{moduleLabel}</span>
            <span>{percentLabel}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-brand-surface-dark">
            <div
              className="h-full rounded-full bg-brand-primary shadow-[0_0_10px_rgba(6,249,249,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card overflow-hidden rounded-2xl border border-white/5 py-0">
        <div className="border-b border-white/5 bg-brand-surface-dark/50 p-4">
          <h3 className="font-bold text-white">{moduleContentTitle}</h3>
        </div>

        <CardContent className="max-h-[calc(100vh-400px)] overflow-y-auto p-0">
          <div className="divide-y divide-white/5">
            {moduleItems.map((item) => {
              const isCurrent = item.state === "current";
              const isLocked = item.state === "locked";

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={
                    isCurrent
                      ? "flex items-start gap-3 border-l-2 border-brand-primary bg-brand-primary/10 p-4"
                      : "group flex items-start gap-3 p-4 transition-colors hover:bg-white/5"
                  }
                >
                  <div className="mt-1">
                    <ModuleStatusIcon state={item.state} />
                  </div>
                  <div>
                    <h4
                      className={
                        isCurrent
                          ? "text-sm font-bold text-white"
                          : isLocked
                            ? "text-sm font-medium text-slate-400 transition-colors group-hover:text-white"
                            : "text-sm font-medium text-slate-300 transition-colors group-hover:text-white"
                      }
                    >
                      {item.title}
                    </h4>
                    <p className={isCurrent ? "mt-1 text-xs text-brand-primary/70" : "mt-1 text-xs text-slate-500"}>
                      {item.meta}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card flex items-center gap-4 rounded-2xl border border-white/5 py-0">
        <CardContent className="flex items-center gap-4 p-6">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-surface-dark text-sm font-bold text-brand-primary ring-2 ring-brand-primary/20">
            {instructorInitials}
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{instructorTitle}</p>
            <h4 className="text-sm font-bold text-white">{instructorName}</h4>
            <p className="text-xs text-slate-500">{instructorRole}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
