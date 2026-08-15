import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import "./DriftWall.css";

export type DriftWallItem = {
  image: string;
  title?: string;
  href?: string;
};

type DriftWallProps = {
  items?: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: "up" | "down";
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  grayscale?: boolean;
  overlayColor?: string;
  className?: string;
  style?: CSSProperties;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const columnFactor = (index: number, variance: number) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

export default function DriftWall({
  items = [],
  columns = 4,
  tileWidth = 200,
  tileHeight = 202,
  gap = 18,
  radius = 14,
  tilt = 0,
  turn = 0,
  roll = 0,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = "up",
  variance = 0.45,
  parallax = 0.6,
  pauseOnHover = false,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  grayscale = false,
  overlayColor = "#060010",
  className = "",
  style,
}: DriftWallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const hoveredColumnRef = useRef(-1);
  const wallHoveredRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTimestampRef = useRef<number | null>(null);
  const activeIdRef = useRef<string | null>(null);

  const [containerHeight, setContainerHeight] = useState(600);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const columnItems = useMemo(() => {
    const columnsArray = Array.from({ length: columns }, () => [] as DriftWallItem[]);
    items.forEach((item, index) => columnsArray[index % columns].push(item));
    return columnsArray.map((column) => (column.length ? column : items.slice(0, 1)));
  }, [items, columns]);

  const actualTileHeight =
    containerWidth > 0 ? Math.max(1, containerWidth / columns) : tileHeight;

  const columnMeta = useMemo(() => {
    const unit = actualTileHeight + gap;
    return columnItems.map((column) => {
      const copyHeight = Math.max(unit, column.length * unit);
      const copies = Math.max(3, Math.ceil(containerHeight / copyHeight) + 1);
      return { copyHeight, copies };
    });
  }, [columnItems, actualTileHeight, gap, containerHeight]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 600);
      setContainerWidth(entry.contentRect.width || 0);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const baseVelocities = useMemo(() => {
    const directionSign = direction === "up" ? 1 : -1;
    return columnItems.map((_, columnIndex) => {
      const alternateSign = columnIndex % 2 === 0 ? 1 : -1;
      return speed * columnFactor(columnIndex, variance) * directionSign * alternateSign;
    });
  }, [columnItems, speed, direction, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, columnIndex) => meta.copyHeight * ((columnIndex * 0.37) % 1));
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnMeta, columnItems]);

  const applyPlaneTransform = useCallback(
    (pointerX: number, pointerY: number) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) scale(1.18) ` +
        `rotateX(${tilt + pointerY}deg) rotateY(${turn + pointerX}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth],
  );

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const delta = Math.min(0.05, Math.max(0, timestamp - lastTimestampRef.current) / 1000);
      lastTimestampRef.current = timestamp;

      const maxTilt = parallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damping = 1 - Math.exp(-delta / 0.12);
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damping;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damping;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      if (!reduced) {
        for (let columnIndex = 0; columnIndex < trackRefs.current.length; columnIndex += 1) {
          const meta = columnMeta[columnIndex];
          if (!meta) continue;
          const paused = wallHoveredRef.current && pauseOnHover;
          const factor = paused || hoveredColumnRef.current === columnIndex ? 0 : 1;
          const target = baseVelocities[columnIndex] * factor;
          const ease = 1 - Math.exp(-delta / (target === 0 ? 0.16 : 0.28));
          velocitiesRef.current[columnIndex] +=
            (target - velocitiesRef.current[columnIndex]) * ease;
          let next = (offsetsRef.current[columnIndex] ?? 0) + velocitiesRef.current[columnIndex] * delta;
          next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[columnIndex] = next;

          const track = trackRefs.current[columnIndex];
          if (track) track.style.transform = `translate3d(0, ${-next}px, 0)`;
        }
      } else {
        for (let columnIndex = 0; columnIndex < trackRefs.current.length; columnIndex += 1) {
          const track = trackRefs.current[columnIndex];
          const meta = columnMeta[columnIndex];
          if (track && meta) {
            track.style.transform = `translate3d(0, ${-(offsetsRef.current[columnIndex] ?? 0)}px, 0)`;
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      lastTimestampRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, parallax, reduced, applyPlaneTransform]);

  const activate = useCallback((id: string, columnIndex: number) => {
    activeIdRef.current = id;
    hoveredColumnRef.current = columnIndex;
    setActiveId(id);
  }, []);

  const release = useCallback(() => {
    activeIdRef.current = null;
    hoveredColumnRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        };
      }
      const hit = document.elementFromPoint(event.clientX, event.clientY);
      const tile = hit?.closest?.("[data-tile-id]");
      if (!tile) return;
      const id = tile.getAttribute("data-tile-id");
      if (!id || id === activeIdRef.current) return;
      activeIdRef.current = id;
      hoveredColumnRef.current = Number(tile.getAttribute("data-col"));
      setActiveId(id);
    },
    [parallax, reduced],
  );

  const handlePointerLeaveWall = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const cssVars = useMemo(
    () =>
      ({
        "--dw-tile-w": `${tileWidth}px`,
        "--dw-tile-h": `${tileHeight}px`,
        "--dw-gap": `${gap}px`,
        "--dw-radius": `${radius}px`,
        "--dw-perspective": `${perspective}px`,
        "--dw-lift": `${lift}px`,
        "--dw-dim": dim,
        "--dw-gray": grayscale ? 1 : 0,
        "--dw-overlay": overlayColor,
        "--dw-edge": `${Math.max(0, (1 - fade) * 100)}%`,
        ...style,
      }) as CSSProperties,
    [tileWidth, tileHeight, gap, radius, perspective, lift, dim, grayscale, overlayColor, fade, style],
  );

  const renderTile = (item: DriftWallItem, id: string, columnIndex: number) => {
    const inner = (
      <span className="drift-wall__inner">
        <img
          className="drift-wall__image"
          src={item.image}
          alt={item.title ?? ""}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <span className="drift-wall__overlay" aria-hidden="true" />
      </span>
    );

    return (
      <div
        key={id}
        className={`drift-wall__tile${activeId === id ? " is-active" : ""}`}
        data-tile-id={id}
        data-col={columnIndex}
        tabIndex={0}
        role="button"
        aria-label={item.title ?? "主图"}
        onFocus={() => activate(id, columnIndex)}
        onBlur={release}
      >
        {inner}
      </div>
    );
  };

  const rootClass = ["drift-wall", reduced ? "drift-wall--reduced" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      role="group"
      aria-label="主图自动滚动墙"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((column, columnIndex) => {
          const meta = columnMeta[columnIndex];
          const copies = Array.from({ length: meta.copies });
          return (
            <div className="drift-wall__col" key={`col-${columnIndex}`}>
              <div
                className="drift-wall__track"
                ref={(element) => {
                  trackRefs.current[columnIndex] = element;
                }}
              >
                {copies.map((_, copyIndex) =>
                  column.map((item, itemIndex) =>
                    renderTile(item, `${columnIndex}-${copyIndex}-${itemIndex}`, columnIndex),
                  ),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
