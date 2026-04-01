import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/">
              <span className="text-2xl font-bold cursor-pointer tracking-tight flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">휴</span>
                </div>
                휴편백
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              히노끼(편백) 욕조 전문 제작&middot;판매&middot;시공 업체.<br />
              자연의 향기와 건강을 담은 최고급 히노끼 욕조를 경험하세요.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-5">바로가기</h4>
            <ul className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <li><Link href="/services"><span className="hover:text-white transition-colors cursor-pointer">사업소개</span></Link></li>
              <li><Link href="/portfolio"><span className="hover:text-white transition-colors cursor-pointer">시공사례</span></Link></li>
              <li><Link href="/inquiry"><span className="hover:text-white transition-colors cursor-pointer">견적문의</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-white transition-colors cursor-pointer">고객센터</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-5">제품 카테고리</h4>
            <ul className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <li><Link href="/shop/hanshin"><span className="hover:text-white transition-colors cursor-pointer">히노끼 반신욕조</span></Link></li>
              <li><Link href="/shop/jenshin"><span className="hover:text-white transition-colors cursor-pointer">히노끼 전신욕조</span></Link></li>
              <li><Link href="/shop/custom"><span className="hover:text-white transition-colors cursor-pointer">주문 제작형 욕조</span></Link></li>
              <li><Link href="/shop/accessory"><span className="hover:text-white transition-colors cursor-pointer">악세사리 (데크수전, 월풀)</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-5">고객센터</h4>
            <ul className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <li><strong className="text-primary-foreground">휴대폰:</strong> 010-5918-7778</li>
              <li><strong className="text-primary-foreground">유선/팩스:</strong> 031-501-3069</li>
              <li><strong className="text-primary-foreground">이메일:</strong> phjphk1@naver.com</li>
              <li><strong className="text-primary-foreground">영업시간:</strong> 평일 09:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <p>&copy; {new Date().getFullYear()} 휴편백. All rights reserved.</p>
            <span>대표: 박형준</span>
            <span>사업자등록번호: 562-49-00093</span>
            <span>통신판매신고번호: 2020-화성새솔-0070</span>
            <span>사업장: 경기도 화성시 수노을1로 191</span>
          </div>
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
