import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CircleCheckBig, Lightbulb } from "lucide-react";

export interface LessonArticleSectionProps {
  readonly title: string;
  readonly publishedText: string;
  readonly markCompleteLabel: string;
  readonly description: string;
  readonly keyTakeaways: readonly string[];
  readonly proTipTitle: string;
  readonly proTipText: string;
}

export function LessonArticleSection({
  title,
  publishedText,
  markCompleteLabel,
  description,
  keyTakeaways,
  proTipTitle,
  proTipText,
}: Readonly<LessonArticleSectionProps>) {
  return (
    <Card className="glass-card rounded-2xl border border-white/5 py-0">
      <CardContent className="p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h2 className="mb-2 font-display text-3xl font-bold text-white">{title}</h2>
            <p className="text-slate-400">{publishedText}</p>
          </div>
          <Button className="rounded-lg border border-brand-primary/30 bg-transparent px-4 py-2 text-sm font-bold text-brand-primary shadow-none hover:bg-brand-primary/10">
            <CircleCheckBig size={16} />
            {markCompleteLabel}
          </Button>
        </div>

        <p className="mb-4 leading-relaxed text-slate-300">{description}</p>

        <h3 className="mb-4 mt-8 text-xl font-bold text-white">Key Takeaways</h3>
        <ul className="mb-6 space-y-3">
          {keyTakeaways.map((item) => (
            <li key={item} className="flex items-start gap-3 text-slate-300">
              <Check className="mt-1 text-green-400" size={16} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-xl border-l-4 border-brand-primary bg-brand-surface-dark/50 p-6">
          <h4 className="mb-2 flex items-center gap-2 text-lg font-bold text-white">
            <Lightbulb className="text-brand-primary" size={18} />
            {proTipTitle}
          </h4>
          <p className="text-sm text-slate-400">{proTipText}</p>
        </div>
      </CardContent>
    </Card>
  );
}
