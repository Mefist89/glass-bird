import { CoursesSection } from "@/src/components/landing/CoursesSection";
import { SectionContainer } from "@/src/components/landing/SectionContainer";
import { SiteFooter } from "@/src/components/landing/SiteFooter";
import { SiteHeader } from "@/src/components/landing/SiteHeader";
import { landingPageData } from "@/src/data/mockData";

export default function CoursesPage() {
  const { courses, footer, authActions } = landingPageData;

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-background-dark text-slate-100">
      <SiteHeader
        brandName={landingPageData.brandName}
        navLinks={landingPageData.navLinks}
        loginLabel={authActions.login.label}
        loginHref={authActions.login.href}
        signupLabel={authActions.signup.label}
        signupHref={authActions.signup.href}
      />

      <main>
        <section className="border-b border-brand-border-dark/60 bg-brand-background-dark py-14">
          <SectionContainer>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white">All Courses</h1>
            <p className="mt-4 max-w-2xl text-slate-400">
              Choose a learning track and continue from where you stopped.
            </p>
          </SectionContainer>
        </section>

        <CoursesSection
          title={courses.title}
          description={courses.description}
          items={courses.items}
          enrollLabel={courses.enrollLabel}
        />
      </main>

      <SiteFooter
        brandName={landingPageData.brandName}
        copyright={footer.copyright}
        socialLinks={footer.socialLinks}
      />
    </div>
  );
}
