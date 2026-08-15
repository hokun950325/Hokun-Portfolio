import { Mail, Phone } from "lucide-react";
import BorderGlow from "./BorderGlow";
import FadeIn from "./FadeIn";
import TiltedCard from "./TiltedCard";
import WeChatIcon from "./WeChatIcon";

const ABOUT_TEXT =
  "拥有六年以上的设计经验，主导过品牌活动页、品牌自播间主视觉以及电商详情页、KV、主图等视觉项目。擅长将品牌、3D 与 AIGC 结合，帮助品牌建立统一且有记忆点的视觉形象。";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "284408852@qq.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "13640238809",
    icon: Phone,
  },
  {
    label: "微信",
    value: "13640238809",
    icon: WeChatIcon,
  },
];

const FOCUS_AREAS = [
  { value: "美术指导", label: "当前身份" },
  { value: "6+", label: "设计年限" },
  { value: "Brand/3D/AIGC", label: "技能模块" },
];

const ADVANTAGES = [
  "完整项目主导能力",
  "AIGC 设计提效",
  "设计管理统筹",
  "跨部门协同",
];

const EXPERIENCES = [
  {
    period: "2024.05 - 2026.05",
    company: "广州袋鼠妈妈集团",
    title: "美术指导",
    description:
      "负责品牌活动页与品牌自播间的主视觉设计，围绕活动主题和直播间氛围输出核心视觉方案，统筹页面主视觉、氛围道具与视觉延展，确保品牌调性一致并按时落地。",
  },
  {
    period: "2022.05 - 2024.05",
    company: "广州英氏启智科技有限公司",
    title: "高级设计师",
    description:
      "负责店铺整体页面设计，维护优化店铺 KV、详情、主图等。根据策划线框需求，设计符合产品卖点且具有品牌调性的新品详情。大促节点时，输出不同促销阶段的页面。",
  },
  {
    period: "2020.05 - 2022.05",
    company: "北京展远蓉华科技有限公司",
    title: "电商设计师",
    description:
      "负责店铺整体形象设计，维护优化网站 banner、图片等。电商活动促销期间，配合运营做促销宣传版面、推广宣传图等。根据促销节点，定期更新促销页面以及店铺主页。",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-20 sm:py-24 md:py-32"
    >
      <div className="page-shell relative z-10 grid gap-6 lg:grid-cols-[minmax(0,492px)_minmax(0,1fr)] lg:gap-6">
        <FadeIn y={24} className="w-full min-w-0 lg:h-full">
          <div className="h-full w-[65%] lg:w-full">
            <TiltedCard
              imageSrc="/images/hero-character.webp"
              altText="HOKUN portrait"
              captionText="ENFJ"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1}
              rotateAmplitude={12}
              showMobileWarning={false}
              showTooltip
            />
          </div>
        </FadeIn>

        <div className="flex min-w-0 flex-col justify-center gap-8">
          <FadeIn y={16} duration={0.5}>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#5300bf]">
              About me
            </p>
          </FadeIn>

          <FadeIn y={40} duration={0.7}>
            <h2 className="hero-heading whitespace-nowrap text-[clamp(2.2rem,5.5vw,5.5rem)] font-black uppercase leading-none tracking-tight">
              HI, i&apos;m HOKUN
            </h2>
          </FadeIn>

          <p className="max-w-[760px] text-[clamp(1rem,1.6vw,1.3rem)] font-medium leading-relaxed text-[#D7E2EA]">
            {ABOUT_TEXT}
          </p>

          <FadeIn y={24} delay={0.15}>
            <div className="grid gap-3 sm:grid-cols-3">
              {FOCUS_AREAS.map((item) => (
                <BorderGlow
                  key={item.label}
                  className="h-full"
                  borderRadius={16}
                  glowRadius={18}
                  glowIntensity={0.65}
                  backgroundColor="#0C0C0C"
                  colors={["#5300bf", "#f472b6", "#38bdf8"]}
                >
                  <div className="h-full p-5">
                    <span className="block break-words text-[clamp(1.3rem,2vw,2.4rem)] font-black leading-tight text-[#D7E2EA]">
                      {item.value}
                    </span>
                    <span className="mt-3 block text-xs uppercase tracking-widest text-[#D7E2EA]/60">
                      {item.label}
                    </span>
                  </div>
                </BorderGlow>
              ))}
            </div>
          </FadeIn>

          <FadeIn y={20} delay={0.18}>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#D7E2EA]/60">
                个人优势
              </p>
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                {ADVANTAGES.map((advantage) => (
                  <div
                    key={advantage}
                    className="flex h-full min-h-[48px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"
                  >
                    <span className="text-center text-sm leading-snug text-[#D7E2EA]">
                      {advantage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn y={20} delay={0.2} className="w-full min-w-0">
            <div className="grid gap-3 sm:grid-cols-3">
              {CONTACT_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <div
                    key={link.label}
                    className="flex h-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-sm text-[#D7E2EA] transition-colors duration-200 hover:bg-white/[0.07]"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Icon size={17} className="flex-none" />
                      <span className="truncate">{link.value}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </FadeIn>

        </div>
      </div>

      <div className="page-shell relative z-10 mt-24">
        <FadeIn y={20} delay={0.2}>
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-[#D7E2EA]/60">
            工作经历
          </p>
        </FadeIn>

        <div className="relative grid gap-8 sm:grid-cols-3">
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[7px] top-2 w-px bg-[#5300bf] shadow-[0_0_10px_rgba(83,0,191,0.7)] sm:left-0 sm:top-[14px] sm:h-px sm:w-full"
          />

          {EXPERIENCES.map((experience, index) => (
            <FadeIn key={experience.period} y={20} delay={0.25 + index * 0.1}>
              <div className="relative pl-8 sm:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border border-[#5300bf] bg-[#5300bf] shadow-[0_0_12px_rgba(83,0,191,0.85)] sm:top-[7px]"
                />
                <div className="sm:pt-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 flex-col">
                      <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60">
                        {experience.period}
                      </span>
                      <p className="mt-1 text-base text-[#D7E2EA]/80">
                        {experience.company}
                      </p>
                    </div>
                    <div className="inline-flex flex-none items-center rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2">
                      <h3 className="text-base font-medium uppercase tracking-wide text-[#D7E2EA]">
                        {experience.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-[#D7E2EA]/60">
                    {experience.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
