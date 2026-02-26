"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { RegisterPageData } from "@/src/data/mockData";
import { useRegisterForm } from "@/src/hooks/useRegisterForm";
import { Chrome, Github, Linkedin } from "lucide-react";

export interface RegisterPageProps {
  readonly data: Readonly<RegisterPageData>;
}

export function RegisterPage({ data }: Readonly<RegisterPageProps>) {
  const {
    fullName,
    email,
    password,
    isSubmitting,
    handleFullNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useRegisterForm();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-brand-background-dark px-4 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(6,249,249,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,249,249,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-brand-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-1/4 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />

      <main className="relative z-10 w-full max-w-[480px]">
        <Card className="glass-card rounded-3xl border-white/10 py-0 shadow-2xl">
          <CardContent className="p-8 md:p-10">
            <div className="mb-8 flex flex-col items-center text-center">
              <Link href="/" className="mb-6 flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
                  <span className="text-sm font-bold">gb</span>
                </div>
                <h1 className="font-display text-2xl font-bold tracking-tight text-white">{data.brandName}</h1>
              </Link>
              <h2 className="mb-2 font-display text-3xl font-bold text-white">{data.title}</h2>
              <p className="text-sm text-slate-400">{data.subtitle}</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-slate-500" htmlFor="fullname">
                  {data.fullNameLabel}
                </label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder={data.fullNamePlaceholder}
                  value={fullName}
                  onChange={(event) => handleFullNameChange(event.target.value)}
                  className="h-12 rounded-xl border-white/5 bg-brand-surface-dark/50 px-4 text-white placeholder:text-slate-600 focus-visible:border-brand-primary focus-visible:ring-brand-primary/30"
                  required
                />
              </div>

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

              <Button
                type="submit"
                className="mt-2 h-12 w-full rounded-xl bg-brand-primary text-base font-bold text-brand-background-dark shadow-[0_0_20px_-5px_rgba(6,249,249,0.3)] transition-all hover:scale-[1.01] hover:bg-brand-primary-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : data.submitLabel}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-brand-surface-dark/80 px-2 text-slate-500 backdrop-blur-xl">{data.socialDividerLabel}</span>
              </div>
            </div>

            <div className="mb-8 grid grid-cols-3 gap-4">
              <Button className="h-12 rounded-xl border border-white/5 bg-white/[0.03] text-slate-400 shadow-none hover:-translate-y-0.5 hover:border-brand-primary/30 hover:bg-white/[0.08] hover:text-white">
                <Chrome size={20} />
              </Button>
              <Button className="h-12 rounded-xl border border-white/5 bg-white/[0.03] text-slate-400 shadow-none hover:-translate-y-0.5 hover:border-brand-primary/30 hover:bg-white/[0.08] hover:text-white">
                <Github size={20} />
              </Button>
              <Button className="h-12 rounded-xl border border-white/5 bg-white/[0.03] text-slate-400 shadow-none hover:-translate-y-0.5 hover:border-brand-primary/30 hover:bg-white/[0.08] hover:text-white">
                <Linkedin size={20} />
              </Button>
            </div>

            <div className="border-t border-white/5 pt-4 text-center">
              <p className="text-sm text-slate-400">
                {data.signinPrompt}
                <Link href={data.signinHref} className="ml-1 font-bold text-brand-primary hover:underline">
                  {data.signinLabel}
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
