import { Pencil, LogOut, Settings } from "lucide-react";
import { useAdminMode } from "@/hooks/useAdminMode";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function AdminEditBanner() {
  const { isAdmin } = useAdminMode();
  const queryClient = useQueryClient();

  if (!isAdmin) return null;

  const handleLogout = async () => {
    await fetch(`${API_BASE}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    queryClient.clear();
    window.location.href = "/";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] bg-amber-500 text-white text-xs flex items-center justify-between px-4 py-2 shadow-[0_-2px_8px_rgba(0,0,0,0.15)]">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="font-bold">관리자 편집 모드</span>
        <span className="opacity-80 hidden sm:inline">— 텍스트를 클릭하면 바로 수정 가능합니다</span>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <button className="flex items-center gap-1 font-medium hover:underline">
            <Settings className="w-3 h-3" />
            관리자 패널
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 font-medium hover:underline"
        >
          <LogOut className="w-3 h-3" />
          로그아웃
        </button>
      </div>
    </div>
  );
}
