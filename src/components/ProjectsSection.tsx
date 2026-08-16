import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { detailCardThumbImages, projects, type Project } from "../data/portfolio";
import AIGCShowcase from "./AIGCShowcase";
import AmbassadorShowcase from "./AmbassadorShowcase";
import BorderGlow from "./BorderGlow";
import DetailPageShowcase from "./DetailPageShowcase";
import DriftWall from "./DriftWall";
import EcommerceDetailShowcase from "./EcommerceDetailShowcase";
import FadeIn from "./FadeIn";
import LiveProjectButton from "./LiveProjectButton";
import LiveRoomShowcase from "./LiveRoomShowcase";
import Masonry from "./Masonry";

type ProjectCardProps = {
  project: Project;
  index: number;
};

function ProjectCard({ project, index }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const visibleProjectCount = projects.filter((project) => !project.hidden).length;
  const targetScale = Math.max(0.82, 1 - (visibleProjectCount - 1 - index) * 0.045);
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const media =
    project.media ??
    project.images.map((src) => ({
      type: "image" as const,
      src,
    }));
  const staticImages = media
    .filter((item) => item.type === "image")
    .map((item) => item.src);
  const masonryHeights = [900, 620, 760, 860, 680, 720, 980, 640, 800, 900, 700, 780];
  const masonryItems = staticImages.map((src, index) => ({
    id: String(index + 1),
    img: src,
    height: masonryHeights[index % masonryHeights.length],
  }));
  const driftItems = project.images.map((src, index) => ({
    image: src,
    title: `主图 ${String(index + 1).padStart(2, "0")}`,
  }));
  const detailItems = project.detailLabels
    ? project.detailLabels.map((label, index) => ({
        src: project.images[index % project.images.length],
        thumb: detailCardThumbImages[index % detailCardThumbImages.length],
        label,
      }))
    : project.images.map((src, index) => ({
        src,
        label: `详情 ${String(index + 1).padStart(2, "0")}`,
      }));
  const dynamicVideos = media
    .filter((item) => item.type === "video")
    .slice(0, 2);
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <div
      ref={containerRef}
      id={`project-${String(index + 1).padStart(2, "0")}`}
      className="relative scroll-mt-24 min-h-[95vh]"
    >
      <motion.div
        className="sticky will-change-transform"
        style={{
          top: `${index * 28 + 12}px`,
          scale,
          transformOrigin: "top center",
          zIndex: projects.length - index,
        }}
      >
        <BorderGlow
          className={`project-card-glow${index > 0 ? " project-card-glow--fixed" : ""}${
            index === 1 || index === 2 || index === 3 || index === 4 || index === 5
              ? " project-card-glow--wall"
              : ""
          }`}
          borderRadius={40}
          glowRadius={34}
          glowIntensity={0.85}
          backgroundColor="#0C0C0C"
        >
          <div className="p-6 sm:p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 md:gap-8">
            <div className="flex flex-wrap items-stretch gap-4 sm:gap-6 md:gap-8">
              <span className="flex items-center text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#D7E2EA]">
                0{index + 1}
              </span>
              <div className="flex flex-col justify-center">
                <p className="text-xs font-medium uppercase tracking-widest text-[#5300bf] sm:text-sm">
                  {project.category}
                </p>
                <h3 className="mt-2 text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight text-[#D7E2EA]">
                  {project.name}
                </h3>
              </div>
            </div>
            <LiveProjectButton />
          </div>

          {index === 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)]">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#D7E2EA]/60">
                  动态海报
                </p>
                <BorderGlow
                  className="dynamic-poster-card w-full max-w-[560px]"
                  borderRadius={24}
                  glowRadius={22}
                  glowIntensity={0.7}
                  backgroundColor="#0a0713"
                  colors={["#5300bf", "#f472b6", "#38bdf8"]}
                >
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[24px] bg-[#0a0713]">
                    {dynamicVideos.map((item, videoIndex) =>
                      videoIndex === activeVideo ? (
                        <video
                          key={item.src}
                          src={item.src}
                          autoPlay
                          muted
                          preload="metadata"
                          playsInline
                          onEnded={() =>
                            setActiveVideo((activeVideo + 1) % dynamicVideos.length)
                          }
                          className="dynamic-poster__video absolute inset-0 h-full w-full object-cover"
                        />
                      ) : null,
                    )}
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveVideo((activeVideo - 1 + dynamicVideos.length) % dynamicVideos.length)
                        }
                        aria-label="上一个动态海报"
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-white hover:text-black"
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveVideo((activeVideo + 1) % dynamicVideos.length)}
                        aria-label="下一个动态海报"
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-white hover:text-black"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </BorderGlow>
              </div>

              <div className="flex h-full min-w-0 flex-col">
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#D7E2EA]/60">
                  静态海报
                </p>
                <div className="waterfall-scroll min-h-0 flex-1 pr-2">
                  <Masonry
                    items={masonryItems}
                    animateFrom="bottom"
                    blurToFocus
                    scaleOnHover
                    hoverScale={0.95}
                  />
                </div>
              </div>
            </div>
          ) : index === 1 ? (
            <LiveRoomShowcase
              images={project.images}
              seriesVideos={project.seriesVideos}
              otherVideos={project.otherVideos}
              otherImages={project.otherImages}
            />
          ) : index === 2 ? (
            <DetailPageShowcase items={detailItems} />
          ) : index === 3 ? (
            <div className="mt-8 h-[calc(1286px-221px)] sm:mt-10">
              <DriftWall
                items={driftItems}
                columns={4}
                tileWidth={200}
                tileHeight={202}
                gap={18}
                tilt={0}
                turn={0}
                speed={42}
                pauseOnHover
                dim={0.9}
                overlayColor="rgba(0, 0, 0, 0.04)"
              />
            </div>
          ) : index === 4 ? (
            <AmbassadorShowcase />
          ) : index === 5 ? (
            <AIGCShowcase />
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-4 md:gap-5">
              <div className="flex h-full flex-col gap-3 sm:gap-4 md:gap-5">
                <img
                  src={project.images[0]}
                  alt={`${project.name} visual one`}
                  loading="lazy"
                  className="min-h-[clamp(160px,20vw,300px)] w-full flex-1 rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
                />
                <img
                  src={project.images[1]}
                  alt={`${project.name} visual two`}
                  loading="lazy"
                  className="min-h-[clamp(220px,28vw,440px)] w-full flex-1 rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
                />
              </div>
              <img
                src={project.images[2]}
                alt={`${project.name} visual three`}
                loading="lazy"
                className="h-full min-h-[clamp(460px,56vw,820px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              />
            </div>
          )}
          </div>
        </BorderGlow>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const visibleProjects = projects.filter((project) => !project.hidden);

  return (
    <section
      id="projects"
      className="relative z-20 -mt-10 rounded-t-[40px] pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:pt-28"
    >
      <div className="page-shell">
        <FadeIn y={40}>
          <h2 className="hero-heading mb-14 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
            视觉作品
          </h2>
        </FadeIn>
        <div>
          {visibleProjects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
