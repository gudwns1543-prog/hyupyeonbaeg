import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">고객센터</h1>
          <p className="text-lg text-primary-foreground/80">
            히노끼욕조에 대한 궁금한 점이나 견적 문의는 편하게 연락주세요.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-border/50 overflow-hidden max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 h-full">

            {/* 연락처 정보 */}
            <div className="md:col-span-2 bg-stone-50 p-10 flex flex-col justify-center border-r border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-8">연락처 안내</h2>

              <div className="space-y-7">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-muted-foreground mb-1 uppercase tracking-wide">전화번호</h3>
                    <p className="text-lg font-bold text-foreground">010-0000-0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-muted-foreground mb-1 uppercase tracking-wide">이메일</h3>
                    <p className="text-sm font-medium text-foreground">info@hyupyeonbaek.kr</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-muted-foreground mb-1 uppercase tracking-wide">영업시간</h3>
                    <p className="text-sm font-medium text-foreground">평일 09:00 - 18:00</p>
                    <p className="text-sm font-medium text-foreground">토요일 09:00 - 14:00</p>
                    <p className="text-xs text-muted-foreground mt-1">일요일 / 공휴일 휴무</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-muted-foreground mb-1 uppercase tracking-wide">주소</h3>
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      주소를 입력해주세요<br />
                      <span className="text-xs text-muted-foreground">(관리자 페이지에서 수정 가능)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 지도 자리 */}
            <div className="md:col-span-3 min-h-[400px] bg-stone-100 relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 p-8 text-center">
                <MapPin className="w-12 h-12 mb-4 text-stone-300" />
                <h3 className="text-lg font-bold mb-2 text-stone-500">지도 영역</h3>
                <p className="text-sm text-stone-400">실제 서비스 시 네이버 지도 또는 카카오 맵이 연동됩니다.</p>
                <div className="mt-6 bg-white p-4 rounded-xl shadow-sm border border-stone-200 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="font-semibold text-stone-700 text-sm">휴편백</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 채팅 상담 버튼 */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="https://talk.naver.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#03C75A]/10 p-6 rounded-xl border border-[#03C75A]/20 w-full max-w-sm hover:bg-[#03C75A]/20 transition-colors cursor-pointer"
            data-testid="link-naver-talk"
          >
            <div className="bg-[#03C75A] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
              N
            </div>
            <div>
              <h4 className="font-bold text-foreground">네이버 톡톡 상담</h4>
              <p className="text-sm text-muted-foreground">빠르고 간편한 채팅 상담</p>
            </div>
          </a>

          <a
            href="https://pf.kakao.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#FEE500]/20 p-6 rounded-xl border border-[#FEE500]/40 w-full max-w-sm hover:bg-[#FEE500]/30 transition-colors cursor-pointer"
            data-testid="link-kakao"
          >
            <div className="bg-[#FEE500] w-12 h-12 rounded-full flex items-center justify-center text-[#3C1E1E] font-bold text-xs shrink-0">
              TALK
            </div>
            <div>
              <h4 className="font-bold text-foreground">카카오톡 채널</h4>
              <p className="text-sm text-muted-foreground">카카오톡 1:1 채팅 상담</p>
            </div>
          </a>
        </div>

        {/* 견적 문의 바로가기 */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm mb-4">온라인으로 견적을 남겨두시면 담당자가 직접 연락드립니다.</p>
          <Link href="/inquiry">
            <span className="text-primary font-semibold hover:underline cursor-pointer" data-testid="link-goto-inquiry">
              온라인 견적 문의 바로가기 →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
