import { CourseBreadcrumb } from "./CourseBreadcrumb";
import { CourseHeader } from "./CourseHeader";
import { CourseModulesSection } from "./CourseModulesSection";
import { CourseSidebar } from "./CourseSidebar";
import { SectionContainer } from "../landing/SectionContainer";
import { SiteFooter } from "../landing/SiteFooter";
import { landingPageData, type CoursePageData } from "@/src/data/mockData";

export interface CoursePageProps {
  readonly data: CoursePageData;
  readonly className?: string;
}

export function CoursePage({ data, className = "" }: Readonly<CoursePageProps>) {
  const { breadcrumb, syllabus, sidebar } = data;

  return (
    <div className={`relative flex min-h-screen w-full flex-col overflow-x-hidden bg-brand-background-dark ${className}`}>
      <CourseHeader
        brandName={data.brandName}
        navLinks={data.navLinks}
        userName={data.user.name}
        userRole={data.user.role}
        dashboardLabel={data.dashboardLabel}
        dashboardHref={data.dashboardHref}
      />

      <main className="relative flex-1">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,249,249,0.12),transparent_45%)]" />
        <div className="pointer-events-none absolute left-0 top-20 h-96 w-96 rounded-full bg-brand-primary/5 blur-3xl" />

        <SectionContainer className="relative z-10 py-8">
          <CourseBreadcrumb
            parentLabel={breadcrumb.parentLabel}
            parentHref={breadcrumb.parentHref}
            currentLabel={breadcrumb.currentLabel}
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <CourseModulesSection
                title={syllabus.title}
                versionLabel={syllabus.versionLabel}
                modules={syllabus.modules}
              />
            </div>

            <div className="lg:col-span-4">
              <CourseSidebar
                progressTitle={sidebar.progress.title}
                progressPercent={sidebar.progress.percent}
                progressLabel={`${sidebar.progress.completedLessons}/${sidebar.progress.totalLessons} Lessons`}
                progressButtonLabel={sidebar.progress.buttonLabel}
                progressButtonHref={sidebar.progress.buttonHref}
                instructorTitle={sidebar.instructor.title}
                instructorName={sidebar.instructor.name}
                instructorRole={sidebar.instructor.role}
                instructorBio={sidebar.instructor.bio}
                detailsTitle={sidebar.details.title}
                detailsItems={sidebar.details.items}
                skillsTitle={sidebar.details.skillsTitle}
                skills={sidebar.details.skills}
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
