import { Link, useParams } from "wouter";
import { cn } from "@/lib/utils";
import { MapPin, CheckCircle2, Phone, Mail, Printer, Building2, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

type Section = "ceo" | "philosophy" | "achievements" | "location";

const TABS: { key: Section; label: string }[] = [
  { key: "ceo", label: "CEO 인사말" },
  { key: "philosophy", label: "경영이념" },
  { key: "achievements", label: "주요실적" },
  { key: "location", label: "찾아오시는 길" },
];

function CeoGreeting() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">CEO 인사말</h2>
        <p className="text-muted-foreground leading-relaxed">
          휴편백 대표이사 박형준의 인사말을 전합니다.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-2 flex flex-col items-center text-center">
          <div className="w-64 h-80 rounded-2xl overflow-hidden shadow-lg mb-6">
            <img
              src="/images/ceo-portrait.png"
              alt="대표이사 박형준"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="bg-white rounded-xl px-6 py-4 border border-stone-100 shadow-sm text-center">
            <p className="text-xs text-muted-foreground mb-1">휴편백 대표이사</p>
            <p className="text-xl font-bold tracking-wide">박 형 준</p>
          </div>
        </div>

        <div className="md:col-span-3 bg-white rounded-2xl p-8 md:p-10 border border-stone-100 shadow-sm">
          <blockquote className="text-muted-foreground leading-[2] space-y-5 text-[0.95rem]">
            <p>
              안녕하십니까, 휴편백 대표이사 <strong className="text-foreground">박형준</strong>입니다.
            </p>
            <p>
              저는 오랜 시간 히노끼(편백)라는 자연 소재가 사람에게 줄 수 있는 선물에 매료되어 이 일을 시작했습니다.
              욕조 안에 담긴 따뜻한 물, 그리고 히노끼 특유의 싱그러운 향기가 하루의 피로를 온전히 녹여주는 순간 —
              그 경험을 더 많은 분들께 드리고 싶었습니다.
            </p>
            <p>
              휴편백은 100% 일본산 히노끼 원목만을 직수입하여 사용합니다.
              원산지를 속이거나 저렴한 대체재를 사용하는 일은 단 한 번도 없었고, 앞으로도 없을 것입니다.
              모든 제품에 원산지 증명서를 제공하는 것은 저희의 자부심이자 약속입니다.
            </p>
            <p>
              FRP 방수 제작방식과 전통 짜맞춤 방식, 두 가지 제작 기술을 모두 보유한 기업으로서
              고객의 욕실 환경과 취향에 맞는 최적의 욕조를 제공하고자 끊임없이 연구하고 있습니다.
            </p>
            <p>
              오늘도 저희 휴편백을 찾아주신 모든 고객분께 진심으로 감사드립니다.
              자연이 선물한 최고의 소재로, 가장 편안한 목욕 경험을 만들어 드리겠습니다.
            </p>
            <div className="pt-4 border-t border-stone-100">
              <p className="text-right text-foreground font-medium">
                휴편백 대표이사 <span className="text-xl font-bold ml-2">박형준</span>
              </p>
            </div>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

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
            desc: "오랜 경험을 가진 숙련 장인들이 하나하나 손으로 제작합니다. FRP 방수와 전통 짜맞춤 두 가지 기술을 모두 보유합니다.",
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
  const milestones = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "호텔·리조트 납품",
      desc: "강원도, 제주도, 경기도 등 전국 프리미엄 호텔 및 리조트에 히노끼욕조 납품 시공 완료",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "펜션·풀빌라 시공",
      desc: "전국 150여 개 펜션 및 풀빌라에 개별 욕실 히노끼욕조 설치. 고급 펜션 인테리어의 필수 아이템으로 자리잡음",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "스파·찜질방 시공",
      desc: "경기, 서울, 부산 등 전국 스파 및 프리미엄 찜질방에 대형 히노끼욕조 및 탕 시공 납품",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "개인 가정용 시공",
      desc: "고급 주택, 아파트 욕실 리모델링 수요에 맞춤 제작 납품. 다양한 규격과 등급(유절/무절/마사메)으로 선택지 제공",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "FRP 방수 기술 자체 개발",
      desc: "일반 욕조 수준의 방수 성능을 히노끼 욕조에 적용. 아파트 및 도심 욕실에도 안심하고 설치 가능",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "원산지 증명 시스템 구축",
      desc: "일본산 히노끼 수입신고필증, 방사능 검사결과지 등 원산지 증명 서류 일체를 고객에게 무상 제공",
    },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">주요실적</h2>
        <p className="text-muted-foreground leading-relaxed">
          전국 각지의 다양한 시공 현장에서 쌓아온 휴편백의 실적을 소개합니다.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
        {[
          { value: "1,000+", label: "누적 시공 건수" },
          { value: "15+", label: "시공 경력 (년)" },
          { value: "150+", label: "펜션·호텔 납품" },
          { value: "100%", label: "원산지 증명" },
        ].map((stat, i) => (
          <div key={i} className="bg-primary/5 border border-primary/10 rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {milestones.map((item, i) => (
          <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
            <div className="text-primary shrink-0 mt-0.5">{item.icon}</div>
            <div>
              <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-stone-800 text-white rounded-2xl p-8 md:p-12 text-center">
        <h3 className="text-2xl font-bold mb-3">더 자세한 납품 사례가 궁금하신가요?</h3>
        <p className="text-stone-300 text-sm mb-6 max-w-xl mx-auto">
          현장별 시공사례 페이지에서 실제 설치 사진과 함께 납품 사례를 확인하실 수 있습니다.
        </p>
        <Link href="/portfolio">
          <button className="bg-white text-stone-800 px-8 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors">
            시공사례 보러가기
          </button>
        </Link>
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
          휴편백 사업장 위치 및 연락처 정보입니다.
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

export default function AboutPage() {
  const params = useParams<{ section?: string }>();
  const section = (params.section || "ceo") as Section;

  return (
    <div className="min-h-screen pt-[68px]">
      <div className="bg-stone-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">회사소개</h1>
          <p className="text-stone-300">휴편백을 소개합니다</p>
        </div>
      </div>

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

      <div className="container mx-auto px-4 py-16">
        {section === "ceo" && <CeoGreeting />}
        {section === "philosophy" && <Philosophy />}
        {section === "achievements" && <Achievements />}
        {section === "location" && <Location />}
      </div>
    </div>
  );
}
