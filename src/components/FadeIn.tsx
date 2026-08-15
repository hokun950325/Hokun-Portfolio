import { motion } from "framer-motion";
import type { CSSProperties, ElementType, ReactNode } from "react";

type FadeInProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  style?: CSSProperties;
};

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function FadeIn({
  as = "div",
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  style,
}: FadeInProps) {
  const Component = motion.create(as as ElementType) as ElementType;

  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}
