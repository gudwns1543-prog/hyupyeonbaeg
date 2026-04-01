import { CheckCircle, Leaf, Shield, Settings, Award } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const HALF_BATH_IMAGE = "https://cdn.imweb.me/thumbnail/20220103/5c1275af617c1.jpg";
const FULL_BATH_IMAGE = "https://cdn.imweb.me/thumbnail/20220301/5de4b9e35abfa.jpg";
const HERO_IMAGE2 = "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6573d34824eba.jpg";
const HERO_IMAGE = "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6bf89575469c9.jpg";

export default function Services() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 헤더 */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">사업 소개</h1>
          <p className="text-lg text-primary-foreground/80">
            히노끼(편백)나무를 활용한 프리미엄 욕조를 제작·판매·시공합니다.
          </p>
        </div>
      </div>

      {/* 히노끼란 */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-center max-w-5xl mx-auto">
            <div>
              <span className="text-primary font-semibold text-xs tracking-widest mb-3 block uppercase">히노끼란?</span>
              <h2 className="text-3xl font-bold mb-6 text-foreground">일본 최고급 편백나무,<br />히노끼(桧)</h2>
              <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
                히노끼(桧)는 일본을 대표하는 최고급 편백나무로, 예로부터 신사·사원·왕궁 건축에 쓰일 만큼 귀하게 여겨져 왔습니다.
                독특한 향기는 '피톤치드' 성분에서 비롯되며, 이는 항균·탈취·스트레스 해소에 탁월한 효과를 가집니다.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                히노끼욕조는 목욕 시 증기와 함께 이 성분이 발산되어 입욕 효과를 극대화하며, 자연 방부력으로 위생적인 사용이 오래 가능합니다.
              </p>
              <ul className="space-y-3">
                {[
                  "항균·방부 효과 (천연 방부제 역할)",
                  "피톤치드로 스트레스·피로 해소",
                  "혈액순환 촉진 및 피부 미용 효과",
                  "독특한 나무 향기로 아로마 효과"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img src={HERO_IMAGE} alt="히노끼욕조" className="rounded-2xl shadow-xl w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 제품 라인업 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-xs tracking-widest mb-3 block uppercase">Product Line</span>
            <h2 className="text-3xl font-bold text-foreground">히노끼욕조 제품 라인업</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 반신욕조 */}
            <div className="bg-stone-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-stone-100">
              <div className="h-60 overflow-hidden relative">
                <img src={HALF_BATH_IMAGE} alt="히노끼 반신욕조" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-lg shadow-sm">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground">히노끼 반신욕조</h3>
                  <span className="text-lg font-bold text-primary">1,320,000원</span>
                </div>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  욕실 공간을 효율적으로 활용하는 반신욕 전용 욕조. 편백나무의 피톤치드와 함께 혈액순환 및 피로 회복에 탁월합니다.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-foreground/70">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 유절/무절/마사메 선택 가능</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> FRP 방수 처리</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 맞춤 사이즈 제작 가능</li>
                </ul>
                <Link href="/inquiry"><Button className="w-full" variant="outline" data-testid="btn-halfbath-inquiry">견적 문의하기</Button></Link>
              </div>
            </div>

            {/* 전신욕조 */}
            <div className="bg-stone-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-stone-100">
              <div className="h-60 overflow-hidden relative">
                <img src={FULL_BATH_IMAGE} alt="히노끼 전신욕조" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-lg shadow-sm">
                  <Award className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground">히노끼 전신욕조</h3>
                  <span className="text-lg font-bold text-primary">1,650,000원</span>
                </div>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  전신을 편안하게 담글 수 있는 전신욕 전용 욕조. 자연 방부 효과로 오랫동안 위생적으로 사용 가능합니다.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-foreground/70">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 유절/무절/마사메 선택 가능</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> FRP 방수 처리</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 월풀 시스템 옵션 추가 가능</li>
                </ul>
                <Link href="/inquiry"><Button className="w-full" variant="outline" data-testid="btn-fullbath-inquiry">견적 문의하기</Button></Link>
              </div>
            </div>

            {/* 주문제작 */}
            <div className="bg-stone-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-stone-100">
              <div className="h-60 overflow-hidden relative">
                <img src={HERO_IMAGE2} alt="주문제작 욕조" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-lg shadow-sm">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-3">주문 제작형 욕조</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  고객의 욕실 공간과 취향에 맞게 100% 맞춤 제작하는 주문형 욕조. 크기, 형태, 나무 재질까지 모두 선택 가능합니다.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-foreground/70">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 욕실 실측 후 맞춤 설계</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 특수 형태 제작 가능</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 짜맞춤/FRP 제작방식 선택</li>
                </ul>
                <Link href="/inquiry"><Button className="w-full" variant="outline" data-testid="btn-custom-inquiry">견적 문의하기</Button></Link>
              </div>
            </div>

            {/* 악세사리 */}
            <div className="bg-stone-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-stone-100">
              <div className="h-60 overflow-hidden bg-stone-200 flex items-center justify-center">
                <div className="text-center text-stone-500 p-8">
                  <Shield className="w-16 h-16 mx-auto mb-3 text-stone-400" />
                  <span className="text-sm">악세사리 이미지</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-3">악세사리</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  히노끼욕조와 함께 사용하면 더욱 편리한 다양한 악세사리 제품군. 데크수전부터 월풀 시스템까지 완비.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-foreground/70">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 데크수전 / 목함수전</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 외부 계단</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 월풀 시스템</li>
                </ul>
                <Link href="/inquiry"><Button className="w-full" variant="outline" data-testid="btn-accessory-inquiry">문의하기</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 제작 방식 */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">제작 방식</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-foreground">FRP 방수 제작</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                히노끼 목재 내부에 FRP(유리섬유강화플라스틱) 방수 처리를 하여 목재 내부로 물이 스며드는 것을 방지합니다.
                방수성이 뛰어나고 내구성이 높아 오랫동안 사용할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-foreground">짜맞춤 제작</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                못이나 접착제 없이 나무 조각을 정교하게 맞춰 결합하는 전통 목공 기법으로 제작합니다.
                나무의 특성을 그대로 살려 자연스럽고 오랫동안 형태를 유지합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
