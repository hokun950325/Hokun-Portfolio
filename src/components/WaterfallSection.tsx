import { useState } from "react";
import { motion } from "framer-motion";
import { galleryArtworks } from "../data/artworks";
import Artwork from "./Artwork";
import BorderGlow from "./BorderGlow";
import Lightbox from "./Lightbox";
import WorkMarquee from "./WorkMarquee";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function WaterfallSection() {
  const [activeArtwork, setActiveArtwork] = useState<number | null>(null);
  const active = galleryArtworks.find((item) => item.id === activeArtwork) ?? null;

  return (
    <section className="gallery" id="gallery">
      <WorkMarquee />
      <div className="container">
        <motion.div
          className="gallery__head"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="section-eyebrow">03 / Gallery</p>
          <h2 className="gallery__title">More Work</h2>
          <p className="gallery__note">
            Click an image to open the full-screen preview. Placeholder assets will be
            replaced with the final photo set.
          </p>
        </motion.div>

        <div className="gallery__masonry">
          {galleryArtworks.map((artwork) => (
            <BorderGlow
              className="gallery__item"
              key={artwork.id}
              borderRadius={18}
              glowRadius={24}
              glowIntensity={0.7}
              backgroundColor="#121a32"
            >
              <button
                className="gallery__item-button"
                type="button"
                onClick={() => setActiveArtwork(artwork.id)}
                aria-label={`Open ${artwork.label}`}
              >
                <Artwork className="gallery__art" artwork={artwork} />
              </button>
            </BorderGlow>
          ))}
        </div>
      </div>

      {active ? <Lightbox artwork={active} onClose={() => setActiveArtwork(null)} /> : null}
    </section>
  );
}
