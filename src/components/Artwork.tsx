import type { Artwork } from "../data/artworks";

type ArtworkProps = {
  artwork: Artwork;
  className?: string;
  style?: React.CSSProperties;
};

export default function Artwork({ artwork, className = "", style }: ArtworkProps) {
  if (artwork.src) {
    return (
      <img
        className={className}
        src={artwork.src}
        alt={artwork.label}
        loading="lazy"
        style={{ aspectRatio: artwork.ratio, ...style }}
      />
    );
  }

  return (
    <div
      className={`${className} artwork-placeholder`}
      role="img"
      aria-label={artwork.label}
      style={{ aspectRatio: artwork.ratio, ...style }}
    >
      <span>{artwork.label}</span>
    </div>
  );
}
