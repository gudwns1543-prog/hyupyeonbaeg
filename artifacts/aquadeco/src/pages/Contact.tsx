import { Mail, MapPin, Phone, Clock, Printer, Building2, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function Contact() {
  return (
    <div className="min-h-screen pt-[104px]">
      <div className="bg-stone-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">고객센터</h1>
          <p className="text-stone-300">히노끼욕조에 대한 궁금한 점을 편하게 문의해 주세요</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="grid md:grid-cols-5 h-full">
            {/* 연락처 정보 */}
            <div className="md:col-span-2 bg-stone-50 p-10 flex flex-col justify-center border-r border-stone-100">
              <h2 className="text-2xl font-bold text-foreground mb-8">연락처 안내</h2>

              <div className="space-y-7">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-muted-foreground mb-1 uppercase tracking-wide">휴대폰</h3>
                    <a href="tel:010-5918-7778" className="text-lg font-bold text-foreground hover:text-primary">
                      010-5918-7778
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Printer className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-muted-foreground mb-1 uppercase tracking-wide">유선 / 팩스</h3>
                    <a href="tel:031-501-3069" className="text-lg font-bold text-foreground hover:text-primary">
                      031-501-3069
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-muted-foreground mb-1 uppercase tracking-wide">이메일</h3>
                    <p className="text-sm font-medium text-foreground">phjphk1@naver.com</p>
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
              </div>
            </div>

            {/* 주소 정보 */}
            <div className="md:col-span-3 p-10">
              <h2 className="text-2xl font-bold text-foreground mb-8">사업장 안내</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground mb-0.5">본사 사무실</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      경기도 안산시 상록구 한양대학로 55<br />
                      창업보육센터 417호 사무동
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground mb-0.5">본사 창고동</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      경기도 안산시 단원구 성곡로 176<br />
                      타원타크라 1차 516호 창고동
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground mb-0.5">본사 생산동</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      경기도 김포시 양촌읍 누산리 211, 공장동
                    </p>
                  </div>
                </div>
              </div>

              {/* 네이버 지도 */}
              <div className="mt-8">
                <a
                  href="https://naver.me/GmtG3KT8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#03C75A]/10 p-5 rounded-xl border border-[#03C75A]/20 hover:bg-[#03C75A]/20 transition-colors"
                >
                  <div className="bg-[#03C75A] w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground text-sm">네이버 지도에서 길찾기</p>
                    <p className="text-xs text-muted-foreground">클릭하면 네이버 지도로 이동합니다</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#03C75A] shrink-0" />
                </a>
              </div>

              {/* 사업자 정보 */}
              <div className="mt-10 pt-8 border-t border-stone-100">
                <h3 className="text-sm font-bold text-foreground mb-4">사업자 정보</h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li><span className="font-medium text-stone-600">상호:</span> 휴편백</li>
                  <li><span className="font-medium text-stone-600">대표자:</span> 박형준</li>
                  <li><span className="font-medium text-stone-600">사업자등록번호:</span> 562-49-00093</li>
                  <li><span className="font-medium text-stone-600">사업장 주소:</span> 경기도 화성시 수노을1로 191</li>
                  <li><span className="font-medium text-stone-600">통신판매신고번호:</span> 2020-화성새솔-0070</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 채팅 상담 버튼 */}
        <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="https://talk.naver.com/profile/w41j7o"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#03C75A]/10 p-6 rounded-xl border border-[#03C75A]/20 w-full max-w-sm hover:bg-[#03C75A]/20 transition-colors"
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
            href="https://pf.kakao.com/_XcSHxj"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#FEE500]/20 p-6 rounded-xl border border-[#FEE500]/40 w-full max-w-sm hover:bg-[#FEE500]/30 transition-colors"
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
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm mb-3">온라인으로 견적을 남겨두시면 담당자가 직접 연락드립니다.</p>
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
