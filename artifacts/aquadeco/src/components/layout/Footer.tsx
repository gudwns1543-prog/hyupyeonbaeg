import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/">
              <span className="font-serif text-2xl font-semibold cursor-pointer tracking-tight flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-secondary rounded-tr-lg rounded-bl-lg" />
                AquaDeco
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              프리미엄 수족관 인테리어 & 맞춤형 설치 전문 기업. 공간에 물의 아름다움과 생명력을 더합니다.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-6">바로가기</h4>
            <ul className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <li><Link href="/services"><span className="hover:text-white transition-colors cursor-pointer">서비스 소개</span></Link></li>
              <li><Link href="/portfolio"><span className="hover:text-white transition-colors cursor-pointer">포트폴리오</span></Link></li>
              <li><Link href="/inquiry"><span className="hover:text-white transition-colors cursor-pointer">견적문의</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-white transition-colors cursor-pointer">고객센터</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-6">서비스</h4>
            <ul className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <li>주거공간 수족관</li>
              <li>상업공간 수족관</li>
              <li>맞춤형 아쿠아스케이프</li>
              <li>정기 유지보수</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-6">고객센터</h4>
            <ul className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <li><strong>Tel:</strong> 02-1234-5678</li>
              <li><strong>Email:</strong> contact@aquadeco.co.kr</li>
              <li><strong>Time:</strong> 평일 09:00 - 18:00</li>
              <li><strong>Address:</strong> 서울특별시 강남구 테헤란로 123 아쿠아빌딩 1층</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} AquaDeco. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/admin/login"><span className="hover:text-white transition-colors cursor-pointer">관리자 로그인</span></Link>
            <span>이용약관</span>
            <span>개인정보처리방침</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
