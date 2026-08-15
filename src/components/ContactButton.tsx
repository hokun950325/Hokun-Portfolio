import type { ReactNode } from "react";

type ContactButtonProps = {
  className?: string;
  href?: string;
  children?: ReactNode;
};

export default function ContactButton({
  className = "",
  href = "mailto:284408852@qq.com",
  children = "Contact Me",
}: ContactButtonProps) {
  return (
    <a
      href={href}
      className={`contact-button inline-flex items-center justify-center rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-transform duration-300 hover:scale-[1.03] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`.trim()}
    >
      {children}
    </a>
  );
}
