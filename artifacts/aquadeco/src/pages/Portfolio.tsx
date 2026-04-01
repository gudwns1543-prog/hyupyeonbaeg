import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "성수동 럭셔리 펜트하우스 빌트인 수조",
    category: "주거공간",
    image: "/images/hero.png",
    description: "거실 벽면을 활용한 3미터 대형 해수어 수족관"
  },
  {
    id: 2,
    title: "강남 고급 레스토랑 원형 수족관",
    category: "상업공간",
    image: "/images/portfolio-1.png",
    description: "매장 중심에 위치하여 시선을 사로잡는 대형 실린더 수조"
  },
  {
    id: 3,
    title: "호텔 스파 프라이빗 바스룸",
    category: "주거공간",
    image: "/images/portfolio-2.png",
    description: "휴식의 질을 높이는 벽면 매립형 네이처 아쿠아리움"
  },
  {
    id: 4,
    title: "IT 기업 임원실 및 회의실",
    category: "오피스",
    image: "/images/portfolio-3.png",
    description: "중후한 우드 캐비닛과 조화를 이루는 아쿠아스케이프"
  },
  {
    id: 5,
    title: "한남동 고급 빌라 침실 포인트",
    category: "주거공간",
    image: "/images/residential.png",
    description: "차분한 분위기를 연출하는 미니멀 수초 수조"
  },
  {
    id: 6,
    title: "판교 신사옥 로비 대형 해수어항",
    category: "상업공간",
    image: "/images/commercial.png",
    description: "건물 로비를 장식하는 스펙타클한 산호초 디자인"
  }
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-muted py-20">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">포트폴리오</h1>
          <p className="text-lg text-muted-foreground">
            아쿠아데코가 완성한 다양한 프리미엄 수족관 시공 사례를 확인해보세요.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl mb-4 bg-muted relative shadow-sm border border-border/50">
                <AspectRatio ratio={4/3}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </AspectRatio>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold rounded-full text-primary shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-primary/5 rounded-2xl p-12 border border-primary/10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">당신의 공간도 작품이 될 수 있습니다</h2>
          <p className="text-muted-foreground mb-8">원하시는 컨셉과 예산에 맞춘 최적의 디자인을 제안해 드립니다.</p>
          <Link href="/inquiry">
            <Button size="lg" className="px-8 text-base">프로젝트 문의하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
