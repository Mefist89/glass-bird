import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CourseModuleItem, LessonKind, LessonState, ModuleIcon } from "@/src/data/mockData";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  Bot,
  Braces,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  CircleHelp,
  Lock,
  Play,
  PlayCircle,
  TerminalSquare,
  Workflow,
} from "lucide-react";

export interface CourseModulesSectionProps {
  readonly title: string;
  readonly versionLabel: string;
  readonly modules: readonly CourseModuleItem[];
}

const moduleIconMap = {
  terminal: TerminalSquare,
  braces: Braces,
  bot: Bot,
  workflow: Workflow,
} satisfies Record<ModuleIcon, ComponentType<{ readonly size?: number; readonly className?: string }>>;

const lessonKindIconMap = {
  video: PlayCircle,
  quiz: CircleHelp,
  lab: Code2,
} satisfies Record<LessonKind, ComponentType<{ readonly size?: number; readonly className?: string }>>;

function LessonStatusIcon({ state }: Readonly<{ state: LessonState }>) {
  if (state === "completed") {
    return <Check size={14} />;
  }

  if (state === "current") {
    return <Play size={14} />;
  }

  return <Lock size={14} />;
}

export function CourseModulesSection({
  title,
  versionLabel,
  modules,
}: Readonly<CourseModulesSectionProps>) {
  return (
    <section className="space-y-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-white">{title}</h1>
        <span className="rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
          {versionLabel}
        </span>
      </div>

      {modules.map((module) => {
        const ModuleIcon = moduleIconMap[module.icon];

        return (
          <Card
            key={module.title}
            className={
              module.isExpanded
                ? "glass-card overflow-hidden rounded-xl border-brand-primary/30 py-0 shadow-[0_0_15px_-3px_rgba(6,249,249,0.1)]"
                : "glass-card overflow-hidden rounded-xl py-0 transition-colors hover:border-brand-primary/30"
            }
          >
            <CardContent className="p-0">
              <div
                className={
                  module.isExpanded
                    ? "flex cursor-pointer items-center justify-between border-b border-brand-primary/20 bg-brand-surface-dark/50 p-5"
                    : "flex cursor-pointer items-center justify-between p-5"
                }
              >
                <div className="flex items-center gap-4">
                  <div
                    className={
                      module.isExpanded
                        ? "flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/20 text-brand-primary"
                        : "flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 bg-brand-surface-dark text-slate-400"
                    }
                  >
                    <ModuleIcon size={18} />
                  </div>
                  <div>
                    <h3 className={module.isExpanded ? "text-lg font-bold text-white" : "text-lg font-bold text-slate-300"}>
                      {module.title}
                    </h3>
                    <p className={module.isExpanded ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
                      {module.summary}
                    </p>
                  </div>
                </div>

                {module.isExpanded ? (
                  <ChevronUp className="text-brand-primary" size={18} />
                ) : (
                  <ChevronDown className="text-slate-500" size={18} />
                )}
              </div>

              {module.isExpanded && (
                <div className="divide-y divide-brand-border-dark bg-black/20">
                  {module.lessons.map((lesson) => {
                    const LessonKindIcon = lessonKindIconMap[lesson.kind];
                    const isCompleted = lesson.state === "completed";
                    const isCurrent = lesson.state === "current";
                    const isLocked = lesson.state === "locked";

                    return (
                      <div
                        key={lesson.title}
                        className={
                          isCurrent
                            ? "group flex items-center justify-between border-l-2 border-brand-primary bg-brand-primary/5 p-4 transition-colors hover:bg-white/5"
                            : isLocked
                              ? "group flex items-center justify-between p-4 opacity-60 transition-colors hover:bg-white/5"
                              : "group flex items-center justify-between p-4 transition-colors hover:bg-white/5"
                        }
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={
                              isCompleted
                                ? "flex h-8 w-8 items-center justify-center rounded-full border border-green-500/30 bg-green-500/20 text-green-400"
                                : isCurrent
                                  ? "flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-brand-background-dark"
                                  : "flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-slate-700 text-slate-400"
                            }
                          >
                            <LessonStatusIcon state={lesson.state} />
                          </div>

                          <div className="flex flex-col">
                            <span
                              className={
                                isLocked
                                  ? "text-sm font-medium text-slate-300"
                                  : "text-sm font-medium text-white transition-colors group-hover:text-brand-primary"
                              }
                            >
                              {lesson.title}
                            </span>
                            <span className={isCompleted ? "flex items-center gap-1 text-xs text-slate-500" : "flex items-center gap-1 text-xs text-slate-400"}>
                              <LessonKindIcon size={12} />
                              {lesson.meta}
                            </span>
                          </div>
                        </div>

                        {lesson.actionLabel ? (
                          lesson.actionHref ? (
                            <Button
                              asChild
                              size="sm"
                              className={
                                isCurrent
                                  ? "h-7 rounded-md bg-brand-primary px-3 text-xs font-bold text-brand-background-dark hover:bg-brand-primary-dark"
                                  : "h-7 rounded-md bg-slate-800 px-3 text-xs text-slate-400 hover:bg-slate-700"
                              }
                            >
                              <Link href={lesson.actionHref}>{lesson.actionLabel}</Link>
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className={
                                isCurrent
                                  ? "h-7 rounded-md bg-brand-primary px-3 text-xs font-bold text-brand-background-dark hover:bg-brand-primary-dark"
                                  : "h-7 rounded-md bg-slate-800 px-3 text-xs text-slate-400 hover:bg-slate-700"
                              }
                            >
                              {lesson.actionLabel}
                            </Button>
                          )
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
