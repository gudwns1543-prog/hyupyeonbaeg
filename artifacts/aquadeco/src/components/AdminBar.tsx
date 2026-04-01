import { Link, useLocation } from "wouter";
import { useGetAdminMe, useAdminLogout, getGetAdminMeQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminBar() {
  const { data: adminSession } = useGetAdminMe({ query: { queryKey: getGetAdminMeQueryKey() } });
  const logout = useAdminLogout();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  if (!adminSession?.isAdmin) return null;

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(getGetAdminMeQueryKey(), null);
        setLocation("/");
      }
    });
  };

  return (
    <div className="bg-primary text-primary-foreground text-xs py-2 px-4 flex justify-between items-center z-50 relative">
      <div className="flex items-center gap-2 font-medium">
        <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
        관리자 모드 (Admin Mode)
      </div>
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <span className="flex items-center gap-1 hover:text-secondary transition-colors cursor-pointer">
            <LayoutDashboard className="h-3 w-3" />
            대시보드 (Dashboard)
          </span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-1 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-3 w-3" />
          로그아웃 (Logout)
        </button>
      </div>
    </div>
  );
}
