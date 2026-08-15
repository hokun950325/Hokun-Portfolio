import { useRef, useState, type MouseEvent, type ReactNode } from "react";

type MagnetProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  padding?: number;
  activeTransition?: string;
  inactiveTransition?: string;
};

export default function Magnet({
  children,
  className = "",
  strength = 3,
  padding = 150,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0, 0, 0)");
  const [active, setActive] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const distanceX = event.clientX - (rect.left + rect.width / 2);
    const distanceY = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(distanceX, distanceY);
    const edge = Math.max(rect.width, rect.height) / 2 + padding;

    if (distance > edge) {
      setActive(false);
      setTransform("translate3d(0, 0, 0)");
      return;
    }

    setActive(true);
    setTransform(
      `translate3d(${distanceX / strength}px, ${distanceY / strength}px, 0)`,
    );
  };

  const handleMouseLeave = () => {
    setActive(false);
    setTransform("translate3d(0, 0, 0)");
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform,
        willChange: "transform",
        transition: active ? activeTransition : inactiveTransition,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
