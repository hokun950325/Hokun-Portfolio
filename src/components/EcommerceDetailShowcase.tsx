import { useState } from "react";

type EcommerceDetailShowcaseProps = {
  images: string[];
};

export default function EcommerceDetailShowcase({
  images,
}: EcommerceDetailShowcaseProps) {
  const items = Array.from(
    { length: Math.max(6, images.length) },
    (_, index) => images[index % images.length],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div className="relative aspect-[9/16] w-full max-h-[760px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0713]">
        <img
          src={items[activeIndex]}
          alt={`详情页 ${activeIndex + 1}`}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
          详情页 {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto lg:max-h-[760px] lg:flex-col lg:overflow-y-auto lg:pr-1">
        {items.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`flex flex-none flex-col gap-2 rounded-2xl border p-2 text-left transition-colors ${
              activeIndex === index
                ? "border-white/60 bg-white/[0.08]"
                : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
            }`}
          >
            <img
              src={src}
              alt={`详情页缩略图 ${index + 1}`}
              className="pointer-events-none aspect-[9/16] w-16 object-cover"
            />
            <span className="text-[0.65rem] uppercase tracking-widest text-[#D7E2EA]/70">
              详情 {String(index + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
