import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft, ShoppingCart, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
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
};

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addItem, items } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetch_ = async () => {
      setLoading(true);
      try {
        const base = import.meta.env.BASE_URL.replace(/\/$/, "");
        const res = await fetch(`${base}/api/products/${params.id}`);
        if (!res.ok) {
          setProduct(null);
        } else {
          const data = await res.json();
          setProduct(data);
        }
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < qty; i++) {
      addItem({
        productId: product.id,
        productName: product.name,
        priceText: product.priceText,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    }
    toast({ title: "장바구니에 추가되었습니다", description: `${product.name} ${qty}개` });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-[68px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-[68px] flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">제품을 찾을 수 없습니다.</p>
        <Link href="/shop">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> 쇼핑으로 돌아가기
          </Button>
        </Link>
      </div>
    );
  }

  const descLines = product.description.split("\n");

  return (
    <div className="min-h-screen pt-[68px]">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="w-4 h-4" /> 쇼핑 목록으로
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-stone-100 h-80 md:h-[480px]">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400 text-6xl">🛁</div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="text-xs text-primary font-medium mb-2">
              {product.category === "bath" ? "히노끼욕조" : "악세사리"}
            </div>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <div className="text-2xl font-bold text-primary mb-6">{product.priceText}</div>

            <div className="prose prose-sm text-muted-foreground mb-8 space-y-2">
              {descLines.map((line, i) => (
                <p key={i} className={line.startsWith("-") ? "ml-2 text-sm" : ""}>{line}</p>
              ))}
            </div>

            {product.inStock ? (
              <>
                {product.price !== null && (
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-sm font-medium text-foreground">수량</span>
                    <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-9 h-9 flex items-center justify-center hover:bg-stone-50 transition-colors"
                      >
                        <span className="text-lg leading-none">-</span>
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{qty}</span>
                      <button
                        onClick={() => setQty((q) => q + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-stone-50 transition-colors"
                      >
                        <span className="text-lg leading-none">+</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {product.price !== null ? (
                    <Button size="lg" onClick={handleAddToCart} className="w-full" data-testid="btn-add-cart">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      장바구니 담기
                    </Button>
                  ) : (
                    <Link href="/inquiry" className="w-full">
                      <Button size="lg" className="w-full">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        가격 문의하기
                      </Button>
                    </Link>
                  )}
                  <a href="tel:010-5918-7778" className="w-full">
                    <Button size="lg" variant="outline" className="w-full">
                      <Phone className="w-5 h-5 mr-2" />
                      전화 상담
                    </Button>
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center py-4 bg-stone-100 rounded-xl">
                <p className="text-muted-foreground font-medium">현재 품절된 제품입니다</p>
                <Link href="/inquiry">
                  <Button variant="link" className="mt-2">재입고 문의하기</Button>
                </Link>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-stone-100 space-y-2 text-xs text-muted-foreground">
              <p>✓ 전국 배송 / 현장 시공 포함</p>
              <p>✓ 원산지 증명서 제공 (요청 시)</p>
              <p>✓ 제품 시공 후 관리 방법 안내</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
