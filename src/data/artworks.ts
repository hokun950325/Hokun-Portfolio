export type Artwork = {
  id: number;
  label: string;
  ratio: string;
  ratioWidth: number;
  ratioHeight: number;
  src?: string;
};

export const carouselArtworks: Artwork[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  label: `Work ${String(index + 1).padStart(2, "0")}`,
  ratio: "4 / 3",
  ratioWidth: 4,
  ratioHeight: 3,
}));

export const galleryArtworks: Artwork[] = [
  { id: 1, label: "Gallery 01", ratio: "4 / 5", ratioWidth: 4, ratioHeight: 5 },
  { id: 2, label: "Gallery 02", ratio: "1 / 1", ratioWidth: 1, ratioHeight: 1 },
  { id: 3, label: "Gallery 03", ratio: "3 / 4", ratioWidth: 3, ratioHeight: 4 },
  { id: 4, label: "Gallery 04", ratio: "4 / 3", ratioWidth: 4, ratioHeight: 3 },
  { id: 5, label: "Gallery 05", ratio: "3 / 4", ratioWidth: 3, ratioHeight: 4 },
  { id: 6, label: "Gallery 06", ratio: "1 / 1", ratioWidth: 1, ratioHeight: 1 },
  { id: 7, label: "Gallery 07", ratio: "4 / 5", ratioWidth: 4, ratioHeight: 5 },
  { id: 8, label: "Gallery 08", ratio: "3 / 4", ratioWidth: 3, ratioHeight: 4 },
  { id: 9, label: "Gallery 09", ratio: "4 / 3", ratioWidth: 4, ratioHeight: 3 },
  { id: 10, label: "Gallery 10", ratio: "1 / 1", ratioWidth: 1, ratioHeight: 1 },
  { id: 11, label: "Gallery 11", ratio: "3 / 4", ratioWidth: 3, ratioHeight: 4 },
  { id: 12, label: "Gallery 12", ratio: "4 / 5", ratioWidth: 4, ratioHeight: 5 },
];

export const marqueeArtworks: Artwork[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 101,
  label: `Preview ${String(index + 1).padStart(2, "0")}`,
  ratio: "14 / 9",
  ratioWidth: 14,
  ratioHeight: 9,
}));
