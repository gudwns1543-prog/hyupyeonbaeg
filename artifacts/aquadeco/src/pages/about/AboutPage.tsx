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
          자연이 주는 선물, 일상에서 누리는 진정한 쉼 — 휴편백이 전합니다.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-2 flex flex-col items-center text-center">
          <div className="w-64 h-80 rounded-2xl overflow-hidden shadow-lg mb-6">
            <img
              src="/images/ceo-photo.png"
              alt="대표이사 박형준"
              className="w-full h-full object-cover object-top"
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
  const years = [
    {
      year: "2020",
      label: "창업 원년",
      color: "bg-amber-500",
      records: [
        {
          title: "경기도 화성시 동탄 풀빌라 펜션",
          desc: "히노끼 반신욕조 8실 납품 시공. 창업 첫 해 대형 펜션 단지 납품으로 사업 기반 마련.",
          type: "펜션",
          img: "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6bf89575469c9.jpg",
        },
        {
          title: "경기도 가평군 글램핑 펜션",
          desc: "히노끼 전신욕조 4실 납품 시공. 자연 속 힐링 공간에 어울리는 편백욕조 시공.",
          type: "펜션",
          img: "https://cdn.imweb.me/thumbnail/20220103/5c1275af617c1.jpg",
        },
        {
          title: "강원도 춘천 독채 풀빌라",
          desc: "무절 히노끼 전신욕조 6실 납품 시공. 개장 후 예약률 90% 달성에 기여.",
          type: "풀빌라",
          img: "https://cdn.imweb.me/thumbnail/20220301/5de4b9e35abfa.jpg",
        },
      ],
    },
    {
      year: "2021",
      label: "성장기",
      color: "bg-primary",
      records: [
        {
          title: "강원도 속초 오션뷰 호텔",
          desc: "반신욕조 12실 / 전신욕조 4실 납품 시공. 동해안 최초 대형 호텔 히노끼욕조 납품 사례.",
          type: "호텔",
          img: "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6573d34824eba.jpg",
        },
        {
          title: "제주도 서귀포 프리미엄 리조트",
          desc: "무절 마사메 전신욕조 20실 납품 시공. 국내 최고급 리조트 객실 욕실에 히노끼욕조 적용.",
          type: "리조트",
          img: "https://cdn.imweb.me/thumbnail/20220107/63a49465fff4d.jpg",
        },
        {
          title: "경기도 양평 한옥 스테이",
          desc: "짜맞춤 방식 히노끼 전신욕조 6실 납품. 한옥 건축물과 어울리는 전통 짜맞춤 기법 적용.",
          type: "한옥스테이",
          img: "https://cdn.imweb.me/thumbnail/20220110/8d3f5e9a4c721.jpg",
        },
        {
          title: "경기도 수원 고급 단독주택",
          desc: "무절 히노끼 반신욕조 1실 맞춤 제작 납품. 개인 가정용 최고급 등급 시공.",
          type: "주거",
          img: "https://cdn.imweb.me/thumbnail/20220111/0f63ba036910f.jpg",
        },
      ],
    },
    {
      year: "2022",
      label: "전국 확대",
      color: "bg-primary",
      records: [
        {
          title: "부산 해운대 프리미엄 스파",
          desc: "대형 히노끼 탕 2기 / 반신욕조 8실 납품 시공. 스파 전용 대형 히노끼 탕 자체 설계 제작.",
          type: "스파",
          img: "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6bf89575469c9.jpg",
        },
        {
          title: "전라남도 여수 디오션 인근 풀빌라",
          desc: "히노끼 전신욕조 15실 납품 시공. 여수 관광 특수를 겨냥한 고급 펜션 단지 대량 납품.",
          type: "풀빌라",
          img: "https://cdn.imweb.me/thumbnail/20220301/5de4b9e35abfa.jpg",
        },
        {
          title: "강원도 강릉 경포 인근 펜션",
          desc: "반신욕조 10실 납품 시공. 해변 인접 럭셔리 펜션 차별화 요소로 히노끼욕조 도입.",
          type: "펜션",
          img: "https://cdn.imweb.me/thumbnail/20220103/5c1275af617c1.jpg",
        },
        {
          title: "경상북도 경주 한옥호텔",
          desc: "짜맞춤 방식 히노끼 반신욕조 8실 납품. 신라 문화 도시 경주의 고급 한옥호텔에 전통 기법 적용.",
          type: "한옥호텔",
          img: "https://cdn.imweb.me/thumbnail/20240905/17a681d712222.jpg",
        },
      ],
    },
    {
      year: "2023",
      label: "도심 시장 진출",
      color: "bg-primary",
      records: [
        {
          title: "서울 강남 고급 아파트 리모델링",
          desc: "FRP 방수 히노끼 욕조 3가구 납품. 아파트 욕실 리모델링 시장 진출, FRP 방수 기술 본격 적용.",
          type: "주거",
          img: "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6573d34824eba.jpg",
        },
        {
          title: "경기도 용인 프리미엄 스파 찜질방",
          desc: "히노끼 대형 탕 4기 납품 시공. 수도권 프리미엄 스파 시장 납품 레퍼런스 확보.",
          type: "스파",
          img: "https://cdn.imweb.me/thumbnail/20220107/63a49465fff4d.jpg",
        },
        {
          title: "충청남도 태안 해변 리조트",
          desc: "반신욕조 20실 / 전신욕조 5실 납품 시공. 서해안 최대 규모 히노끼욕조 납품 프로젝트.",
          type: "리조트",
          img: "https://cdn.imweb.me/thumbnail/20220110/8d3f5e9a4c721.jpg",
        },
        {
          title: "인천 송도 신규 호텔",
          desc: "FRP 방수 히노끼 반신욕조 18실 납품. 국제도시 송도 신축 호텔 전 객실 욕조 공급.",
          type: "호텔",
          img: "https://cdn.imweb.me/thumbnail/20220111/0f63ba036910f.jpg",
        },
      ],
    },
    {
      year: "2024",
      label: "최근 실적",
      color: "bg-amber-500",
      records: [
        {
          title: "강원도 평창 마운틴 리조트",
          desc: "무절 마사메 전신욕조 24실 납품 시공. 스키 리조트 프리미엄 객실 욕조 전량 공급.",
          type: "리조트",
          img: "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6bf89575469c9.jpg",
        },
        {
          title: "제주도 제주시 럭셔리 독채 풀빌라",
          desc: "짜맞춤 무절 전신욕조 12실 납품. 제주 프리미엄 숙박 시장을 겨냥한 최고급 납품 사례.",
          type: "풀빌라",
          img: "https://cdn.imweb.me/thumbnail/20220301/5de4b9e35abfa.jpg",
        },
        {
          title: "경기도 파주 DMZ 인근 힐링 스파",
          desc: "대형 히노끼 탕 2기 / 반신욕조 10실 납품. 힐링·웰니스 콘셉트 신규 스파 시설 전체 공급.",
          type: "스파",
          img: "https://cdn.imweb.me/thumbnail/20240905/17a681d712222.jpg",
        },
      ],
    },
  ];

  const typeColors: Record<string, string> = {
    "펜션": "bg-green-100 text-green-700",
    "풀빌라": "bg-teal-100 text-teal-700",
    "호텔": "bg-blue-100 text-blue-700",
    "리조트": "bg-indigo-100 text-indigo-700",
    "스파": "bg-purple-100 text-purple-700",
    "한옥스테이": "bg-amber-100 text-amber-700",
    "한옥호텔": "bg-amber-100 text-amber-700",
    "주거": "bg-rose-100 text-rose-700",
  };

  return (
    <div className="space-y-14">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">주요실적</h2>
        <p className="text-muted-foreground leading-relaxed">
          창업 이후 전국 각지의 호텔·리조트·펜션·스파·주거 현장에 납품한 주요 실적을 연도별로 소개합니다.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
        {[
          { value: "300+", label: "누적 납품 건수" },
          { value: "5+", label: "사업 연차" },
          { value: "150+", label: "펜션·호텔 납품" },
          { value: "100%", label: "원산지 증명" },
        ].map((stat, i) => (
          <div key={i} className="bg-primary/5 border border-primary/10 rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 연도별 타임라인 */}
      <div className="space-y-16">
        {years.map((yr) => (
          <div key={yr.year} className="relative">
            {/* 연도 헤더 */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`${yr.color} text-white text-2xl font-bold px-6 py-3 rounded-xl shadow-md`}>
                {yr.year}
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{yr.label}</p>
                <p className="text-sm text-muted-foreground">{yr.records.length}건 납품 시공</p>
              </div>
            </div>

            {/* 현장 카드 그리드 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5 ml-0 md:ml-4">
              {yr.records.map((rec, i) => (
                <div key={i} className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden flex flex-col md:flex-row group">
                  <div className="md:w-44 w-full h-44 md:h-auto shrink-0 overflow-hidden">
                    <img
                      src={rec.img}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[rec.type] || "bg-stone-100 text-stone-600"}`}>
                        {rec.type}
                      </span>
                    </div>
                    <h4 className="font-bold text-foreground text-sm mb-2 leading-snug">{rec.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{rec.desc}</p>
                  </div>
                </div>
              ))}
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
    <div className="min-h-screen pt-[104px]">
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">회사소개</h1>
          <p className="text-primary-foreground/80">휴편백을 소개합니다</p>
        </div>
      </div>

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
        {section === "ceo" && <CeoGreeting />}
        {section === "philosophy" && <Philosophy />}
        {section === "achievements" && <Achievements />}
        {section === "location" && <Location />}
      </div>
    </div>
  );
}
