import { useCallback, useEffect, useRef, useState } from "react";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import type { Artwork as ArtworkType } from "../data/artworks";
import Artwork from "./Artwork";
import BorderGlow from "./BorderGlow";

type LightboxProps = {
  artwork: ArtworkType;
  onClose: () => void;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export default function Lightbox({ artwork, onClose }: LightboxProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragState = useRef<{ pointerX: number; pointerY: number; offsetX: number; offsetY: number } | null>(null);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close]);

  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    setScale((current) => {
      const next = current + (event.deltaY < 0 ? 0.18 : -0.18);
      return Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    });
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    if (scale <= 1) return;
    dragState.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    const drag = dragState.current;
    if (!drag) return;
    setOffset({
      x: drag.offsetX + event.clientX - drag.pointerX,
      y: drag.offsetY + event.clientY - drag.pointerY,
    });
  };

  const endDrag = () => {
    dragState.current = null;
  };

  const previewWidth = `min(75vw, calc(75vh * ${artwork.ratioWidth} / ${artwork.ratioHeight}))`;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={artwork.label} onWheel={handleWheel}>
      <BorderGlow
        className="lightbox__close-glow"
        borderRadius={999}
        glowRadius={16}
        glowIntensity={0.8}
        backgroundColor="transparent"
      >
        <button className="lightbox__close" type="button" onClick={close} aria-label="Close preview">
          <X size={20} />
        </button>
      </BorderGlow>

      <div
        className={`lightbox__stage ${scale > 1 ? "is-zoomed" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <Artwork
          className="lightbox__art"
          artwork={artwork}
          style={{
            width: previewWidth,
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
          }}
        />
      </div>

      <div className="lightbox__bar">
        <span>{artwork.label}</span>
        <div className="lightbox__actions">
          <BorderGlow
            className="lightbox__button-glow"
            borderRadius={999}
            glowRadius={12}
            glowIntensity={0.7}
            backgroundColor="transparent"
          >
            <button type="button" onClick={() => setScale((current) => Math.min(MAX_SCALE, current + 0.25))} aria-label="Zoom in">
              <Plus size={18} />
            </button>
          </BorderGlow>
          <BorderGlow
            className="lightbox__button-glow"
            borderRadius={999}
            glowRadius={12}
            glowIntensity={0.7}
            backgroundColor="transparent"
          >
            <button type="button" onClick={() => setScale((current) => Math.max(MIN_SCALE, current - 0.25))} aria-label="Zoom out">
              <Minus size={18} />
            </button>
          </BorderGlow>
          <BorderGlow
            className="lightbox__button-glow"
            borderRadius={999}
            glowRadius={12}
            glowIntensity={0.7}
            backgroundColor="transparent"
          >
            <button type="button" onClick={resetView} aria-label="Reset zoom">
              <RotateCcw size={17} />
            </button>
          </BorderGlow>
        </div>
      </div>
    </div>
  );
}
