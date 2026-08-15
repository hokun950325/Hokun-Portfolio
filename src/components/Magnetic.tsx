import { useRef, useState, type MouseEvent, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  padding?: number;
};

export default function Magnetic({
  children,
  className = "",
  strength = 28,
  padding = 90,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0, 0, 0)");

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const distance = Math.hypot(x, y);
    const edge = Math.max(rect.width, rect.height) / 2 + padding;

    if (distance > edge) {
      setTransform("translate3d(0, 0, 0)");
      return;
    }

    setTransform(`translate3d(${x / strength}px, ${y / strength}px, 0)`);
  };

  const resetTransform = () => {
    setTransform("translate3d(0, 0, 0)");
  };

  return (
    <div
      ref={ref}
      className={`magnetic ${className}`.trim()}
      style={{ transform, willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
    >
      {children}
    </div>
  );
}
