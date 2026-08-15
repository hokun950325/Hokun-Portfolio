import { useEffect, useRef } from "react";

const HERO_BACKGROUND_SRC = "/videos/hero-background.mp4";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.load();
  }, []);

  return (
    <section id="hero" className="relative flex min-h-screen flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
      <video
        ref={videoRef}
        className="hero-background__video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={HERO_BACKGROUND_SRC} type="video/mp4" />
      </video>
      <div className="hero-background__overlay" aria-hidden="true" />

    </section>
  );
}
