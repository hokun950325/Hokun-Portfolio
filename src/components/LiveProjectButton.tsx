import type { ReactNode } from "react";

type LiveProjectButtonProps = {
  className?: string;
  children?: ReactNode;
};

export default function LiveProjectButton({
  className = "",
  children = "点击下图预览 ↓",
}: LiveProjectButtonProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base ${className}`.trim()}
    >
      {children}
    </span>
  );
}
