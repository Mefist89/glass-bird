import { CoursesSection } from "@/src/components/landing/CoursesSection";
import { FeaturesSection } from "@/src/components/landing/FeaturesSection";
import { HeroSection } from "@/src/components/landing/HeroSection";
import { SiteFooter } from "@/src/components/landing/SiteFooter";
import { SiteHeader } from "@/src/components/landing/SiteHeader";
import { StatsSection } from "@/src/components/landing/StatsSection";
import { WaitlistSection } from "@/src/components/landing/WaitlistSection";
import { landingPageData } from "@/src/data/mockData";

export default function Home() {
  const { hero, features, courses, stats, waitlist, footer, authActions } =
    landingPageData;

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-background-light text-slate-900 dark:bg-brand-background-dark dark:text-slate-100">
      <SiteHeader
        brandName={landingPageData.brandName}
        navLinks={landingPageData.navLinks}
        loginLabel={authActions.login.label}
        loginHref={authActions.login.href}
        signupLabel={authActions.signup.label}
        signupHref={authActions.signup.href}
      />

      <main>
        <HeroSection
          badge={hero.badge}
          titleStart={hero.titleStart}
          titleAccent={hero.titleAccent}
          description={hero.description}
          ctas={hero.ctas}
          socialProofPeople={hero.socialProof.people}
          socialProofText={hero.socialProof.text}
          terminalHeading={hero.terminal.heading}
          terminalLines={hero.terminal.lines}
        />

        <FeaturesSection
          title={features.eyebrow}
          description={features.description}
          ctaLabel={features.ctaLabel}
          items={features.items}
        />

        <CoursesSection
          title={courses.title}
          description={courses.description}
          items={courses.items}
          enrollLabel={courses.enrollLabel}
        />

        <StatsSection items={stats} />

        <WaitlistSection
          title={waitlist.title}
          description={waitlist.description}
          inputPlaceholder={waitlist.inputPlaceholder}
          buttonLabel={waitlist.buttonLabel}
          successMessage={waitlist.successMessage}
          policyText={waitlist.policyText}
          policyLabel={waitlist.policyLabel}
          policyHref={waitlist.policyHref}
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
