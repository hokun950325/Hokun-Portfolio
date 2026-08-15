import { useCallback, useEffect, useRef, useState } from "react";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import "./GlobalLightbox.css";

type LightboxMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  ratio: number;
  muted?: boolean;
  fitToViewport?: boolean;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export default function GlobalLightbox() {
  const [media, setMedia] = useState<LightboxMedia | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scrollRatio, setScrollRatio] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragTrackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{
    pointerX: number;
    pointerY: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const dragControlState = useRef<{
    pointerY: number;
    startRatio: number;
  } | null>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      if (element.closest?.(".global-lightbox")) return;
      if (element.closest?.(".marquee-section")) return;
      if (element.closest?.(".tilted-card-figure")) return;

      const imageElement = element.closest?.("img");
      if (imageElement) {
        const src = imageElement.currentSrc || imageElement.src;
        if (!src) return;

        event.preventDefault();
        event.stopPropagation();

        const probe = new Image();
        probe.onload = () => {
          setMedia({
            type: "image",
            src,
            alt: imageElement.alt || "",
            ratio:
              (probe.naturalWidth || imageElement.naturalWidth || 1) /
              (probe.naturalHeight || imageElement.naturalHeight || 1),
            fitToViewport:
              imageElement.classList.contains("masonry-item__image") ||
              imageElement.classList.contains("aigc-media__image"),
          });
          setScale(1);
          setOffset({ x: 0, y: 0 });
        };
        probe.src = src;
        return;
      }

      const videoElement = element.closest?.("video");
      if (videoElement && !videoElement.classList.contains("hero-background__video")) {
        const src = videoElement.currentSrc || videoElement.getAttribute("src") || "";
        if (!src) return;

        event.preventDefault();
        event.stopPropagation();

        const ratio =
          videoElement.videoWidth && videoElement.videoHeight
            ? videoElement.videoWidth / videoElement.videoHeight
            : 9 / 16;

        setMedia({
          type: "video",
          src,
          alt: "视频预览",
          ratio,
          muted: videoElement.classList.contains("dynamic-poster__video"),
        });
        setScale(1);
        setOffset({ x: 0, y: 0 });
      }
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, []);

  const close = useCallback(() => {
    setMedia(null);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!media) return;

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
  }, [media, close]);

  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setScrollRatio(0);
  };

  const handleStageScroll = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const max = stage.scrollHeight - stage.clientHeight;
    setScrollRatio(max > 0 ? stage.scrollTop / max : 0);
  };

  const handleDragControlPointerDown = (event: React.PointerEvent) => {
    event.preventDefault();
    dragControlState.current = {
      pointerY: event.clientY,
      startRatio: scrollRatio,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragControlPointerMove = (event: React.PointerEvent) => {
    const drag = dragControlState.current;
    const stage = stageRef.current;
    const track = dragTrackRef.current;
    if (!drag || !stage || !track) return;

    const delta = (event.clientY - drag.pointerY) / track.clientHeight;
    const next = Math.min(1, Math.max(0, drag.startRatio + delta));
    const max = stage.scrollHeight - stage.clientHeight;
    stage.scrollTop = max * next;
    setScrollRatio(next);
  };

  const endDragControl = () => {
    dragControlState.current = null;
  };

  const handleWheel = (event: React.WheelEvent) => {
    if (media?.type === "image" && media.ratio < 0.6 && scale <= 1) return;
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

  if (!media) return null;

  const ratio = media.ratio;
  const isTall = media.type === "image" && ratio < 0.6;
  const previewWidth = media.fitToViewport
    ? `min(75vw, calc(75vh * ${ratio}))`
    : isTall
      ? "min(50vw, 800px)"
      : `min(75vw, calc(75vh * ${ratio}))`;

  return (
    <div
      className="global-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={media.alt}
      onWheel={handleWheel}
    >
      <button
        className="global-lightbox__close"
        type="button"
        onClick={close}
        aria-label="关闭预览"
      >
        <X size={20} />
      </button>

      <div
        ref={stageRef}
        className={`global-lightbox__stage ${scale > 1 ? "is-zoomed" : ""} ${
          isTall && !media.fitToViewport ? "is-tall" : ""
        }`}
        onScroll={handleStageScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {media.type === "image" ? (
          <img
            className="global-lightbox__image"
            src={media.src}
            alt={media.alt}
            style={{
              width: previewWidth,
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
            }}
          />
        ) : (
          <video
            className="global-lightbox__image"
            src={media.src}
            controls
            autoPlay
            muted={media.muted}
            playsInline
            style={{
              width: previewWidth,
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
            }}
          />
        )}
      </div>

      {isTall && !media.fitToViewport && (
        <div
          ref={dragTrackRef}
          className="global-lightbox__drag"
          onPointerDown={handleDragControlPointerDown}
          onPointerMove={handleDragControlPointerMove}
          onPointerUp={endDragControl}
          onPointerCancel={endDragControl}
        >
          <span className="global-lightbox__drag-track" />
          <span
            className="global-lightbox__drag-thumb"
            style={{ top: `${scrollRatio * 100}%` }}
          />
        </div>
      )}

      <div className="global-lightbox__bar">
        <span>{media.alt || "媒体预览"}</span>
        <div className="global-lightbox__actions">
          <button
            type="button"
            onClick={() => setScale((current) => Math.min(MAX_SCALE, current + 0.25))}
            aria-label="放大"
          >
            <Plus size={18} />
          </button>
          <button
            type="button"
            onClick={() => setScale((current) => Math.max(MIN_SCALE, current - 0.25))}
            aria-label="缩小"
          >
            <Minus size={18} />
          </button>
          <button type="button" onClick={resetView} aria-label="重置缩放">
            <RotateCcw size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
