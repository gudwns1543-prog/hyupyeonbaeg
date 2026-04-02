import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, ChevronRight,
  Leaf, ShieldCheck, Award, Truck,
} from "lucide-react";
import { useGetSiteContent, getGetSiteContentQueryKey } from "@workspace/api-client-react";
import { InlineEditText } from "@/components/InlineEditText";
import { InlineEditImage } from "@/components/InlineEditImage";
import { SectionWrapper } from "@/components/SectionWrapper";
import {
  PageLayoutProvider,
  SectionRegistryItem,
  usePageLayout,
} from "@/context/PageLayoutContext";

const DEFAULT_HERO_IMAGE = "/images/hero-main.jpg";
const DEFAULT_HALF_BATH_IMAGE = "https://cdn.imweb.me/thumbnail/20220103/5c1275af617c1.jpg";
const DEFAULT_FULL_BATH_IMAGE = "https://cdn.imweb.me/thumbnail/20220301/5de4b9e35abfa.jpg";
const DEFAULT_HERO_IMAGE2 = "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6573d34824eba.jpg";
const FEATURE_ICONS = [Leaf, ShieldCheck, Award, Truck];

function useGc() {
  const { data: content } = useGetSiteContent({
    query: { queryKey: getGetSiteContentQueryKey() },
  });
  return (key: string, fallback: string): string => {
    if (!content?.items) return fallback;
    const item = content.items.find((i) => i.key === key);
    return item ? item.value : fallback;
  };
}

function HeroSection() {
  const gc = useGc();
  return (
    <div className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <InlineEditImage
          contentKey="img_hero_main"
          src={gc("img_hero_main", DEFAULT_HERO_IMAGE)}
          alt="히노끼 욕조 시공"
          containerClassName="w-full h-full"
          imgClassName="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs mb-6 tracking-widest uppercase">
          Premium Hinoki Bath Specialist
        </span>
        <InlineEditText
          contentKey="hero_title"
          value={gc("hero_title", "자연의 향기를 담은\n히노끼 욕조")}
          as="h1"
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-tight max-w-4xl mx-auto drop-shadow-lg break-keep whitespace-pre-line"
          multiline
        />
        <InlineEditText
          contentKey="hero_subtitle"
          value={gc("hero_subtitle", "일본 히노끼(편백)나무로 만든 최고급 욕조.\n피톤치드와 향긋한 나무 향으로 몸과 마음을 치유하세요.")}
          as="p"
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow break-keep whitespace-pre-line"
          multiline
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/portfolio">
            <Button size="lg" className="text-base px-10 h-14 w-full sm:w-auto shadow-lg" data-testid="btn-hero-portfolio">
              시공사례 보기 <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/shop">
            <Button size="lg" variant="outline" className="text-base px-10 h-14 bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white w-full sm:w-auto" data-testid="btn-hero-shop">
              제품 둘러보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductsSection() {
  const gc = useGc();
  return (
    <div className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary font-semibold tracking-wider text-xs mb-2 block uppercase">Our Products</span>
          <InlineEditText contentKey="products_section_title" value={gc("products_section_title", "히노끼 욕조 제품")} as="h2" className="text-3xl md:text-4xl font-bold mb-4 text-foreground" />
          <InlineEditText contentKey="products_section_desc" value={gc("products_section_desc", "100% 일본산 히노끼(편백)나무를 사용한 수공예 욕조. 내구성과 아름다움을 겸비한 명품 욕조를 직접 제작합니다.")} as="p" className="text-muted-foreground text-base leading-relaxed" multiline />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-stone-100">
            <div className="relative h-72 overflow-hidden">
              <InlineEditImage contentKey="img_half_bath" src={gc("img_half_bath", DEFAULT_HALF_BATH_IMAGE)} alt="히노끼 반신욕조" containerClassName="w-full h-full" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full">BEST</div>
            </div>
            <div className="p-8">
              <InlineEditText contentKey="product_half_title" value={gc("product_half_title", "히노끼 반신욕조")} as="h3" className="text-2xl font-bold text-foreground mb-2" />
              <InlineEditText contentKey="product_half_desc" value={gc("product_half_desc", "욕실 공간을 효율적으로 활용하는 반신욕 전용 욕조. 편백나무의 피톤치드 효과로 혈액순환과 피로회복에 탁월합니다.")} as="p" className="text-muted-foreground mb-4 leading-relaxed text-sm" multiline />
              <div className="flex items-center justify-between">
                <InlineEditText contentKey="product_half_price" value={gc("product_half_price", "1,320,000원~")} as="span" className="text-2xl font-bold text-primary" />
                <Link href="/shop/bath/half">
                  <Button size="sm" variant="outline" data-testid="btn-halfbath-shop">제품 보기</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-stone-100">
            <div className="relative h-72 overflow-hidden">
              <InlineEditImage contentKey="img_full_bath" src={gc("img_full_bath", DEFAULT_FULL_BATH_IMAGE)} alt="히노끼 전신욕조" containerClassName="w-full h-full" imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">BEST</div>
            </div>
            <div className="p-8">
              <InlineEditText contentKey="product_full_title" value={gc("product_full_title", "히노끼 전신욕조")} as="h3" className="text-2xl font-bold text-foreground mb-2" />
              <InlineEditText contentKey="product_full_desc" value={gc("product_full_desc", "전신을 편안하게 담글 수 있는 전신욕 전용 욕조. 자연 방부 효과로 오랫동안 위생적으로 사용 가능합니다.")} as="p" className="text-muted-foreground mb-4 leading-relaxed text-sm" multiline />
              <div className="flex items-center justify-between">
                <InlineEditText contentKey="product_full_price" value={gc("product_full_price", "1,650,000원~")} as="span" className="text-2xl font-bold text-primary" />
                <Link href="/shop/bath/full">
                  <Button size="sm" variant="outline" data-testid="btn-fullbath-shop">제품 보기</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/shop">
            <Button variant="link" className="text-primary text-base" data-testid="link-all-products">
              전체 제품 보기 <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  const gc = useGc();
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <InlineEditImage contentKey="img_about_1" src={gc("img_about_1", DEFAULT_HERO_IMAGE2)} alt="히노끼욕조 시공" containerClassName="rounded-xl shadow-lg w-full h-56 overflow-hidden" imgClassName="w-full h-full object-cover" />
              <InlineEditImage contentKey="img_about_2" src={gc("img_about_2", DEFAULT_FULL_BATH_IMAGE)} alt="전신욕조" containerClassName="rounded-xl shadow-lg w-full h-56 overflow-hidden mt-8" imgClassName="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-primary font-semibold tracking-wider text-xs mb-3 block uppercase">About 휴편백</span>
            <InlineEditText contentKey="about_title" value={gc("about_title", "히노끼욕조 전문 기업,\n휴편백입니다")} as="h2" className="text-3xl md:text-4xl font-bold mb-6 text-foreground leading-snug whitespace-pre-line" multiline />
            <InlineEditText contentKey="about_desc" value={gc("about_desc", "휴편백은 100% 일본산 히노끼(편백)나무를 직수입하여 국내 최고의 장인 기술로 욕조를 제작하는 전문 기업입니다. 나무의 자연 방향 성분인 피톤치드가 몸과 마음을 치유합니다.")} as="p" className="text-muted-foreground text-base mb-6 leading-relaxed" multiline />
            <ul className="space-y-4 mb-8">
              {(["about_bullet_1", "about_bullet_2", "about_bullet_3", "about_bullet_4"] as const).map((key, i) => {
                const defaults = [
                  "100% 일본산 히노끼(편백) 원목 직수입",
                  "FRP 방수 및 짜맞춤 방식의 정밀 제작",
                  "원산지 증명서 발급 가능",
                  "전문 시공팀의 현장 직접 설치",
                ];
                return (
                  <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <InlineEditText contentKey={key} value={gc(key, defaults[i])} as="span" />
                  </li>
                );
              })}
            </ul>
            <Link href="/about">
              <Button variant="link" className="px-0 text-primary text-base" data-testid="link-about-contact">
                회사 소개 더보기 <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhySection() {
  const gc = useGc();
  return (
    <div className="py-24 bg-stone-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary font-semibold tracking-wider text-xs mb-2 block uppercase">Why Hinoki</span>
          <InlineEditText contentKey="why_title" value={gc("why_title", "히노끼욕조를 선택하는 이유")} as="h2" className="text-3xl md:text-4xl font-bold mb-4 text-foreground" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {([
            { titleKey: "feature_1_title", descKey: "feature_1_desc", defaultTitle: "피톤치드 효과", defaultDesc: "편백나무 고유의 항균·탈취 성분이 건강을 지켜줍니다" },
            { titleKey: "feature_2_title", descKey: "feature_2_desc", defaultTitle: "자연 방부력", defaultDesc: "별도 화학 처리 없이도 오래도록 위생적으로 사용 가능합니다" },
            { titleKey: "feature_3_title", descKey: "feature_3_desc", defaultTitle: "국내 최고 품질", defaultDesc: "원산지 증명서가 있는 100% 정품 히노끼만 사용합니다" },
            { titleKey: "feature_4_title", descKey: "feature_4_desc", defaultTitle: "전국 직접 시공", defaultDesc: "전문 시공팀이 전국 어디든 직접 방문하여 설치합니다" },
          ] as const).map((item, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-stone-100">
                <Icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <InlineEditText contentKey={item.titleKey} value={gc(item.titleKey, item.defaultTitle)} as="h4" className="font-bold text-foreground mb-2 text-sm" />
                <InlineEditText contentKey={item.descKey} value={gc(item.descKey, item.defaultDesc)} as="p" className="text-muted-foreground text-xs leading-relaxed" multiline />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProcessSection() {
  const gc = useGc();
  return (
    <div className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <InlineEditText contentKey="process_title" value={gc("process_title", "시공 진행 과정")} as="h2" className="text-3xl md:text-4xl font-bold mb-4" />
          <InlineEditText contentKey="process_subtitle" value={gc("process_subtitle", "체계적이고 투명한 프로세스로 최고의 결과를 완성합니다.")} as="p" className="text-primary-foreground/80 text-base" multiline />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {([
            { step: "01", titleKey: "process_1_title", descKey: "process_1_desc", defaultTitle: "견적 상담", defaultDesc: "욕실 실측 및 제품 선택 상담" },
            { step: "02", titleKey: "process_2_title", descKey: "process_2_desc", defaultTitle: "제품 제작", defaultDesc: "히노끼 원목 맞춤 제작" },
            { step: "03", titleKey: "process_3_title", descKey: "process_3_desc", defaultTitle: "현장 시공", defaultDesc: "전문 시공팀 방문 설치" },
            { step: "04", titleKey: "process_4_title", descKey: "process_4_desc", defaultTitle: "사후 관리", defaultDesc: "관리 방법 안내 및 A/S" },
          ] as const).map((process, i) => (
            <div key={i} className="text-center relative">
              <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10">
                {process.step}
              </div>
              {i < 3 && <div className="hidden md:block absolute top-7 left-[60%] right-[-40%] h-px bg-primary-foreground/20" />}
              <InlineEditText contentKey={process.titleKey} value={gc(process.titleKey, process.defaultTitle)} as="h4" className="text-base font-semibold mb-1" />
              <InlineEditText contentKey={process.descKey} value={gc(process.descKey, process.defaultDesc)} as="p" className="text-primary-foreground/70 text-xs leading-relaxed" multiline />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactSection() {
  const gc = useGc();
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <Leaf className="w-14 h-14 text-primary mx-auto mb-6" />
        <InlineEditText contentKey="contact_cta_title" value={gc("contact_cta_title", "궁금하신 점이 있으신가요?")} as="h2" className="text-3xl md:text-4xl font-bold mb-4 text-foreground" />
        <InlineEditText contentKey="contact_cta_desc" value={gc("contact_cta_desc", "히노끼욕조에 대한 어떤 질문이든 편하게 연락 주세요.\n전문 상담사가 친절하게 안내해 드립니다.")} as="p" className="text-muted-foreground text-base mb-10 leading-relaxed whitespace-pre-line" multiline />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:010-5918-7778">
            <Button size="lg" className="text-base px-10 h-14 shadow-md w-full sm:w-auto">
              📞 010-5918-7778
            </Button>
          </a>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="text-base px-10 h-14 w-full sm:w-auto" data-testid="btn-bottom-contact">
              고객센터 바로가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const HOME_REGISTRY: SectionRegistryItem[] = [
  { key: "hero", label: "히어로 배너", component: HeroSection },
  { key: "products", label: "제품 하이라이트", component: ProductsSection },
  { key: "about", label: "회사 소개", component: AboutSection },
  { key: "why", label: "히노끼 효능", component: WhySection },
  { key: "process", label: "시공 프로세스", component: ProcessSection },
  { key: "contact", label: "연락처 CTA", component: ContactSection },
];

const HOME_DEFAULT_KEYS = HOME_REGISTRY.map((s) => s.key);

function HomeContent() {
  const { layout } = usePageLayout();

  return (
    <div className="flex flex-col min-h-screen">
      {layout.map((config) => {
        const section = HOME_REGISTRY.find((s) => s.key === config.key);
        if (!section) return null;
        const Component = section.component;
        return (
          <SectionWrapper key={config.key} sectionKey={config.key} overrideBg={config.key !== "hero"}>
            <Component />
          </SectionWrapper>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <PageLayoutProvider
      pageKey="home"
      defaultKeys={HOME_DEFAULT_KEYS}
      registry={HOME_REGISTRY}
    >
      <HomeContent />
    </PageLayoutProvider>
  );
}
