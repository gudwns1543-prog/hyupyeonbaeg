import { useState } from "react";
import { CheckCircle, Leaf, Shield, Settings, Award, Pencil, Check, X, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { InlineEditText } from "@/components/InlineEditText";
import { InlineEditImage } from "@/components/InlineEditImage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useAdminMode } from "@/hooks/useAdminMode";
import { useQueryClient } from "@tanstack/react-query";
import { SectionWrapper } from "@/components/SectionWrapper";
import { PageLayoutProvider, SectionRegistryItem } from "@/context/PageLayoutContext";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function BulletList({ contentKey, text }: { contentKey: string; text: string }) {
  const { isAdmin } = useAdminMode();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(text);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch(`${API_BASE}/api/content/${contentKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ value: editValue }),
      });
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
      window.location.reload();
    } catch {
      setEditValue(text);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const items = text.split("\n").filter((s) => s.trim().length > 0);

  return (
    <div>
      {isEditing ? (
        <div className="space-y-2">
          <p className="text-xs text-stone-500">한 줄에 하나씩 입력하세요</p>
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            rows={4}
            className="w-full border-2 border-primary rounded px-2 py-1 text-sm resize-none bg-white text-stone-900"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded text-xs font-medium"
            >
              {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
              저장
            </button>
            <button
              onClick={() => { setEditValue(text); setIsEditing(false); }}
              className="flex items-center gap-1 px-3 py-1.5 bg-stone-200 text-stone-700 rounded text-xs"
            >
              <X className="w-3 h-3" /> 취소
            </button>
          </div>
        </div>
      ) : (
        <div className="relative group/bullets">
          <ul className="space-y-2 text-sm text-foreground/70">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                {item.trim()}
              </li>
            ))}
          </ul>
          {isAdmin && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute -top-1 -right-1 opacity-0 group-hover/bullets:opacity-100 transition-opacity flex items-center gap-1 bg-white border border-primary/40 text-primary rounded px-1.5 py-0.5 text-[10px] shadow-sm"
            >
              <Pencil className="w-2.5 h-2.5" /> 수정
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ServicesHeader() {
  const { gc } = useSiteContent();
  return (
    <div className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
        <InlineEditText
          contentKey="services_header_title"
          value={gc("services_header_title", "사업 소개")}
          as="h1"
          className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
        />
        <InlineEditText
          contentKey="services_header_subtitle"
          value={gc("services_header_subtitle", "히노끼(편백)나무를 활용한 프리미엄 욕조를 제작·판매·시공합니다.")}
          as="p"
          className="text-lg text-primary-foreground/80"
        />
      </div>
    </div>
  );
}

function HinokiSection() {
  const { gc } = useSiteContent();
  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-14 items-center max-w-5xl mx-auto">
          <div>
            <InlineEditText
              contentKey="services_hinoki_label"
              value={gc("services_hinoki_label", "히노끼란?")}
              as="span"
              className="text-primary font-semibold text-xs tracking-widest mb-3 block uppercase"
            />
            <InlineEditText
              contentKey="services_hinoki_title"
              value={gc("services_hinoki_title", "일본 최고급 편백나무,\n히노끼(桧)")}
              as="h2"
              className="text-3xl font-bold mb-6 text-foreground"
              multiline
            />
            <InlineEditText
              contentKey="services_hinoki_desc1"
              value={gc("services_hinoki_desc1", "히노끼(桧)는 일본을 대표하는 최고급 편백나무로, 예로부터 신사·사원·왕궁 건축에 쓰일 만큼 귀하게 여겨져 왔습니다. 독특한 향기는 '피톤치드' 성분에서 비롯되며, 이는 항균·탈취·스트레스 해소에 탁월한 효과를 가집니다.")}
              as="p"
              className="text-muted-foreground leading-relaxed mb-5 text-sm"
              multiline
            />
            <InlineEditText
              contentKey="services_hinoki_desc2"
              value={gc("services_hinoki_desc2", "히노끼욕조는 목욕 시 증기와 함께 이 성분이 발산되어 입욕 효과를 극대화하며, 자연 방부력으로 위생적인 사용이 오래 가능합니다.")}
              as="p"
              className="text-muted-foreground leading-relaxed mb-6 text-sm"
              multiline
            />
            <BulletList contentKey="services_hinoki_bullets" text={gc("services_hinoki_bullets", "항균·방부 효과 (천연 방부제 역할)\n피톤치드로 스트레스·피로 해소\n혈액순환 촉진 및 피부 미용 효과\n독특한 나무 향기로 아로마 효과")} />
          </div>
          <div>
            <InlineEditImage
              contentKey="services_hinoki_image"
              src={gc("services_hinoki_image", "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6bf89575469c9.jpg")}
              alt="히노끼욕조"
              containerClassName="w-full"
              imgClassName="rounded-2xl shadow-xl w-full h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductLineupSection() {
  const { gc } = useSiteContent();
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <InlineEditText
            contentKey="services_lineup_label"
            value={gc("services_lineup_label", "Product Line")}
            as="span"
            className="text-primary font-semibold text-xs tracking-widest mb-3 block uppercase"
          />
          <InlineEditText
            contentKey="services_lineup_title"
            value={gc("services_lineup_title", "히노끼욕조 제품 라인업")}
            as="h2"
            className="text-3xl font-bold text-foreground"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* 반신욕조 */}
          <div className="bg-stone-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-stone-100">
            <div className="h-60 overflow-hidden relative">
              <InlineEditImage
                contentKey="services_half_image"
                src={gc("services_half_image", "https://cdn.imweb.me/thumbnail/20220103/5c1275af617c1.jpg")}
                alt="히노끼 반신욕조"
                containerClassName="w-full h-full"
                imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-lg shadow-sm pointer-events-none">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-3">
                <InlineEditText
                  contentKey="services_half_title"
                  value={gc("services_half_title", "히노끼 반신욕조")}
                  as="h3"
                  className="text-xl font-bold text-foreground"
                />
                <InlineEditText
                  contentKey="services_half_price"
                  value={gc("services_half_price", "1,320,000원")}
                  as="span"
                  className="text-lg font-bold text-primary"
                />
              </div>
              <InlineEditText
                contentKey="services_half_desc"
                value={gc("services_half_desc", "욕실 공간을 효율적으로 활용하는 반신욕 전용 욕조. 편백나무의 피톤치드와 함께 혈액순환 및 피로 회복에 탁월합니다.")}
                as="p"
                className="text-muted-foreground text-sm mb-5 leading-relaxed"
                multiline
              />
              <div className="mb-6">
                <BulletList contentKey="services_half_bullets" text={gc("services_half_bullets", "유절/무절/마사메 선택 가능\nFRP 방수 처리\n맞춤 사이즈 제작 가능")} />
              </div>
              <Link href="/inquiry"><Button className="w-full" variant="outline" data-testid="btn-halfbath-inquiry">견적 문의하기</Button></Link>
            </div>
          </div>

          {/* 전신욕조 */}
          <div className="bg-stone-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-stone-100">
            <div className="h-60 overflow-hidden relative">
              <InlineEditImage
                contentKey="services_full_image"
                src={gc("services_full_image", "https://cdn.imweb.me/thumbnail/20220301/5de4b9e35abfa.jpg")}
                alt="히노끼 전신욕조"
                containerClassName="w-full h-full"
                imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-lg shadow-sm pointer-events-none">
                <Award className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-3">
                <InlineEditText
                  contentKey="services_full_title"
                  value={gc("services_full_title", "히노끼 전신욕조")}
                  as="h3"
                  className="text-xl font-bold text-foreground"
                />
                <InlineEditText
                  contentKey="services_full_price"
                  value={gc("services_full_price", "1,650,000원")}
                  as="span"
                  className="text-lg font-bold text-primary"
                />
              </div>
              <InlineEditText
                contentKey="services_full_desc"
                value={gc("services_full_desc", "전신을 편안하게 담글 수 있는 전신욕 전용 욕조. 자연 방부 효과로 오랫동안 위생적으로 사용 가능합니다.")}
                as="p"
                className="text-muted-foreground text-sm mb-5 leading-relaxed"
                multiline
              />
              <div className="mb-6">
                <BulletList contentKey="services_full_bullets" text={gc("services_full_bullets", "유절/무절/마사메 선택 가능\nFRP 방수 처리\n월풀 시스템 옵션 추가 가능")} />
              </div>
              <Link href="/inquiry"><Button className="w-full" variant="outline" data-testid="btn-fullbath-inquiry">견적 문의하기</Button></Link>
            </div>
          </div>

          {/* 주문제작 */}
          <div className="bg-stone-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-stone-100">
            <div className="h-60 overflow-hidden relative">
              <InlineEditImage
                contentKey="services_custom_image"
                src={gc("services_custom_image", "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6573d34824eba.jpg")}
                alt="주문제작 욕조"
                containerClassName="w-full h-full"
                imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-lg shadow-sm pointer-events-none">
                <Settings className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="p-8">
              <InlineEditText
                contentKey="services_custom_title"
                value={gc("services_custom_title", "주문 제작형 욕조")}
                as="h3"
                className="text-xl font-bold text-foreground mb-3"
              />
              <InlineEditText
                contentKey="services_custom_desc"
                value={gc("services_custom_desc", "고객의 욕실 공간과 취향에 맞게 100% 맞춤 제작하는 주문형 욕조. 크기, 형태, 나무 재질까지 모두 선택 가능합니다.")}
                as="p"
                className="text-muted-foreground text-sm mb-5 leading-relaxed"
                multiline
              />
              <div className="mb-6">
                <BulletList contentKey="services_custom_bullets" text={gc("services_custom_bullets", "욕실 실측 후 맞춤 설계\n특수 형태 제작 가능\n짜맞춤/FRP 제작방식 선택")} />
              </div>
              <Link href="/inquiry"><Button className="w-full" variant="outline" data-testid="btn-custom-inquiry">견적 문의하기</Button></Link>
            </div>
          </div>

          {/* 악세사리 */}
          <div className="bg-stone-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-stone-100">
            <div className="h-60 overflow-hidden relative">
              <InlineEditImage
                contentKey="services_accessory_image"
                src={gc("services_accessory_image", "")}
                alt="악세사리"
                containerClassName="w-full h-full"
                imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                fallback={
                  <div className="w-full h-full bg-stone-200 flex items-center justify-center">
                    <div className="text-center text-stone-500 p-8">
                      <Shield className="w-16 h-16 mx-auto mb-3 text-stone-400" />
                      <span className="text-sm">악세사리 이미지</span>
                    </div>
                  </div>
                }
              />
            </div>
            <div className="p-8">
              <InlineEditText
                contentKey="services_accessory_title"
                value={gc("services_accessory_title", "악세사리")}
                as="h3"
                className="text-xl font-bold text-foreground mb-3"
              />
              <InlineEditText
                contentKey="services_accessory_desc"
                value={gc("services_accessory_desc", "히노끼욕조와 함께 사용하면 더욱 편리한 다양한 악세사리 제품군. 데크수전부터 월풀 시스템까지 완비.")}
                as="p"
                className="text-muted-foreground text-sm mb-5 leading-relaxed"
                multiline
              />
              <div className="mb-6">
                <BulletList contentKey="services_accessory_bullets" text={gc("services_accessory_bullets", "데크수전 / 목함수전\n외부 계단\n월풀 시스템")} />
              </div>
              <Link href="/inquiry"><Button className="w-full" variant="outline" data-testid="btn-accessory-inquiry">문의하기</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManufacturingSection() {
  const { gc } = useSiteContent();
  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-14">
          <InlineEditText
            contentKey="services_mfg_title"
            value={gc("services_mfg_title", "제작 방식")}
            as="h2"
            className="text-3xl font-bold text-foreground"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm">
            <InlineEditText
              contentKey="services_mfg_frp_title"
              value={gc("services_mfg_frp_title", "FRP 방수 제작")}
              as="h3"
              className="text-xl font-bold mb-4 text-foreground"
            />
            <InlineEditText
              contentKey="services_mfg_frp_desc"
              value={gc("services_mfg_frp_desc", "히노끼 목재 내부에 FRP(유리섬유강화플라스틱) 방수 처리를 하여 목재 내부로 물이 스며드는 것을 방지합니다. 방수성이 뛰어나고 내구성이 높아 오랫동안 사용할 수 있습니다.")}
              as="p"
              className="text-muted-foreground text-sm leading-relaxed"
              multiline
            />
          </div>
          <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm">
            <InlineEditText
              contentKey="services_mfg_join_title"
              value={gc("services_mfg_join_title", "짜맞춤 제작")}
              as="h3"
              className="text-xl font-bold mb-4 text-foreground"
            />
            <InlineEditText
              contentKey="services_mfg_join_desc"
              value={gc("services_mfg_join_desc", "못이나 접착제 없이 나무 조각을 정교하게 맞춰 결합하는 전통 목공 기법으로 제작합니다. 나무의 특성을 그대로 살려 자연스럽고 오랫동안 형태를 유지합니다.")}
              as="p"
              className="text-muted-foreground text-sm leading-relaxed"
              multiline
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES_REGISTRY: SectionRegistryItem[] = [
  { key: "services_header", label: "사업소개 헤더", component: ServicesHeader },
  { key: "services_hinoki", label: "히노끼란?", component: HinokiSection },
  { key: "services_lineup", label: "제품 라인업", component: ProductLineupSection },
  { key: "services_mfg", label: "제작 방식", component: ManufacturingSection },
];
const SERVICES_DEFAULT_KEYS = SERVICES_REGISTRY.map((s) => s.key);

export default function Services() {
  return (
    <PageLayoutProvider
      pageKey="services"
      defaultKeys={SERVICES_DEFAULT_KEYS}
      registry={SERVICES_REGISTRY}
    >
      <div className="min-h-screen bg-background pb-20 pt-[104px]">
        <SectionWrapper sectionKey="services_header" noReorder noAdd noRemove overrideBg={false}>
          <ServicesHeader />
        </SectionWrapper>
        <SectionWrapper sectionKey="services_hinoki">
          <HinokiSection />
        </SectionWrapper>
        <SectionWrapper sectionKey="services_lineup">
          <ProductLineupSection />
        </SectionWrapper>
        <SectionWrapper sectionKey="services_mfg">
          <ManufacturingSection />
        </SectionWrapper>
      </div>
    </PageLayoutProvider>
  );
}
