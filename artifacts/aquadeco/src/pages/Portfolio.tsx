import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const HALF_BATH = "https://cdn.imweb.me/thumbnail/20220103/5c1275af617c1.jpg";
const FULL_BATH = "https://cdn.imweb.me/thumbnail/20220301/5de4b9e35abfa.jpg";
const HERO1 = "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6bf89575469c9.jpg";
const HERO2 = "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6573d34824eba.jpg";

const cases = [
  {
    id: 1,
    title: "히노끼 전신욕조 (무절) 시공",
    category: "히노끼욕조 무절",
    image: FULL_BATH,
    description: "결점 없는 무절 히노끼 원목으로 제작한 고급 전신욕조. 깔끔하고 고급스러운 외관이 특징입니다."
  },
  {
    id: 2,
    title: "히노끼 반신욕조 현장 시공",
    category: "히노끼욕조 유절",
    image: HALF_BATH,
    description: "자연스러운 옹이가 살아있는 유절 히노끼 반신욕조. 나무 본연의 자연스러움을 그대로 담았습니다."
  },
  {
    id: 3,
    title: "호텔 스파 대형 히노끼욕조",
    category: "현장별 시공사례",
    image: HERO1,
    description: "호텔 스파 시설에 설치된 대형 히노끼욕조. 럭셔리한 공간에 어울리는 프리미엄 제품입니다."
  },
  {
    id: 4,
    title: "주문제작형 맞춤 욕조 시공",
    category: "주문제작형욕조",
    image: HERO2,
    description: "고객 욕실 공간에 맞게 특별 주문 제작한 히노끼욕조. 공간 활용도와 미관을 동시에 잡았습니다."
  },
  {
    id: 5,
    title: "무절 마사메 전신욕조",
    category: "히노끼욕조 무절 마사메",
    image: FULL_BATH,
    description: "일직선의 곧은 결이 아름다운 마사메(柾目) 무절 히노끼욕조. 최고급 원목만 엄선해 제작합니다."
  },
  {
    id: 6,
    title: "양산형 반신욕조 설치",
    category: "히노끼욕조 양산형",
    image: HALF_BATH,
    description: "합리적인 가격으로 경험할 수 있는 양산형 히노끼 반신욕조. 품질은 동일하게 유지합니다."
  }
];

const categories = ["전체", "히노끼욕조 유절", "히노끼욕조 무절", "히노끼욕조 무절 마사메", "히노끼욕조 양산형", "주문제작형욕조", "현장별 시공사례"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filtered = activeCategory === "전체" ? cases : cases.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-stone-800 text-white py-20">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">현장 시공사례</h1>
          <p className="text-lg text-white/70">
            휴편백이 시공한 다양한 히노끼욕조 현장 사례를 확인해보세요.
          </p>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="bg-white border-b border-border sticky top-20 z-30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-stone-100 text-muted-foreground hover:bg-stone-200"
                )}
                data-testid={`filter-${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div key={item.id} className="group cursor-pointer" data-testid={`case-${item.id}`}>
              <div className="overflow-hidden rounded-xl mb-4 bg-muted relative shadow-sm border border-border/50">
                <AspectRatio ratio={4 / 3}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </AspectRatio>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-semibold rounded-full text-primary shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            해당 카테고리의 시공사례가 없습니다.
          </div>
        )}

        <div className="mt-20 text-center bg-primary/5 rounded-2xl p-12 border border-primary/10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">나만의 히노끼욕조를 만들어보세요</h2>
          <p className="text-muted-foreground mb-8 text-sm">원하시는 욕조 크기와 스타일에 맞춘 맞춤 제작을 상담해 드립니다.</p>
          <Link href="/inquiry">
            <Button size="lg" className="px-8 text-base" data-testid="btn-portfolio-inquiry">견적 문의하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
