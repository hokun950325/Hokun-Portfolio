import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

type CharacterProps = {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

function Character({ char, index, total, progress }: CharacterProps) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative whitespace-pre">
      <span aria-hidden="true" className="invisible">
        {char}
      </span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ opacity }}
      >
        {char}
      </motion.span>
    </span>
  );
}

type AnimatedTextProps = {
  text: string;
  className?: string;
};

export default function AnimatedText({
  text,
  className = "",
}: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  return (
    <p ref={ref} className={`whitespace-pre-wrap ${className}`.trim()}>
      {text.split("").map((char, index) => (
        <Character
          char={char}
          index={index}
          total={text.length}
          progress={scrollYProgress}
          key={`${char}-${index}`}
        />
      ))}
    </p>
  );
}
