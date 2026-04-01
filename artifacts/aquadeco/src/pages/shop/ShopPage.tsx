import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { ShoppingCart, Plus, Minus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type Product = {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  price: number | null;
  priceText: string;
  description: string;
  imageUrl: string | null;
  inStock: boolean;
  sortOrder: number;
};

const CATEGORY_LABELS: Record<string, string> = {
  bath: "히노끼욕조",
  accessory: "악세사리",
};

const SUB_LABELS: Record<string, string> = {
  half: "반신욕조",
  full: "전신욕조",
  custom: "주문제작형욕조",
  sale: "할인제품",
  deck: "데크수전",
  box: "목함수전",
  stairs: "외부계단",
  whirlpool: "월풀 시스템",
};

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      priceText: product.priceText,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    toast({ title: "장바구니에 추가되었습니다", description: product.name });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md transition-all group">
      <div className="relative h-56 bg-stone-100 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400">
            <span className="text-4xl">🛁</span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-stone-800 px-4 py-2 rounded-full text-sm font-medium">품절</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="text-xs text-primary font-medium mb-1">{CATEGORY_LABELS[product.category]}</div>
        <h3 className="text-base font-bold text-foreground mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description.split("\n")[0]}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-primary">{product.priceText}</span>
          <div className="flex gap-2">
            <Link href={`/shop/product/${product.id}`}>
              <Button size="sm" variant="outline" className="text-xs">상세보기</Button>
            </Link>
            {product.inStock && (
              <Button
                size="sm"
                className="text-xs"
                onClick={handleAddToCart}
                data-testid={`btn-add-cart-${product.id}`}
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                담기
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const params = useParams<{ category?: string; sub?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { totalCount } = useCart();

  const activeCategory = params.category;
  const activeSub = params.sub;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const base = import.meta.env.BASE_URL.replace(/\/$/, "");
        let url = `${base}/api/products`;
        const params2: string[] = [];
        if (activeCategory) params2.push(`category=${activeCategory}`);
        if (activeSub) params2.push(`sub=${activeSub}`);
        if (params2.length) url += "?" + params2.join("&");
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory, activeSub]);

  const pageTitle = activeSub
    ? SUB_LABELS[activeSub] || activeSub
    : activeCategory
    ? CATEGORY_LABELS[activeCategory] || activeCategory
    : "전체 제품";

  const breadcrumb = [
    { label: "쇼핑", href: "/shop" },
    ...(activeCategory
      ? [{ label: CATEGORY_LABELS[activeCategory] || activeCategory, href: `/shop/${activeCategory}` }]
      : []),
    ...(activeSub ? [{ label: SUB_LABELS[activeSub] || activeSub, href: `/shop/${activeCategory}/${activeSub}` }] : []),
  ];

  return (
    <div className="min-h-screen pt-[68px]">
      {/* Page Header */}
      <div className="bg-stone-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">쇼핑(구매하기)</h1>
          <p className="text-stone-300">히노끼욕조 및 악세사리 구매</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb + Cart */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                <Link href={crumb.href} className={cn(i === breadcrumb.length - 1 ? "text-foreground font-medium" : "hover:text-primary")}>
                  {crumb.label}
                </Link>
              </span>
            ))}
          </div>
          <Link href="/shop/cart">
            <Button variant="outline" size="sm" className="relative" data-testid="btn-cart">
              <ShoppingCart className="w-4 h-4 mr-1.5" />
              장바구니
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/shop">
            <button
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                !activeCategory ? "bg-primary text-white border-primary" : "bg-white text-stone-700 border-stone-200 hover:border-primary hover:text-primary"
              )}
            >
              전체
            </button>
          </Link>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <Link key={key} href={`/shop/${key}`}>
              <button
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                  activeCategory === key ? "bg-primary text-white border-primary" : "bg-white text-stone-700 border-stone-200 hover:border-primary hover:text-primary"
                )}
              >
                {label}
              </button>
            </Link>
          ))}
        </div>

        {/* Sub-category for bath */}
        {activeCategory === "bath" && (
          <div className="flex flex-wrap gap-2 mb-6">
            {["half", "full", "custom", "sale"].map((sub) => (
              <Link key={sub} href={`/shop/bath/${sub}`}>
                <button
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                    activeSub === sub ? "bg-stone-800 text-white border-stone-800" : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                  )}
                >
                  {SUB_LABELS[sub]}
                </button>
              </Link>
            ))}
          </div>
        )}

        {/* Sub-category for accessory */}
        {activeCategory === "accessory" && (
          <div className="flex flex-wrap gap-2 mb-6">
            {["deck", "box", "stairs", "whirlpool"].map((sub) => (
              <Link key={sub} href={`/shop/accessory/${sub}`}>
                <button
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                    activeSub === sub ? "bg-stone-800 text-white border-stone-800" : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                  )}
                >
                  {SUB_LABELS[sub]}
                </button>
              </Link>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-stone-100 animate-pulse h-80" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm">등록된 제품이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
