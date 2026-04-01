import React, { useState } from 'react';

export function DirectCommerce() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "배송 기간은 얼마나 걸리나요?",
      a: "반신/전신욕조 양산형 기준 2~3주, 주문제작형은 4~6주 소요됩니다."
    },
    {
      q: "방수 처리는 어떻게 되나요?",
      a: "FRP 방수와 짜맞춤 방식 중 선택 가능하며, 두 방식 모두 충분한 내수성을 보장합니다."
    },
    {
      q: "A/S는 어떻게 받나요?",
      a: "제품 납품 후 전화 또는 카카오톡 채널로 문의 시 전담 팀이 방문합니다."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f8] font-sans text-gray-900">
      {/* Utility Bar */}
      <div className="bg-gray-900 text-white text-xs py-2 px-4 flex justify-center gap-6 border-b border-gray-800">
        <span className="flex items-center gap-1">✓ 전국 배송 가능</span>
        <span className="flex items-center gap-1">✓ 원산지 증명서 발급</span>
        <span className="flex items-center gap-1">✓ A/S 보장</span>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        
        {/* Products Section */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Half Bath */}
            <div className="bg-white p-6 border border-gray-200 rounded-sm">
              <div className="aspect-square bg-gray-100 mb-6 overflow-hidden flex items-center justify-center">
                <img 
                  src="https://cdn.imweb.me/thumbnail/20220103/5c1275af617c1.jpg" 
                  alt="반신욕조"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">반신욕조</h2>
                    <p className="text-sm text-gray-500 mt-1">900 × 600 × 600mm | 히노끼 원목</p>
                  </div>
                  <span className="bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs px-2 py-1 rounded font-medium">재고 보유</span>
                </div>
                <div className="text-3xl font-bold text-[#2D6A4F]">¥1,320,000</div>
                <div className="flex gap-3 pt-2">
                  <button className="flex-1 bg-[#2D6A4F] hover:bg-[#1f4a37] text-white py-3 font-medium transition-colors">
                    장바구니 담기
                  </button>
                  <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 font-medium transition-colors">
                    상세보기
                  </button>
                </div>
              </div>
            </div>

            {/* Full Bath */}
            <div className="bg-white p-6 border border-gray-200 rounded-sm">
              <div className="aspect-square bg-gray-100 mb-6 overflow-hidden flex items-center justify-center">
                <img 
                  src="https://cdn.imweb.me/thumbnail/20220301/5de4b9e35abfa.jpg" 
                  alt="전신욕조"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">전신욕조</h2>
                    <p className="text-sm text-gray-500 mt-1">1200 × 700 × 600mm | 히노끼 원목</p>
                  </div>
                  <span className="bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs px-2 py-1 rounded font-medium">재고 보유</span>
                </div>
                <div className="text-3xl font-bold text-[#2D6A4F]">¥1,650,000</div>
                <div className="flex gap-3 pt-2">
                  <button className="flex-1 bg-[#2D6A4F] hover:bg-[#1f4a37] text-white py-3 font-medium transition-colors">
                    장바구니 담기
                  </button>
                  <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 font-medium transition-colors">
                    상세보기
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Order Callout */}
          <div className="bg-white border-2 border-[#2D6A4F] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#2D6A4F]">주문제작형</h3>
              <p className="text-sm text-gray-600 mt-1">공간에 맞는 규격이 다르신가요? 1:1 맞춤 제작을 도와드립니다.</p>
            </div>
            <button className="shrink-0 bg-transparent border-2 border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white px-8 py-3 font-bold transition-colors">
              맞춤 제작 상담
            </button>
          </div>
        </section>

        {/* Specs Table */}
        <section>
          <h2 className="text-lg font-bold mb-4">제품 규격 및 사양</h2>
          <div className="overflow-x-auto border border-gray-300 bg-white">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#2D6A4F] text-white">
                <tr>
                  <th className="py-3 px-4 font-semibold border-b border-gray-300 w-1/4">구분</th>
                  <th className="py-3 px-4 font-semibold border-b border-gray-300 w-1/4">반신욕조</th>
                  <th className="py-3 px-4 font-semibold border-b border-gray-300 w-1/4">전신욕조</th>
                  <th className="py-3 px-4 font-semibold border-b border-gray-300 w-1/4">주문제작형</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-[#f0f0f0]">
                  <td className="py-3 px-4 font-medium text-gray-700">기본 규격</td>
                  <td className="py-3 px-4">900×600×600mm</td>
                  <td className="py-3 px-4">1200×700×600mm</td>
                  <td className="py-3 px-4">고객 맞춤 규격</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-3 px-4 font-medium text-gray-700">소재</td>
                  <td className="py-3 px-4" colSpan={3}>일본산 히노끼 (편백나무) 무절/유절 선택</td>
                </tr>
                <tr className="bg-[#f0f0f0]">
                  <td className="py-3 px-4 font-medium text-gray-700">마감</td>
                  <td className="py-3 px-4" colSpan={3}>무도장 (자연 건조)</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-3 px-4 font-medium text-gray-700">방수 처리</td>
                  <td className="py-3 px-4" colSpan={3}>FRP 방수 또는 전통 짜맞춤 (선택)</td>
                </tr>
                <tr className="bg-[#f0f0f0]">
                  <td className="py-3 px-4 font-medium text-gray-700">배수구</td>
                  <td className="py-3 px-4" colSpan={3}>황동 팝업 배수구 기본 장착</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-3 px-4 font-medium text-gray-700">납기</td>
                  <td className="py-3 px-4">2~3주</td>
                  <td className="py-3 px-4">2~3주</td>
                  <td className="py-3 px-4">4~6주</td>
                </tr>
                <tr className="bg-[#f0f0f0]">
                  <td className="py-3 px-4 font-medium text-gray-700">가격</td>
                  <td className="py-3 px-4 font-bold text-[#2D6A4F]">¥1,320,000</td>
                  <td className="py-3 px-4 font-bold text-[#2D6A4F]">¥1,650,000</td>
                  <td className="py-3 px-4">별도 견적</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="bg-white border-y border-gray-300 py-8 px-4 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="text-center pt-4 md:pt-0 first:pt-0">
            <div className="text-xl font-bold mb-1">30년 제조 경험</div>
            <div className="text-sm text-gray-500">장인의 기술력</div>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <div className="text-xl font-bold mb-1">원산지 증명서 발급</div>
            <div className="text-sm text-gray-500">100% 정품 히노끼</div>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <div className="text-xl font-bold mb-1">전국 A/S</div>
            <div className="text-sm text-gray-500">신속한 사후 관리</div>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <div className="text-xl font-bold mb-1">설치 보증</div>
            <div className="text-sm text-gray-500">전문 기사 직배송</div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-lg font-bold mb-4">자주 묻는 질문</h2>
          <div className="border-t border-gray-300 bg-white">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-300">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  <span className="text-gray-400 text-xl leading-none">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 pt-2 text-gray-600 bg-gray-50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer CTA */}
      <footer className="bg-[#f0f0f0] border-t border-gray-300 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-1">지금 바로 주문 또는 상담</h2>
            <p className="text-gray-600 font-medium">전화 상담: 010-0000-0000</p>
          </div>
          <button className="bg-[#2D6A4F] hover:bg-[#1f4a37] text-white px-8 py-4 font-bold text-lg w-full md:w-auto transition-colors">
            견적 문의하기
          </button>
        </div>
      </footer>
    </div>
  );
}
