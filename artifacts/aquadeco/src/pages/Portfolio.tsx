import { useState, useEffect, useMemo } from "react";
import { useParams } from "wouter";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useGetAdminMe } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useSiteContent } from "@/hooks/useSiteContent";
import {
  Pencil, Trash2, Plus, X, Check, Loader2, Settings, ChevronRight, GripVertical,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageUploadInput } from "@/components/ui/ImageUploadInput";
import { InlineEditText } from "@/components/InlineEditText";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

// ─── Category types ───────────────────────────────────────────────────────────

type CategoryItem = {
  key: string;
  label: string;
  parent?: string;
};

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { key: "ujul", label: "히노끼욕조 유절" },
  { key: "mujul", label: "히노끼욕조 무절" },
  { key: "masame", label: "히노끼욕조 무절 마사메" },
  { key: "yangsan", label: "히노끼욕조 양산형" },
  { key: "yangsan_full", label: "히노끼 전신욕조", parent: "yangsan" },
  { key: "yangsan_half", label: "히노끼 반신욕조", parent: "yangsan" },
  { key: "location", label: "현장별 시공사례" },
];

// ─── Portfolio item types ─────────────────────────────────────────────────────

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  categoryKey: string;
  imageUrl: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
};

type EditFormData = {
  title: string;
  category: string;
  categoryKey: string;
  imageUrl: string;
  description: string;
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

function usePortfolioItems() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${BASE}/api/portfolio`);
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      setItems(data.items ?? []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);
  return { items, loading, refetch: fetchItems };
}

// ─── Edit Portfolio Item Modal ────────────────────────────────────────────────

function EditModal({
  item,
  categories,
  onClose,
  onSave,
  isNew,
}: {
  item: EditFormData;
  categories: CategoryItem[];
  onClose: () => void;
  onSave: (data: EditFormData) => Promise<void>;
  isNew: boolean;
}) {
  const [form, setForm] = useState<EditFormData>(item);
  const [saving, setSaving] = useState(false);

  const handleCategoryChange = (key: string) => {
    const opt = categories.find((o) => o.key === key);
    setForm((f) => ({ ...f, categoryKey: key, category: opt?.label ?? key }));
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.imageUrl.trim()) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-bold">{isNew ? "시공사례 추가" : "시공사례 수정"}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-stone-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-stone-700">
              이미지 <span className="text-red-500">*</span>
            </label>
            <ImageUploadInput
              value={form.imageUrl}
              onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-stone-700">카테고리</label>
            <select
              value={form.categoryKey}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
            >
              {categories.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.parent ? `└ ${o.label}` : o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-stone-700">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="예: 히노끼욕조 유절 시공 (7)"
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-stone-700">설명</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="시공 사례에 대한 간단한 설명을 입력하세요."
              rows={3}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
          </div>
        </div>

        <div className="p-6 border-t flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={saving}>취소</Button>
          <Button onClick={handleSave} disabled={saving || !form.title.trim() || !form.imageUrl.trim()}>
            {saving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Check className="w-4 h-4 mr-1" />}
            {isNew ? "추가하기" : "저장하기"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Category Management Modal ────────────────────────────────────────────────

function applyPortfolioDrop(
  items: CategoryItem[],
  draggingKey: string,
  targetKey: string,
  pos: "before" | "after" | "in",
): CategoryItem[] {
  if (draggingKey === targetKey) return items;
  const dragging = items.find((i) => i.key === draggingKey);
  const target = items.find((i) => i.key === targetKey);
  if (!dragging || !target) return items;
  let cur: CategoryItem | undefined = target;
  while (cur?.parent) {
    if (cur.parent === draggingKey) return items;
    cur = items.find((i) => i.key === cur!.parent);
  }
  const rest = items.filter((i) => i.key !== draggingKey);
  if (pos === "in") {
    const updated = { ...dragging, parent: targetKey };
    const tIdx = rest.findIndex((i) => i.key === targetKey);
    let ins = tIdx + 1;
    while (ins < rest.length) {
      let p = rest[ins].parent;
      let desc = false;
      while (p) { if (p === targetKey) { desc = true; break; } p = rest.find((i) => i.key === p)?.parent; }
      if (!desc) break;
      ins++;
    }
    return [...rest.slice(0, ins), updated, ...rest.slice(ins)];
  } else {
    const updated = { ...dragging, parent: target.parent };
    const tIdx = rest.findIndex((i) => i.key === targetKey);
    const ins = pos === "before" ? tIdx : tIdx + 1;
    return [...rest.slice(0, ins), updated, ...rest.slice(ins)];
  }
}

function CategoryManageModal({
  categories,
  onClose,
  onSave,
}: {
  categories: CategoryItem[];
  onClose: () => void;
  onSave: (cats: CategoryItem[]) => Promise<void>;
}) {
  const [list, setList] = useState<CategoryItem[]>(JSON.parse(JSON.stringify(categories)));
  const [saving, setSaving] = useState(false);
  const [editKey, setEditKey] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [addingChildOf, setAddingChildOf] = useState<string | "__top__" | null>(null);
  const [addLabel, setAddLabel] = useState("");
  const [draggingKey, setDraggingKey] = useState<string | null>(null);
  const [dropInfo, setDropInfo] = useState<{ key: string; pos: "before" | "after" | "in" } | null>(null);

  const flatTree = useMemo(() => {
    const result: Array<CategoryItem & { depth: number }> = [];
    const addLevel = (parentKey?: string, depth = 0) => {
      list.filter((i) => (i.parent ?? undefined) === parentKey).forEach((i) => {
        result.push({ ...i, depth });
        addLevel(i.key, depth + 1);
      });
    };
    addLevel(undefined, 0);
    return result;
  }, [list]);

  const handleDelete = (key: string) => {
    const toDelete = new Set<string>([key]);
    let changed = true;
    while (changed) {
      changed = false;
      list.forEach((i) => { if (i.parent && toDelete.has(i.parent) && !toDelete.has(i.key)) { toDelete.add(i.key); changed = true; } });
    }
    setList((prev) => prev.filter((i) => !toDelete.has(i.key)));
  };

  const handleAddConfirm = () => {
    if (!addLabel.trim() || !addingChildOf) return;
    const key = addLabel.trim().toLowerCase().replace(/[^a-z0-9가-힣]/g, "_").replace(/_+/g, "_") + "_" + Date.now().toString(36);
    const newCat: CategoryItem = { key, label: addLabel.trim() };
    if (addingChildOf !== "__top__") newCat.parent = addingChildOf;
    setList((prev) => [...prev, newCat]);
    setAddingChildOf(null);
    setAddLabel("");
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(list);
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b shrink-0">
          <h2 className="text-base font-bold flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary" /> 카테고리 관리
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-stone-100"><X className="w-4 h-4" /></button>
        </div>

        <div className="text-xs text-stone-400 px-5 py-2 bg-stone-50 border-b shrink-0 flex items-center gap-1.5">
          <GripVertical className="w-3.5 h-3.5" />
          드래그로 순서 변경 · 다른 항목 위에 놓으면 하위로 이동
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {flatTree.map((item) => (
            <div key={item.key} className="relative">
              {dropInfo?.key === item.key && dropInfo.pos === "before" && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary z-10 rounded-full pointer-events-none" style={{ marginLeft: item.depth * 20 }} />
              )}
              <div
                draggable
                onDragStart={() => { setDraggingKey(item.key); }}
                onDragEnd={() => { setDraggingKey(null); setDropInfo(null); }}
                onDragOver={(e) => {
                  e.preventDefault();
                  const r = e.currentTarget.getBoundingClientRect();
                  const ratio = (e.clientY - r.top) / r.height;
                  setDropInfo({ key: item.key, pos: ratio < 0.3 ? "before" : ratio > 0.7 ? "after" : "in" });
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (draggingKey && dropInfo && draggingKey !== dropInfo.key) {
                    setList((prev) => applyPortfolioDrop(prev, draggingKey, dropInfo.key, dropInfo.pos));
                  }
                  setDraggingKey(null); setDropInfo(null);
                }}
                style={{ marginLeft: item.depth * 20 + "px" }}
                className={cn(
                  "flex items-center gap-2 px-2 py-2 rounded-lg group transition-colors select-none",
                  draggingKey === item.key ? "opacity-40" : "",
                  dropInfo?.key === item.key && dropInfo.pos === "in"
                    ? "bg-primary/10 ring-1 ring-primary/40"
                    : draggingKey !== item.key ? "hover:bg-stone-50" : "",
                )}
              >
                <GripVertical className="w-4 h-4 text-stone-300 cursor-grab shrink-0" />
                {item.depth > 0 && <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />}
                {editKey === item.key ? (
                  <>
                    <input
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") { setList((prev) => prev.map((c) => c.key === item.key ? { ...c, label: editLabel } : c)); setEditKey(null); }
                        if (e.key === "Escape") setEditKey(null);
                      }}
                      autoFocus
                      className="flex-1 border rounded px-2 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <button onClick={() => { setList((prev) => prev.map((c) => c.key === item.key ? { ...c, label: editLabel } : c)); setEditKey(null); }} className="p-1 hover:text-primary text-stone-500"><Check className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setEditKey(null)} className="p-1 hover:text-red-500 text-stone-400"><X className="w-3.5 h-3.5" /></button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-sm truncate">{item.label}</span>
                    <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setAddingChildOf(item.key); setAddLabel(""); }} className="p-1 rounded hover:bg-stone-200 text-stone-400 hover:text-stone-600" title="하위 추가"><Plus className="w-3 h-3" /></button>
                      <button onClick={() => { setEditKey(item.key); setEditLabel(item.label); }} className="p-1 rounded hover:bg-amber-100 text-amber-600" title="수정"><Pencil className="w-3 h-3" /></button>
                      <button onClick={() => handleDelete(item.key)} className="p-1 rounded hover:bg-red-100 text-red-500" title="삭제"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  </>
                )}
              </div>
              {dropInfo?.key === item.key && dropInfo.pos === "after" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary z-10 rounded-full pointer-events-none" style={{ marginLeft: item.depth * 20 }} />
              )}
              {addingChildOf === item.key && (
                <div className="flex items-center gap-1.5 mt-0.5 pb-1" style={{ marginLeft: (item.depth + 1) * 20 + "px" }}>
                  <input value={addLabel} onChange={(e) => setAddLabel(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleAddConfirm(); if (e.key === "Escape") { setAddingChildOf(null); setAddLabel(""); } }}
                    autoFocus placeholder="이름 입력 후 Enter"
                    className="flex-1 border rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40" />
                  <button onClick={handleAddConfirm} className="p-1 hover:text-primary text-stone-500"><Check className="w-3.5 h-3.5" /></button>
                  <button onClick={() => { setAddingChildOf(null); setAddLabel(""); }} className="p-1 hover:text-red-500 text-stone-400"><X className="w-3.5 h-3.5" /></button>
                </div>
              )}
            </div>
          ))}

          {addingChildOf === "__top__" ? (
            <div className="flex items-center gap-1.5 mt-2 px-2">
              <input value={addLabel} onChange={(e) => setAddLabel(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleAddConfirm(); if (e.key === "Escape") { setAddingChildOf(null); setAddLabel(""); } }}
                autoFocus placeholder="대분류 이름 입력 후 Enter"
                className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <button onClick={handleAddConfirm} className="p-1 hover:text-primary text-stone-500"><Check className="w-4 h-4" /></button>
              <button onClick={() => { setAddingChildOf(null); setAddLabel(""); }} className="p-1 hover:text-red-500 text-stone-400"><X className="w-4 h-4" /></button>
            </div>
          ) : (
            <button
              onClick={() => { setAddingChildOf("__top__"); setAddLabel(""); }}
              className="w-full mt-2 flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed border-stone-200 hover:border-primary text-stone-400 hover:text-primary text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> 대분류 추가
            </button>
          )}
        </div>

        <div className="p-5 border-t shrink-0 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} disabled={saving}>취소</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Check className="w-4 h-4 mr-1" />}
            저장하기
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Portfolio Component ─────────────────────────────────────────────────

export default function Portfolio() {
  const params = useParams<{ category?: string }>();
  const { data: adminData } = useGetAdminMe({ query: { retry: false } });
  const isAdmin = adminData?.isAdmin === true;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { gc } = useSiteContent();

  // Load categories from content API
  const categories: CategoryItem[] = useMemo(() => {
    try {
      const raw = gc("portfolio_categories", "");
      if (!raw) return DEFAULT_CATEGORIES;
      return JSON.parse(raw);
    } catch {
      return DEFAULT_CATEGORIES;
    }
  }, [gc]);

  const saveCategories = async (cats: CategoryItem[]) => {
    await fetch(`${BASE}/api/content/portfolio_categories`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ value: JSON.stringify(cats) }),
    });
    queryClient.invalidateQueries({ queryKey: ["site-content"] });
  };

  // Recursively get all descendant keys for filtering
  const getFilterKeys = (key: string): string[] => {
    if (key === "all") return [];
    const children = categories.filter((c) => c.parent === key);
    return [key, ...children.flatMap((c) => getFilterKeys(c.key))];
  };

  const childrenOf = (key: string) => categories.filter((c) => c.parent === key);

  const { items, loading, refetch } = usePortfolioItems();
  const [activeKey, setActiveKey] = useState(params.category || "all");
  useEffect(() => {
    setActiveKey(params.category || "all");
  }, [params.category]);

  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (activeKey === "all") return items;
    const filterKeys = getFilterKeys(activeKey);
    return items.filter((c) => filterKeys.includes(c.categoryKey));
  }, [items, activeKey, categories]);

  // ── 3-level chain helpers ──────────────────────────────────────────────────
  const findCat = (key: string) => categories.find((c) => c.key === key);

  const getChain = (key: string): CategoryItem[] => {
    const chain: CategoryItem[] = [];
    let cur = findCat(key);
    while (cur) {
      chain.unshift(cur);
      cur = cur.parent ? findCat(cur.parent) : undefined;
    }
    return chain;
  };

  const chain = activeKey === "all" ? [] : getChain(activeKey);
  const activeTopCat = chain[0];
  const activeMidCat = chain[1];
  const activeLeafCat = chain[2];

  const topCats = categories.filter((c) => !c.parent);
  const midCats = activeTopCat ? childrenOf(activeTopCat.key) : [];
  const leafCats = activeMidCat ? childrenOf(activeMidCat.key) : [];

  const pillCls = (active: boolean) =>
    cn(
      "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
      active
        ? "bg-primary text-white border-primary"
        : "bg-white text-stone-700 border-stone-200 hover:border-primary hover:text-primary"
    );
  const subPillCls = (active: boolean) =>
    cn(
      "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
      active
        ? "bg-stone-800 text-white border-stone-800"
        : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
    );
  const leafPillCls = (active: boolean) =>
    cn(
      "px-3 py-1.5 rounded-md text-xs font-medium transition-colors border",
      active
        ? "bg-primary/10 text-primary border-primary/30"
        : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
    );

  const handleSaveEdit = async (data: EditFormData) => {
    if (!editingItem) return;
    try {
      const res = await fetch(`${BASE}/api/portfolio/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast({ title: "수정되었습니다." });
      setEditingItem(null);
      refetch();
    } catch {
      toast({ title: "수정에 실패했습니다.", variant: "destructive" });
    }
  };

  const handleSaveNew = async (data: EditFormData) => {
    try {
      const res = await fetch(`${BASE}/api/portfolio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...data, sortOrder: items.length + 1 }),
      });
      if (!res.ok) throw new Error();
      toast({ title: "추가되었습니다." });
      setShowAddModal(false);
      refetch();
    } catch {
      toast({ title: "추가에 실패했습니다.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("이 시공사례를 삭제하시겠습니까?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${BASE}/api/portfolio/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      toast({ title: "삭제되었습니다." });
      refetch();
    } catch {
      toast({ title: "삭제에 실패했습니다.", variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  // For AddModal: default category when opening
  const defaultAddCategory = (): { key: string; label: string } => {
    if (activeKey === "all") return { key: categories[0]?.key ?? "ujul", label: categories[0]?.label ?? "히노끼욕조 유절" };
    const cat = categories.find((c) => c.key === activeKey);
    return { key: activeKey, label: cat?.label ?? activeKey };
  };

  return (
    <div className="min-h-screen pt-[104px]">
      {/* Admin banner */}
      {isAdmin && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between gap-3 flex-wrap">
          <span className="text-amber-800 text-sm font-medium flex items-center gap-2">
            <Pencil className="w-4 h-4" />
            관리자 편집 모드 — 카드 위에 마우스를 올리면 수정/삭제 버튼이 나타납니다
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowCategoryModal(true)}
              className="border-amber-300 text-amber-800 hover:bg-amber-100 gap-1.5"
            >
              <Settings className="w-4 h-4" /> 카테고리 관리
            </Button>
            <Button
              size="sm"
              onClick={() => setShowAddModal(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white gap-1.5"
            >
              <Plus className="w-4 h-4" /> 시공사례 추가
            </Button>
          </div>
        </div>
      )}

      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center">
          <InlineEditText contentKey="portfolio_page_heading" value={gc("portfolio_page_heading", "현장 시공사례")} as="h1" className="text-3xl md:text-4xl font-bold mb-2" />
          <InlineEditText contentKey="portfolio_page_subtitle" value={gc("portfolio_page_subtitle", "휴편백이 시공한 다양한 히노끼욕조 현장 사례")} as="p" className="text-primary-foreground/80" />
        </div>
      </div>

      {/* Category Filter Rows — 3-level pills (like ShopPage) */}
      <div className="bg-white border-b border-stone-100 sticky top-[104px] z-30">
        <div className="container mx-auto px-4 py-3 space-y-2">
          {/* 대분류 Row */}
          <div className="flex flex-wrap gap-2">
            <button
              className={pillCls(activeKey === "all")}
              onClick={() => setActiveKey("all")}
              data-testid="filter-all"
            >
              전체
            </button>
            {topCats.map((cat) => (
              <button
                key={cat.key}
                className={pillCls(activeTopCat?.key === cat.key)}
                onClick={() => setActiveKey(cat.key)}
                data-testid={`filter-${cat.key}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 중분류 Row — only when a 대분류 is active and has children */}
          {activeTopCat && midCats.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                className={subPillCls(!activeMidCat)}
                onClick={() => setActiveKey(activeTopCat.key)}
              >
                전체
              </button>
              {midCats.map((cat) => (
                <button
                  key={cat.key}
                  className={subPillCls(activeMidCat?.key === cat.key)}
                  onClick={() => setActiveKey(cat.key)}
                  data-testid={`filter-${cat.key}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* 소분류 Row — only when a 중분류 is active and has children */}
          {activeMidCat && leafCats.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                className={leafPillCls(!activeLeafCat)}
                onClick={() => setActiveKey(activeMidCat.key)}
              >
                전체
              </button>
              {leafCats.map((cat) => (
                <button
                  key={cat.key}
                  className={leafPillCls(activeLeafCat?.key === cat.key)}
                  onClick={() => setActiveKey(cat.key)}
                  data-testid={`filter-${cat.key}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb — shows current location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <button
            className="hover:text-primary transition-colors"
            onClick={() => setActiveKey("all")}
          >
            현장시공사례
          </button>
          {activeTopCat && (
            <>
              <span>/</span>
              <button
                className={cn(
                  "hover:text-primary transition-colors",
                  !activeMidCat && !activeLeafCat ? "text-foreground font-medium" : ""
                )}
                onClick={() => setActiveKey(activeTopCat.key)}
              >
                {activeTopCat.label}
              </button>
            </>
          )}
          {activeMidCat && (
            <>
              <span>/</span>
              <button
                className={cn(
                  "hover:text-primary transition-colors",
                  !activeLeafCat ? "text-foreground font-medium" : ""
                )}
                onClick={() => setActiveKey(activeMidCat.key)}
              >
                {activeMidCat.label}
              </button>
            </>
          )}
          {activeLeafCat && (
            <>
              <span>/</span>
              <span className="text-foreground font-medium">{activeLeafCat.label}</span>
            </>
          )}
        </div>
        {/* Current section title */}
        {activeKey !== "all" && (
          <h2 className="text-lg font-semibold text-foreground mb-6">
            {activeLeafCat?.label ?? activeMidCat?.label ?? activeTopCat?.label}
          </h2>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            {isAdmin ? (
              <div className="flex flex-col items-center gap-4">
                <p>이 카테고리에 시공사례가 없습니다.</p>
                <Button onClick={() => setShowAddModal(true)} className="gap-1.5">
                  <Plus className="w-4 h-4" /> 시공사례 추가하기
                </Button>
              </div>
            ) : (
              "해당 카테고리의 시공사례가 없습니다."
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <div key={item.id} className="group relative" data-testid={`case-${item.id}`}>
                <div className="relative overflow-hidden rounded-xl bg-stone-100 aspect-square cursor-pointer">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.src = "https://cdn.imweb.me/thumbnail/20220103/5c1275af617c1.jpg";
                    }}
                  />
                  <div className={cn(
                    "absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-3",
                    isAdmin && "group-hover:bg-black/40"
                  )}>
                    <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full">
                      <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded text-primary">
                        {item.category}
                      </span>
                      <p className="text-white text-xs mt-1 line-clamp-2">{item.description}</p>
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-amber-50 transition-colors"
                        title="수정"
                      >
                        <Pencil className="w-4 h-4 text-amber-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-colors disabled:opacity-50"
                        title="삭제"
                      >
                        {deletingId === item.id
                          ? <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                          : <Trash2 className="w-4 h-4 text-red-500" />}
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium mt-2 text-foreground/80 truncate">{item.title}</p>
              </div>
            ))}

            {isAdmin && (
              <button
                onClick={() => setShowAddModal(true)}
                className="group aspect-square rounded-xl border-2 border-dashed border-stone-300 hover:border-primary transition-colors flex flex-col items-center justify-center gap-2 text-stone-400 hover:text-primary"
              >
                <Plus className="w-8 h-8" />
                <span className="text-sm font-medium">추가하기</span>
              </button>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-primary/5 rounded-2xl p-10 text-center border border-primary/10">
          <InlineEditText contentKey="portfolio_cta_title" value={gc("portfolio_cta_title", "나만의 히노끼욕조를 만들어보세요")} as="h2" className="text-2xl font-bold mb-3" />
          <InlineEditText contentKey="portfolio_cta_desc" value={gc("portfolio_cta_desc", "원하시는 욕조 크기와 스타일에 맞춘 맞춤 제작을 상담해 드립니다.")} as="p" className="text-muted-foreground text-sm mb-6" multiline />
          <Link href="/inquiry">
            <Button size="lg" className="px-8" data-testid="btn-portfolio-inquiry">
              견적 문의하기
            </Button>
          </Link>
        </div>
      </div>

      {/* Edit modal */}
      {editingItem && (
        <EditModal
          item={{
            title: editingItem.title,
            category: editingItem.category,
            categoryKey: editingItem.categoryKey,
            imageUrl: editingItem.imageUrl,
            description: editingItem.description,
          }}
          categories={categories}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveEdit}
          isNew={false}
        />
      )}

      {/* Add modal */}
      {showAddModal && (
        <EditModal
          item={{
            title: "",
            category: defaultAddCategory().label,
            categoryKey: defaultAddCategory().key,
            imageUrl: "",
            description: "",
          }}
          categories={categories}
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveNew}
          isNew={true}
        />
      )}

      {/* Category management modal */}
      {showCategoryModal && (
        <CategoryManageModal
          categories={categories}
          onClose={() => setShowCategoryModal(false)}
          onSave={saveCategories}
        />
      )}
    </div>
  );
}
