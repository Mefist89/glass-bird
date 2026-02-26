import { ReactNode } from "react";

export interface SectionContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function SectionContainer({
  children,
  className = "",
}: Readonly<SectionContainerProps>) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
