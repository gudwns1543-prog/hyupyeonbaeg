import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Plus, X, Pencil, Trash2, Pin } from "lucide-react";
import { useGetAdminMe } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const BASE = "/api/notices";

type Notice = {
  id: number;
  title: string;
  content: string;
  isNew: boolean;
  isPinned: boolean;
  isActive: boolean;
  createdAt: string;
};

function formatDate(iso: string) {
  return iso.slice(0, 10);
}

function NoticeItem({
  notice,
  isAdmin,
  onDelete,
  onEdit,
}: {
  notice: Notice;
  isAdmin: boolean;
  onDelete: (id: number) => void;
  onEdit: (notice: Notice) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("border rounded-xl overflow-hidden", notice.isPinned ? "border-primary/30 bg-primary/5" : "border-stone-100")}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-stone-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {notice.isPinned && <Pin className="w-3.5 h-3.5 text-primary shrink-0" />}
          {notice.isNew && (
            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded font-medium shrink-0">NEW</span>
          )}
          <span className="text-sm font-medium text-foreground truncate">{notice.title}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-4">
          {isAdmin && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(notice); }}
                className="text-stone-400 hover:text-primary p-1 rounded"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(notice.id); }}
                className="text-stone-400 hover:text-red-500 p-1 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          <span className="text-xs text-muted-foreground">{formatDate(notice.createdAt)}</span>
          <ChevronDown className={cn("w-4 h-4 text-stone-400 transition-transform duration-200", open && "rotate-180")} />
        </div>
      </button>
      {open && (
        <div className="px-6 py-5 border-t border-stone-100 bg-stone-50">
          <pre className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans">
            {notice.content}
          </pre>
        </div>
      )}
    </div>
  );
}

type FormState = { title: string; content: string; isNew: boolean; isPinned: boolean };
const emptyForm: FormState = { title: "", content: "", isNew: false, isPinned: false };

function NoticeModal({
  initial,
  onClose,
  onSave,
}: {
  initial?: Notice;
  onClose: () => void;
  onSave: (data: FormState) => Promise<void>;
}) {
  const [form, setForm] = useState<FormState>(
    initial ? { title: initial.title, content: initial.content, isNew: initial.isNew, isPinned: initial.isPinned } : emptyForm
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-bold text-lg">{initial ? "공지 수정" : "새 공지 작성"}</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-stone-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">제목</label>
            <input
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="공지 제목을 입력하세요"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">내용</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[160px] resize-none"
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              placeholder="공지 내용을 입력하세요"
            />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.isNew} onChange={(e) => setForm((f) => ({ ...f, isNew: e.target.checked }))} className="accent-primary" />
              NEW 표시
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.isPinned} onChange={(e) => setForm((f) => ({ ...f, isPinned: e.target.checked }))} className="accent-primary" />
              상단 고정
            </label>
          </div>
        </div>
        <div className="px-6 pb-6 flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>취소</Button>
          <Button onClick={handleSave} disabled={saving || !form.title.trim() || !form.content.trim()}>
            {saving ? "저장 중..." : "저장"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Notice() {
  const { data: adminData } = useGetAdminMe();
  const isAdmin = adminData?.isAdmin === true;
  const { toast } = useToast();

  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

  const fetchNotices = async () => {
    try {
      const res = await fetch(BASE);
      if (res.ok) setNotices(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotices(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("이 공지를 삭제하시겠습니까?")) return;
    await fetch(`${BASE}/${id}`, { method: "DELETE" });
    setNotices((prev) => prev.filter((n) => n.id !== id));
    toast({ title: "공지가 삭제되었습니다." });
  };

  const handleSave = async (data: FormState) => {
    if (editingNotice) {
      const res = await fetch(`${BASE}/${editingNotice.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const updated = await res.json();
        setNotices((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
        toast({ title: "공지가 수정되었습니다." });
      }
    } else {
      const res = await fetch(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await fetchNotices();
        toast({ title: "공지가 등록되었습니다." });
      }
    }
    setShowModal(false);
    setEditingNotice(null);
  };

  return (
    <div className="min-h-screen pt-[68px]">
      <div className="bg-stone-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">공지사항</h1>
          <p className="text-stone-300">휴편백의 새로운 소식을 전해드립니다</p>
        </div>
      </div>

      {isAdmin && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
          <div className="container mx-auto flex items-center justify-between max-w-3xl">
            <span className="text-amber-700 text-sm font-medium">관리자 모드 — 공지 작성 및 편집이 가능합니다.</span>
            <Button
              size="sm"
              onClick={() => { setEditingNotice(null); setShowModal(true); }}
              className="flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> 공지 작성
            </Button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
        ) : notices.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">등록된 공지사항이 없습니다.</div>
        ) : (
          <div className="space-y-3">
            {notices.map((notice) => (
              <NoticeItem
                key={notice.id}
                notice={notice}
                isAdmin={isAdmin}
                onDelete={handleDelete}
                onEdit={(n) => { setEditingNotice(n); setShowModal(true); }}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <NoticeModal
          initial={editingNotice ?? undefined}
          onClose={() => { setShowModal(false); setEditingNotice(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
