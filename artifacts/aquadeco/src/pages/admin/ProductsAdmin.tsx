import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from "lucide-react";
import { ImageUploadInput } from "@/components/ui/ImageUploadInput";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type ProductOption = { name: string; values: string[] };

type Product = {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  price: number | null;
  priceText: string;
  description: string;
  imageUrl: string | null;
  additionalImages: string;
  inStock: boolean;
  isVisible: boolean;
  sortOrder: number;
  discountRate: number;
  material: string;
  sizes: string;
  options: string;
  createdAt: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  bath: "히노끼욕조",
  accessory: "악세사리",
};

const SUB_LABELS: Record<string, Record<string, string>> = {
  bath: {
    half: "반신욕조",
    full: "전신욕조",
    custom: "주문제작형욕조",
    sale: "할인제품",
  },
  accessory: {
    deck: "데크수전",
    box: "목함수전",
    stairs: "외부계단",
    whirlpool: "월풀 시스템",
  },
};

const emptyForm = {
  name: "",
  category: "bath",
  subCategory: "half",
  price: "",
  priceText: "",
  description: "",
  imageUrl: "",
  additionalImages: "[]",
  inStock: true,
  isVisible: true,
  sortOrder: "0",
  discountRate: "0",
  material: "",
  sizes: "",
  options: "[]",
};

type FormState = typeof emptyForm;

function parseOptions(raw: string): ProductOption[] {
  try { return JSON.parse(raw) || []; } catch { return []; }
}

function parseImages(raw: string): string[] {
  try { return JSON.parse(raw) || []; } catch { return []; }
}

function OptionEditor({
  options,
  onChange,
}: {
  options: ProductOption[];
  onChange: (opts: ProductOption[]) => void;
}) {
  const addOption = () => onChange([...options, { name: "", values: [] }]);
  const removeOption = (i: number) => onChange(options.filter((_, idx) => idx !== i));
  const updateName = (i: number, v: string) => {
    const copy = [...options];
    copy[i] = { ...copy[i], name: v };
    onChange(copy);
  };
  const updateValues = (i: number, raw: string) => {
    const copy = [...options];
    copy[i] = { ...copy[i], values: raw.split(",").map((s) => s.trim()).filter(Boolean) };
    onChange(copy);
  };

  return (
    <div className="space-y-3">
      {options.map((opt, i) => (
        <div key={i} className="flex gap-2 items-start border border-stone-200 rounded-lg p-3 bg-stone-50">
          <div className="flex-1 space-y-2">
            <Input
              placeholder="옵션명 (예: 마감등급)"
              value={opt.name}
              onChange={(e) => updateName(i, e.target.value)}
              className="h-8 text-sm"
            />
            <Input
              placeholder="옵션값 쉼표 구분 (예: 무절, 유절, 마사메)"
              value={opt.values.join(", ")}
              onChange={(e) => updateValues(i, e.target.value)}
              className="h-8 text-sm"
            />
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={() => removeOption(i)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addOption} className="gap-1.5 text-xs">
        <Plus className="w-3.5 h-3.5" /> 옵션 추가
      </Button>
    </div>
  );
}

export default function ProductsAdmin() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/products/admin/all`, { credentials: "include" });
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      toast({ title: "오류", description: "상품 목록을 불러오지 못했습니다", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      subCategory: p.subCategory,
      price: p.price !== null ? String(p.price) : "",
      priceText: p.priceText,
      description: p.description,
      imageUrl: p.imageUrl || "",
      additionalImages: p.additionalImages || "[]",
      inStock: p.inStock,
      isVisible: p.isVisible,
      sortOrder: String(p.sortOrder),
      discountRate: String(p.discountRate || 0),
      material: p.material || "",
      sizes: p.sizes || "",
      options: p.options || "[]",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.category || !form.subCategory) {
      toast({ title: "필수 항목 누락", description: "상품명, 카테고리를 입력해 주세요", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const body = {
        ...form,
        price: form.price ? Number(form.price) : null,
        sortOrder: Number(form.sortOrder),
        discountRate: Number(form.discountRate),
      };
      const url = editId
        ? `${API_BASE}/api/products/${editId}`
        : `${API_BASE}/api/products`;
      const res = await fetch(url, {
        method: editId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      toast({ title: editId ? "상품 수정 완료" : "상품 등록 완료" });
      setShowModal(false);
      fetchProducts();
    } catch {
      toast({ title: "오류 발생", description: "저장에 실패했습니다", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      toast({ title: "상품 삭제 완료" });
      setDeleteConfirm(null);
      fetchProducts();
    } catch {
      toast({ title: "오류 발생", description: "삭제에 실패했습니다", variant: "destructive" });
    }
  };

  const toggleVisible = async (p: Product) => {
    try {
      await fetch(`${API_BASE}/api/products/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ isVisible: !p.isVisible }),
      });
      fetchProducts();
    } catch {
      toast({ title: "오류", description: "상태 변경에 실패했습니다", variant: "destructive" });
    }
  };

  const setField = (key: keyof FormState, val: unknown) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const subOptions = SUB_LABELS[form.category] || {};
  const currentOptions = parseOptions(form.options);
  const currentImages = parseImages(form.additionalImages);

  const discountedPrice =
    form.price && Number(form.price) > 0 && Number(form.discountRate) > 0
      ? Math.round(Number(form.price) * (1 - Number(form.discountRate) / 100))
      : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">쇼핑 상품 관리</h2>
          <p className="text-sm text-muted-foreground mt-0.5">상품을 등록하고 수정·삭제할 수 있습니다</p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="w-4 h-4" /> 상품 등록
        </Button>
      </div>

      {/* Product Table */}
      {loading ? (
        <div className="text-center py-20 text-muted-foreground">로딩 중...</div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-stone-700 w-14">순서</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">상품명</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">카테고리</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">가격</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">할인율</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">재고</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">노출</th>
                <th className="text-right px-4 py-3 font-semibold text-stone-700">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-muted-foreground">
                    등록된 상품이 없습니다
                  </td>
                </tr>
              )}
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3 text-stone-400 text-center">{p.sortOrder}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded object-cover border border-stone-200" />
                      ) : (
                        <div className="w-10 h-10 rounded border border-stone-200 bg-stone-100 flex items-center justify-center text-stone-400 text-lg">🛁</div>
                      )}
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <Badge variant="outline" className="w-fit text-xs">{CATEGORY_LABELS[p.category] || p.category}</Badge>
                      <span className="text-xs text-muted-foreground">{SUB_LABELS[p.category]?.[p.subCategory] || p.subCategory}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-primary">{p.priceText}</td>
                  <td className="px-4 py-3">
                    {p.discountRate > 0 ? (
                      <Badge className="bg-red-500 text-white text-xs">{p.discountRate}% 할인</Badge>
                    ) : (
                      <span className="text-stone-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={p.inStock ? "default" : "secondary"} className="text-xs">
                      {p.inStock ? "재고있음" : "품절"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleVisible(p)}
                      className={`flex items-center gap-1 text-xs font-medium ${p.isVisible ? "text-green-600" : "text-stone-400"}`}
                    >
                      {p.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      {p.isVisible ? "노출중" : "숨김"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEdit(p)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => setDeleteConfirm(p.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? "상품 수정" : "상품 등록"}</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="basic" className="mt-2">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="basic">기본정보</TabsTrigger>
              <TabsTrigger value="price">가격/할인</TabsTrigger>
              <TabsTrigger value="image">사진관리</TabsTrigger>
              <TabsTrigger value="options">옵션/사이즈</TabsTrigger>
            </TabsList>

            {/* 기본정보 탭 */}
            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>상품명 *</Label>
                  <Input
                    className="mt-1"
                    placeholder="상품명을 입력하세요"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label>카테고리 *</Label>
                  <Select value={form.category} onValueChange={(v) => {
                    const firstSub = Object.keys(SUB_LABELS[v] || {})[0] || "";
                    setForm((prev) => ({ ...prev, category: v, subCategory: firstSub }));
                  }}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
                        <SelectItem key={val} value={val}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>서브카테고리 *</Label>
                  <Select value={form.subCategory} onValueChange={(v) => setField("subCategory", v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(subOptions).map(([val, label]) => (
                        <SelectItem key={val} value={val}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>소재</Label>
                  <Input
                    className="mt-1"
                    placeholder="예: 100% 일본산 히노끼(편백) 원목"
                    value={form.material}
                    onChange={(e) => setField("material", e.target.value)}
                  />
                </div>
                <div>
                  <Label>표시 순서</Label>
                  <Input
                    type="number"
                    className="mt-1"
                    placeholder="0"
                    value={form.sortOrder}
                    onChange={(e) => setField("sortOrder", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Label>상품 설명</Label>
                  <Textarea
                    className="mt-1 min-h-[160px] text-sm"
                    placeholder="상품 설명을 입력하세요"
                    value={form.description}
                    onChange={(e) => setField("description", e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="inStock"
                      checked={form.inStock as boolean}
                      onCheckedChange={(v) => setField("inStock", v)}
                    />
                    <Label htmlFor="inStock">재고있음</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="isVisible"
                      checked={form.isVisible as boolean}
                      onCheckedChange={(v) => setField("isVisible", v)}
                    />
                    <Label htmlFor="isVisible">쇼핑몰에 노출</Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* 가격/할인 탭 */}
            <TabsContent value="price" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>정가 (원)</Label>
                  <Input
                    type="number"
                    className="mt-1"
                    placeholder="예: 1320000"
                    value={form.price}
                    onChange={(e) => {
                      setField("price", e.target.value);
                      if (e.target.value) {
                        const p = Number(e.target.value);
                        const dr = Number(form.discountRate);
                        const formatted = p.toLocaleString("ko-KR") + "원~";
                        setField("priceText", formatted);
                      }
                    }}
                  />
                </div>
                <div>
                  <Label>할인율 (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    className="mt-1"
                    placeholder="0~100"
                    value={form.discountRate}
                    onChange={(e) => setField("discountRate", e.target.value)}
                  />
                </div>
                {discountedPrice && (
                  <div className="col-span-2 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-700 font-medium">
                      할인 적용가: {discountedPrice.toLocaleString("ko-KR")}원
                      <span className="ml-2 text-xs font-normal text-red-500">
                        ({form.discountRate}% 할인 → {(Number(form.price) - discountedPrice).toLocaleString("ko-KR")}원 절약)
                      </span>
                    </p>
                  </div>
                )}
                <div className="col-span-2">
                  <Label>가격 표시 텍스트</Label>
                  <Input
                    className="mt-1"
                    placeholder="예: 1,320,000원~ / 가격 문의"
                    value={form.priceText}
                    onChange={(e) => setField("priceText", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">쇼핑몰에 실제 표시될 가격 텍스트입니다. 정가 입력 시 자동으로 설정됩니다.</p>
                </div>
              </div>
            </TabsContent>

            {/* 사진관리 탭 */}
            <TabsContent value="image" className="space-y-5 mt-4">
              <div>
                <Label className="text-sm font-semibold">대표 이미지</Label>
                <p className="text-xs text-muted-foreground mb-2">상품 목록과 상단에 표시되는 메인 이미지</p>
                <ImageUploadInput
                  value={form.imageUrl as string}
                  onChange={(v) => setField("imageUrl", v)}
                  label="대표 이미지"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">추가 이미지</Label>
                <p className="text-xs text-muted-foreground mb-2">상품 상세 페이지에 표시되는 추가 이미지 (여러 장 추가 가능)</p>
                <AdditionalImagesEditor
                  images={currentImages}
                  onChange={(imgs) => setField("additionalImages", JSON.stringify(imgs))}
                />
              </div>
            </TabsContent>

            {/* 옵션/사이즈 탭 */}
            <TabsContent value="options" className="space-y-5 mt-4">
              <div>
                <Label className="text-sm font-semibold">사이즈 / 규격</Label>
                <p className="text-xs text-muted-foreground mb-2">제품 치수 또는 규격 정보</p>
                <Input
                  className="mt-1"
                  placeholder="예: 900×600×600(H)mm (기본형, 맞춤제작 가능)"
                  value={form.sizes}
                  onChange={(e) => setField("sizes", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">선택 옵션</Label>
                <p className="text-xs text-muted-foreground mb-3">구매 시 고객이 선택할 수 있는 옵션 항목</p>
                <OptionEditor
                  options={currentOptions}
                  onChange={(opts) => setField("options", JSON.stringify(opts))}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowModal(false)}>취소</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "저장 중..." : editId ? "수정 완료" : "상품 등록"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>상품 삭제</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">이 상품을 삭제하면 복구할 수 없습니다. 계속하시겠습니까?</p>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>취소</Button>
            <Button variant="destructive" onClick={() => deleteConfirm !== null && handleDelete(deleteConfirm)}>
              삭제
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AdditionalImagesEditor({
  images,
  onChange,
}: {
  images: string[];
  onChange: (imgs: string[]) => void;
}) {
  const addImage = (url: string) => {
    if (url && !images.includes(url)) onChange([...images, url]);
  };
  const removeImage = (i: number) => onChange(images.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, i) => (
          <div key={i} className="relative group rounded-lg overflow-hidden border border-stone-200 aspect-square">
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <ImageUploadInput
        value=""
        onChange={(url) => { if (url) addImage(url); }}
        label="추가 이미지 업로드"
      />
    </div>
  );
}
