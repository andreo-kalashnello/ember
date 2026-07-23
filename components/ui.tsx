import type { ReactNode } from "react";
import { Flame } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

export function ButtonLink({ href, children, variant = "solid", className = "" }: ButtonLinkProps) {
  return (
    <a className={`button button--${variant} ${className}`} href={href}>
      {children}
    </a>
  );
}

export function Logo() {
  return (
    <a className="logo" href="#top" aria-label="EMBER restaurant, back to top">
      <Flame aria-hidden="true" strokeWidth={1.4} />
      <span>EMBER</span>
      <small>RESTAURANT</small>
    </a>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  centered?: boolean;
};

export function SectionHeading({ eyebrow, title, centered = false }: SectionHeadingProps) {
  return (
    <div className={centered ? "section-heading section-heading--center" : "section-heading"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}
