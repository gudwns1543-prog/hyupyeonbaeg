import { useState } from "react";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  categoryKey: string;
  image: string;
  description: string;
};

const cases: PortfolioItem[] = [
  // 유절 (knot wood)
  { id: 1, title: "히노끼욕조 유절 시공 (1)", category: "히노끼욕조 유절", categoryKey: "ujul", image: "https://cdn.imweb.me/thumbnail/20220111/0f63ba036910f.jpg", description: "자연스러운 옹이(유절)가 살아있는 히노끼 반신욕조 시공 사례입니다." },
  { id: 2, title: "히노끼욕조 유절 시공 (2)", category: "히노끼욕조 유절", categoryKey: "ujul", image: "https://cdn.imweb.me/thumbnail/20220111/22aaafb2b6581.jpg", description: "유절 히노끼 전신욕조. 나무의 자연스러운 결과 옹이가 그대로 살아있습니다." },
  { id: 3, title: "히노끼욕조 유절 시공 (3)", category: "히노끼욕조 유절", categoryKey: "ujul", image: "https://cdn.imweb.me/thumbnail/20220111/349bd24ed6809.jpg", description: "편안한 욕실 분위기를 연출하는 유절 히노끼욕조 현장 시공 사례입니다." },
  { id: 4, title: "히노끼욕조 유절 시공 (4)", category: "히노끼욕조 유절", categoryKey: "ujul", image: "https://cdn.imweb.me/thumbnail/20220111/4115b47534b28.jpg", description: "자연의 옹이가 살아있는 유절 히노끼욕조로 욕실을 따뜻하게 꾸몄습니다." },
  { id: 5, title: "히노끼욕조 유절 시공 (5)", category: "히노끼욕조 유절", categoryKey: "ujul", image: "https://cdn.imweb.me/thumbnail/20220111/802d6ce746cd8.jpg", description: "고객 맞춤 제작된 유절 히노끼 욕조. 자연미 넘치는 목욕 공간을 완성했습니다." },
  { id: 6, title: "히노끼욕조 유절 시공 (6)", category: "히노끼욕조 유절", categoryKey: "ujul", image: "https://cdn.imweb.me/thumbnail/20220111/9b5080956a692.jpg", description: "편백나무 특유의 향과 온기를 느낄 수 있는 유절 히노끼욕조 시공 사례입니다." },

  // 무절 (knot-free wood)
  { id: 7, title: "히노끼욕조 무절 시공 (1)", category: "히노끼욕조 무절", categoryKey: "mujul", image: "https://cdn.imweb.me/thumbnail/20200923/21c6f8cee6e87.jpg", description: "결점 없는 무절 히노끼로 제작한 깔끔하고 고급스러운 욕조 시공 사례입니다." },
  { id: 8, title: "히노끼욕조 무절 시공 (2)", category: "히노끼욕조 무절", categoryKey: "mujul", image: "https://cdn.imweb.me/thumbnail/20210115/c0d5b7e2f3a91.jpg", description: "흠없이 깨끗한 무절 히노끼로 제작된 고급 전신욕조 시공 사례입니다." },
  { id: 9, title: "히노끼욕조 무절 시공 (3)", category: "히노끼욕조 무절", categoryKey: "mujul", image: "https://cdn.imweb.me/thumbnail/20200923/b3f82d1e90c45.jpg", description: "무절 히노끼의 깔끔한 표면으로 모던한 욕실 분위기를 완성했습니다." },
  { id: 10, title: "히노끼욕조 무절 시공 (4)", category: "히노끼욕조 무절", categoryKey: "mujul", image: "https://cdn.imweb.me/thumbnail/20210115/7a1e3d9c5b82f.jpg", description: "프리미엄 무절 히노끼 반신욕조. 군더더기 없는 깔끔한 외관이 특징입니다." },

  // 마사메 (straight grain)
  { id: 11, title: "히노끼욕조 무절 마사메 (1)", category: "히노끼욕조 무절 마사메", categoryKey: "masame", image: "https://cdn.imweb.me/thumbnail/20220107/63a49465fff4d.jpg", description: "일직선의 곧은 결(마사메)이 아름다운 최고급 무절 히노끼욕조 시공 사례입니다." },
  { id: 12, title: "히노끼욕조 무절 마사메 (2)", category: "히노끼욕조 무절 마사메", categoryKey: "masame", image: "https://cdn.imweb.me/thumbnail/20220110/8d3f5e9a4c721.jpg", description: "마사메 결 히노끼의 최고급 원목만을 엄선하여 제작한 욕조입니다." },
  { id: 13, title: "히노끼욕조 무절 마사메 (3)", category: "히노끼욕조 무절 마사메", categoryKey: "masame", image: "https://cdn.imweb.me/thumbnail/20220107/2b5f1a8e7d094.jpg", description: "일직선의 곧은 나무결이 만들어내는 자연의 아름다움을 그대로 담은 욕조입니다." },

  // 양산형 (mass production)
  { id: 14, title: "히노끼욕조 양산형 (1)", category: "히노끼욕조 양산형", categoryKey: "yangsan", image: "https://cdn.imweb.me/thumbnail/20210204/0660c0ff1c639.jpg", description: "합리적인 가격으로 즐기는 히노끼욕조. 품질은 그대로 유지하는 양산형 반신욕조입니다." },
  { id: 15, title: "히노끼욕조 양산형 (2)", category: "히노끼욕조 양산형", categoryKey: "yangsan", image: "https://cdn.imweb.me/thumbnail/20210204/3a8c5e1f9d726.jpg", description: "표준화된 규격으로 빠른 납기가 가능한 양산형 히노끼 전신욕조 시공 사례입니다." },
  { id: 16, title: "히노끼욕조 양산형 (3)", category: "히노끼욕조 양산형", categoryKey: "yangsan", image: "https://cdn.imweb.me/thumbnail/20210204/b4d2f0a6e1853.jpg", description: "동일한 히노끼 품질로 합리적인 가격에 만나보는 양산형 욕조입니다." },

  // 현장별
  { id: 17, title: "현장별 시공사례 (1)", category: "현장별 시공사례", categoryKey: "location", image: "https://cdn.imweb.me/thumbnail/20240905/17a681d712222.jpg", description: "다양한 현장에서 완성된 휴편백의 히노끼욕조 시공 사례를 소개합니다." },
  { id: 18, title: "현장별 시공사례 (2)", category: "현장별 시공사례", categoryKey: "location", image: "https://cdn.imweb.me/thumbnail/20230102/4e9f2a7c8b035.jpg", description: "욕실 환경에 맞게 최적화된 히노끼욕조 현장 시공 사례입니다." },
  { id: 19, title: "현장별 시공사례 (3)", category: "현장별 시공사례", categoryKey: "location", image: "https://cdn.imweb.me/thumbnail/20240905/c8b3e5f1a9467.jpg", description: "고객의 욕실에 완벽하게 맞춤 설치된 히노끼욕조 시공 사례입니다." },
  { id: 20, title: "현장별 시공사례 (4)", category: "현장별 시공사례", categoryKey: "location", image: "https://cdn.imweb.me/thumbnail/20230102/9d1c7f4b2e816.jpg", description: "다양한 욕실 환경에서 최적의 결과를 보여주는 휴편백의 시공 사례입니다." },
];

const TABS = [
  { key: "all", label: "전체" },
  { key: "ujul", label: "히노끼욕조 유절" },
  { key: "mujul", label: "히노끼욕조 무절" },
  { key: "masame", label: "히노끼욕조 무절 마사메" },
  { key: "yangsan", label: "히노끼욕조 양산형" },
  { key: "location", label: "현장별 시공사례" },
];

export default function Portfolio() {
  const params = useParams<{ category?: string }>();
  const categoryParam = params.category;

  const [activeKey, setActiveKey] = useState(categoryParam || "all");

  const filtered = activeKey === "all" ? cases : cases.filter((c) => c.categoryKey === activeKey);

  return (
    <div className="min-h-screen pt-[68px]">
      <div className="bg-stone-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">현장 시공사례</h1>
          <p className="text-stone-300">휴편백이 시공한 다양한 히노끼욕조 현장 사례</p>
        </div>
      </div>

      {/* Category Tabs - sticky */}
      <div className="bg-white border-b border-stone-100 sticky top-[68px] z-30">
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveKey(tab.key)}
                className={cn(
                  "px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                  activeKey === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-stone-600 hover:text-primary"
                )}
                data-testid={`filter-${tab.key}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">해당 카테고리의 시공사례가 없습니다.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <div key={item.id} className="group cursor-pointer" data-testid={`case-${item.id}`}>
                <div className="relative overflow-hidden rounded-xl bg-stone-100 aspect-square">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://cdn.imweb.me/thumbnail/20220103/5c1275af617c1.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-3">
                    <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full">
                      <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded text-primary">
                        {item.category}
                      </span>
                      <p className="text-white text-xs mt-1 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium mt-2 text-foreground/80 truncate">{item.title}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-primary/5 rounded-2xl p-10 text-center border border-primary/10">
          <h2 className="text-2xl font-bold mb-3">나만의 히노끼욕조를 만들어보세요</h2>
          <p className="text-muted-foreground text-sm mb-6">원하시는 욕조 크기와 스타일에 맞춘 맞춤 제작을 상담해 드립니다.</p>
          <Link href="/inquiry">
            <Button size="lg" className="px-8" data-testid="btn-portfolio-inquiry">
              견적 문의하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
