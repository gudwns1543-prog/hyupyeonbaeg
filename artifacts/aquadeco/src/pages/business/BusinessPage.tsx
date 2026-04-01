import { Link, useParams } from "wouter";
import { cn } from "@/lib/utils";

type Section = "hinoki" | "production" | "care" | "certificate";

const TABS: { key: Section; label: string }[] = [
  { key: "hinoki", label: "히노끼란" },
  { key: "production", label: "제작방식" },
  { key: "care", label: "관리방법" },
  { key: "certificate", label: "원산지증명" },
];

function HinokiSection() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">히노끼(편백)란?</h2>
        <p className="text-muted-foreground leading-relaxed">
          히노끼(Hinoki, 편백)는 일본에서 자라는 침엽수로, 특유의 향기와 탁월한 항균·방충 효과로 예로부터 귀하게 사용되어 온 목재입니다.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6bf89575469c9.jpg"
          alt="히노끼 욕조"
          className="rounded-2xl shadow-lg w-full h-80 object-cover"
        />
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">피톤치드 효과</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              히노끼는 편백나무과에 속하는 나무로, 피톤치드(Phytoncide)라는 천연 항균 물질을 다량 함유하고 있습니다. 피톤치드는 스트레스 호르몬을 감소시키고 혈압을 낮추며, 면역력을 높이는 데 도움을 줍니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">자연 방부력</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              히노끼에는 알파피넨, 리모넨 등의 천연 항균 성분이 풍부하게 함유되어 있어, 별도의 방부 처리 없이도 수십 년간 사용할 수 있습니다. 일본의 대표적인 신사, 사찰 등에 히노끼가 사용된 이유도 바로 이 때문입니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">정신 안정 효과</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              히노끼 욕조에서 목욕을 하면 나무 고유의 향기가 온몸을 감싸며 긴장을 완화하고 마음을 안정시켜 줍니다. 일상의 피로를 자연스럽게 풀어주는 최고의 입욕 경험을 제공합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { title: "항균·탈취", desc: "천연 성분으로 욕실을 위생적으로 유지" },
          { title: "혈액순환", desc: "온욕과 피톤치드의 시너지 효과" },
          { title: "피로회복", desc: "하루의 피로를 한 번에 풀어주는 효과" },
          { title: "면역력 강화", desc: "꾸준한 사용으로 면역력 향상" },
        ].map((item, i) => (
          <div key={i} className="bg-stone-50 rounded-xl p-6 text-center">
            <h4 className="font-bold text-foreground mb-2 text-sm">{item.title}</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductionSection() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">제작방식</h2>
        <p className="text-muted-foreground leading-relaxed">
          휴편백은 두 가지 방수 제작 방식을 제공합니다. 고객의 니즈와 욕실 환경에 맞게 최적의 방식을 선택하세요.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
          <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-6">1</div>
          <h3 className="text-2xl font-bold mb-4">FRP 방수 방식</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            FRP(Fiber-Reinforced Plastic, 유리섬유강화플라스틱)를 내부에 코팅하여 방수 처리하는 방식입니다. 내구성이 높고 유지보수가 쉬우며, 욕조 내부를 완벽하게 방수 처리합니다.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["강력한 방수 성능", "내구성이 뛰어남", "유지보수 용이", "비교적 합리적인 가격"].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
          <div className="bg-amber-100 text-amber-700 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-6">2</div>
          <h3 className="text-2xl font-bold mb-4">짜맞춤 방식</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            못이나 접착제를 사용하지 않고 나무의 결을 이용한 전통 짜맞춤 방식으로 제작합니다. 히노끼 나무 자체의 방부력을 최대한 살리며, 장인의 숙련된 기술이 필요한 고급 제작 방식입니다.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["전통 장인 기법", "나무 자체 방부력 활용", "친환경 제작 방식", "반영구적 사용 가능"].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-stone-800 text-white rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold mb-3">어떤 방식이 나에게 맞을까요?</h3>
        <p className="text-stone-300 text-sm mb-6">욕실 환경, 예산, 선호도에 따라 최적의 방식을 추천해 드립니다. 무료 상담을 신청하세요.</p>
        <Link href="/inquiry">
          <button className="bg-white text-stone-800 px-8 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors">
            무료 상담 신청
          </button>
        </Link>
      </div>
    </div>
  );
}

function CareSection() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">관리방법</h2>
        <p className="text-muted-foreground leading-relaxed">
          히노끼욕조를 오래 사용하기 위한 올바른 관리 방법을 안내해 드립니다.
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            step: "01",
            title: "사용 후 물기 제거",
            desc: "목욕 후에는 욕조 내부와 외부의 물기를 마른 수건으로 닦아주세요. 물기가 남아있으면 변색이나 곰팡이가 생길 수 있습니다.",
          },
          {
            step: "02",
            title: "자연 건조",
            desc: "사용 후에는 충분히 건조시켜 주세요. 욕실 환기를 자주 하여 습기가 쌓이지 않도록 합니다.",
          },
          {
            step: "03",
            title: "세척 방법",
            desc: "세척 시에는 부드러운 수세미나 천을 사용하고, 강한 화학세제 사용은 피해주세요. 약한 중성 세제로 가볍게 닦아주세요.",
          },
          {
            step: "04",
            title: "정기적인 오일링",
            desc: "약 1~2개월에 한 번씩 히노끼 전용 오일이나 식물성 오일(아마씨유 등)을 도포하면 나무의 수분을 유지하고 수명을 연장할 수 있습니다.",
          },
          {
            step: "05",
            title: "장기 미사용 시",
            desc: "장기간 욕조를 사용하지 않을 경우에는 완전히 건조시킨 후 통풍이 잘 되는 곳에 보관하세요.",
          },
        ].map((item, i) => (
          <div key={i} className="flex gap-6 bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
            <div className="text-2xl font-bold text-stone-200 shrink-0 w-10">{item.step}</div>
            <div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificateSection() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">원산지 증명</h2>
        <p className="text-muted-foreground leading-relaxed">
          휴편백은 모든 제품에 대해 100% 일본산 히노끼 원목임을 증명하는 원산지 증명서를 발급해 드립니다.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="bg-stone-50 rounded-2xl p-10 text-center">
          <div className="text-6xl mb-4">📜</div>
          <h3 className="text-xl font-bold mb-2">원산지 증명서</h3>
          <p className="text-muted-foreground text-sm">일본산 히노끼 원목 정품 인증</p>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-3">왜 원산지 증명이 중요한가요?</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              시중에는 국내산 편백나무나 중국산 목재를 히노끼로 속여 파는 경우가 있습니다. 휴편백은 일본 수입 히노끼 원목의 원산지 증명서를 제품과 함께 제공하여, 정품 히노끼 사용 여부를 고객이 직접 확인하실 수 있도록 합니다.
            </p>
          </div>
          <div className="space-y-3">
            {[
              "일본 임야청 인증 히노끼 원목 사용",
              "통관 서류 및 수입신고서 보관",
              "요청 시 원산지 증명서 발급",
              "제품별 이력 관리 시스템 운영",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BusinessPage() {
  const params = useParams<{ section?: string }>();
  const section = (params.section || "hinoki") as Section;

  return (
    <div className="min-h-screen pt-[68px]">
      {/* Page Header */}
      <div className="bg-stone-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">사업소개</h1>
          <p className="text-stone-300">히노끼욕조에 대해 알아보세요</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-stone-100 sticky top-[68px] z-30">
        <div className="container mx-auto px-4 flex gap-0 overflow-x-auto">
          {TABS.map((tab) => (
            <Link key={tab.key} href={`/business/${tab.key}`}>
              <button
                className={cn(
                  "px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                  section === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-stone-600 hover:text-primary"
                )}
              >
                {tab.label}
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        {section === "hinoki" && <HinokiSection />}
        {section === "production" && <ProductionSection />}
        {section === "care" && <CareSection />}
        {section === "certificate" && <CertificateSection />}
      </div>
    </div>
  );
}
