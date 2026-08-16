import { useState } from "react";
import BorderGlow from "./BorderGlow";

type DetailPageShowcaseProps = {
  items: { src: string; label: string; thumb?: string }[];
};

export default function DetailPageShowcase({ items }: DetailPageShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mt-8 grid h-[calc(1286px-221px)] grid-cols-1 gap-6 pb-6 sm:mt-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)]">
      <BorderGlow
        className="detail-main-card h-full w-full"
        borderRadius={24}
        glowRadius={22}
        glowIntensity={0.7}
        backgroundColor="#0a0713"
        colors={["#5300bf", "#f472b6", "#38bdf8"]}
      >
        <div className="relative aspect-[9/16] h-full w-full max-h-none overflow-hidden rounded-[24px]">
          <img
            src={items[activeIndex].src}
            alt={items[activeIndex].label}
            loading="lazy"
            decoding="async"
            className="detail-main__image absolute inset-0 h-full w-full object-cover object-top"
          />
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
            {items[activeIndex].label}
          </span>
        </div>
      </BorderGlow>

      <div className="grid h-full grid-cols-4 grid-rows-2 gap-3 overflow-hidden pr-1">
        {items.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`detail-thumb-card relative h-full w-full overflow-hidden rounded-2xl border text-left transition-colors ${
              activeIndex === index
                ? "border-white/60 bg-white/[0.08]"
                : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
            }`}
          >
            <img
              src={item.thumb ?? item.src}
              alt={item.label}
              loading="lazy"
              decoding="async"
              className="detail-thumb__image pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[0.6rem] uppercase tracking-widest text-white">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
