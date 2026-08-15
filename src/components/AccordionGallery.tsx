import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { gsap } from "gsap";
import "./AccordionGallery.css";

export type AccordionGalleryItem = {
  image: string;
  label?: string;
  link?: string;
  alt?: string;
};

type AccordionGalleryProps = {
  items?: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  grayscale?: boolean;
  showLabels?: boolean;
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: "hover" | "click";
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export default function AccordionGallery({
  items = [],
  defaultIndex = 0,
  accentColor = "#d7e2ea",
  overlayColor = "#060010",
  textColor = "#ffffff",
  height = 520,
  gap = 12,
  radius = 18,
  expandRatio = 0.42,
  orientation = "horizontal",
  duration = 0.6,
  ease = "power3.out",
  parallax = 0.5,
  tilt = 6,
  stagger = 0.06,
  trigger = "hover",
  showLabels = true,
  grayscale = true,
  className = "",
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === "vertical";
  const count = items.length;
  const [active, setActive] = useState(
    Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0)),
  );

  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1;
      const mediaSize = mediaSizeRef.current;

      timelineRef.current?.kill();
      const durationValue = animate && !prefersReduced ? duration : 0;
      const timeline = gsap.timeline();

      panels.forEach((panel, index) => {
        if (!panel) return;
        const isActive = index === active;
        const media = mediaRefs.current[index];
        const bar = barRefs.current[index];
        const text = textRefs.current[index];

        const rotation = isActive ? 0 : index < active ? tilt : -tilt;
        const rotationProperty = vertical
          ? { rotateX: -rotation }
          : { rotateY: rotation };

        timeline.to(
          panel,
          { flexGrow: isActive ? grow : 1, ...rotationProperty, duration: durationValue, ease },
          0,
        );

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - index));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          timeline.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              "--ag-gray": gray,
              "--ag-dim": isActive ? 0 : 0.35,
              duration: durationValue,
              ease,
            },
            0,
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            timeline.to(
              [bar, text],
              { opacity: 1, x: 0, duration: durationValue, ease, stagger: prefersReduced ? 0 : stagger },
              0,
            );
          } else {
            timeline.to(
              [bar, text],
              { opacity: 0, x: -14, duration: durationValue * 0.6, ease },
              0,
            );
          }
        }
      });

      timelineRef.current = timeline;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced,
    ],
  );

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const measure = () => {
      const rect = element.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      element.style.setProperty("--ag-media-size", `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      timelineRef.current?.kill();
    },
    [],
  );

  const handleEnter = (index: number) => {
    if (trigger === "hover") setActive(index);
  };

  const handleClick = (index: number) => {
    if (index !== active) setActive(index);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index + 1) % count);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index - 1 + count) % count);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? " accordion-gallery--vertical" : ""}${className ? ` ${className}` : ""}`}
      style={
        {
          "--ag-accent": accentColor,
          "--ag-overlay": overlayColor,
          "--ag-text": textColor,
          "--ag-gap": `${gap}px`,
          "--ag-radius": `${radius}px`,
          height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`,
        } as CSSProperties
      }
      role="list"
      aria-label="静态海报手风琴画廊"
    >
      {items.map((item, index) => {
        const isActive = index === active;
        return (
          <div
            key={`${item.image}-${index}`}
            ref={(element) => {
              panelRefs.current[index] = element;
            }}
            className={`ag-panel${isActive ? " ag-panel--active" : ""}`}
            style={{ borderRadius: `${radius}px` }}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleEnter(index)}
            onFocus={() => setActive(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? "true" : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span
                className="ag-panel__media"
                ref={(element) => {
                  mediaRefs.current[index] = element;
                }}
              >
                <img src={item.image} alt={item.alt || item.label || ""} draggable="false" />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>
            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span
                  className="ag-panel__bar"
                  ref={(element) => {
                    barRefs.current[index] = element;
                  }}
                />
                <span
                  className="ag-panel__text"
                  ref={(element) => {
                    textRefs.current[index] = element;
                  }}
                >
                  {item.label}
                </span>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
