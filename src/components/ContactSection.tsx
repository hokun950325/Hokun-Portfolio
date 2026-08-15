import { Mail, Phone } from "lucide-react";
import BorderGlow from "./BorderGlow";
import FadeIn from "./FadeIn";
import WeChatIcon from "./WeChatIcon";

const CONTACT_ITEMS = [
  {
    label: "手机",
    value: "13640238809",
    icon: Phone,
  },
  {
    label: "微信",
    value: "13640238809",
    icon: WeChatIcon,
  },
  {
    label: "邮箱",
    value: "284408852@qq.com",
    icon: Mail,
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen items-center overflow-hidden py-20"
    >
      <div className="page-shell grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn y={24}>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#5300bf]">
              联系方式
            </p>
            <h2 className="text-[clamp(3.5rem,9vw,9.5rem)] font-black uppercase leading-[0.88] text-[#D7E2EA]">
              LET&apos;S CREATE MEMORABLE VISUAL WORKS
            </h2>
          </div>
        </FadeIn>

        <FadeIn y={24} delay={0.15} className="w-full">
          <div className="mx-auto flex w-full max-w-[340px] flex-col rounded-[28px] border border-white/10 bg-white/[0.03] pt-4 px-6 pb-6 sm:pt-5 sm:px-8 sm:pb-8">
            <p className="flex h-10 items-center text-left text-xs uppercase tracking-[0.25em] text-[#5300bf]">
              CONTACT
            </p>
            <div className="flex flex-col gap-3">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <BorderGlow
                    key={item.label}
                    className="w-full"
                    borderRadius={16}
                    glowRadius={14}
                    glowIntensity={0.65}
                    backgroundColor="#0C0C0C"
                    colors={["#5300bf", "#f472b6", "#38bdf8"]}
                  >
                    <div className="flex items-center gap-4 px-4 py-3">
                      <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-[#5300bf]/15 text-white">
                        <Icon size={19} className="flex-none" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/60">
                          {item.label}
                        </p>
                        <p className="mt-1 truncate text-sm text-[#D7E2EA]">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </BorderGlow>
                );
              })}
            </div>

            <BorderGlow
              className="contact-qr-card mt-5 w-full"
              borderRadius={16}
              glowRadius={14}
              glowIntensity={0.65}
              backgroundColor="#0C0C0C"
              colors={["#5300bf", "#f472b6", "#38bdf8"]}
            >
              <img
                src="/images/contact-qr.png"
                alt="微信二维码"
                className="contact-qr__image aspect-square w-full rounded-2xl bg-white object-contain p-2"
              />
            </BorderGlow>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
