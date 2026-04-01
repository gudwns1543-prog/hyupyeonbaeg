import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type Notice = {
  id: number;
  title: string;
  date: string;
  content: string;
  isNew?: boolean;
};

const notices: Notice[] = [
  {
    id: 1,
    title: "히노끼욕조 관리방법 업데이트 안내",
    date: "2025-03-15",
    isNew: true,
    content: `안녕하세요, 휴편백입니다.

히노끼욕조 관리방법이 업데이트되었습니다.

■ 주요 변경 내용
- 오일링 주기 안내 변경 (3개월 → 1~2개월)
- 세척 방법 추가 안내
- 장기 미사용 시 보관 방법 상세 안내

자세한 관리방법은 사업소개 > 관리방법 페이지를 참고해 주세요.

감사합니다.`,
  },
  {
    id: 2,
    title: "2025년 설 연휴 운영 안내",
    date: "2025-01-20",
    content: `안녕하세요, 휴편백입니다.

2025년 설 연휴 기간(1월 28일 ~ 1월 30일) 동안 휴무입니다.

■ 휴무 기간: 2025년 1월 28일(화) ~ 1월 30일(목)
■ 정상 운영: 2025년 1월 31일(금)부터 정상 운영

연휴 기간 중 주문/문의 남겨주시면 운영 재개 후 순서대로 처리해 드리겠습니다.

감사합니다.`,
  },
  {
    id: 3,
    title: "히노끼욕조 악세사리 신제품 출시 안내",
    date: "2024-11-10",
    content: `안녕하세요, 휴편백입니다.

히노끼욕조 관련 신규 악세사리 제품이 출시되었습니다.

■ 신규 출시 제품
- 월풀 시스템 업그레이드 버전
- 히노끼 원목 외부계단 (2단형)

자세한 내용은 쇼핑 > 악세사리 페이지에서 확인하실 수 있습니다.

감사합니다.`,
  },
  {
    id: 4,
    title: "원산지 증명서 발급 서비스 안내",
    date: "2024-09-05",
    content: `안녕하세요, 휴편백입니다.

휴편백에서 제작한 모든 히노끼욕조에 대해 원산지 증명서를 무료로 발급해 드립니다.

■ 발급 대상: 휴편백 구매 고객 전체
■ 발급 내용: 일본산 히노끼(편백) 원목 원산지 증명
■ 발급 방법: 고객센터 또는 견적문의를 통해 신청

100% 정품 일본산 히노끼를 사용하는 휴편백만의 서비스입니다.

감사합니다.`,
  },
];

function NoticeItem({ notice }: { notice: Notice }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-stone-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-stone-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {notice.isNew && (
            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded font-medium shrink-0">NEW</span>
          )}
          <span className="text-sm font-medium text-foreground">{notice.title}</span>
        </div>
        <div className="flex items-center gap-4 shrink-0 ml-4">
          <span className="text-xs text-muted-foreground">{notice.date}</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-stone-400 transition-transform duration-200",
              open ? "rotate-180" : ""
            )}
          />
        </div>
      </button>
      {open && (
        <div className="px-6 py-5 border-t border-stone-50 bg-stone-50">
          <pre className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans">
            {notice.content}
          </pre>
        </div>
      )}
    </div>
  );
}

export default function Notice() {
  return (
    <div className="min-h-screen pt-[68px]">
      {/* Page Header */}
      <div className="bg-stone-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">공지사항</h1>
          <p className="text-stone-300">휴편백의 새로운 소식을 전해드립니다</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-3">
          {notices.map((notice) => (
            <NoticeItem key={notice.id} notice={notice} />
          ))}
        </div>
      </div>
    </div>
  );
}
