import { useEffect, useState } from "react";

type NavLink = {
  id: string;
  index: string;
  lines?: string[];
  label: string;
};

const LINKS: NavLink[] = [
  { id: "hero", index: "首页", label: "首页" },
  { id: "about", index: "关于我", label: "关于我" },
  { id: "projects", index: "视觉作品", lines: ["视觉", "作品"], label: "视觉作品" },
  { id: "contact", index: "联系我", label: "联系我" },
];

export default function RightNav() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const ids = LINKS.map((link) => link.id);

    const updateActive = () => {
      const marker = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= marker) {
          current = id;
        }
      }
      setActiveId(current);
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        updateActive();
        raf = 0;
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <nav className="right-nav" aria-label="网站导航">
      {LINKS.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className={`right-nav__link ${activeId === link.id ? "is-active" : ""}`}
          aria-current={activeId === link.id ? "true" : undefined}
          title={link.label}
        >
          <span className="right-nav__index flex flex-col items-center leading-none">
            {link.lines
              ? link.lines.map((line) => <span key={line}>{line}</span>)
              : link.index}
          </span>
          <span className="right-nav__label">{link.label}</span>
        </a>
      ))}
    </nav>
  );
}
