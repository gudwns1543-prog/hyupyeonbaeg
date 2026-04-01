import { useState } from "react";
import { Link } from "wouter";
import { Trash2, ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const { items, removeItem, updateQty, clear } = useCart();
  const { toast } = useToast();
  const [ordering, setOrdering] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalPrice = items.reduce((sum, item) => {
    if (item.price) return sum + item.price * item.quantity;
    return sum;
  }, 0);

  const hasInquiryItems = items.some((item) => item.price === null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "이름을 입력해주세요";
    if (!form.phone.trim()) errs.phone = "연락처를 입력해주세요";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setOrdering(true);
    try {
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      for (const item of items) {
        await fetch(`${base}/api/products/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: item.productId,
            productName: item.productName,
            name: form.name,
            phone: form.phone,
            email: form.email || undefined,
            quantity: item.quantity,
            address: form.address || undefined,
            message: form.message || undefined,
          }),
        });
      }
      clear();
      setOrderComplete(true);
      toast({ title: "주문/문의가 접수되었습니다", description: "담당자가 연락드리겠습니다." });
    } catch {
      toast({ title: "오류가 발생했습니다", description: "잠시 후 다시 시도해주세요.", variant: "destructive" });
    } finally {
      setOrdering(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-[104px] flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-6xl">✅</div>
        <h2 className="text-2xl font-bold text-center">주문/문의가 접수되었습니다!</h2>
        <p className="text-muted-foreground text-center">
          담당자가 입력하신 연락처로 연락드리겠습니다.<br />
          평일 09:00 ~ 18:00 내에 답변드립니다.
        </p>
        <Link href="/shop">
          <Button>쇼핑 계속하기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[104px]">
      <div className="bg-stone-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">장바구니</h1>
          <p className="text-stone-300">선택하신 제품을 확인해주세요</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="w-4 h-4" /> 쇼핑 계속하기
        </Link>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-16 h-16 text-stone-200 mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">장바구니가 비어 있습니다</p>
            <Link href="/shop">
              <Button>제품 보러 가기</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {/* Cart Items */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-4">담은 제품 ({items.length})</h2>
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 bg-white rounded-xl p-4 border border-stone-100 shadow-sm">
                  <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">🛁</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground truncate">{item.productName}</h3>
                    <p className="text-sm font-medium text-primary mt-0.5">{item.priceText}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.productId, item.quantity - 1)}
                        className="w-6 h-6 border border-stone-200 rounded flex items-center justify-center text-xs hover:bg-stone-50"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.productId, item.quantity + 1)}
                        className="w-6 h-6 border border-stone-200 rounded flex items-center justify-center text-xs hover:bg-stone-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-stone-300 hover:text-red-500 transition-colors shrink-0 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {totalPrice > 0 && (
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">결제 예상 금액</span>
                    <span className="font-bold text-foreground">{totalPrice.toLocaleString()}원</span>
                  </div>
                  {hasInquiryItems && (
                    <p className="text-xs text-muted-foreground mt-2">* 가격 문의 제품은 별도로 연락드립니다</p>
                  )}
                </div>
              )}
            </div>

            {/* Order Form */}
            <div>
              <h2 className="text-lg font-bold mb-4">주문 / 문의 정보</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="홍길동"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="010-0000-0000"
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">이메일</label>
                  <Input
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="email@example.com"
                    type="email"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">배송 주소</label>
                  <Input
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    placeholder="시공 / 배송받을 주소"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">요청사항</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="기타 문의사항을 입력해주세요"
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={ordering} data-testid="btn-submit-order">
                  {ordering ? "처리 중..." : "주문 / 문의 신청"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  담당자 확인 후 연락드립니다. 평일 09:00 ~ 18:00
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
