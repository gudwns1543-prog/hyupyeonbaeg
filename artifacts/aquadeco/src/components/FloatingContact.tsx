import { MessageCircle, Phone, MessagesSquare } from "lucide-react";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Naver Talk Talk */}
      <a
        href="https://talk.naver.com/profile/w41j7o"
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 bg-[#03C75A] rounded-full flex items-center justify-center text-white shadow-lg hover:-translate-y-1 transition-transform"
        aria-label="네이버 톡톡 (Naver Talk Talk)"
        title="네이버 톡톡 문의"
      >
        <MessagesSquare className="w-6 h-6" />
      </a>

      {/* KakaoTalk Channel */}
      <a
        href="https://pf.kakao.com/_XcSHxj"
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 bg-[#FEE500] rounded-full flex items-center justify-center text-[#191919] shadow-lg hover:-translate-y-1 transition-transform"
        aria-label="카카오채널 (KakaoTalk)"
        title="카카오채널 문의"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Phone Call */}
      <a
        href="tel:010-0000-0000"
        className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:-translate-y-1 transition-transform"
        aria-label="전화 상담 (Phone Call)"
        title="전화 상담"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
