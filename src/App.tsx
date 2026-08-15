import { MotionConfig } from "framer-motion";
import HeroSection from "./components/HeroSection";
import RightNav from "./components/RightNav";
import GlobalLightbox from "./components/GlobalLightbox";
import Grainient from "./components/Grainient";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative min-h-screen overflow-x-clip bg-[#0C0C0C] font-sans text-[#D7E2EA]"
        style={{ overflowX: "clip" }}
      >
        <Grainient
          className="site-background"
          color1="#1e0044"
          color2="#000000"
          color3="#3e0050"
          timeSpeed={0.25}
          colorBalance={0.0}
          warpStrength={1.0}
          warpFrequency={5.0}
          warpSpeed={2.0}
          warpAmplitude={50.0}
          blendAngle={0.0}
          blendSoftness={0.05}
          rotationAmount={500.0}
          noiseScale={2.0}
          grainAmount={0.1}
          grainScale={2.0}
          grainAnimated={false}
          contrast={1.5}
          gamma={1.0}
          saturation={1.0}
          centerX={0.0}
          centerY={0.0}
          zoom={0.9}
        />
        <main className="relative z-10">
          <RightNav />
          <HeroSection />
          <MarqueeSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <GlobalLightbox />
      </div>
    </MotionConfig>
  );
}
