const PROMPT =
  "Prompt：以九宫格分镜图为参考，按左上到右下顺序生成一条 9:16 竖屏产品视频，时长 10-15 秒。产品是 kangaroo mommy 夏季晒后舒缓面霜，透明啫喱质地，类似浆糊、绵密细腻、不易流动。镜头依次为：全景开场、环绕旋转、俯视开盖、探入罐口、挖取膏体、质地微距、低角度水珠、涂抹后拉远、全景收尾。保持同一罐产品、同一浅色场景、同一光线，前后画面连贯。强调晒后舒缓，不出现人物面部，只保留手部局部，品牌名只保留在罐身上，不额外生成文字。";

export default function AIGCShowcase() {
  return (
    <div className="mt-8 h-[calc(1286px-221px)] overflow-hidden pb-6 sm:mt-10">
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="grid min-h-0 grid-cols-1 gap-4 lg:grid-rows-[auto_auto_minmax(0,1fr)]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-[clamp(1.8rem,3.5vw,3.2rem)] font-medium uppercase leading-tight text-[#D7E2EA]">
              AI全流程视频制作
            </h3>
            <p className="mt-3 text-sm text-[#D7E2EA]/70">
              产品精修白底图 → AI九宫格分镜生成 → 最终输出
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#D7E2EA]/75">
              {PROMPT}
            </p>
          </div>

          <div className="aigc-media-card relative aspect-[762/265] overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C0C]">
            <img
              src="/images/aigc/aigc-01.jpg"
              alt="AIGC九宫格分镜"
              className="aigc-media__image absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="aigc-media-card relative aspect-[1152/2048] min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C0C] lg:aspect-auto lg:h-full">
            <img
              src="/images/aigc/aigc-02.jpg"
              alt="AIGC产品精修白底图"
              className="aigc-media__image absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="aigc-media-card relative aspect-[9/16] min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-black lg:aspect-auto lg:h-full">
            <video
              src="/videos/aigc/aigc-product.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="aigc-media__video absolute inset-0 h-full w-full object-cover"
            />
        </div>
      </div>
    </div>
  );
}
