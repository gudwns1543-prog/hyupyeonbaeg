import { useState, useEffect, useMemo } from "react";
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
import { cn } from "@/lib/utils";
import { Plus, Pencil, Trash2, Eye, EyeOff, X, FolderTree, ChevronRight, GripVertical } from "lucide-react";
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

type Category = {
  id: number;
  slug: string;
  name: string;
  parentSlug: string | null;
  sortOrder: number;
};

const emptyForm = {
  name: "",
  category: "",
  subCategory: "",
  midSlug: "",     // 중분류 slug (UI-only, stripped before saving)
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

function getSubValue(cat: Category): string {
  if (!cat.parentSlug) return cat.slug;
  const prefix = cat.parentSlug + "-";
  return cat.slug.startsWith(prefix) ? cat.slug.slice(prefix.length) : cat.slug;
}

function parseOptions(raw: string): ProductOption[] {
  try { return JSON.parse(raw) || []; } catch { return []; }
}
function parseImages(raw: string): string[] {
  try { return JSON.parse(raw) || []; } catch { return []; }
}

function OptionEditor({ options, onChange }: { options: ProductOption[]; onChange: (opts: ProductOption[]) => void }) {
  const addOption = () => onChange([...options, { name: "", values: [] }]);
  const removeOption = (i: number) => onChange(options.filter((_, idx) => idx !== i));
  const updateName = (i: number, v: string) => { const c = [...options]; c[i] = { ...c[i], name: v }; onChange(c); };
  const updateValues = (i: number, raw: string) => { const c = [...options]; c[i] = { ...c[i], values: raw.split(",").map(s => s.trim()).filter(Boolean) }; onChange(c); };

  return (
    <div className="space-y-3">
      {options.map((opt, i) => (
        <div key={i} className="flex gap-2 items-start border border-stone-200 rounded-lg p-3 bg-stone-50">
          <div className="flex-1 space-y-2">
            <Input placeholder="옵션명 (예: 마감등급)" value={opt.name} onChange={(e) => updateName(i, e.target.value)} className="h-8 text-sm" />
            <Input placeholder="옵션값 쉼표 구분 (예: 무절, 유절, 마사메)" value={opt.values.join(", ")} onChange={(e) => updateValues(i, e.target.value)} className="h-8 text-sm" />
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

function AdditionalImagesEditor({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) {
  const addImage = (url: string) => { if (url && !images.includes(url)) onChange([...images, url]); };
  const removeImage = (i: number) => onChange(images.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, i) => (
          <div key={i} className="relative group rounded-lg overflow-hidden border border-stone-200 aspect-square">
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <ImageUploadInput value="" onChange={(url) => { if (url) addImage(url); }} label="추가 이미지 업로드" />
    </div>
  );
}

/* ──────────────── Category Manager (Drag Tree) ──────────────── */
function CategoryManager({ categories, onRefresh }: { categories: Category[]; onRefresh: () => void }) {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [form, setForm] = useState({ slug: "", name: "", parentSlug: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);
  const [draggingSlug, setDraggingSlug] = useState<string | null>(null);
  const [dropInfo, setDropInfo] = useState<{ slug: string; pos: "before" | "after" | "in" } | null>(null);

  const subOf = (slug: string) => categories.filter(c => c.parentSlug === slug).sort((a, b) => a.sortOrder - b.sortOrder);
  const labelFor = (slug: string) => categories.find(c => c.slug === slug)?.name || slug;

  const flatTree = useMemo(() => {
    const result: Array<Category & { depth: number }> = [];
    const addLevel = (parentSlug: string | null, depth: number) => {
      categories
        .filter(c => c.parentSlug === parentSlug)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .forEach(c => { result.push({ ...c, depth }); addLevel(c.slug, depth + 1); });
    };
    addLevel(null, 0);
    return result;
  }, [categories]);

  const openAddTop = () => { setEditCat(null); setForm({ slug: "", name: "", parentSlug: "" }); setShowModal(true); };
  const openAddSub = (parentSlug: string) => { setEditCat(null); setForm({ slug: "", name: "", parentSlug }); setShowModal(true); };
  const openEdit = (cat: Category) => { setEditCat(cat); setForm({ slug: cat.slug, name: cat.name, parentSlug: cat.parentSlug || "" }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.name.trim()) { toast({ title: "카테고리명을 입력해 주세요", variant: "destructive" }); return; }
    if (!editCat && !form.slug.trim()) { toast({ title: "슬러그(영문)를 입력해 주세요", variant: "destructive" }); return; }
    setSaving(true);
    try {
      let slug = form.slug.trim();
      if (!editCat && form.parentSlug) slug = form.parentSlug + "-" + slug;
      if (editCat) {
        const res = await fetch(`${API_BASE}/api/categories/${editCat.id}`, {
          method: "PATCH", headers: { "Content-Type": "application/json" }, credentials: "include",
          body: JSON.stringify({ name: form.name }),
        });
        if (!res.ok) throw new Error();
      } else {
        const res = await fetch(`${API_BASE}/api/categories`, {
          method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
          body: JSON.stringify({ slug, name: form.name, parentSlug: form.parentSlug || null, sortOrder: 99 }),
        });
        if (!res.ok) { const d = await res.json(); throw new Error(d.message || "오류"); }
      }
      toast({ title: editCat ? "카테고리 수정 완료" : "카테고리 추가 완료" });
      setShowModal(false);
      onRefresh();
    } catch (err: unknown) {
      toast({ title: err instanceof Error ? err.message : "오류가 발생했습니다", variant: "destructive" });
    } finally { setSaving(false); }
  };

  const handleDelete = async (cat: Category) => {
    if (categories.some(c => c.parentSlug === cat.slug)) {
      toast({ title: "하위 카테고리를 먼저 삭제해 주세요", variant: "destructive" });
      setDeleteConfirm(null); return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/categories/${cat.id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error();
      toast({ title: "카테고리 삭제 완료" });
      setDeleteConfirm(null);
      onRefresh();
    } catch { toast({ title: "삭제 실패", variant: "destructive" }); }
  };

  const handleDrop = async (dSlug: string, info: { slug: string; pos: "before" | "after" | "in" }) => {
    if (dSlug === info.slug) return;
    const dragging = categories.find(c => c.slug === dSlug);
    const target = categories.find(c => c.slug === info.slug);
    if (!dragging || !target) return;

    // Prevent circular: check target is not descendant of dragging
    let cur: Category | undefined = target;
    while (cur?.parentSlug) {
      if (cur.parentSlug === dSlug) { toast({ title: "상위 카테고리를 하위로 이동할 수 없습니다", variant: "destructive" }); return; }
      cur = categories.find(c => c.slug === cur!.parentSlug);
    }

    let newParentSlug: string | null;
    let siblings: Category[];
    let insertIdx: number;

    if (info.pos === "in") {
      newParentSlug = target.slug;
      siblings = categories.filter(c => c.parentSlug === target.slug && c.slug !== dSlug).sort((a, b) => a.sortOrder - b.sortOrder);
      insertIdx = siblings.length;
    } else {
      newParentSlug = target.parentSlug;
      siblings = categories.filter(c => c.parentSlug === target.parentSlug && c.slug !== dSlug).sort((a, b) => a.sortOrder - b.sortOrder);
      const tIdx = siblings.findIndex(c => c.slug === target.slug);
      insertIdx = info.pos === "before" ? tIdx : tIdx + 1;
    }

    siblings.splice(insertIdx, 0, dragging);
    const promises: Promise<unknown>[] = [];

    if (dragging.parentSlug !== newParentSlug) {
      promises.push(fetch(`${API_BASE}/api/categories/${dragging.id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({ parentSlug: newParentSlug }),
      }));
    }
    siblings.forEach((c, i) => {
      if (c.sortOrder !== i + 1 || c.slug === dSlug) {
        promises.push(fetch(`${API_BASE}/api/categories/${c.id}`, {
          method: "PATCH", headers: { "Content-Type": "application/json" }, credentials: "include",
          body: JSON.stringify({ sortOrder: i + 1 }),
        }));
      }
    });

    try {
      await Promise.all(promises);
      onRefresh();
    } catch {
      toast({ title: "이동 실패", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">카테고리 관리</h3>
          <p className="text-sm text-muted-foreground mt-0.5">드래그로 순서 변경 · 다른 항목 위에 놓으면 하위로 이동합니다</p>
        </div>
        <Button onClick={openAddTop} className="gap-2" size="sm"><Plus className="w-4 h-4" /> 대분류 추가</Button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="bg-stone-50 border-b border-stone-200 px-4 py-2.5 flex items-center gap-2 text-xs text-stone-500">
          <GripVertical className="w-3.5 h-3.5" />
          드래그로 순서·계층 변경 가능 · 행 위에 놓으면 하위 카테고리로 이동
        </div>

        {flatTree.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">카테고리가 없습니다. 대분류를 추가해 보세요.</div>
        )}

        <div className="divide-y divide-stone-100">
          {flatTree.map(cat => (
            <div key={cat.id} className="relative">
              {dropInfo?.slug === cat.slug && dropInfo.pos === "before" && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary z-10 pointer-events-none" style={{ marginLeft: cat.depth * 24 + 16 }} />
              )}
              <div
                draggable
                onDragStart={() => setDraggingSlug(cat.slug)}
                onDragEnd={() => { setDraggingSlug(null); setDropInfo(null); }}
                onDragOver={(e) => {
                  e.preventDefault();
                  const r = e.currentTarget.getBoundingClientRect();
                  const ratio = (e.clientY - r.top) / r.height;
                  setDropInfo({ slug: cat.slug, pos: ratio < 0.3 ? "before" : ratio > 0.7 ? "after" : "in" });
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (draggingSlug && dropInfo) handleDrop(draggingSlug, dropInfo);
                  setDraggingSlug(null); setDropInfo(null);
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 transition-colors group",
                  draggingSlug === cat.slug ? "opacity-40" : "",
                  dropInfo?.slug === cat.slug && dropInfo.pos === "in"
                    ? "bg-primary/10"
                    : draggingSlug !== cat.slug ? "hover:bg-stone-50" : "",
                )}
                style={{ paddingLeft: cat.depth * 24 + 16 + "px" }}
              >
                <GripVertical className="w-4 h-4 text-stone-300 cursor-grab shrink-0" />
                {cat.depth === 0 && <FolderTree className="w-4 h-4 text-primary/50 shrink-0" />}
                {cat.depth === 1 && <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />}
                {cat.depth >= 2 && <div className="w-1.5 h-1.5 rounded-full bg-primary/30 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <span className={cn("text-sm", cat.depth === 0 ? "font-semibold" : "font-medium")}>{cat.name}</span>
                  <span className="ml-2 text-xs text-stone-400 font-mono">{cat.slug}</span>
                  {subOf(cat.slug).length > 0 && <span className="ml-1.5 text-xs text-stone-400">({subOf(cat.slug).length}개 하위)</span>}
                </div>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-stone-500" title="하위 추가" onClick={() => openAddSub(cat.slug)}><Plus className="w-3 h-3" /></Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(cat)}><Pencil className="w-3 h-3" /></Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setDeleteConfirm(cat)}><Trash2 className="w-3 h-3" /></Button>
                </div>
              </div>
              {dropInfo?.slug === cat.slug && dropInfo.pos === "after" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary z-10 pointer-events-none" style={{ marginLeft: cat.depth * 24 + 16 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {editCat ? "카테고리 수정"
                : form.parentSlug ? `하위 카테고리 추가 — ${labelFor(form.parentSlug)}`
                : "대분류 추가"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {!editCat && (
              <div>
                <Label>슬러그 (영문·숫자·하이픈)</Label>
                <Input
                  className="mt-1"
                  placeholder={form.parentSlug ? "예: premium" : "예: bath"}
                  value={form.slug}
                  onChange={(e) => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") }))}
                />
                {form.parentSlug && (
                  <p className="text-xs text-muted-foreground mt-1">실제 저장 슬러그: <span className="font-mono text-primary">{form.parentSlug}-{form.slug || "..."}</span></p>
                )}
              </div>
            )}
            <div>
              <Label>카테고리명</Label>
              <Input className="mt-1" placeholder="예: 반신욕조" value={form.name}
                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }} />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowModal(false)}>취소</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? "저장 중..." : "저장"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>카테고리 삭제</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">"{deleteConfirm?.name}"</span> 카테고리를 삭제하시겠습니까?<br />
            해당 카테고리에 속한 상품의 분류는 유지됩니다.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>취소</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>삭제</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ──────────────── Main Component ──────────────── */
export default function ProductsAdmin() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const topCategories = categories.filter(c => !c.parentSlug).sort((a, b) => a.sortOrder - b.sortOrder);
  const subCategories = categories.filter(c => c.parentSlug === form.category).sort((a, b) => a.sortOrder - b.sortOrder);
  const leafCategories = form.midSlug
    ? categories.filter(c => c.parentSlug === form.midSlug).sort((a, b) => a.sortOrder - b.sortOrder)
    : [];

  const getCatName = (slug: string) => categories.find(c => c.slug === slug)?.name || slug;
  const getSubName = (catSlug: string, subVal: string) => {
    const cat = categories.find(c => c.parentSlug === catSlug && getSubValue(c) === subVal);
    return cat?.name || subVal;
  };

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

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/categories`, { credentials: "include" });
      const data = await res.json();
      setCategories(data.categories || []);
    } catch {
      console.error("카테고리 로드 실패");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Derive midSlug from category + subCategory (for editing existing products)
  const deriveMidSlug = (catSlug: string, subCat: string): string => {
    // For 2-level: subCat="half" → find slug="bath-half" with parentSlug="bath"
    const direct = categories.find(c => c.parentSlug === catSlug && getSubValue(c) === subCat);
    if (direct) return direct.slug;
    // For 3-level: subCat="half-mujul" → midSlug="bath-half"
    const firstPart = subCat.split("-")[0];
    const mid = categories.find(c => c.parentSlug === catSlug && getSubValue(c) === firstPart);
    return mid?.slug || "";
  };

  const openAdd = () => {
    setEditId(null);
    const firstTop = topCategories[0];
    const firstSub = firstTop ? categories.filter(c => c.parentSlug === firstTop.slug)[0] : null;
    setForm({
      ...emptyForm,
      category: firstTop?.slug || "",
      midSlug: firstSub?.slug || "",
      subCategory: firstSub ? getSubValue(firstSub) : "",
    });
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditId(p.id);
    const mid = deriveMidSlug(p.category, p.subCategory);
    setForm({
      name: p.name,
      category: p.category,
      midSlug: mid,
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
      // Strip UI-only midSlug before sending to API
      const { midSlug: _mid, ...formData } = form;
      const body = { ...formData, price: form.price ? Number(form.price) : null, sortOrder: Number(form.sortOrder), discountRate: Number(form.discountRate) };
      const url = editId ? `${API_BASE}/api/products/${editId}` : `${API_BASE}/api/products`;
      const res = await fetch(url, { method: editId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(body) });
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
      const res = await fetch(`${API_BASE}/api/products/${id}`, { method: "DELETE", credentials: "include" });
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
      await fetch(`${API_BASE}/api/products/${p.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ isVisible: !p.isVisible }) });
      fetchProducts();
    } catch {
      toast({ title: "오류", description: "상태 변경에 실패했습니다", variant: "destructive" });
    }
  };

  const setField = (key: keyof FormState, val: unknown) => setForm((prev) => ({ ...prev, [key]: val }));

  const currentOptions = parseOptions(form.options);
  const currentImages = parseImages(form.additionalImages);
  const discountedPrice =
    form.price && Number(form.price) > 0 && Number(form.discountRate) > 0
      ? Math.round(Number(form.price) * (1 - Number(form.discountRate) / 100))
      : null;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="products">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">쇼핑 상품 관리</h2>
            <p className="text-sm text-muted-foreground mt-0.5">상품을 등록하고 카테고리를 관리할 수 있습니다</p>
          </div>
          <div className="flex items-center gap-3">
            <TabsList>
              <TabsTrigger value="products">상품 목록</TabsTrigger>
              <TabsTrigger value="categories">카테고리 관리</TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* 상품 목록 탭 */}
        <TabsContent value="products">
          <div className="flex justify-end mb-4">
            <Button onClick={openAdd} className="gap-2">
              <Plus className="w-4 h-4" /> 상품 등록
            </Button>
          </div>
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
                      <td colSpan={8} className="text-center py-16 text-muted-foreground">등록된 상품이 없습니다</td>
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
                          <Badge variant="outline" className="w-fit text-xs">{getCatName(p.category)}</Badge>
                          <span className="text-xs text-muted-foreground">{getSubName(p.category, p.subCategory)}</span>
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
                        <Badge variant={p.inStock ? "default" : "secondary"} className="text-xs">{p.inStock ? "재고있음" : "품절"}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => toggleVisible(p)} className={`flex items-center gap-1 text-xs font-medium ${p.isVisible ? "text-green-600" : "text-stone-400"}`}>
                          {p.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          {p.isVisible ? "노출중" : "숨김"}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEdit(p)}>
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setDeleteConfirm(p.id)}>
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
        </TabsContent>

        {/* 카테고리 관리 탭 */}
        <TabsContent value="categories">
          <CategoryManager categories={categories} onRefresh={fetchCategories} />
        </TabsContent>
      </Tabs>

      {/* Add/Edit Product Modal */}
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
                  <Input className="mt-1" placeholder="상품명을 입력하세요" value={form.name} onChange={(e) => setField("name", e.target.value)} />
                </div>
                <div>
                  <Label>대분류 *</Label>
                  <Select value={form.category} onValueChange={(v) => {
                    const firstMid = categories.filter(c => c.parentSlug === v)[0];
                    const firstLeaf = firstMid ? categories.filter(c => c.parentSlug === firstMid.slug)[0] : null;
                    const subCat = firstLeaf
                      ? getSubValue(firstMid) + "-" + getSubValue(firstLeaf)
                      : firstMid ? getSubValue(firstMid) : "";
                    setForm(prev => ({ ...prev, category: v, midSlug: firstMid?.slug || "", subCategory: subCat }));
                  }}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="대분류 선택" /></SelectTrigger>
                    <SelectContent>
                      {topCategories.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>중분류 *</Label>
                  <Select value={form.midSlug} onValueChange={(v) => {
                    const midCat = categories.find(c => c.slug === v);
                    if (!midCat) return;
                    // If no leaf categories, subCategory = midSuffix
                    const leaves = categories.filter(c => c.parentSlug === v);
                    const firstLeaf = leaves[0];
                    const subCat = firstLeaf
                      ? getSubValue(midCat) + "-" + getSubValue(firstLeaf)
                      : getSubValue(midCat);
                    setForm(prev => ({ ...prev, midSlug: v, subCategory: subCat }));
                  }}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="중분류 선택" /></SelectTrigger>
                    <SelectContent>
                      {subCategories.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
                      {subCategories.length === 0 && <SelectItem value="_none" disabled>중분류 없음</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>
                {leafCategories.length > 0 && (
                  <div>
                    <Label>소분류</Label>
                    <Select
                      value={(() => {
                        if (!form.midSlug) return "";
                        const midCat = categories.find(c => c.slug === form.midSlug);
                        if (!midCat) return "";
                        const midSuffix = getSubValue(midCat);
                        // subCategory = "half-mujul" → leafSuffix = "mujul"
                        const leafSuffix = form.subCategory.startsWith(midSuffix + "-")
                          ? form.subCategory.slice(midSuffix.length + 1)
                          : "";
                        const leaf = leafCategories.find(c => getSubValue(c) === leafSuffix);
                        return leaf?.slug || "";
                      })()}
                      onValueChange={(v) => {
                        const midCat = categories.find(c => c.slug === form.midSlug);
                        const leafCat = categories.find(c => c.slug === v);
                        if (!midCat || !leafCat) return;
                        setField("subCategory", getSubValue(midCat) + "-" + getSubValue(leafCat));
                      }}
                    >
                      <SelectTrigger className="mt-1"><SelectValue placeholder="소분류 선택" /></SelectTrigger>
                      <SelectContent>
                        {leafCategories.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <Label>소재</Label>
                  <Input className="mt-1" placeholder="예: 100% 일본산 히노끼(편백) 원목" value={form.material} onChange={(e) => setField("material", e.target.value)} />
                </div>
                <div>
                  <Label>표시 순서</Label>
                  <Input type="number" className="mt-1" placeholder="0" value={form.sortOrder} onChange={(e) => setField("sortOrder", e.target.value)} />
                </div>
                <div className="col-span-2">
                  <Label>상품 설명</Label>
                  <Textarea className="mt-1 min-h-[160px] text-sm" placeholder="상품 설명을 입력하세요" value={form.description} onChange={(e) => setField("description", e.target.value)} />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch id="inStock" checked={form.inStock as boolean} onCheckedChange={(v) => setField("inStock", v)} />
                    <Label htmlFor="inStock">재고있음</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="isVisible" checked={form.isVisible as boolean} onCheckedChange={(v) => setField("isVisible", v)} />
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
                  <Input type="number" className="mt-1" placeholder="예: 1320000" value={form.price} onChange={(e) => {
                    setField("price", e.target.value);
                    if (e.target.value) setField("priceText", Number(e.target.value).toLocaleString("ko-KR") + "원~");
                  }} />
                </div>
                <div>
                  <Label>할인율 (%)</Label>
                  <Input type="number" min="0" max="100" className="mt-1" placeholder="0~100" value={form.discountRate} onChange={(e) => setField("discountRate", e.target.value)} />
                </div>
                {discountedPrice && (
                  <div className="col-span-2 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-700 font-medium">
                      할인 적용가: {discountedPrice.toLocaleString("ko-KR")}원
                      <span className="ml-2 text-xs font-normal text-red-500">({form.discountRate}% 할인 → {(Number(form.price) - discountedPrice).toLocaleString("ko-KR")}원 절약)</span>
                    </p>
                  </div>
                )}
                <div className="col-span-2">
                  <Label>가격 표시 텍스트</Label>
                  <Input className="mt-1" placeholder="예: 1,320,000원~ / 가격 문의" value={form.priceText} onChange={(e) => setField("priceText", e.target.value)} />
                  <p className="text-xs text-muted-foreground mt-1">쇼핑몰에 실제 표시될 가격 텍스트입니다.</p>
                </div>
              </div>
            </TabsContent>

            {/* 사진관리 탭 */}
            <TabsContent value="image" className="space-y-5 mt-4">
              <div>
                <Label className="text-sm font-semibold">대표 이미지</Label>
                <p className="text-xs text-muted-foreground mb-2">상품 목록과 상단에 표시되는 메인 이미지</p>
                <ImageUploadInput value={form.imageUrl as string} onChange={(v) => setField("imageUrl", v)} label="대표 이미지" />
              </div>
              <div>
                <Label className="text-sm font-semibold">추가 이미지</Label>
                <p className="text-xs text-muted-foreground mb-2">상품 상세 페이지에 표시되는 추가 이미지</p>
                <AdditionalImagesEditor images={currentImages} onChange={(imgs) => setField("additionalImages", JSON.stringify(imgs))} />
              </div>
            </TabsContent>

            {/* 옵션/사이즈 탭 */}
            <TabsContent value="options" className="space-y-5 mt-4">
              <div>
                <Label className="text-sm font-semibold">사이즈 / 규격</Label>
                <Input className="mt-1" placeholder="예: 900×600×600(H)mm (기본형, 맞춤제작 가능)" value={form.sizes} onChange={(e) => setField("sizes", e.target.value)} />
              </div>
              <div>
                <Label className="text-sm font-semibold">선택 옵션</Label>
                <p className="text-xs text-muted-foreground mb-3">구매 시 고객이 선택할 수 있는 옵션 항목</p>
                <OptionEditor options={currentOptions} onChange={(opts) => setField("options", JSON.stringify(opts))} />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowModal(false)}>취소</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? "저장 중..." : editId ? "수정 완료" : "상품 등록"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>상품 삭제</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">이 상품을 삭제하면 복구할 수 없습니다. 계속하시겠습니까?</p>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>취소</Button>
            <Button variant="destructive" onClick={() => deleteConfirm !== null && handleDelete(deleteConfirm)}>삭제</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
