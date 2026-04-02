import { Link, useParams } from "wouter";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { MapPin, Phone, Mail, Printer, ExternalLink, Pencil, Trash2, Plus, Check, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InlineEditText } from "@/components/InlineEditText";
import { InlineEditImage } from "@/components/InlineEditImage";
import { ImageUploadInput } from "@/components/ui/ImageUploadInput";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useAdminMode } from "@/hooks/useAdminMode";
import { useQueryClient } from "@tanstack/react-query";
import { SectionWrapper } from "@/components/SectionWrapper";
import { PageLayoutProvider, SectionRegistryItem } from "@/context/PageLayoutContext";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type Section = "ceo" | "philosophy" | "achievements" | "location";

const TABS: { key: Section; label: string }[] = [
  { key: "ceo", label: "CEO 인사말" },
  { key: "philosophy", label: "경영이념" },
  { key: "achievements", label: "주요실적" },
  { key: "location", label: "찾아오시는 길" },
];

function CeoGreeting() {
  const { gc } = useSiteContent();
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <InlineEditText contentKey="ceo_section_heading" value={gc("ceo_section_heading", "CEO 인사말")} as="h2" className="text-3xl md:text-4xl font-bold mb-4" />
        <InlineEditText
          contentKey="ceo_subtitle"
          value={gc("ceo_subtitle", "자연이 주는 선물, 일상에서 누리는 진정한 쉼 — 휴편백이 전합니다.")}
          as="p"
          className="text-muted-foreground leading-relaxed"
        />
      </div>

      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-2 flex flex-col items-center text-center">
          <div className="w-64 h-80 rounded-2xl overflow-hidden shadow-lg mb-6">
            <InlineEditImage
              contentKey="img_ceo_photo"
              src={gc("img_ceo_photo", "/images/ceo-photo.png")}
              alt="대표이사 박형준"
              containerClassName="w-full h-full"
              imgClassName="w-full h-full object-cover object-top"
            />
          </div>
          <div className="bg-white rounded-xl px-6 py-4 border border-stone-100 shadow-sm text-center">
            <p className="text-xs text-muted-foreground mb-1">휴편백 대표이사</p>
            <p className="text-xl font-bold tracking-wide">박 형 준</p>
          </div>
        </div>

        <div className="md:col-span-3 bg-white rounded-2xl p-8 md:p-10 border border-stone-100 shadow-sm">
          <blockquote className="text-muted-foreground leading-[2] space-y-5 text-[0.95rem]">
            <InlineEditText
              contentKey="ceo_p1"
              value={gc("ceo_p1", "안녕하십니까, 휴편백 대표이사 박형준입니다.")}
              as="p"
              multiline
            />
            <InlineEditText
              contentKey="ceo_p2"
              value={gc("ceo_p2", "저는 오랜 시간 히노끼(편백)라는 자연 소재가 사람에게 줄 수 있는 선물에 매료되어 이 일을 시작했습니다. 욕조 안에 담긴 따뜻한 물, 그리고 히노끼 특유의 싱그러운 향기가 하루의 피로를 온전히 녹여주는 순간 — 그 경험을 더 많은 분들께 드리고 싶었습니다.")}
              as="p"
              multiline
            />
            <InlineEditText
              contentKey="ceo_p3"
              value={gc("ceo_p3", "휴편백은 100% 일본산 히노끼 원목만을 직수입하여 사용합니다. 원산지를 속이거나 저렴한 대체재를 사용하는 일은 단 한 번도 없었고, 앞으로도 없을 것입니다. 모든 제품에 원산지 증명서를 제공하는 것은 저희의 자부심이자 약속입니다.")}
              as="p"
              multiline
            />
            <InlineEditText
              contentKey="ceo_p4"
              value={gc("ceo_p4", "FRP 방수 제작방식과 전통 짜맞춤 방식, 두 가지 제작 기술을 모두 보유한 기업으로서 고객의 욕실 환경과 취향에 맞는 최적의 욕조를 제공하고자 끊임없이 연구하고 있습니다.")}
              as="p"
              multiline
            />
            <InlineEditText
              contentKey="ceo_p5"
              value={gc("ceo_p5", "오늘도 저희 휴편백을 찾아주신 모든 고객분께 진심으로 감사드립니다. 자연이 선물한 최고의 소재로, 가장 편안한 목욕 경험을 만들어 드리겠습니다.")}
              as="p"
              multiline
            />
            <div className="pt-4 border-t border-stone-100">
              <p className="text-right text-foreground font-medium flex items-center justify-end gap-2">
                <InlineEditText contentKey="ceo_title_label" value={gc("ceo_title_label", "휴편백 대표이사")} as="span" />
                <InlineEditText contentKey="ceo_name_label" value={gc("ceo_name_label", "박형준")} as="span" className="text-xl font-bold ml-2" />
              </p>
            </div>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

function Philosophy() {
  const { gc } = useSiteContent();
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <InlineEditText contentKey="philosophy_section_heading" value={gc("philosophy_section_heading", "경영이념")} as="h2" className="text-3xl md:text-4xl font-bold mb-4" />
        <InlineEditText
          contentKey="philosophy_subtitle"
          value={gc("philosophy_subtitle", "휴편백은 자연의 소재로 사람들의 삶에 건강과 편안함을 더하는 것을 경영의 근본으로 삼습니다.")}
          as="p"
          className="text-muted-foreground leading-relaxed"
          multiline
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {([
          { titleKey: "phil_card1_title", descKey: "phil_card1_desc", icon: "🌿", defaultTitle: "정직한 품질", defaultDesc: "100% 원산지 증명이 가능한 일본산 히노끼 원목만을 사용합니다. 원가 절감을 위해 품질을 타협하지 않습니다." },
          { titleKey: "phil_card2_title", descKey: "phil_card2_desc", icon: "🔨", defaultTitle: "장인 정신", defaultDesc: "오랜 경험을 가진 숙련 장인들이 하나하나 손으로 제작합니다. FRP 방수와 전통 짜맞춤 두 가지 기술을 모두 보유합니다." },
          { titleKey: "phil_card3_title", descKey: "phil_card3_desc", icon: "🤝", defaultTitle: "고객 만족", defaultDesc: "제품 납품 후에도 지속적인 관리 방법 안내와 A/S를 제공합니다. 고객과의 신뢰 관계를 가장 중요하게 생각합니다." },
        ] as const).map((v, i) => (
          <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 text-center">
            <div className="text-5xl mb-4">{v.icon}</div>
            <InlineEditText contentKey={v.titleKey} value={gc(v.titleKey, v.defaultTitle)} as="h3" className="text-xl font-bold mb-3" />
            <InlineEditText contentKey={v.descKey} value={gc(v.descKey, v.defaultDesc)} as="p" className="text-muted-foreground text-sm leading-relaxed" multiline />
          </div>
        ))}
      </div>

      <div className="bg-stone-50 rounded-2xl p-8 md:p-12">
        <InlineEditText contentKey="philosophy_company_heading" value={gc("philosophy_company_heading", "회사 소개")} as="h3" className="text-2xl font-bold mb-4 text-center" />
        <InlineEditText
          contentKey="philosophy_company_desc"
          value={gc("philosophy_company_desc", "휴편백은 오랜 연구와 시공 경험을 바탕으로 히노끼욕조 전문 제작·시공·판매를 하는 기업입니다. 100% 일본산 히노끼(편백)나무를 직수입하여 FRP 방수 처리 및 짜맞춤 방식으로 욕조를 제작합니다. 피톤치드 성분이 풍부한 히노끼욕조로 일상에서 자연의 향기를 느끼실 수 있습니다.")}
          as="p"
          className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto"
          multiline
        />
      </div>
    </div>
  );
}

type AchievementRecord = { title: string; desc: string; type: string; img: string };
type AchievementYear = { year: string; label: string; color: string; records: AchievementRecord[] };

const DEFAULT_ACHIEVEMENT_YEARS: AchievementYear[] = [
  {
    year: "2020", label: "창업 원년", color: "bg-amber-500",
    records: [
      { title: "경기도 화성시 동탄 풀빌라 펜션", desc: "히노끼 반신욕조 8실 납품 시공. 창업 첫 해 대형 펜션 단지 납품으로 사업 기반 마련.", type: "펜션", img: "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6bf89575469c9.jpg" },
      { title: "경기도 가평군 글램핑 펜션", desc: "히노끼 전신욕조 4실 납품 시공. 자연 속 힐링 공간에 어울리는 편백욕조 시공.", type: "펜션", img: "https://cdn.imweb.me/thumbnail/20220103/5c1275af617c1.jpg" },
      { title: "강원도 춘천 독채 풀빌라", desc: "무절 히노끼 전신욕조 6실 납품 시공. 개장 후 예약률 90% 달성에 기여.", type: "풀빌라", img: "https://cdn.imweb.me/thumbnail/20220301/5de4b9e35abfa.jpg" },
    ],
  },
  {
    year: "2021", label: "성장기", color: "bg-primary",
    records: [
      { title: "강원도 속초 오션뷰 호텔", desc: "반신욕조 12실 / 전신욕조 4실 납품 시공. 동해안 최초 대형 호텔 히노끼욕조 납품 사례.", type: "호텔", img: "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6573d34824eba.jpg" },
      { title: "제주도 서귀포 프리미엄 리조트", desc: "무절 마사메 전신욕조 20실 납품 시공. 국내 최고급 리조트 객실 욕실에 히노끼욕조 적용.", type: "리조트", img: "https://cdn.imweb.me/thumbnail/20220107/63a49465fff4d.jpg" },
      { title: "경기도 양평 한옥 스테이", desc: "짜맞춤 방식 히노끼 전신욕조 6실 납품. 한옥 건축물과 어울리는 전통 짜맞춤 기법 적용.", type: "한옥스테이", img: "https://cdn.imweb.me/thumbnail/20220110/8d3f5e9a4c721.jpg" },
      { title: "경기도 수원 고급 단독주택", desc: "무절 히노끼 반신욕조 1실 맞춤 제작 납품. 개인 가정용 최고급 등급 시공.", type: "주거", img: "https://cdn.imweb.me/thumbnail/20220111/0f63ba036910f.jpg" },
    ],
  },
  {
    year: "2022", label: "전국 확대", color: "bg-primary",
    records: [
      { title: "부산 해운대 프리미엄 스파", desc: "대형 히노끼 탕 2기 / 반신욕조 8실 납품 시공. 스파 전용 대형 히노끼 탕 자체 설계 제작.", type: "스파", img: "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6bf89575469c9.jpg" },
      { title: "전라남도 여수 디오션 인근 풀빌라", desc: "히노끼 전신욕조 15실 납품 시공. 여수 관광 특수를 겨냥한 고급 펜션 단지 대량 납품.", type: "풀빌라", img: "https://cdn.imweb.me/thumbnail/20220301/5de4b9e35abfa.jpg" },
      { title: "강원도 강릉 경포 인근 펜션", desc: "반신욕조 10실 납품 시공. 해변 인접 럭셔리 펜션 차별화 요소로 히노끼욕조 도입.", type: "펜션", img: "https://cdn.imweb.me/thumbnail/20220103/5c1275af617c1.jpg" },
      { title: "경상북도 경주 한옥호텔", desc: "짜맞춤 방식 히노끼 반신욕조 8실 납품. 신라 문화 도시 경주의 고급 한옥호텔에 전통 기법 적용.", type: "한옥호텔", img: "https://cdn.imweb.me/thumbnail/20240905/17a681d712222.jpg" },
    ],
  },
  {
    year: "2023", label: "도심 시장 진출", color: "bg-primary",
    records: [
      { title: "서울 강남 고급 아파트 리모델링", desc: "FRP 방수 히노끼 욕조 3가구 납품. 아파트 욕실 리모델링 시장 진출, FRP 방수 기술 본격 적용.", type: "주거", img: "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6573d34824eba.jpg" },
      { title: "경기도 용인 프리미엄 스파 찜질방", desc: "히노끼 대형 탕 4기 납품 시공. 수도권 프리미엄 스파 시장 납품 레퍼런스 확보.", type: "스파", img: "https://cdn.imweb.me/thumbnail/20220107/63a49465fff4d.jpg" },
      { title: "충청남도 태안 해변 리조트", desc: "반신욕조 20실 / 전신욕조 5실 납품 시공. 서해안 최대 규모 히노끼욕조 납품 프로젝트.", type: "리조트", img: "https://cdn.imweb.me/thumbnail/20220110/8d3f5e9a4c721.jpg" },
      { title: "인천 송도 신규 호텔", desc: "FRP 방수 히노끼 반신욕조 18실 납품. 국제도시 송도 신축 호텔 전 객실 욕조 공급.", type: "호텔", img: "https://cdn.imweb.me/thumbnail/20220111/0f63ba036910f.jpg" },
    ],
  },
  {
    year: "2024", label: "최근 실적", color: "bg-amber-500",
    records: [
      { title: "강원도 평창 마운틴 리조트", desc: "무절 마사메 전신욕조 24실 납품 시공. 스키 리조트 프리미엄 객실 욕조 전량 공급.", type: "리조트", img: "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6bf89575469c9.jpg" },
      { title: "제주도 제주시 럭셔리 독채 풀빌라", desc: "짜맞춤 무절 전신욕조 12실 납품. 제주 프리미엄 숙박 시장을 겨냥한 최고급 납품 사례.", type: "풀빌라", img: "https://cdn.imweb.me/thumbnail/20220301/5de4b9e35abfa.jpg" },
      { title: "경기도 파주 DMZ 인근 힐링 스파", desc: "대형 히노끼 탕 2기 / 반신욕조 10실 납품. 힐링·웰니스 콘셉트 신규 스파 시설 전체 공급.", type: "스파", img: "https://cdn.imweb.me/thumbnail/20240905/17a681d712222.jpg" },
    ],
  },
];

const ACHIEVEMENT_TYPE_COLORS: Record<string, string> = {
  "펜션": "bg-green-100 text-green-700",
  "풀빌라": "bg-teal-100 text-teal-700",
  "호텔": "bg-blue-100 text-blue-700",
  "리조트": "bg-indigo-100 text-indigo-700",
  "스파": "bg-purple-100 text-purple-700",
  "한옥스테이": "bg-amber-100 text-amber-700",
  "한옥호텔": "bg-amber-100 text-amber-700",
  "주거": "bg-rose-100 text-rose-700",
};

const ACHIEVEMENT_TYPES = ["펜션", "풀빌라", "호텔", "리조트", "스파", "한옥스테이", "한옥호텔", "주거", "기타"];
const YEAR_COLORS = [
  { value: "bg-primary", label: "초록" },
  { value: "bg-amber-500", label: "앰버" },
  { value: "bg-stone-700", label: "다크" },
  { value: "bg-blue-600", label: "파랑" },
];

function Achievements() {
  const { gc } = useSiteContent();
  const { isAdmin } = useAdminMode();
  const queryClient = useQueryClient();

  const yearsData: AchievementYear[] = useMemo(() => {
    try {
      const raw = gc("achievements_data", "");
      if (!raw) return DEFAULT_ACHIEVEMENT_YEARS;
      return JSON.parse(raw);
    } catch {
      return DEFAULT_ACHIEVEMENT_YEARS;
    }
  }, [gc]);

  const saveYears = async (newData: AchievementYear[]) => {
    await fetch(`${API_BASE}/api/content/achievements_data`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ value: JSON.stringify(newData) }),
    });
    queryClient.invalidateQueries({ queryKey: ["site-content"] });
  };

  type ModalState =
    | { mode: "edit_record"; yearIdx: number; recIdx: number }
    | { mode: "add_record"; yearIdx: number }
    | { mode: "edit_year"; yearIdx: number }
    | { mode: "add_year" };

  const [modal, setModal] = useState<ModalState | null>(null);
  const [saving, setSaving] = useState(false);
  const [formYear, setFormYear] = useState({ year: "", label: "", color: "bg-primary" });
  const [formRecord, setFormRecord] = useState<AchievementRecord>({ title: "", desc: "", type: "펜션", img: "" });

  const openEditRecord = (yearIdx: number, recIdx: number) => {
    setFormRecord({ ...yearsData[yearIdx].records[recIdx] });
    setModal({ mode: "edit_record", yearIdx, recIdx });
  };
  const openAddRecord = (yearIdx: number) => {
    setFormRecord({ title: "", desc: "", type: "펜션", img: "" });
    setModal({ mode: "add_record", yearIdx });
  };
  const openEditYear = (yearIdx: number) => {
    const y = yearsData[yearIdx];
    setFormYear({ year: y.year, label: y.label, color: y.color });
    setModal({ mode: "edit_year", yearIdx });
  };
  const openAddYear = () => {
    setFormYear({ year: "", label: "", color: "bg-primary" });
    setModal({ mode: "add_year" });
  };

  const handleSaveRecord = async () => {
    if (!modal) return;
    setSaving(true);
    const newData: AchievementYear[] = JSON.parse(JSON.stringify(yearsData));
    if (modal.mode === "edit_record") {
      newData[modal.yearIdx].records[modal.recIdx] = formRecord;
    } else if (modal.mode === "add_record") {
      newData[modal.yearIdx].records.push(formRecord);
    }
    await saveYears(newData);
    setSaving(false);
    setModal(null);
  };

  const handleSaveYear = async () => {
    if (!modal) return;
    setSaving(true);
    const newData: AchievementYear[] = JSON.parse(JSON.stringify(yearsData));
    if (modal.mode === "edit_year") {
      newData[modal.yearIdx] = { ...newData[modal.yearIdx], ...formYear };
    } else if (modal.mode === "add_year") {
      newData.push({ ...formYear, records: [] });
    }
    await saveYears(newData);
    setSaving(false);
    setModal(null);
  };

  const handleDeleteRecord = async (yearIdx: number, recIdx: number) => {
    if (!window.confirm("이 실적을 삭제하시겠습니까?")) return;
    const newData: AchievementYear[] = JSON.parse(JSON.stringify(yearsData));
    newData[yearIdx].records.splice(recIdx, 1);
    await saveYears(newData);
  };

  const handleDeleteYear = async (yearIdx: number) => {
    if (!window.confirm(`${yearsData[yearIdx].year}년 실적 전체를 삭제하시겠습니까?`)) return;
    await saveYears(yearsData.filter((_, i) => i !== yearIdx));
  };

  const isRecordModal = modal?.mode === "edit_record" || modal?.mode === "add_record";
  const isYearModal = modal?.mode === "edit_year" || modal?.mode === "add_year";

  return (
    <div className="space-y-14">
      <div className="text-center max-w-2xl mx-auto">
        <InlineEditText contentKey="achievements_section_heading" value={gc("achievements_section_heading", "주요실적")} as="h2" className="text-3xl md:text-4xl font-bold mb-4" />
        <InlineEditText
          contentKey="achievements_subtitle"
          value={gc("achievements_subtitle", "창업 이후 전국 각지의 호텔·리조트·펜션·스파·주거 현장에 납품한 주요 실적을 연도별로 소개합니다.")}
          as="p"
          className="text-muted-foreground leading-relaxed"
          multiline
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
        {[
          { valueKey: "stat1_value", labelKey: "stat1_label", defaultValue: "300+", defaultLabel: "누적 납품 건수" },
          { valueKey: "stat2_value", labelKey: "stat2_label", defaultValue: "5+", defaultLabel: "사업 연차" },
          { valueKey: "stat3_value", labelKey: "stat3_label", defaultValue: "150+", defaultLabel: "펜션·호텔 납품" },
          { valueKey: "stat4_value", labelKey: "stat4_label", defaultValue: "100%", defaultLabel: "원산지 증명" },
        ].map((stat, i) => (
          <div key={i} className="bg-primary/5 border border-primary/10 rounded-xl p-6">
            <InlineEditText contentKey={stat.valueKey} value={gc(stat.valueKey, stat.defaultValue)} as="div" className="text-3xl font-bold text-primary mb-1" />
            <InlineEditText contentKey={stat.labelKey} value={gc(stat.labelKey, stat.defaultLabel)} as="div" className="text-sm text-muted-foreground" />
          </div>
        ))}
      </div>

      <div className="space-y-16">
        {yearsData.map((yr, yearIdx) => (
          <div key={yearIdx} className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className={`${yr.color} text-white text-2xl font-bold px-6 py-3 rounded-xl shadow-md`}>{yr.year}</div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-foreground">{yr.label}</p>
                <p className="text-sm text-muted-foreground">{yr.records.length}건 납품 시공</p>
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditYear(yearIdx)}
                    className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-700 transition-colors"
                    title="연도 수정"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteYear(yearIdx)}
                    className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                    title="연도 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-5 ml-0 md:ml-4">
              {yr.records.map((rec, recIdx) => (
                <div key={recIdx} className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden flex flex-col md:flex-row group relative">
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={() => openEditRecord(yearIdx, recIdx)}
                        className="w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-amber-50 transition-colors"
                        title="수정"
                      >
                        <Pencil className="w-3.5 h-3.5 text-amber-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteRecord(yearIdx, recIdx)}
                        className="w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                  )}
                  <div className="md:w-44 w-full h-44 md:h-auto shrink-0 overflow-hidden">
                    <img
                      src={rec.img}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://cdn.imweb.me/thumbnail/20220103/5c1275af617c1.jpg"; }}
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ACHIEVEMENT_TYPE_COLORS[rec.type] || "bg-stone-100 text-stone-600"}`}>{rec.type}</span>
                    </div>
                    <h4 className="font-bold text-foreground text-sm mb-2 leading-snug">{rec.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{rec.desc}</p>
                  </div>
                </div>
              ))}

              {isAdmin && (
                <button
                  onClick={() => openAddRecord(yearIdx)}
                  className="min-h-[120px] rounded-2xl border-2 border-dashed border-stone-300 hover:border-primary transition-colors flex flex-col items-center justify-center gap-2 text-stone-400 hover:text-primary p-5"
                >
                  <Plus className="w-6 h-6" />
                  <span className="text-sm font-medium">{yr.year}년 실적 추가</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className="flex justify-center">
          <button
            onClick={openAddYear}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-dashed border-stone-300 hover:border-primary text-stone-400 hover:text-primary transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            새 연도 추가
          </button>
        </div>
      )}

      <div className="bg-stone-800 text-white rounded-2xl p-8 md:p-12 text-center">
        <InlineEditText contentKey="achievements_cta_title" value={gc("achievements_cta_title", "더 자세한 납품 사례가 궁금하신가요?")} as="h3" className="text-2xl font-bold mb-3" />
        <InlineEditText contentKey="achievements_cta_desc" value={gc("achievements_cta_desc", "현장별 시공사례 페이지에서 실제 설치 사진과 함께 납품 사례를 확인하실 수 있습니다.")} as="p" className="text-stone-300 text-sm mb-6 max-w-xl mx-auto" multiline />
        <Link href="/portfolio">
          <button className="bg-white text-stone-800 px-8 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors">
            <InlineEditText contentKey="achievements_cta_btn" value={gc("achievements_cta_btn", "시공사례 보러가기")} as="span" />
          </button>
        </Link>
      </div>

      {/* 실적 추가/수정 모달 */}
      {isRecordModal && modal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-base font-bold">{modal.mode === "add_record" ? "실적 추가" : "실적 수정"}</h2>
              <button onClick={() => setModal(null)} className="p-1 rounded-full hover:bg-stone-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">제목 *</label>
                <input
                  type="text"
                  value={formRecord.title}
                  onChange={(e) => setFormRecord((f) => ({ ...f, title: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="예: 강원도 속초 오션뷰 호텔"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">구분</label>
                <select
                  value={formRecord.type}
                  onChange={(e) => setFormRecord((f) => ({ ...f, type: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  {ACHIEVEMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">설명</label>
                <textarea
                  value={formRecord.desc}
                  onChange={(e) => setFormRecord((f) => ({ ...f, desc: e.target.value }))}
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="납품 내용을 간략히 입력하세요"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">이미지</label>
                <ImageUploadInput
                  value={formRecord.img}
                  onChange={(url) => setFormRecord((f) => ({ ...f, img: url }))}
                />
              </div>
            </div>
            <div className="p-5 border-t flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setModal(null)} disabled={saving}>취소</Button>
              <Button size="sm" onClick={handleSaveRecord} disabled={saving || !formRecord.title.trim()}>
                {saving ? "저장 중..." : <><Check className="w-4 h-4 mr-1" />{modal.mode === "add_record" ? "추가" : "저장"}</>}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 연도 추가/수정 모달 */}
      {isYearModal && modal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-base font-bold">{modal.mode === "add_year" ? "연도 추가" : "연도 수정"}</h2>
              <button onClick={() => setModal(null)} className="p-1 rounded-full hover:bg-stone-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">연도 *</label>
                <input
                  type="text"
                  value={formYear.year}
                  onChange={(e) => setFormYear((f) => ({ ...f, year: e.target.value }))}
                  placeholder="예: 2025"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">레이블</label>
                <input
                  type="text"
                  value={formYear.label}
                  onChange={(e) => setFormYear((f) => ({ ...f, label: e.target.value }))}
                  placeholder="예: 창업 원년"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">색상</label>
                <div className="flex gap-2">
                  {YEAR_COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setFormYear((f) => ({ ...f, color: c.value }))}
                      className={cn(`flex-1 py-2 rounded-lg text-white text-xs font-medium ${c.value}`, formYear.color === c.value && "ring-2 ring-offset-1 ring-stone-400")}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5 border-t flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setModal(null)} disabled={saving}>취소</Button>
              <Button size="sm" onClick={handleSaveYear} disabled={saving || !formYear.year.trim()}>
                {saving ? "저장 중..." : <><Check className="w-4 h-4 mr-1" />{modal.mode === "add_year" ? "추가" : "저장"}</>}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Location() {
  const { gc } = useSiteContent();
  return (
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <InlineEditText contentKey="location_section_heading" value={gc("location_section_heading", "찾아오시는 길")} as="h2" className="text-3xl md:text-4xl font-bold mb-4" />
        <InlineEditText
          contentKey="location_subtitle"
          value={gc("location_subtitle", "휴편백 사업장 위치 및 연락처 정보입니다.")}
          as="p"
          className="text-muted-foreground leading-relaxed"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* 네이버 지도 */}
        <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
          <a
            href="https://naver.me/GmtG3KT8"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="bg-[#03C75A]/10 p-8 flex flex-col items-center justify-center gap-4 hover:bg-[#03C75A]/20 transition-colors min-h-[200px]">
              <div className="bg-[#03C75A] w-16 h-16 rounded-full flex items-center justify-center shadow-md">
                <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="font-bold text-[#03C75A] text-lg">네이버 지도에서 보기</p>
                <p className="text-sm text-stone-500 mt-1">휴편백 위치 확인 및 길찾기</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#03C75A] font-medium">
                <ExternalLink className="w-3 h-3" />
                naver.me/GmtG3KT8
              </div>
            </div>
          </a>
          <div className="bg-stone-50 px-6 py-4 border-t border-stone-100">
            <p className="text-xs text-stone-500 text-center">클릭하면 네이버 지도에서 상세 위치를 확인할 수 있습니다</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: "본사 사무실", addr: "경기도 안산시 상록구 한양대학로 55\n창업보육센터 417호 사무동" },
            { label: "본사 창고동", addr: "경기도 안산시 단원구 성곡로 176\n타원타크라 1차 516호 창고동" },
            { label: "본사 생산동", addr: "경기도 김포시 양촌읍 누산리 211, 공장동" },
          ].map((loc) => (
            <div key={loc.label} className="bg-white rounded-xl p-5 border border-stone-100 shadow-sm flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-foreground mb-0.5">{loc.label}</p>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{loc.addr}</p>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-xl p-5 border border-stone-100 shadow-sm">
            <h3 className="text-sm font-bold mb-3">연락처</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:010-5918-7778" className="text-sm text-primary font-medium">010-5918-7778</a>
              </div>
              <div className="flex items-center gap-3">
                <Printer className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:031-501-3069" className="text-sm text-muted-foreground">031-501-3069 (유선/팩스)</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <p className="text-sm text-muted-foreground">phjphk1@naver.com</p>
              </div>
            </div>
          </div>

          <Link href="/inquiry">
            <Button className="w-full">견적 문의하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const ABOUT_REGISTRY: SectionRegistryItem[] = [
  { key: "about_header", label: "회사소개 헤더", component: () => null },
  { key: "about_ceo", label: "CEO 인사말", component: CeoGreeting },
  { key: "about_philosophy", label: "경영이념", component: Philosophy },
  { key: "about_achievements", label: "주요실적", component: Achievements },
  { key: "about_location", label: "찾아오시는 길", component: Location },
];
const ABOUT_DEFAULT_KEYS = ABOUT_REGISTRY.map((s) => s.key);

export default function AboutPage() {
  const params = useParams<{ section?: string }>();
  const section = (params.section || "ceo") as Section;
  const { gc } = useSiteContent();

  return (
    <PageLayoutProvider pageKey="about" defaultKeys={ABOUT_DEFAULT_KEYS} registry={ABOUT_REGISTRY}>
      <div className="min-h-screen pt-[104px]">
        <SectionWrapper sectionKey="about_header" noReorder noAdd noRemove>
          <div className="bg-primary text-primary-foreground py-16 px-4">
            <div className="container mx-auto text-center">
              <InlineEditText contentKey="about_page_heading" value={gc("about_page_heading", "회사소개")} as="h1" className="text-3xl md:text-4xl font-bold mb-2" />
              <InlineEditText contentKey="about_page_subheading" value={gc("about_page_subheading", "휴편백을 소개합니다")} as="p" className="text-primary-foreground/80" />
            </div>
          </div>
        </SectionWrapper>

        <div className="bg-white border-b border-stone-100 sticky top-[104px] z-30">
          <div className="container mx-auto px-4 flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <Link key={tab.key} href={`/about/${tab.key}`}>
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
          {section === "ceo" && (
            <SectionWrapper sectionKey="about_ceo" noReorder noAdd noRemove>
              <CeoGreeting />
            </SectionWrapper>
          )}
          {section === "philosophy" && (
            <SectionWrapper sectionKey="about_philosophy" noReorder noAdd noRemove>
              <Philosophy />
            </SectionWrapper>
          )}
          {section === "achievements" && (
            <SectionWrapper sectionKey="about_achievements" noReorder noAdd noRemove>
              <Achievements />
            </SectionWrapper>
          )}
          {section === "location" && (
            <SectionWrapper sectionKey="about_location" noReorder noAdd noRemove>
              <Location />
            </SectionWrapper>
          )}
        </div>
      </div>
    </PageLayoutProvider>
  );
}
