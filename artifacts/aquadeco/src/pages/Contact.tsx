import { Mail, MapPin, Phone, Clock, Printer, Building2, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { InlineEditText } from "@/components/InlineEditText";
import { useSiteContent } from "@/hooks/useSiteContent";
import { SectionWrapper } from "@/components/SectionWrapper";
import { PageLayoutProvider, SectionRegistryItem } from "@/context/PageLayoutContext";

function ContactHeader() {
  const { gc } = useSiteContent();
  return (
    <div className="bg-stone-800 text-white py-16 px-4">
      <div className="container mx-auto text-center">
        <InlineEditText
          contentKey="contact_page_title"
          value={gc("contact_page_title", "고객센터")}
          as="h1"
          className="text-3xl md:text-4xl font-bold mb-2"
        />
        <InlineEditText
          contentKey="contact_page_subtitle"
          value={gc("contact_page_subtitle", "히노끼욕조에 대한 궁금한 점을 편하게 문의해 주세요")}
          as="p"
          className="text-stone-300"
        />
      </div>
    </div>
  );
}

function ContactInfoSection() {
  const { gc } = useSiteContent();
  const mobilePhone = gc("contact_phone_mobile", "010-5918-7778");
  const faxPhone = gc("contact_phone_fax", "031-501-3069");
  const email = gc("contact_email", "phjphk1@naver.com");
  const mapUrl = gc("contact_map_url", "https://naver.me/GmtG3KT8");

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="grid md:grid-cols-5 h-full">
          {/* 연락처 정보 */}
          <div className="md:col-span-2 bg-stone-50 p-10 flex flex-col justify-center border-r border-stone-100">
            <InlineEditText
              contentKey="contact_info_title"
              value={gc("contact_info_title", "연락처 안내")}
              as="h2"
              className="text-2xl font-bold text-foreground mb-8"
            />

            <div className="space-y-7">
              {/* 휴대폰 */}
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <InlineEditText
                    contentKey="contact_phone_mobile_label"
                    value={gc("contact_phone_mobile_label", "휴대폰")}
                    as="h3"
                    className="font-semibold text-xs text-muted-foreground mb-1 uppercase tracking-wide"
                  />
                  <a href={`tel:${mobilePhone.replace(/-/g, "")}`} className="text-lg font-bold text-foreground hover:text-primary">
                    <InlineEditText
                      contentKey="contact_phone_mobile"
                      value={mobilePhone}
                      as="span"
                    />
                  </a>
                </div>
              </div>

              {/* 유선/팩스 */}
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <InlineEditText
                    contentKey="contact_phone_fax_label"
                    value={gc("contact_phone_fax_label", "유선 / 팩스")}
                    as="h3"
                    className="font-semibold text-xs text-muted-foreground mb-1 uppercase tracking-wide"
                  />
                  <a href={`tel:${faxPhone.replace(/-/g, "")}`} className="text-lg font-bold text-foreground hover:text-primary">
                    <InlineEditText
                      contentKey="contact_phone_fax"
                      value={faxPhone}
                      as="span"
                    />
                  </a>
                </div>
              </div>

              {/* 이메일 */}
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <InlineEditText
                    contentKey="contact_email_label"
                    value={gc("contact_email_label", "이메일")}
                    as="h3"
                    className="font-semibold text-xs text-muted-foreground mb-1 uppercase tracking-wide"
                  />
                  <InlineEditText
                    contentKey="contact_email"
                    value={email}
                    as="p"
                    className="text-sm font-medium text-foreground"
                  />
                </div>
              </div>

              {/* 영업시간 */}
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <InlineEditText
                    contentKey="contact_hours_label"
                    value={gc("contact_hours_label", "영업시간")}
                    as="h3"
                    className="font-semibold text-xs text-muted-foreground mb-1 uppercase tracking-wide"
                  />
                  <InlineEditText
                    contentKey="contact_hours_weekday"
                    value={gc("contact_hours_weekday", "평일 09:00 - 18:00")}
                    as="p"
                    className="text-sm font-medium text-foreground"
                  />
                  <InlineEditText
                    contentKey="contact_hours_saturday"
                    value={gc("contact_hours_saturday", "토요일 09:00 - 14:00")}
                    as="p"
                    className="text-sm font-medium text-foreground"
                  />
                  <InlineEditText
                    contentKey="contact_hours_holiday"
                    value={gc("contact_hours_holiday", "일요일 / 공휴일 휴무")}
                    as="p"
                    className="text-xs text-muted-foreground mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 주소 정보 */}
          <div className="md:col-span-3 p-10">
            <InlineEditText
              contentKey="contact_biz_section_title"
              value={gc("contact_biz_section_title", "사업장 안내")}
              as="h2"
              className="text-2xl font-bold text-foreground mb-8"
            />
            <div className="space-y-6">
              {/* 본사 사무실 */}
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <InlineEditText
                    contentKey="contact_addr_office_title"
                    value={gc("contact_addr_office_title", "본사 사무실")}
                    as="h3"
                    className="font-semibold text-sm text-foreground mb-0.5"
                  />
                  <InlineEditText
                    contentKey="contact_addr_office"
                    value={gc("contact_addr_office", "경기도 안산시 상록구 한양대학로 55\n창업보육센터 417호 사무동")}
                    as="p"
                    className="text-sm text-muted-foreground leading-relaxed"
                    multiline
                  />
                </div>
              </div>
              {/* 창고동 */}
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <InlineEditText
                    contentKey="contact_addr_warehouse_title"
                    value={gc("contact_addr_warehouse_title", "본사 창고동")}
                    as="h3"
                    className="font-semibold text-sm text-foreground mb-0.5"
                  />
                  <InlineEditText
                    contentKey="contact_addr_warehouse"
                    value={gc("contact_addr_warehouse", "경기도 안산시 단원구 성곡로 176\n타원타크라 1차 516호 창고동")}
                    as="p"
                    className="text-sm text-muted-foreground leading-relaxed"
                    multiline
                  />
                </div>
              </div>
              {/* 생산동 */}
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <InlineEditText
                    contentKey="contact_addr_factory_title"
                    value={gc("contact_addr_factory_title", "본사 생산동")}
                    as="h3"
                    className="font-semibold text-sm text-foreground mb-0.5"
                  />
                  <InlineEditText
                    contentKey="contact_addr_factory"
                    value={gc("contact_addr_factory", "경기도 김포시 양촌읍 누산리 211, 공장동")}
                    as="p"
                    className="text-sm text-muted-foreground leading-relaxed"
                    multiline
                  />
                </div>
              </div>
            </div>

            {/* 네이버 지도 */}
            <div className="mt-8">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#03C75A]/10 p-5 rounded-xl border border-[#03C75A]/20 hover:bg-[#03C75A]/20 transition-colors"
              >
                <div className="bg-[#03C75A] w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <InlineEditText
                    contentKey="contact_map_label"
                    value={gc("contact_map_label", "네이버 지도에서 길찾기")}
                    as="p"
                    className="font-bold text-foreground text-sm"
                  />
                  <InlineEditText
                    contentKey="contact_map_desc"
                    value={gc("contact_map_desc", "클릭하면 네이버 지도로 이동합니다")}
                    as="p"
                    className="text-xs text-muted-foreground"
                  />
                </div>
                <ExternalLink className="w-4 h-4 text-[#03C75A] shrink-0" />
              </a>
            </div>

            {/* 사업자 정보 */}
            <div className="mt-10 pt-8 border-t border-stone-100">
              <InlineEditText
                contentKey="contact_biz_info_title"
                value={gc("contact_biz_info_title", "사업자 정보")}
                as="h3"
                className="text-sm font-bold text-foreground mb-4"
              />
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-medium text-stone-600 shrink-0">상호:</span>
                  <InlineEditText contentKey="contact_biz_name" value={gc("contact_biz_name", "휴편백")} as="span" />
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-stone-600 shrink-0">대표자:</span>
                  <InlineEditText contentKey="contact_biz_ceo" value={gc("contact_biz_ceo", "박형준")} as="span" />
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-stone-600 shrink-0">사업자등록번호:</span>
                  <InlineEditText contentKey="contact_biz_reg_no" value={gc("contact_biz_reg_no", "562-49-00093")} as="span" />
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-stone-600 shrink-0">사업장 주소:</span>
                  <InlineEditText contentKey="contact_biz_address" value={gc("contact_biz_address", "경기도 화성시 수노을1로 191")} as="span" />
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-stone-600 shrink-0">통신판매신고번호:</span>
                  <InlineEditText contentKey="contact_biz_commerce_no" value={gc("contact_biz_commerce_no", "2020-화성새솔-0070")} as="span" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatButtonsSection() {
  const { gc } = useSiteContent();
  return (
    <div className="container mx-auto px-4 pb-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row gap-5 justify-center">
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
            <InlineEditText
              contentKey="contact_naver_title"
              value={gc("contact_naver_title", "네이버 톡톡 상담")}
              as="h4"
              className="font-bold text-foreground"
            />
            <InlineEditText
              contentKey="contact_naver_desc"
              value={gc("contact_naver_desc", "빠르고 간편한 채팅 상담")}
              as="p"
              className="text-sm text-muted-foreground"
            />
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
            <InlineEditText
              contentKey="contact_kakao_title"
              value={gc("contact_kakao_title", "카카오톡 채널")}
              as="h4"
              className="font-bold text-foreground"
            />
            <InlineEditText
              contentKey="contact_kakao_desc"
              value={gc("contact_kakao_desc", "카카오톡 1:1 채팅 상담")}
              as="p"
              className="text-sm text-muted-foreground"
            />
          </div>
        </a>
      </div>
    </div>
  );
}

function InquiryCtaSection() {
  const { gc } = useSiteContent();
  return (
    <div className="container mx-auto px-4 pb-16 max-w-5xl">
      <div className="text-center">
        <InlineEditText
          contentKey="contact_inquiry_cta"
          value={gc("contact_inquiry_cta", "온라인으로 견적을 남겨두시면 담당자가 직접 연락드립니다.")}
          as="p"
          className="text-muted-foreground text-sm mb-3"
        />
        <Link href="/inquiry">
          <span className="text-primary font-semibold hover:underline cursor-pointer" data-testid="link-goto-inquiry">
            <InlineEditText
              contentKey="contact_inquiry_link_text"
              value={gc("contact_inquiry_link_text", "온라인 견적 문의 바로가기 →")}
              as="span"
            />
          </span>
        </Link>
      </div>
    </div>
  );
}

const CONTACT_REGISTRY: SectionRegistryItem[] = [
  { key: "contact_header", label: "고객센터 헤더", component: ContactHeader },
  { key: "contact_info", label: "연락처 · 사업장 정보", component: ContactInfoSection },
  { key: "contact_chat", label: "채팅 상담 버튼", component: ChatButtonsSection },
  { key: "contact_inquiry", label: "견적문의 CTA", component: InquiryCtaSection },
];
const CONTACT_DEFAULT_KEYS = CONTACT_REGISTRY.map((s) => s.key);

export default function Contact() {
  return (
    <PageLayoutProvider
      pageKey="contact"
      defaultKeys={CONTACT_DEFAULT_KEYS}
      registry={CONTACT_REGISTRY}
    >
      <div className="min-h-screen pt-[104px]">
        <SectionWrapper sectionKey="contact_header" noReorder noAdd noRemove overrideBg={false}>
          <ContactHeader />
        </SectionWrapper>
        <SectionWrapper sectionKey="contact_info" noReorder>
          <ContactInfoSection />
        </SectionWrapper>
        <SectionWrapper sectionKey="contact_chat" noReorder>
          <ChatButtonsSection />
        </SectionWrapper>
        <SectionWrapper sectionKey="contact_inquiry" noReorder noRemove>
          <InquiryCtaSection />
        </SectionWrapper>
      </div>
    </PageLayoutProvider>
  );
}
