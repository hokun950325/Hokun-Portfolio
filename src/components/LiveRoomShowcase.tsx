import { useState } from "react";
import BorderGlow from "./BorderGlow";
import ViewportVideo from "./ViewportVideo";

type LiveRoomShowcaseProps = {
  images: string[];
  seriesVideos?: { src: string; label: string }[];
  otherVideos?: { src: string; label: string }[];
  otherImages?: { src: string; label: string }[];
};

type LiveItem = {
  src: string;
  label: string;
  type: "video" | "image";
};

export default function LiveRoomShowcase({
  images,
  seriesVideos,
  otherVideos,
  otherImages,
}: LiveRoomShowcaseProps) {
  const items: LiveItem[] = Array.from({ length: 10 }, (_, index) => {
    const isSeries = index < 4;
    const otherIndex = index - 4;
    const otherVideoCount = otherVideos?.length ?? 0;
    const otherImage = otherImages?.[otherIndex - otherVideoCount];
    const label = isSeries
      ? seriesVideos?.[index]?.label ?? `系列 ${String(index + 1).padStart(2, "0")}`
      : otherVideos?.[otherIndex]?.label ??
        otherImage?.label ??
        `直播间 ${String(index + 1).padStart(2, "0")}`;

    if (isSeries && seriesVideos?.[index]) {
      return { src: seriesVideos[index].src, label, type: "video" };
    }

    if (!isSeries && otherVideos?.[otherIndex]) {
      return { src: otherVideos[otherIndex].src, label, type: "video" };
    }

    if (!isSeries && otherImage) {
      return {
        src: otherImage.src,
        label,
        type: "image",
      };
    }

    return {
      src: images[index % images.length],
      label,
      type: "image",
    };
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const seriesItems = items.slice(0, 4);
  const otherItems = items.slice(4);

  const renderItem = (item: LiveItem, index: number, className = "") => (
    <button
      key={`${item.src}-${index}`}
      type="button"
      onClick={() => setActiveIndex(items.indexOf(item))}
      className={`live-thumb-card relative h-full w-full overflow-hidden rounded-2xl border text-left transition-colors ${className} ${
        items[activeIndex] === item
          ? "border-white/60 bg-white/[0.08]"
          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
      }`}
    >
      {item.type === "video" ? (
        <ViewportVideo
          src={item.src}
          className="live-thumb__video pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          decoding="async"
          className="live-thumb__image pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      )}
      <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[0.6rem] uppercase tracking-widest text-white">
        {item.label}
      </span>
    </button>
  );

  return (
    <div className="mt-8 grid h-[calc(1286px-221px)] grid-cols-1 gap-6 pb-6 sm:mt-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)]">
      <BorderGlow
        className="live-main-card h-full w-full"
        borderRadius={24}
        glowRadius={22}
        glowIntensity={0.7}
        backgroundColor="#0a0713"
        colors={["#5300bf", "#f472b6", "#38bdf8"]}
      >
        <div className="relative aspect-[9/16] h-full w-full overflow-hidden rounded-[24px]">
          {items[activeIndex].type === "video" ? (
            <video
              key={items[activeIndex].src}
              src={items[activeIndex].src}
              autoPlay
              muted
              loop
              preload="metadata"
              playsInline
              className="live-main__video absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <img
              src={items[activeIndex].src}
              alt={items[activeIndex].label}
              loading="lazy"
              decoding="async"
              className="live-main__image absolute inset-0 h-full w-full object-cover object-top"
            />
          )}
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
            {items[activeIndex].label}
          </span>
        </div>
      </BorderGlow>

      <div className="flex h-full flex-col justify-between gap-4 overflow-hidden pr-1">
        <div className="grid grid-cols-4 gap-3">
          {seriesItems.map((item, index) => renderItem(item, index, "aspect-[3/4]"))}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-3">
          {otherItems.map((item, index) =>
            renderItem(item, index + seriesItems.length, "h-full w-full"),
          )}
        </div>
      </div>
    </div>
  );
}
