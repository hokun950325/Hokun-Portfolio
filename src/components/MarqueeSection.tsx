import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { marqueeRowA, marqueeRowB } from "../data/portfolio";

type MarqueeRowProps = {
  images: string[];
  x: MotionValue<number>;
};

function MarqueeRow({ images, x }: MarqueeRowProps) {
  return (
    <motion.div
      className="flex w-max gap-3 will-change-transform"
      style={{ x }}
    >
      {[...images, ...images, ...images].map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt=""
          loading="lazy"
          className="marquee__image h-[270px] w-[420px] flex-none rounded-2xl object-cover"
        />
      ))}
    </motion.div>
  );
}

export default function MarqueeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const offset = useTransform(scrollYProgress, [0, 1], [0, 1200]);
  const rowA = useTransform(offset, (value) => value - 200);
  const rowB = useTransform(offset, (value) => -(value - 200));

  return (
    <section
      ref={ref}
      className="marquee-section relative overflow-hidden pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="page-shell flex flex-col gap-3 overflow-hidden">
        <MarqueeRow images={marqueeRowA} x={rowA} />
        <MarqueeRow images={marqueeRowB} x={rowB} />
      </div>
    </section>
  );
}
