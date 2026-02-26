import Link from "next/link";
import { ChevronRight, GraduationCap } from "lucide-react";

export interface CourseBreadcrumbProps {
  readonly parentLabel: string;
  readonly parentHref: string;
  readonly currentLabel: string;
}

export function CourseBreadcrumb({
  parentLabel,
  parentHref,
  currentLabel,
}: Readonly<CourseBreadcrumbProps>) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex">
      <ol className="inline-flex items-center gap-1 md:gap-2">
        <li className="inline-flex items-center">
          <Link
            className="inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-brand-primary dark:text-slate-400"
            href={parentHref}
          >
            <GraduationCap className="mr-2" size={16} />
            {parentLabel}
          </Link>
        </li>
        <li className="inline-flex items-center">
          <ChevronRight className="mx-1 text-slate-500" size={16} />
          <span className="ml-1 text-sm font-medium text-brand-primary md:ml-2">{currentLabel}</span>
        </li>
      </ol>
    </nav>
  );
}
