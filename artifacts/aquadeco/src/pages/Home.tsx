import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ChevronRight, Droplets, Home as HomeIcon, Building2, Wrench } from "lucide-react";
import { useGetSiteContent, getGetSiteContentQueryKey } from "@workspace/api-client-react";

export default function Home() {
  const { data: content } = useGetSiteContent({ query: { queryKey: getGetSiteContentQueryKey() } });
  
  const getContent = (key: string, fallback: string) => {
    if (!content?.items) return fallback;
    const item = content.items.find(i => i.key === key);
    return item ? item.value : fallback;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="Luxury living room aquarium" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm mb-6 tracking-widest">
            PREMIUM AQUASCAPE INTERIOR
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-bold tracking-tight mb-6 leading-tight max-w-4xl mx-auto">
            {getContent("hero_title", "공간에 자연의 숨결을 불어넣다")}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {getContent("hero_subtitle", "최고급 맞춤형 수족관 설계 및 설치부터 전문적인 유지보수까지. 아쿠아데코가 당신의 공간을 예술로 만듭니다.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inquiry">
              <Button size="lg" className="text-lg px-8 h-14 w-full sm:w-auto" data-testid="btn-hero-inquiry">
                무료 견적 상담 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="text-lg px-8 h-14 bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white w-full sm:w-auto" data-testid="btn-hero-portfolio">
                포트폴리오 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <img src="/images/residential.png" alt="Residential aquascape" className="rounded-lg shadow-lg w-full h-64 object-cover" />
                <img src="/images/commercial.png" alt="Commercial aquarium" className="rounded-lg shadow-lg w-full h-64 object-cover mt-8" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-primary font-semibold tracking-wider text-sm mb-2 block">ABOUT AQUADECO</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                물과 빛, 그리고 공간의 완벽한 조화
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                아쿠아데코는 단순한 어항을 넘어서 공간의 품격을 높이는 수족관 인테리어 전문 기업입니다. 수년간의 경험과 노하우를 바탕으로 고객의 라이프스타일과 공간의 특성에 맞춘 최적의 솔루션을 제공합니다.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "10년 이상의 수족관 설계 및 설치 전문성",
                  "자연 생태계를 그대로 재현하는 아쿠아스케이핑 기술",
                  "첨단 여과 시스템 및 자동화 관리 설계",
                  "철저한 사후 관리 및 정기 유지보수 서비스"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/80">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button variant="link" className="px-0 text-primary text-base" data-testid="link-about-contact">
                  회사 소개 더보기 <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold tracking-wider text-sm mb-2 block">OUR SERVICES</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">전문적인 서비스 영역</h2>
            <p className="text-muted-foreground text-lg">주거 공간부터 대형 상업 시설까지, 모든 규모의 수족관 프로젝트를 성공적으로 수행합니다.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: HomeIcon,
                title: "주거공간 맞춤형",
                desc: "거실, 침실 등 집안의 분위기를 아늑하고 고급스럽게 바꿔주는 프리미엄 수족관 설계",
                image: "/images/residential.png"
              },
              {
                icon: Building2,
                title: "상업공간/오피스",
                desc: "로비, 레스토랑, 병원 등 방문객의 시선을 사로잡는 대형 수족관 및 인테리어 시공",
                image: "/images/commercial.png"
              },
              {
                icon: Wrench,
                title: "유지보수 케어",
                desc: "수질 관리, 수초 트리밍, 생물 건강 체크 등 최적의 상태를 유지하기 위한 정기 관리",
                image: "/images/maintenance.png"
              }
            ].map((service, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-8">
                  <service.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.desc}</p>
                  <Link href="/services">
                    <span className="text-primary font-medium hover:underline inline-flex items-center cursor-pointer">
                      자세히 보기 <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">프로젝트 진행 과정</h2>
            <p className="text-primary-foreground/80 text-lg">체계적이고 투명한 프로세스로 최고의 결과물을 완성합니다.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "견적 상담", desc: "고객 니즈 파악 및 현장 실측" },
              { step: "02", title: "맞춤 설계", desc: "디자인 제안 및 시스템 기획" },
              { step: "03", title: "시공 설치", desc: "전문 시공팀의 안전한 설치" },
              { step: "04", title: "사후 관리", desc: "안정화 및 정기 케어 서비스" }
            ].map((process, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10">
                  {process.step}
                </div>
                {i < 3 && <div className="hidden md:block absolute top-8 left-[60%] right-[-40%] h-px bg-primary-foreground/20" />}
                <h4 className="text-xl font-semibold mb-2">{process.title}</h4>
                <p className="text-primary-foreground/70 text-sm">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Droplets className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            당신의 공간에 생명력을 더하세요
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            상담부터 설계, 시공, 유지보수까지. 아쿠아데코의 전문가들이 완벽한 솔루션을 제공합니다. 지금 무료 견적을 받아보세요.
          </p>
          <Link href="/inquiry">
            <Button size="lg" className="text-lg px-10 h-14" data-testid="btn-bottom-inquiry">
              무료 견적 문의하기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
