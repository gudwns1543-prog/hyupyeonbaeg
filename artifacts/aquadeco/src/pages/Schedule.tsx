import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type ScheduleEvent = {
  id: number;
  title: string;
  description?: string | null;
  date: string;
  location?: string | null;
  color: string;
};

const COLOR_MAP: Record<string, string> = {
  green:  "bg-primary text-white",
  amber:  "bg-amber-500 text-white",
  blue:   "bg-blue-500 text-white",
  red:    "bg-red-500 text-white",
  purple: "bg-purple-500 text-white",
};

const DOT_MAP: Record<string, string> = {
  green:  "bg-primary",
  amber:  "bg-amber-500",
  blue:   "bg-blue-500",
  red:    "bg-red-500",
  purple: "bg-purple-500",
};

export default function Schedule() {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [today] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

  useEffect(() => {
    fetch(`${base}/api/schedule`)
      .then(r => r.json())
      .then(data => { setEvents(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [base]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const toDateStr = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const eventsOnDate = (dateStr: string) =>
    events.filter(e => e.date?.slice(0, 10) === dateStr);

  const selectedEvents = selectedDate ? eventsOnDate(selectedDate) : [];

  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const monthEvents = events.filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="min-h-screen pt-[104px]">
      <div className="bg-stone-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">시공일정</h1>
          <p className="text-stone-300">휴편백의 현장 시공 일정 안내</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 캘린더 */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
              {/* 헤더 */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
                <button
                  onClick={prevMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-stone-600" />
                </button>
                <h2 className="text-lg font-bold text-foreground">
                  {year}년 {month + 1}월
                </h2>
                <button
                  onClick={nextMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-stone-600" />
                </button>
              </div>

              {/* 요일 헤더 */}
              <div className="grid grid-cols-7 border-b border-stone-50">
                {DAYS.map((d, i) => (
                  <div
                    key={d}
                    className={cn(
                      "py-3 text-center text-xs font-semibold",
                      i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-muted-foreground"
                    )}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* 날짜 그리드 */}
              <div className="grid grid-cols-7">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="min-h-[72px] border-b border-r border-stone-50" />
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
                      className={cn(
                        "min-h-[72px] border-b border-r border-stone-50 p-1.5 cursor-pointer transition-colors",
                        isSelected ? "bg-primary/5" : "hover:bg-stone-50",
                      )}
                    >
                      <div className="flex justify-end mb-1">
                        <span
                          className={cn(
                            "w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium",
                            isToday ? "bg-primary text-white" : "",
                            col === 0 ? "text-red-400" : col === 6 ? "text-blue-400" : "text-foreground",
                            isToday ? "text-white" : ""
                          )}
                        >
                          {day}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map(ev => (
                          <div
                            key={ev.id}
                            className={cn(
                              "text-[10px] px-1.5 py-0.5 rounded truncate",
                              COLOR_MAP[ev.color] ?? COLOR_MAP.green
                            )}
                          >
                            {ev.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-[10px] text-muted-foreground px-1">+{dayEvents.length - 2}건</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 사이드: 선택 날짜 일정 + 이번달 일정 목록 */}
          <div className="space-y-5">
            {/* 선택 날짜 일정 */}
            {selectedDate && (
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
                <h3 className="font-bold text-sm mb-4 text-foreground flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  {new Date(selectedDate + "T12:00:00").toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "short" })}
                </h3>
                {selectedEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">이 날짜에는 일정이 없습니다.</p>
                ) : (
                  <div className="space-y-3">
                    {selectedEvents.map(ev => (
                      <div key={ev.id} className="border border-stone-100 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", DOT_MAP[ev.color] ?? DOT_MAP.green)} />
                          <span className="font-semibold text-sm text-foreground">{ev.title}</span>
                        </div>
                        {ev.location && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                            <MapPin className="w-3 h-3" />
                            {ev.location}
                          </div>
                        )}
                        {ev.description && (
                          <p className="text-xs text-muted-foreground leading-relaxed">{ev.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 이번달 일정 목록 */}
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
              <h3 className="font-bold text-sm mb-4 text-foreground">{month + 1}월 시공 일정</h3>
              {loading ? (
                <p className="text-sm text-muted-foreground text-center py-4">불러오는 중...</p>
              ) : monthEvents.length === 0 ? (
                <div className="text-center py-6">
                  <CalendarDays className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">이번 달 등록된 일정이 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {monthEvents
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .map(ev => {
                      const d = new Date(ev.date + "T12:00:00");
                      return (
                        <div
                          key={ev.id}
                          onClick={() => setSelectedDate(ev.date.slice(0, 10))}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-stone-50 cursor-pointer transition-colors"
                        >
                          <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", DOT_MAP[ev.color] ?? DOT_MAP.green)} />
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground mb-0.5">
                              {d.getMonth() + 1}월 {d.getDate()}일 ({DAYS[d.getDay()]})
                            </p>
                            <p className="text-sm font-medium text-foreground truncate">{ev.title}</p>
                            {ev.location && (
                              <p className="text-xs text-muted-foreground truncate">{ev.location}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* 납기 안내 */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5">
              <h3 className="font-semibold text-sm mb-3 text-foreground">제품별 평균 납기</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["반신욕조 (양산형)", "약 2~3주"],
                  ["전신욕조 (양산형)", "약 2~3주"],
                  ["유절/무절 욕조", "약 4~5주"],
                  ["주문제작형", "약 4~6주"],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between py-1.5 border-b border-primary/10 last:border-0">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-semibold text-foreground">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
