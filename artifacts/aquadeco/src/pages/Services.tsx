import { Building2, CheckCircle, Home, Shield, Wrench } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Services() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">서비스 소개</h1>
          <p className="text-lg text-primary-foreground/80">
            공간의 목적과 특성에 맞는 최적의 수족관 설계 및 설치 서비스를 제공합니다.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Residential Service */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-border/50">
            <div className="h-64 relative">
              <img src="/images/residential.png" alt="주거 공간 수족관" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                <Home className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">주거공간 맞춤형 설계</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                거실, 침실 등 집안의 분위기를 아늑하고 고급스럽게 바꿔주는 프리미엄 수족관을 설계합니다. 소음과 냄새를 최소화하는 특수 시스템을 적용하여 쾌적한 실내 환경을 유지합니다.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-secondary" /> 빌트인(Built-in) 수족관 인테리어
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-secondary" /> 거실 파티션형 수족관
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-secondary" /> 네이처 아쿠아리움 (수초 수조)
                </li>
              </ul>
              <Link href="/inquiry"><Button className="w-full" variant="outline">견적 문의하기</Button></Link>
            </div>
          </div>

          {/* Commercial Service */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-border/50">
            <div className="h-64 relative">
              <img src="/images/commercial.png" alt="상업 공간 수족관" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">상업공간 대형 시공</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                오피스 로비, 레스토랑, 카페, 병원 등 방문객의 시선을 사로잡고 공간의 품격을 높이는 대형 수족관을 시공합니다. 철저한 하중 계산과 안전 설계가 수반됩니다.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-secondary" /> 대형 해수어/산호 수족관
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-secondary" /> 원형 및 특수 형태 아크릴 수조
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-secondary" /> 레스토랑/카페 인테리어형 수조
                </li>
              </ul>
              <Link href="/inquiry"><Button className="w-full" variant="outline">견적 문의하기</Button></Link>
            </div>
          </div>

          {/* Maintenance Service */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-border/50">
            <div className="h-64 relative">
              <img src="/images/maintenance.png" alt="유지보수 서비스" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                <Wrench className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">전문 유지보수 케어</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                수족관 설치 후에도 항상 최상의 상태를 유지할 수 있도록 전문 아쿠아리스트가 정기적으로 방문하여 수질, 장비, 생물 상태를 꼼꼼하게 관리해 드립니다.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-secondary" /> 정기 수질 검사 및 환수
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-secondary" /> 여과기 및 조명 장비 점검
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-secondary" /> 수초 트리밍 및 생물 질병 관리
                </li>
              </ul>
            </div>
          </div>

          {/* Custom Aqua-scaping */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-border/50">
            <div className="h-64 relative">
              <img src="/images/hero.png" alt="맞춤형 아쿠아스케이프" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                <Shield className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">프리미엄 맞춤 설계</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                기성품이 아닌 100% 고객 맞춤형으로 제작됩니다. 수조의 재질, 두께, 캐비닛 디자인부터 내부 레이아웃까지 고객의 요구사항을 완벽하게 반영합니다.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-secondary" /> 3D 렌더링 사전 디자인 제공
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-secondary" /> 최고급 저철분 유리/아크릴 사용
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-secondary" /> 자동화 환수 시스템 구축
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
