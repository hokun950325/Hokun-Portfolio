import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { marqueeArtworks } from "../data/artworks";
import Artwork from "./Artwork";

const ROW_A = marqueeArtworks.slice(0, 6);
const ROW_B = marqueeArtworks.slice(6, 12);

export default function WorkMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xRowA = useTransform(scrollYProgress, [0, 1], [0, -640]);
  const xRowB = useTransform(scrollYProgress, [0, 1], [-640, 0]);

  return (
    <div className="work-marquee" ref={ref} aria-hidden="true">
      <motion.div className="work-marquee__row" style={{ x: xRowA }}>
        {[...ROW_A, ...ROW_A, ...ROW_A].map((artwork, index) => (
          <Artwork
            className="work-marquee__tile"
            artwork={artwork}
            key={`${artwork.id}-${index}`}
          />
        ))}
      </motion.div>
      <motion.div
        className="work-marquee__row work-marquee__row--reverse"
        style={{ x: xRowB }}
      >
        {[...ROW_B, ...ROW_B, ...ROW_B].map((artwork, index) => (
          <Artwork
            className="work-marquee__tile"
            artwork={artwork}
            key={`${artwork.id}-${index}`}
          />
        ))}
      </motion.div>
    </div>
  );
}
