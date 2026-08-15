import { useEffect, useState } from "react";
import BorderGlow from "./BorderGlow";

const SECTIONS = [
  { id: "hero", index: "01", label: "Home" },
  { id: "about", index: "02", label: "About" },
  { id: "work", index: "03", label: "Work" },
  { id: "gallery", index: "04", label: "Gallery" },
  { id: "contact", index: "05", label: "Contact" },
];

export default function FloatingNav() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const sections = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (element): element is HTMLElement => element !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="floating-nav" aria-label="Quick section navigation">
      {SECTIONS.map((section) => (
        <BorderGlow
          key={section.id}
          className="floating-nav__glow-item"
          edgeSensitivity={24}
          glowRadius={16}
          glowIntensity={0.7}
          borderRadius={999}
          backgroundColor="transparent"
        >
          <a
            className={`floating-nav__item ${activeId === section.id ? "is-active" : ""}`}
            href={`#${section.id}`}
            aria-label={`Go to ${section.label}`}
            aria-current={activeId === section.id ? "true" : undefined}
          >
            <span className="floating-nav__index">{section.index}</span>
            <span className="floating-nav__label">{section.label}</span>
          </a>
        </BorderGlow>
      ))}
    </nav>
  );
}
