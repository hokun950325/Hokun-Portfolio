import BorderGlow from "./BorderGlow";

const PROJECT_BACKGROUND =
  "2025年8月，袋鼠妈妈集团正式官宣TOP登陆少年成为品牌代言人。作为品牌年度重要传播节点，本次官宣以代言人影响力为核心，面向年轻家庭与新生代消费群体建立品牌沟通，并为后续品牌营销动作奠定视觉基础。项目覆盖线上全渠道传播，需要在统一品牌调性下完成高效、一致、可延展的视觉表达。";

const MY_ROLE =
  "作为美术指导，我以核心参与者身份全程加入TOP登陆少年品牌代言人官宣项目。参与官宣阶段的视觉创意与输出，并配合团队推进视觉方案在线上全渠道落地。通过本次项目，我积累了代言人官宣从创意、设计到全渠道传播落地的完整项目经验，也提升了在多方协作、统一视觉表达和高效执行中的判断力。";

export default function AmbassadorShowcase() {
  return (
    <div className="mt-8 h-[calc(1286px-221px)] overflow-hidden pb-6 sm:mt-10">
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <div className="flex h-full min-h-0 flex-col gap-4">
          <BorderGlow
            className="min-h-[160px]"
            borderRadius={20}
            glowRadius={20}
            glowIntensity={0.7}
            backgroundColor="#0C0C0C"
            colors={["#5300bf", "#f472b6", "#38bdf8"]}
          >
            <div className="flex h-full flex-col justify-center p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#5300bf]">
                    项目背景
                  </p>
                  <p className="mt-2 line-clamp-5 text-xs leading-relaxed text-[#D7E2EA]/70">
                    {PROJECT_BACKGROUND}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#5300bf]">
                    我的角色
                  </p>
                  <p className="mt-2 line-clamp-5 text-xs leading-relaxed text-[#D7E2EA]/70">
                    {MY_ROLE}
                  </p>
                </div>
              </div>
            </div>
          </BorderGlow>

          <div className="flex min-h-0 flex-1 flex-col rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-[#5300bf]">
              视觉延展
            </p>
            <div className="mt-3 grid min-h-0 flex-1 grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] gap-3">
                <div className="ambassador-ext-card flex min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0C0C0C]">
                  <img
                    src="/images/ambassador/ambassador-banner.webp"
                    alt="袋鼠妈妈青少年洗护全渠道banner"
                    className="ambassador-ext__image min-h-0 w-full flex-1 object-cover object-top"
                  />
                </div>

                <div className="flex min-h-0 flex-col gap-3">
                  <div className="grid min-h-0 grid-cols-2 gap-3">
                    <div className="ambassador-ext-card relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-[#0C0C0C]">
                      <img
                        src="/images/ambassador/ambassador-main-template.webp"
                        alt="袋鼠妈妈青春洗护套组"
                        className="ambassador-ext__image absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div className="ambassador-ext-card relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-[#0C0C0C]">
                      <img
                        src="/images/ambassador/ambassador-cover-1.webp"
                        alt="TOP登陆少年组合强势官宣"
                        className="ambassador-ext__image absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="ambassador-ext-card relative min-h-0 flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#0C0C0C]">
                    <img
                      src="/images/ambassador/ambassador-cover-2.webp"
                      alt="清爽控油屑洗出蓬松发丝"
                      className="ambassador-ext__image absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
        </div>

        <BorderGlow
          className="ambassador-live-card h-full"
          borderRadius={24}
          glowRadius={22}
          glowIntensity={0.75}
          backgroundColor="#0a0713"
          colors={["#5300bf", "#f472b6", "#38bdf8"]}
        >
          <div className="relative h-full min-h-0 overflow-hidden rounded-[24px]">
            <img
              src="/images/ambassador/ambassador-live.webp?v=2"
              alt="袋鼠妈妈青少年洗护系列全球代言人"
              className="ambassador-live__image absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>
        </BorderGlow>
      </div>
    </div>
  );
}
