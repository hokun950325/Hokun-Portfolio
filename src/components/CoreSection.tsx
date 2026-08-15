import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { carouselArtworks } from "../data/artworks";
import Artwork from "./Artwork";
import BorderGlow from "./BorderGlow";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function CoreSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  const scrollBySlide = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.querySelector<HTMLElement>(".core__slide");
    const step = slide ? slide.offsetWidth + 16 : track.clientWidth * 0.7;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  const updateCurrentSlide = () => {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.querySelector<HTMLElement>(".core__slide");
    const step = slide ? slide.offsetWidth + 16 : track.clientWidth * 0.7;
    const next = Math.min(
      carouselArtworks.length,
      Math.max(1, Math.round(track.scrollLeft / step) + 1),
    );
    setCurrentSlide(next);
  };

  return (
    <section className="core stack-section" id="work">
      <div className="core__inner container">
        <motion.div
          className="core__head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div>
            <p className="section-eyebrow">02 / Selected Work</p>
            <h2 className="core__title">Core Work</h2>
          </div>

          <div className="core__meta">
            <span>
              {String(currentSlide).padStart(2, "0")} / 06
            </span>
            <div className="core__controls">
              <BorderGlow
                className="core__control-glow"
                borderRadius={999}
                glowRadius={12}
                glowIntensity={0.7}
                backgroundColor="transparent"
              >
                <button type="button" aria-label="Previous work" onClick={() => scrollBySlide(-1)}>
                  <ArrowLeft size={18} />
                </button>
              </BorderGlow>
              <BorderGlow
                className="core__control-glow"
                borderRadius={999}
                glowRadius={12}
                glowIntensity={0.7}
                backgroundColor="transparent"
              >
                <button type="button" aria-label="Next work" onClick={() => scrollBySlide(1)}>
                  <ArrowRight size={18} />
                </button>
              </BorderGlow>
            </div>
          </div>
        </motion.div>

        <div className="core__viewport" ref={trackRef} onScroll={updateCurrentSlide}>
          <div className="core__track">
            {carouselArtworks.map((artwork, index) => (
              <BorderGlow
                className="core__slide"
                key={artwork.id}
                borderRadius={22}
                glowRadius={22}
                glowIntensity={0.75}
                backgroundColor="#121a32"
              >
                <article className="core__slide-body">
                  <Artwork className="core__art" artwork={artwork} />
                  <div className="core__slide-meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{artwork.label}</span>
                  </div>
                </article>
              </BorderGlow>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
