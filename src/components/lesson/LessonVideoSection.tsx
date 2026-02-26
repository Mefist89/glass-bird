import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { LessonResourceItem } from "@/src/data/mockData";
import {
  FileText,
  Maximize,
  Play,
  RotateCcw,
  Settings,
  SquareCode,
  Subtitles,
  Text,
} from "lucide-react";

export interface LessonVideoSectionProps {
  readonly title: string;
  readonly progressPercent: number;
  readonly currentTime: string;
  readonly totalTime: string;
  readonly resources: readonly LessonResourceItem[];
}

function ResourceIcon({ icon }: Readonly<{ icon: LessonResourceItem["icon"] }>) {
  if (icon === "summary") {
    return <FileText size={18} />;
  }

  if (icon === "code") {
    return <SquareCode size={18} />;
  }

  return <Text size={18} />;
}

export function LessonVideoSection({
  title,
  progressPercent,
  currentTime,
  totalTime,
  resources,
}: Readonly<LessonVideoSectionProps>) {
  return (
    <section className="mb-10">
      <Card className="glass-card group relative mb-8 overflow-hidden rounded-2xl border border-white/5 py-0 shadow-2xl">
        <CardContent className="p-0">
          <div className="relative aspect-video bg-black">
            <div className="absolute inset-0 flex items-center justify-center bg-brand-surface-dark">
              <Play className="text-slate-600" size={64} />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <input
                className="mb-4 h-1 w-full cursor-pointer appearance-none rounded-lg bg-white/20"
                type="range"
                min={0}
                max={100}
                value={progressPercent}
                readOnly
              />

              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <button className="transition-colors hover:text-brand-primary" type="button" aria-label="Play">
                    <Play size={20} />
                  </button>
                  <button className="transition-colors hover:text-brand-primary" type="button" aria-label="Replay 10">
                    <RotateCcw size={20} />
                  </button>
                  <span className="text-sm font-mono">{currentTime} / {totalTime}</span>
                </div>

                <div className="flex items-center gap-4">
                  <button className="transition-colors hover:text-brand-primary" type="button" aria-label="Subtitles">
                    <Subtitles size={20} />
                  </button>
                  <button className="transition-colors hover:text-brand-primary" type="button" aria-label="Settings">
                    <Settings size={20} />
                  </button>
                  <button className="transition-colors hover:text-brand-primary" type="button" aria-label="Fullscreen">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {resources.map((resource) => (
          <Button
            asChild
            key={resource.label}
            className="glass-card h-auto rounded-xl border border-white/5 px-6 py-4 text-slate-300 transition-all hover:text-white"
          >
            <Link href={resource.href} className="flex items-center justify-center gap-3">
              <span className="rounded-lg bg-brand-primary/10 p-2 text-brand-primary transition-colors">
                <ResourceIcon icon={resource.icon} />
              </span>
              <span className="font-medium">{resource.label}</span>
            </Link>
          </Button>
        ))}
      </div>

      <h1 className="sr-only">{title}</h1>
    </section>
  );
}
