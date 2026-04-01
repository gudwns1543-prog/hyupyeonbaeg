import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">고객센터 / 오시는 길</h1>
          <p className="text-lg text-primary-foreground/80">
            아쿠아데코는 언제나 열려있습니다. 궁금하신 점이 있다면 편하게 연락주세요.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-lg border border-border/50 overflow-hidden max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 h-full">
            
            {/* Contact Info */}
            <div className="md:col-span-2 bg-muted/30 p-10 flex flex-col justify-center border-r border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-8">Contact Us</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">전화번호</h3>
                    <p className="text-lg font-bold text-foreground">02-1234-5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">이메일</h3>
                    <p className="text-base font-medium text-foreground">contact@aquadeco.co.kr</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">영업시간</h3>
                    <p className="text-base font-medium text-foreground">평일 09:00 - 18:00</p>
                    <p className="text-sm text-muted-foreground mt-1">주말 및 공휴일 휴무 (사전 예약시 방문 상담 가능)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">오시는 길</h3>
                    <p className="text-base font-medium text-foreground leading-relaxed">
                      서울특별시 강남구 테헤란로 123<br />
                      아쿠아빌딩 1층 아쿠아데코 쇼룸
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="md:col-span-3 min-h-[400px] bg-slate-100 relative">
              {/* This would be a real Naver/Kakao map in production */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwTTEwIDB2NDBNMCAyMGg0ME0yMCAwdjQwTTAgMzBoNDBNMzAgMHY0MCIgc3Ryb2tlPSIjZTJlOGYwIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]">
                <MapPin className="w-12 h-12 mb-4 text-slate-300" />
                <h3 className="text-xl font-bold mb-2 text-slate-500">지도 영역</h3>
                <p>실제 프로덕션 환경에서는 네이버 지도 또는 카카오 맵 API가 연동됩니다.</p>
                <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  <span className="font-semibold text-slate-700">AquaDeco 본사 및 쇼룸</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <div className="flex items-center gap-4 bg-[#03C75A]/10 p-6 rounded-xl border border-[#03C75A]/20 w-full max-w-sm">
            <div className="bg-[#03C75A] w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0">
              N
            </div>
            <div>
              <h4 className="font-bold text-foreground">네이버 톡톡 상담</h4>
              <p className="text-sm text-muted-foreground">빠르고 간편한 채팅 상담</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#FEE500]/20 p-6 rounded-xl border border-[#FEE500]/40 w-full max-w-sm">
            <div className="bg-[#FEE500] w-12 h-12 rounded-full flex items-center justify-center text-[#191919] font-bold shrink-0">
              TALK
            </div>
            <div>
              <h4 className="font-bold text-foreground">카카오톡 채널</h4>
              <p className="text-sm text-muted-foreground">@aquadeco 친구 추가</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
