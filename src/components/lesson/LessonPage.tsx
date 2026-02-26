import Link from "next/link";

import { landingPageData, type LessonPageData } from "@/src/data/mockData";

import { SiteFooter } from "../landing/SiteFooter";
import { SectionContainer } from "../landing/SectionContainer";
import { LessonArticleSection } from "./LessonArticleSection";
import { LessonHeader } from "./LessonHeader";
import { LessonSidebar } from "./LessonSidebar";
import { LessonVideoSection } from "./LessonVideoSection";

export interface LessonPageProps {
  readonly data: LessonPageData;
  readonly className?: string;
}

export function LessonPage({ data, className = "" }: Readonly<LessonPageProps>) {
  const { breadcrumb, video, resources, lesson, sidebar } = data;

  return (
    <div className={`relative flex min-h-screen w-full flex-col overflow-x-hidden bg-brand-background-dark ${className}`}>
      <LessonHeader brandName={data.brandName} navLinks={data.navLinks} />

      <main className="relative flex-1">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-brand-primary/5 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[80px]" />
        </div>

        <SectionContainer className="relative z-10 py-8">
          <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href={breadcrumb.courseHref} className="transition-colors hover:text-brand-primary">
              {breadcrumb.courseLabel}
            </Link>
            <span className="text-xs">›</span>
            <span className="text-slate-300">{breadcrumb.moduleLabel}</span>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="min-w-0 flex-1">
              <LessonVideoSection
                title={video.title}
                progressPercent={video.progressPercent}
                currentTime={video.currentTime}
                totalTime={video.totalTime}
                resources={resources}
              />

              <LessonArticleSection
                title={lesson.title}
                publishedText={lesson.publishedText}
                markCompleteLabel={lesson.markCompleteLabel}
                description={lesson.description}
                keyTakeaways={lesson.keyTakeaways}
                proTipTitle={lesson.proTipTitle}
                proTipText={lesson.proTipText}
              />
            </div>

            <div className="w-full lg:w-96 lg:flex-shrink-0">
              <LessonSidebar
                progressTitle={sidebar.progress.title}
                moduleLabel={sidebar.progress.moduleLabel}
                percentLabel={sidebar.progress.percentLabel}
                progressPercent={sidebar.progress.progressPercent}
                moduleContentTitle={sidebar.moduleContentTitle}
                moduleItems={sidebar.moduleItems}
                instructorTitle={sidebar.instructor.title}
                instructorName={sidebar.instructor.name}
                instructorRole={sidebar.instructor.role}
                instructorInitials={sidebar.instructor.initials}
              />
            </div>
          </div>
        </SectionContainer>
      </main>

      <SiteFooter
        brandName={landingPageData.brandName}
        copyright={landingPageData.footer.copyright}
        socialLinks={landingPageData.footer.socialLinks}
      />
    </div>
  );
}
