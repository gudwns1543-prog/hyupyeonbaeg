import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useGetAdminMe } from "@workspace/api-client-react";
import {
  Pencil, Trash2, Plus, X, Check, Loader2, ImageIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const TABS = [
  { key: "all", label: "전체" },
  { key: "ujul", label: "히노끼욕조 유절" },
  { key: "mujul", label: "히노끼욕조 무절" },
  { key: "masame", label: "히노끼욕조 무절 마사메" },
  { key: "yangsan", label: "히노끼욕조 양산형" },
  { key: "location", label: "현장별 시공사례" },
];

const CATEGORY_OPTIONS = [
  { key: "ujul", label: "히노끼욕조 유절" },
  { key: "mujul", label: "히노끼욕조 무절" },
  { key: "masame", label: "히노끼욕조 무절 마사메" },
  { key: "yangsan", label: "히노끼욕조 양산형" },
  { key: "location", label: "현장별 시공사례" },
];

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

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

type EditFormData = {
  title: string;
  category: string;
  categoryKey: string;
  imageUrl: string;
  description: string;
};

const emptyForm: EditFormData = {
  title: "",
  category: "히노끼욕조 유절",
  categoryKey: "ujul",
  imageUrl: "",
  description: "",
};

function EditModal({
  item,
  onClose,
  onSave,
  isNew,
}: {
  item: EditFormData;
  onClose: () => void;
  onSave: (data: EditFormData) => Promise<void>;
  isNew: boolean;
}) {
  const [form, setForm] = useState<EditFormData>(item);
  const [saving, setSaving] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const handleCategoryChange = (key: string) => {
    const opt = CATEGORY_OPTIONS.find((o) => o.key === key);
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
          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-stone-700">
              이미지 URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => { setForm((f) => ({ ...f, imageUrl: e.target.value })); setPreviewError(false); }}
              placeholder="https://..."
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            {form.imageUrl && (
              <div className="mt-2 rounded-lg overflow-hidden border bg-stone-50 h-36 flex items-center justify-center">
                {previewError ? (
                  <div className="flex flex-col items-center text-stone-400 gap-1">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-xs">이미지를 불러올 수 없습니다</span>
                  </div>
                ) : (
                  <img
                    src={form.imageUrl}
                    alt="미리보기"
                    className="h-full w-full object-cover"
                    onError={() => setPreviewError(true)}
                  />
                )}
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-stone-700">카테고리</label>
            <select
              value={form.categoryKey}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
            >
              {CATEGORY_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Title */}
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

          {/* Description */}
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

export default function Portfolio() {
  const params = useParams<{ category?: string }>();
  const { data: adminData } = useGetAdminMe({ query: { retry: false } });
  const isAdmin = adminData?.isAdmin === true;
  const { toast } = useToast();

  const { items, loading, refetch } = usePortfolioItems();
  const [activeKey, setActiveKey] = useState(params.category || "all");

  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filtered = activeKey === "all" ? items : items.filter((c) => c.categoryKey === activeKey);

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

  return (
    <div className="min-h-screen pt-[68px]">
      {/* 관리자 모드 배너 */}
      {isAdmin && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between">
          <span className="text-amber-800 text-sm font-medium flex items-center gap-2">
            <Pencil className="w-4 h-4" />
            관리자 편집 모드 — 카드 위에 마우스를 올리면 수정/삭제 버튼이 나타납니다
          </span>
          <Button
            size="sm"
            onClick={() => setShowAddModal(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white gap-1.5"
          >
            <Plus className="w-4 h-4" /> 시공사례 추가
          </Button>
        </div>
      )}

      <div className="bg-stone-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">현장 시공사례</h1>
          <p className="text-stone-300">휴편백이 시공한 다양한 히노끼욕조 현장 사례</p>
        </div>
      </div>

      {/* Category Tabs */}
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
                  {/* Hover overlay (info) */}
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

                  {/* Admin action buttons */}
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

            {/* Admin: Add new card */}
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
          <h2 className="text-2xl font-bold mb-3">나만의 히노끼욕조를 만들어보세요</h2>
          <p className="text-muted-foreground text-sm mb-6">원하시는 욕조 크기와 스타일에 맞춘 맞춤 제작을 상담해 드립니다.</p>
          <Link href="/inquiry">
            <Button size="lg" className="px-8" data-testid="btn-portfolio-inquiry">
              견적 문의하기
            </Button>
          </Link>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <EditModal
          item={{
            title: editingItem.title,
            category: editingItem.category,
            categoryKey: editingItem.categoryKey,
            imageUrl: editingItem.imageUrl,
            description: editingItem.description,
          }}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveEdit}
          isNew={false}
        />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <EditModal
          item={{ ...emptyForm, categoryKey: activeKey === "all" ? "ujul" : activeKey, category: CATEGORY_OPTIONS.find((o) => o.key === (activeKey === "all" ? "ujul" : activeKey))?.label ?? "히노끼욕조 유절" }}
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveNew}
          isNew={true}
        />
      )}
    </div>
  );
}
