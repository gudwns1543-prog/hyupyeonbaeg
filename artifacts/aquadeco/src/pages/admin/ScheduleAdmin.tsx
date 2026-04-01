import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, X, MapPin, Edit2, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type ScheduleEvent = {
  id: number;
  title: string;
  description?: string | null;
  date: string;
  location?: string | null;
  color: string;
  isPublished: boolean;
};

type EventForm = {
  title: string;
  description: string;
  date: string;
  location: string;
  color: string;
  isPublished: boolean;
};

const COLORS = [
  { key: "green", label: "초록", cls: "bg-primary" },
  { key: "amber", label: "주황", cls: "bg-amber-500" },
  { key: "blue", label: "파랑", cls: "bg-blue-500" },
  { key: "red", label: "빨강", cls: "bg-red-500" },
  { key: "purple", label: "보라", cls: "bg-purple-500" },
];

const COLOR_MAP: Record<string, string> = {
  green: "bg-primary text-white",
  amber: "bg-amber-500 text-white",
  blue: "bg-blue-500 text-white",
  red: "bg-red-500 text-white",
  purple: "bg-purple-500 text-white",
};
const DOT_MAP: Record<string, string> = {
  green: "bg-primary", amber: "bg-amber-500", blue: "bg-blue-500", red: "bg-red-500", purple: "bg-purple-500",
};

const EMPTY_FORM: EventForm = { title: "", description: "", date: "", location: "", color: "green", isPublished: true };

const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

export default function ScheduleAdmin() {
  const { toast } = useToast();
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [today] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<EventForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  function toDateStr(y: number, m: number, d: number) {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  const fetchEvents = async () => {
    try {
      const r = await fetch(`${base}/api/schedule/all`, { credentials: "include" });
      const data = await r.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch { setEvents([]); } finally { setLoading(false); }
  };

  useEffect(() => { fetchEvents(); }, []);

  const eventsOnDate = (ds: string) => events.filter(e => e.date?.slice(0, 10) === ds);
  const selectedEvents = selectedDate ? eventsOnDate(selectedDate) : [];
  const monthEvents = events.filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  const openNew = (date?: string) => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, date: date || selectedDate || todayStr });
    setShowForm(true);
  };

  const openEdit = (ev: ScheduleEvent) => {
    setEditingId(ev.id);
    setForm({
      title: ev.title,
      description: ev.description || "",
      date: ev.date.slice(0, 10),
      location: ev.location || "",
      color: ev.color,
      isPublished: ev.isPublished,
    });
    setShowForm(true);
  };

  const saveEvent = async () => {
    if (!form.title.trim() || !form.date) {
      toast({ title: "제목과 날짜를 입력해 주세요.", variant: "destructive" }); return;
    }
    setSaving(true);
    try {
      const url = editingId ? `${base}/api/schedule/${editingId}` : `${base}/api/schedule`;
      const method = editingId ? "PUT" : "POST";
      const r = await fetch(url, { method, credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!r.ok) throw new Error();
      toast({ title: editingId ? "일정이 수정되었습니다." : "일정이 등록되었습니다." });
      setShowForm(false);
      fetchEvents();
    } catch {
      toast({ title: "저장에 실패했습니다.", variant: "destructive" });
    } finally { setSaving(false); }
  };

  const deleteEvent = async (id: number) => {
    if (!confirm("이 일정을 삭제하시겠습니까?")) return;
    try {
      await fetch(`${base}/api/schedule/${id}`, { method: "DELETE", credentials: "include" });
      toast({ title: "삭제되었습니다." });
      fetchEvents();
    } catch { toast({ title: "삭제 실패", variant: "destructive" }); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">시공일정 관리</h2>
          <p className="text-sm text-muted-foreground mt-0.5">등록한 일정은 홈페이지 시공일정 페이지에 공개됩니다.</p>
        </div>
        <Button onClick={() => openNew()} className="gap-2">
          <Plus className="w-4 h-4" /> 일정 등록
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* 캘린더 */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
            <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors">
              <ChevronLeft className="w-5 h-5 text-stone-600" />
            </button>
            <h2 className="text-base font-bold">{year}년 {month + 1}월</h2>
            <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors">
              <ChevronRight className="w-5 h-5 text-stone-600" />
            </button>
          </div>
          <div className="grid grid-cols-7 border-b border-stone-50">
            {DAYS.map((d, i) => (
              <div key={d} className={cn("py-2.5 text-center text-xs font-semibold", i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-muted-foreground")}>
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`e-${i}`} className="min-h-[64px] border-b border-r border-stone-50" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = toDateStr(year, month, day);
              const dayEvents = eventsOnDate(dateStr);
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selectedDate;
              const col = (firstDay + i) % 7;
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                  className={cn("min-h-[64px] border-b border-r border-stone-50 p-1 cursor-pointer transition-colors", isSelected ? "bg-primary/5" : "hover:bg-stone-50")}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={cn("w-5 h-5 flex items-center justify-center rounded-full text-[11px] font-medium", isToday ? "bg-primary text-white" : col === 0 ? "text-red-400" : col === 6 ? "text-blue-400" : "text-foreground")}>
                      {day}
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); openNew(dateStr); }}
                      className="w-4 h-4 rounded text-stone-300 hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map(ev => (
                      <div key={ev.id} className={cn("text-[10px] px-1 py-0.5 rounded truncate", COLOR_MAP[ev.color] ?? COLOR_MAP.green, !ev.isPublished && "opacity-50")}>
                        {!ev.isPublished && "🔒 "}{ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && <div className="text-[10px] text-muted-foreground px-1">+{dayEvents.length - 2}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 사이드 패널 */}
        <div className="space-y-4">
          {/* 선택 날짜 일정 */}
          {selectedDate && (
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm">
                  {new Date(selectedDate + "T12:00:00").toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "short" })}
                </h3>
                <Button size="sm" variant="outline" className="gap-1 h-7 text-xs" onClick={() => openNew(selectedDate)}>
                  <Plus className="w-3 h-3" /> 추가
                </Button>
              </div>
              {selectedEvents.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-3">이 날짜에는 일정이 없습니다.</p>
              ) : (
                <div className="space-y-2">
                  {selectedEvents.map(ev => (
                    <div key={ev.id} className={cn("border border-stone-100 rounded-xl p-3", !ev.isPublished && "opacity-60")}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className={cn("w-2 h-2 rounded-full shrink-0", DOT_MAP[ev.color] ?? DOT_MAP.green)} />
                          <span className="font-semibold text-xs">{ev.title}</span>
                          {!ev.isPublished && <span className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded">비공개</span>}
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => openEdit(ev)} className="w-6 h-6 flex items-center justify-center rounded hover:bg-stone-100 transition-colors"><Edit2 className="w-3 h-3 text-stone-400" /></button>
                          <button onClick={() => deleteEvent(ev.id)} className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-50 transition-colors"><Trash2 className="w-3 h-3 text-red-400" /></button>
                        </div>
                      </div>
                      {ev.location && <div className="flex items-center gap-1 text-[11px] text-muted-foreground"><MapPin className="w-3 h-3" />{ev.location}</div>}
                      {ev.description && <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{ev.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 이번달 전체 */}
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
            <h3 className="font-bold text-sm mb-3">{month + 1}월 전체 일정 ({monthEvents.length}건)</h3>
            {loading ? (
              <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
            ) : monthEvents.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-3">등록된 일정이 없습니다.</p>
            ) : (
              <div className="space-y-1.5 max-h-60 overflow-y-auto">
                {monthEvents.sort((a, b) => a.date.localeCompare(b.date)).map(ev => {
                  const d = new Date(ev.date + "T12:00:00");
                  return (
                    <div key={ev.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-stone-50 group">
                      <span className={cn("w-2 h-2 rounded-full shrink-0", DOT_MAP[ev.color] ?? DOT_MAP.green)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-muted-foreground">{d.getMonth() + 1}/{d.getDate()} ({DAYS[d.getDay()]})</p>
                        <p className="text-xs font-medium truncate">{ev.title}</p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(ev)}><Edit2 className="w-3 h-3 text-stone-400 hover:text-primary" /></button>
                        <button onClick={() => deleteEvent(ev.id)}><Trash2 className="w-3 h-3 text-stone-400 hover:text-red-500" /></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 일정 등록/수정 모달 */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <h3 className="font-bold text-base">{editingId ? "일정 수정" : "일정 등록"}</h3>
              <button onClick={() => setShowForm(false)} className="text-stone-400 hover:text-stone-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">날짜 *</label>
                <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">제목 *</label>
                <Input placeholder="예: 경기도 수원 전원주택 히노끼욕조 시공" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">시공 위치</label>
                <Input placeholder="예: 경기도 수원시 영통구" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">설명 (선택)</label>
                <Textarea placeholder="시공 내용, 제품 종류 등을 입력하세요." rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">색상</label>
                <div className="flex gap-2">
                  {COLORS.map(c => (
                    <button
                      key={c.key}
                      onClick={() => setForm(f => ({ ...f, color: c.key }))}
                      className={cn("w-8 h-8 rounded-full transition-all", c.cls, form.color === c.key ? "ring-2 ring-offset-2 ring-stone-400 scale-110" : "opacity-70 hover:opacity-100")}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={form.isPublished}
                  onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="isPublished" className="text-sm text-foreground cursor-pointer">홈페이지에 공개</label>
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowForm(false)}>취소</Button>
              <Button className="flex-1" onClick={saveEvent} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingId ? "수정" : "등록"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
