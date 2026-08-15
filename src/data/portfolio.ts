export const aboutDecorations = [
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
    className:
      "left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]",
    delay: 0.1,
    x: -80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
    className:
      "bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]",
    delay: 0.25,
    x: -80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
    className:
      "right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]",
    delay: 0.15,
    x: 80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
    className:
      "bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]",
    delay: 0.3,
    x: 80,
  },
];

export const services = [
  {
    number: "01",
    name: "3D 建模",
    description:
      "创建符合客户需求的高细节模型、角色或环境，适用于游戏、产品和可视化项目。",
  },
  {
    number: "02",
    name: "渲染",
    description:
      "通过定制灯光、材质与纹理，输出高质量逼真渲染，让设计概念真正落地。",
  },
  {
    number: "03",
    name: "动态设计",
    description:
      "通过动态动画与视觉特效，为品牌、产品和数字体验注入节奏与叙事感。",
  },
  {
    number: "04",
    name: "品牌设计",
    description:
      "从标志到完整品牌系统，构建统一、清晰且令人难忘的视觉识别。",
  },
  {
    number: "05",
    name: "网页设计",
    description:
      "设计简洁、现代且注重转化的网站，关注版式、字体与用户体验。",
  },
];

export type ProjectMedia = {
  type: "video" | "image";
  src: string;
};

export type Project = {
  name: string;
  category: string;
  images: string[];
  media?: ProjectMedia[];
  seriesVideos?: { src: string; label: string }[];
  otherVideos?: { src: string; label: string }[];
  otherImages?: { src: string; label: string }[];
  detailLabels?: string[];
  hidden?: boolean;
  url: string;
};

const pageMainStaticImages = Array.from(
  { length: 16 },
  (_, index) => `/images/kv/kv-${String(index + 1).padStart(2, "0")}.webp`,
);

const mainProjectImages = Array.from(
  { length: 16 },
  (_, index) => `/images/main/main-${String(index + 1).padStart(2, "0")}.webp`,
);

const detailProjectImages = Array.from(
  { length: 8 },
  (_, index) => `/images/detail/detail-${String(index + 1).padStart(2, "0")}.jpg`,
);

const marqueeImagePool = [
  ...pageMainStaticImages,
  "/images/live/live-room-01.webp",
  "/images/live/live-room-02.webp",
  "/images/live/live-room-03.webp",
  ...detailProjectImages,
  ...mainProjectImages,
];

function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

const shuffledMarqueeImages = shuffle(marqueeImagePool);

export const marqueeRowA = shuffledMarqueeImages.slice(0, 12);
export const marqueeRowB = shuffledMarqueeImages.slice(12, 24);

const detailProjectLabels = [
  "儿童双抗牙膏",
  "儿童多效洗发水",
  "婴儿爽身乳",
  "洗衣皂",
  "祛痘精华液",
  "防晒啫喱",
  "双萃身体乳",
  "燕窝精华",
];

const pageMainMedia: ProjectMedia[] = [
  { type: "video", src: "/videos/kv2.mp4" },
  { type: "video", src: "/videos/kv1.mp4" },
  ...pageMainStaticImages.map((src) => ({
    type: "image" as const,
    src,
  })),
];

export const projects: Project[] = [
  {
    name: "页面主视觉",
    category: "Page Main Visual",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
    ],
    media: pageMainMedia,
    url: "#",
  },
  {
    name: "直播间＆氛围道具",
    category: "Live Streaming & Atmosphere Props",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
    ],
    seriesVideos: [
      { src: "/videos/live/kangaroo-study.mp4", label: "直播氛围道具-学习" },
      { src: "/videos/live/kangaroo-skateboard.mp4", label: "直播氛围道具-玩滑板" },
      { src: "/videos/live/kangaroo-badminton.mp4", label: "直播氛围道具-打羽毛球" },
      { src: "/videos/live/kangaroo-pencil.mp4", label: "直播氛围道具-铅笔旋转" },
    ],
    otherVideos: [
      { src: "/videos/live/room-toothpaste.mp4", label: "儿童牙膏直播间" },
      { src: "/videos/live/room-birdsnest.mp4", label: "燕窝直播间" },
      { src: "/videos/live/room-sunscreen.mp4", label: "青少年防晒直播间" },
    ],
    otherImages: [
      { src: "/images/live/live-room-02.webp", label: "儿童牙膏直播间" },
      { src: "/images/live/live-room-01.webp", label: "燕窝直播间" },
      { src: "/images/live/live-room-03.webp", label: "青少年洗发水直播间" },
    ],
    url: "#",
  },
  {
    name: "详情页",
    category: "Detail Page",
    images: detailProjectImages,
    detailLabels: detailProjectLabels,
    url: "#",
  },
  {
    name: "主图＆推广图",
    category: "Main Images & Promotion",
    images: mainProjectImages,
    url: "#",
  },
  {
    name: "代言人项目",
    category: "Brand Ambassador Project",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
    ],
    url: "#",
  },
  {
    name: "AIGC产品视频",
    category: "AIGC Product Video",
    images: [
      mainProjectImages[0],
      mainProjectImages[1],
      mainProjectImages[2],
    ],
    url: "#",
  },
];
