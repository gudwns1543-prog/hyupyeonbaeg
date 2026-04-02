import { Link, useParams } from "wouter";
import { cn } from "@/lib/utils";
import { InlineEditText } from "@/components/InlineEditText";
import { InlineEditImage } from "@/components/InlineEditImage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { SectionWrapper } from "@/components/SectionWrapper";
import { PageLayoutProvider, SectionRegistryItem } from "@/context/PageLayoutContext";

type Section = "hinoki" | "production" | "care" | "certificate";

const TABS: { key: Section; label: string }[] = [
  { key: "hinoki", label: "히노끼란" },
  { key: "production", label: "제작방식" },
  { key: "care", label: "관리방법" },
  { key: "certificate", label: "원산지증명" },
];

function HinokiSection() {
  const { gc } = useSiteContent();
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">히노끼(편백)란?</h2>
        <InlineEditText
          contentKey="hinoki_subtitle"
          value={gc("hinoki_subtitle", "히노끼(Hinoki, 편백)는 일본에서 자라는 침엽수로, 특유의 향기와 탁월한 항균·방충 효과로 예로부터 귀하게 사용되어 온 목재입니다.")}
          as="p"
          className="text-muted-foreground leading-relaxed"
          multiline
        />
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <InlineEditImage
          contentKey="img_hinoki_bath"
          src={gc("img_hinoki_bath", "/images/hinoki-fullbath.png")}
          alt="히노끼 욕조"
          containerClassName="rounded-2xl shadow-lg w-full h-80 overflow-hidden"
          imgClassName="w-full h-full object-cover"
        />
        <div className="space-y-6">
          <div>
            <InlineEditText contentKey="hinoki_block1_title" value={gc("hinoki_block1_title", "피톤치드 효과")} as="h3" className="text-xl font-bold mb-2" />
            <InlineEditText contentKey="hinoki_block1_desc" value={gc("hinoki_block1_desc", "히노끼는 편백나무과에 속하는 나무로, 피톤치드(Phytoncide)라는 천연 항균 물질을 다량 함유하고 있습니다. 피톤치드는 스트레스 호르몬을 감소시키고 혈압을 낮추며, 면역력을 높이는 데 도움을 줍니다.")} as="p" className="text-muted-foreground text-sm leading-relaxed" multiline />
          </div>
          <div>
            <InlineEditText contentKey="hinoki_block2_title" value={gc("hinoki_block2_title", "자연 방부력")} as="h3" className="text-xl font-bold mb-2" />
            <InlineEditText contentKey="hinoki_block2_desc" value={gc("hinoki_block2_desc", "히노끼에는 알파피넨, 리모넨 등의 천연 항균 성분이 풍부하게 함유되어 있어, 별도의 방부 처리 없이도 수십 년간 사용할 수 있습니다. 일본의 대표적인 신사, 사찰 등에 히노끼가 사용된 이유도 바로 이 때문입니다.")} as="p" className="text-muted-foreground text-sm leading-relaxed" multiline />
          </div>
          <div>
            <InlineEditText contentKey="hinoki_block3_title" value={gc("hinoki_block3_title", "정신 안정 효과")} as="h3" className="text-xl font-bold mb-2" />
            <InlineEditText contentKey="hinoki_block3_desc" value={gc("hinoki_block3_desc", "히노끼 욕조에서 목욕을 하면 나무 고유의 향기가 온몸을 감싸며 긴장을 완화하고 마음을 안정시켜 줍니다. 일상의 피로를 자연스럽게 풀어주는 최고의 입욕 경험을 제공합니다.")} as="p" className="text-muted-foreground text-sm leading-relaxed" multiline />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {([
          { titleKey: "hinoki_effect1_title", descKey: "hinoki_effect1_desc", defaultTitle: "항균·탈취", defaultDesc: "천연 성분으로 욕실을 위생적으로 유지" },
          { titleKey: "hinoki_effect2_title", descKey: "hinoki_effect2_desc", defaultTitle: "혈액순환", defaultDesc: "온욕과 피톤치드의 시너지 효과" },
          { titleKey: "hinoki_effect3_title", descKey: "hinoki_effect3_desc", defaultTitle: "피로회복", defaultDesc: "하루의 피로를 한 번에 풀어주는 효과" },
          { titleKey: "hinoki_effect4_title", descKey: "hinoki_effect4_desc", defaultTitle: "면역력 강화", defaultDesc: "꾸준한 사용으로 면역력 향상" },
        ] as const).map((item, i) => (
          <div key={i} className="bg-stone-50 rounded-xl p-6 text-center">
            <InlineEditText contentKey={item.titleKey} value={gc(item.titleKey, item.defaultTitle)} as="h4" className="font-bold text-foreground mb-2 text-sm" />
            <InlineEditText contentKey={item.descKey} value={gc(item.descKey, item.defaultDesc)} as="p" className="text-muted-foreground text-xs leading-relaxed" multiline />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductionSection() {
  const { gc } = useSiteContent();
  return (
    <div className="space-y-16">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">제작방식</h2>
        <InlineEditText
          contentKey="production_subtitle"
          value={gc("production_subtitle", "휴편백은 두 가지 방수 제작 방식을 모두 보유하고 있습니다.\n고객의 욕실 환경과 예산에 맞는 최적의 방식을 추천해 드립니다.")}
          as="p"
          className="text-muted-foreground leading-relaxed"
          multiline
        />
      </div>

      {/* FRP 방수 방식 */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <InlineEditImage
            contentKey="img_frp_production"
            src={gc("img_frp_production", "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6bf89575469c9.jpg")}
            alt="FRP 방수 히노끼욕조"
            containerClassName="w-full h-72 md:h-full"
            imgClassName="w-full h-full object-cover"
          />
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-5 w-fit">제작방식 01</div>
            <InlineEditText contentKey="frp_title" value={gc("frp_title", "FRP 방수 제작방식")} as="h3" className="text-2xl font-bold mb-4" />
            <InlineEditText
              contentKey="frp_desc"
              value={gc("frp_desc", "FRP(Fiber Reinforced Plastics, 유리섬유강화플라스틱)는 철보다 강하고 알루미늄보다 가벼운 복합 소재입니다. 히노끼 원목으로 욕조 본체를 제작한 후, 내부에 FRP 방수층을 코팅하여 완벽한 방수 성능을 구현합니다. 아파트 및 도심형 욕실에도 안심하고 설치할 수 있으며, 일반 욕조 수준의 방수 성능을 자랑합니다.")}
              as="p"
              className="text-muted-foreground text-sm leading-relaxed mb-6"
              multiline
            />
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "방수 성능", val: "완벽한 FRP 방수층" },
                { label: "설치 환경", val: "아파트·도심 욕실 가능" },
                { label: "관리 편의성", val: "내부 세척 간편" },
                { label: "내구성", val: "철보다 강한 소재" },
              ].map((item, i) => (
                <div key={i} className="bg-stone-50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium">{item.val}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["욕조 외부는 히노끼 원목, 내부는 FRP 방수층 구조", "수분이 목재로 침투하지 않아 변형·부식 방지", "일반 가정용부터 호텔·리조트까지 광범위하게 적용", "유절·무절·마사메 등 모든 등급에 적용 가능"].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 짜맞춤 방식 */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-8 md:p-10 flex flex-col justify-center order-2 md:order-1">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-5 w-fit">제작방식 02</div>
            <InlineEditText contentKey="joint_title" value={gc("joint_title", "짜맞춤 제작방식")} as="h3" className="text-2xl font-bold mb-4" />
            <InlineEditText
              contentKey="joint_desc"
              value={gc("joint_desc", "일본 전통 목공 기법인 짜맞춤(木組み)은 못·나사·접착제 없이 나무와 나무를 정밀하게 연결하는 방식입니다. 히노끼 목재는 물에 젖으면 섬유가 팽창하면서 이음새의 틈을 스스로 메우는 자가 밀봉(Self-Sealing) 특성을 가집니다. 수백 년의 역사를 가진 전통 기법으로, 장인의 숙련된 손길이 만들어내는 최고급 방식입니다.")}
              as="p"
              className="text-muted-foreground text-sm leading-relaxed mb-6"
              multiline
            />
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "방수 원리", val: "목재 팽창 자가밀봉" },
                { label: "친환경성", val: "접착제·금속 일절 미사용" },
                { label: "내구성", val: "반영구적 사용 가능" },
                { label: "제작 방식", val: "장인 수작업" },
              ].map((item, i) => (
                <div key={i} className="bg-amber-50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium">{item.val}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["정교한 홈·혀(Tongue & Groove) 구조로 빈틈없이 맞물림", "히노끼 특유의 피톤치드·천연 방부력을 100% 유지", "나무 자체의 자연스러운 질감과 향기를 그대로 전달", "최고급 무절·마사메 등급에 주로 적용"].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <InlineEditImage
            contentKey="img_joint_production"
            src={gc("img_joint_production", "https://cdn.imweb.me/thumbnail/20220107/63a49465fff4d.jpg")}
            alt="짜맞춤 히노끼욕조"
            containerClassName="w-full h-72 md:h-full order-1 md:order-2"
            imgClassName="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 비교표 */}
      <div className="bg-stone-50 rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-6 text-center">제작방식 비교</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">항목</th>
                <th className="text-center py-3 px-4 font-bold text-primary">FRP 방수 방식</th>
                <th className="text-center py-3 px-4 font-bold text-amber-700">짜맞춤 방식</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[
                ["방수 원리", "FRP 코팅층", "목재 팽창 자가밀봉"],
                ["설치 환경", "아파트·일반욕실 가능", "전원주택·전용욕실 권장"],
                ["친환경", "FRP 소재 사용", "100% 천연 목재만"],
                ["관리 난이도", "간편", "전문 관리 권장"],
                ["가격대", "합리적", "프리미엄"],
                ["권장 대상", "도심 아파트·호텔", "전원주택·고급 펜션"],
              ].map(([label, frp, joint], i) => (
                <tr key={i} className="bg-white even:bg-stone-50/50">
                  <td className="py-3 px-4 font-medium text-foreground">{label}</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">{frp}</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">{joint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-stone-800 text-white rounded-2xl p-8 text-center">
        <InlineEditText contentKey="production_cta_title" value={gc("production_cta_title", "어떤 방식이 나에게 맞을까요?")} as="h3" className="text-xl font-bold mb-3" />
        <InlineEditText contentKey="production_cta_desc" value={gc("production_cta_desc", "욕실 환경, 예산, 선호도에 따라 최적의 방식을 추천해 드립니다. 무료 상담을 신청하세요.")} as="p" className="text-stone-300 text-sm mb-6" multiline />
        <Link href="/inquiry">
          <button className="bg-white text-stone-800 px-8 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors">무료 상담 신청</button>
        </Link>
      </div>
    </div>
  );
}

function CareSection() {
  const { gc } = useSiteContent();
  const steps = [
    { step: "01", titleKey: "care_step1_title", descKey: "care_step1_desc", defaultTitle: "사용 후 물기 제거", defaultDesc: "목욕 후에는 욕조 내부와 외부의 물기를 마른 수건으로 닦아주세요. 물기가 남아있으면 변색이나 곰팡이가 생길 수 있습니다." },
    { step: "02", titleKey: "care_step2_title", descKey: "care_step2_desc", defaultTitle: "자연 건조", defaultDesc: "사용 후에는 충분히 건조시켜 주세요. 욕실 환기를 자주 하여 습기가 쌓이지 않도록 합니다." },
    { step: "03", titleKey: "care_step3_title", descKey: "care_step3_desc", defaultTitle: "세척 방법", defaultDesc: "세척 시에는 부드러운 수세미나 천을 사용하고, 강한 화학세제 사용은 피해주세요. 약한 중성 세제로 가볍게 닦아주세요." },
    { step: "04", titleKey: "care_step4_title", descKey: "care_step4_desc", defaultTitle: "정기적인 오일링", defaultDesc: "약 1~2개월에 한 번씩 히노끼 전용 오일이나 식물성 오일(아마씨유 등)을 도포하면 나무의 수분을 유지하고 수명을 연장할 수 있습니다." },
    { step: "05", titleKey: "care_step5_title", descKey: "care_step5_desc", defaultTitle: "장기 미사용 시", defaultDesc: "장기간 욕조를 사용하지 않을 경우에는 완전히 건조시킨 후 통풍이 잘 되는 곳에 보관하세요." },
  ] as const;

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">관리방법</h2>
        <InlineEditText
          contentKey="care_subtitle"
          value={gc("care_subtitle", "히노끼욕조를 오래 사용하기 위한 올바른 관리 방법을 안내해 드립니다.")}
          as="p"
          className="text-muted-foreground leading-relaxed"
          multiline
        />
      </div>

      <div className="space-y-6">
        {steps.map((item, i) => (
          <div key={i} className="flex gap-6 bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
            <div className="text-2xl font-bold text-stone-200 shrink-0 w-10">{item.step}</div>
            <div className="flex-1">
              <InlineEditText contentKey={item.titleKey} value={gc(item.titleKey, item.defaultTitle)} as="h3" className="text-lg font-bold mb-2" />
              <InlineEditText contentKey={item.descKey} value={gc(item.descKey, item.defaultDesc)} as="p" className="text-muted-foreground text-sm leading-relaxed" multiline />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificateSection() {
  const { gc } = useSiteContent();
  const certs = [
    { title: "수입신고필증 (1/3)", desc: "일본에서 히노끼 원목을 수입할 때 세관에서 발급되는 공식 통관 서류입니다. 원목의 원산지, 수량, 수입 경로를 법적으로 증명합니다.", icon: "🗂️", imgUrl: "https://cdn.imweb.me/thumbnail/20230131/64aa01833100d.png", tag: "통관·원산지" },
    { title: "수입신고필증 (2/3)", desc: "수입 로트별로 발행되는 세관 통관 서류로, 수입 일자·품목·수량·원산지가 상세 기재된 공식 문서입니다.", icon: "🗂️", imgUrl: "https://cdn.imweb.me/thumbnail/20230131/24680d34d0ec6.png", tag: "통관·원산지" },
    { title: "방사능 성분 검사 시험결과서", desc: "일본산 목재의 방사능 오염 여부를 공인 기관에서 검사한 결과서입니다. 휴편백은 매 로트(Lot)별 방사능 검사를 필수로 시행합니다.", icon: "☢️", imgUrl: "https://cdn.imweb.me/thumbnail/20230131/1983509ef109e.png", tag: "안전 검사" },
    { title: "수입신고필증 (3/3)", desc: "모든 히노끼 원목 수입 건에 대해 수입신고필증을 보관하며, 고객 요청 시 해당 로트의 서류를 즉시 제공해 드립니다.", icon: "🗂️", imgUrl: "https://cdn.imweb.me/thumbnail/20230131/24c04b5469d19.png", tag: "통관·원산지" },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">원산지 증명</h2>
        <InlineEditText
          contentKey="cert_subtitle"
          value={gc("cert_subtitle", "휴편백은 모든 제품에 대해 100% 일본산 히노끼 원목임을 증명하는 서류 일체를 보유하고 있습니다. 고객 요청 시 언제든지 제공해 드립니다.")}
          as="p"
          className="text-muted-foreground leading-relaxed"
          multiline
        />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 flex gap-4 items-start">
        <div className="text-3xl shrink-0">⚠️</div>
        <div>
          <InlineEditText contentKey="cert_warn_title" value={gc("cert_warn_title", "왜 원산지 증명이 중요한가요?")} as="h3" className="font-bold text-amber-800 mb-2" />
          <InlineEditText
            contentKey="cert_warn_desc"
            value={gc("cert_warn_desc", "시중에는 국내산 편백나무 또는 중국산 목재를 일본산 히노끼로 속여 판매하는 사례가 있습니다. 원산지 불명의 히노끼욕조는 피톤치드 함량, 내구성, 안전성 모두 보장할 수 없습니다. 휴편백은 수입신고필증, 방사능 검사결과지, 원산지증명서(CO) 등 모든 서류를 투명하게 공개합니다.")}
            as="p"
            className="text-amber-700 text-sm leading-relaxed"
            multiline
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {certs.map((cert, i) => (
          <div key={i} className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
            <div className="h-56 bg-white border-b border-stone-100 overflow-hidden flex items-center justify-center p-3">
              <img src={cert.imgUrl} alt={cert.title} className="max-w-full max-h-full object-contain drop-shadow-md" onError={(e) => { (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-5xl">${cert.icon}</div>`; }} />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">{cert.tag}</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{cert.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary text-white rounded-2xl p-8 md:p-10 text-center">
        <div className="text-4xl mb-4">📬</div>
        <InlineEditText contentKey="cert_cta_title" value={gc("cert_cta_title", "원산지 증명서류 요청")} as="h3" className="text-xl font-bold mb-3" />
        <InlineEditText
          contentKey="cert_cta_desc"
          value={gc("cert_cta_desc", "구매 고객분은 언제든지 원산지 관련 서류를 무료로 발급 받으실 수 있습니다. 고객센터 또는 견적문의를 통해 신청해 주세요.")}
          as="p"
          className="text-white/80 text-sm mb-6 max-w-xl mx-auto"
          multiline
        />
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">고객센터 바로가기</button>
          </Link>
          <Link href="/inquiry">
            <button className="border border-white/40 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">견적문의 하기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const BUSINESS_REGISTRY: SectionRegistryItem[] = [
  { key: "biz_header", label: "사업소개 헤더", component: () => null },
  { key: "biz_hinoki", label: "히노끼란", component: HinokiSection },
  { key: "biz_production", label: "제작방식", component: ProductionSection },
  { key: "biz_care", label: "관리방법", component: CareSection },
  { key: "biz_certificate", label: "원산지증명", component: CertificateSection },
];
const BUSINESS_DEFAULT_KEYS = BUSINESS_REGISTRY.map((s) => s.key);

export default function BusinessPage() {
  const params = useParams<{ section?: string }>();
  const section = (params.section || "hinoki") as Section;

  return (
    <PageLayoutProvider pageKey="business" defaultKeys={BUSINESS_DEFAULT_KEYS} registry={BUSINESS_REGISTRY}>
      <div className="min-h-screen pt-[104px]">
        <SectionWrapper sectionKey="biz_header" noReorder noAdd noRemove>
          <div className="bg-primary text-primary-foreground py-16 px-4">
            <div className="container mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">사업소개</h1>
              <p className="text-primary-foreground/80">히노끼욕조에 대해 알아보세요</p>
            </div>
          </div>
        </SectionWrapper>

        <div className="bg-white border-b border-stone-100 sticky top-[104px] z-30">
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

        <div className="container mx-auto px-4 py-16">
          {section === "hinoki" && (
            <SectionWrapper sectionKey="biz_hinoki" noReorder noAdd noRemove>
              <HinokiSection />
            </SectionWrapper>
          )}
          {section === "production" && (
            <SectionWrapper sectionKey="biz_production" noReorder noAdd noRemove>
              <ProductionSection />
            </SectionWrapper>
          )}
          {section === "care" && (
            <SectionWrapper sectionKey="biz_care" noReorder noAdd noRemove>
              <CareSection />
            </SectionWrapper>
          )}
          {section === "certificate" && (
            <SectionWrapper sectionKey="biz_certificate" noReorder noAdd noRemove>
              <CertificateSection />
            </SectionWrapper>
          )}
        </div>
      </div>
    </PageLayoutProvider>
  );
}
