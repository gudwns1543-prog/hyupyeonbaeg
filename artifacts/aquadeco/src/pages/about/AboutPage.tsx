import { Link, useParams } from "wouter";
import { cn } from "@/lib/utils";
import { MapPin, CheckCircle2, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

type Section = "philosophy" | "achievements" | "location";

const TABS: { key: Section; label: string }[] = [
  { key: "philosophy", label: "경영이념" },
  { key: "achievements", label: "주요실적" },
  { key: "location", label: "찾아오시는 길" },
];

function Philosophy() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">경영이념</h2>
        <p className="text-muted-foreground leading-relaxed">
          휴편백은 자연의 소재로 사람들의 삶에 건강과 편안함을 더하는 것을 경영의 근본으로 삼습니다.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "정직한 품질",
            desc: "100% 원산지 증명이 가능한 일본산 히노끼 원목만을 사용합니다. 원가 절감을 위해 품질을 타협하지 않습니다.",
            icon: "🌿",
          },
          {
            title: "장인 정신",
            desc: "오랜 경험을 가진 숙련 장인들이 하나하나 손으로 제작합니다. 기계로 대량 생산하지 않고 수공예 방식을 고수합니다.",
            icon: "🔨",
          },
          {
            title: "고객 만족",
            desc: "제품 납품 후에도 지속적인 관리 방법 안내와 A/S를 제공합니다. 고객과의 신뢰 관계를 가장 중요하게 생각합니다.",
            icon: "🤝",
          },
        ].map((v, i) => (
          <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 text-center">
            <div className="text-5xl mb-4">{v.icon}</div>
            <h3 className="text-xl font-bold mb-3">{v.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-stone-50 rounded-2xl p-8 md:p-12">
        <h3 className="text-2xl font-bold mb-4 text-center">회사 소개</h3>
        <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
          휴편백은 오랜 연구와 시공 경험을 바탕으로 히노끼욕조 전문 제작·시공·판매를 하는 기업입니다.
          100% 일본산 히노끼(편백)나무를 직수입하여 FRP 방수 처리 및 짜맞춤 방식으로 욕조를 제작합니다.
          피톤치드 성분이 풍부한 히노끼욕조로 일상에서 자연의 향기를 느끼실 수 있습니다.
        </p>
      </div>
    </div>
  );
}

function Achievements() {
  const achievements = [
    "전국 호텔, 스파, 펜션 등 다수 시공 완료",
    "개인 가정용 욕조 1,000건 이상 시공 실적",
    "히노끼욕조 FRP 방수 기술 자체 개발 및 적용",
    "일본 히노끼 원산지 증명서 발급 시스템 구축",
    "전국 A/S 네트워크 운영",
    "고객 만족도 98% 이상 유지",
  ];

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">주요실적</h2>
        <p className="text-muted-foreground leading-relaxed">
          전국 각지의 다양한 시공 현장에서 쌓아온 휴편백의 실적을 소개합니다.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {achievements.map((item, i) => (
          <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-foreground/80">{item}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
        {[
          { value: "1,000+", label: "누적 시공 건수" },
          { value: "15+", label: "시공 경력 (년)" },
          { value: "98%", label: "고객 만족도" },
          { value: "100%", label: "원산지 증명" },
        ].map((stat, i) => (
          <div key={i} className="bg-stone-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Location() {
  return (
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">찾아오시는 길</h2>
        <p className="text-muted-foreground leading-relaxed">
          휴편백 사무소/공장 위치 및 연락처 정보입니다.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-stone-100 rounded-2xl overflow-hidden h-72 md:h-96 flex items-center justify-center">
          <div className="text-center text-stone-400">
            <MapPin className="w-12 h-12 mx-auto mb-3" />
            <p className="text-sm">지도가 표시될 영역</p>
            <p className="text-xs mt-1">(카카오맵 연동 예정)</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
            <h3 className="text-lg font-bold mb-4">연락처 정보</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">주소</p>
                  <p className="text-sm text-muted-foreground">주소를 입력해주세요</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">전화</p>
                  <a href="tel:010-0000-0000" className="text-sm text-primary">010-0000-0000</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">이메일</p>
                  <p className="text-sm text-muted-foreground">info@hyupyeonbaek.kr</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
            <h3 className="text-lg font-bold mb-4">운영시간</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">평일</span>
                <span className="font-medium">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">토요일</span>
                <span className="font-medium">09:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">일요일 / 공휴일</span>
                <span className="font-medium text-red-500">휴무</span>
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

export default function AboutPage() {
  const params = useParams<{ section?: string }>();
  const section = (params.section || "philosophy") as Section;

  return (
    <div className="min-h-screen pt-[68px]">
      {/* Page Header */}
      <div className="bg-stone-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">회사소개</h1>
          <p className="text-stone-300">휴편백을 소개합니다</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-stone-100 sticky top-[68px] z-30">
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

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        {section === "philosophy" && <Philosophy />}
        {section === "achievements" && <Achievements />}
        {section === "location" && <Location />}
      </div>
    </div>
  );
}
