import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Phone } from "lucide-react";

export default function Schedule() {
  return (
    <div className="min-h-screen pt-[68px]">
      {/* Page Header */}
      <div className="bg-stone-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">시공일정</h1>
          <p className="text-stone-300">휴편백의 시공 일정 안내</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 max-w-4xl">
        <div className="text-center mb-12">
          <CalendarDays className="w-14 h-14 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">시공 일정 안내</h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto">
            시공 일정은 주문 접수 후 담당자가 개별 안내드립니다.
            욕실 환경 및 제품 종류에 따라 일정이 달라질 수 있으니, 아래 내용을 참고하시고 문의해 주세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 border border-stone-100 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              일반 제품 납기
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-stone-50">
                <span className="text-muted-foreground">반신욕조 (양산형)</span>
                <span className="font-medium">약 2~3주</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-50">
                <span className="text-muted-foreground">전신욕조 (양산형)</span>
                <span className="font-medium">약 2~3주</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-50">
                <span className="text-muted-foreground">반신/전신욕조 (유절/무절)</span>
                <span className="font-medium">약 4~5주</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">주문제작형 욕조</span>
                <span className="font-medium">약 4~6주</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-stone-100 shadow-sm">
            <h3 className="text-lg font-bold mb-4">시공 진행 과정</h3>
            <div className="space-y-4">
              {[
                { step: "1", title: "견적 상담", desc: "전화 또는 온라인 견적 문의" },
                { step: "2", title: "현장 실측", desc: "전문 상담사 방문 욕실 실측" },
                { step: "3", title: "계약 및 제작", desc: "계약 후 히노끼욕조 제작 시작" },
                { step: "4", title: "현장 시공", desc: "전문 시공팀 방문 설치" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 text-center">
          <h3 className="text-xl font-bold mb-3">시공 일정 상담</h3>
          <p className="text-muted-foreground text-sm mb-6">
            시공 일정은 전화 또는 온라인 문의 시 자세하게 안내드립니다.<br />
            원하시는 시공 시기를 알려주시면 일정을 조율해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:010-0000-0000">
              <Button variant="outline" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                전화 상담
              </Button>
            </a>
            <Link href="/inquiry">
              <Button size="lg">
                온라인 견적 문의
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
