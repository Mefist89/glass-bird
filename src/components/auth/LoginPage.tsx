"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { LoginPageData } from "@/src/data/mockData";
import { useLoginForm } from "@/src/hooks/useLoginForm";

export interface LoginPageProps {
  readonly data: Readonly<LoginPageData>;
}

export function LoginPage({ data }: Readonly<LoginPageProps>) {
  const {
    email,
    password,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-brand-background-dark px-4 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(6,249,249,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,249,249,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-brand-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-1/4 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />

      <main className="relative z-10 w-full max-w-[450px]">
        <Card className="glass-card rounded-3xl border-white/10 py-0 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <div className="mb-10 flex flex-col items-center text-center">
              <Link href="/" className="mb-6 flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
                  <span className="text-sm font-bold">gb</span>
                </div>
                <h1 className="font-display text-2xl font-bold tracking-tight text-white">{data.brandName}</h1>
              </Link>
              <h2 className="mb-2 font-display text-3xl font-bold text-white">{data.title}</h2>
              <p className="text-sm text-slate-400">{data.subtitle}</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-slate-500" htmlFor="email">
                  {data.emailLabel}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={data.emailPlaceholder}
                  value={email}
                  onChange={(event) => handleEmailChange(event.target.value)}
                  className="h-12 rounded-xl border-white/5 bg-brand-surface-dark/50 px-4 text-white placeholder:text-slate-600 focus-visible:border-brand-primary focus-visible:ring-brand-primary/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-slate-500" htmlFor="password">
                  {data.passwordLabel}
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder={data.passwordPlaceholder}
                  value={password}
                  onChange={(event) => handlePasswordChange(event.target.value)}
                  className="h-12 rounded-xl border-white/5 bg-brand-surface-dark/50 px-4 text-white placeholder:text-slate-600 focus-visible:border-brand-primary focus-visible:ring-brand-primary/30"
                  required
                />
              </div>

              <div className="flex items-center justify-end">
                <Link href={data.forgotPasswordHref} className="text-xs font-medium text-slate-400 transition-colors hover:text-brand-primary">
                  {data.forgotPasswordLabel}
                </Link>
              </div>

              <Button
                type="submit"
                className="h-13 w-full rounded-xl bg-brand-primary py-3.5 text-base font-bold text-brand-background-dark shadow-[0_0_20px_-5px_rgba(6,249,249,0.3)] transition-all hover:scale-[1.01] hover:bg-brand-primary-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : data.submitLabel}
              </Button>
            </form>

            <div className="mt-8 border-t border-white/5 pt-8 text-center">
              <p className="text-sm text-slate-400">
                {data.signupPrompt}
                <Link href={data.signupHref} className="ml-1 font-bold text-brand-primary hover:underline">
                  {data.signupLabel}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center gap-6">
          {data.footerLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-xs text-slate-500 transition-colors hover:text-slate-300">
              {link.label}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
