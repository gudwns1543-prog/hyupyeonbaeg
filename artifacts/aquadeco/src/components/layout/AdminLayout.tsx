import { ReactNode, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useGetAdminMe, getGetAdminMeQueryKey, useAdminLogout } from "@workspace/api-client-react";
import { LayoutDashboard, ListTodo, FileText, LogOut, Home, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

const adminLinks = [
  { href: "/admin", label: "대시보드", icon: LayoutDashboard },
  { href: "/admin/inquiries", label: "문의 관리", icon: ListTodo },
  { href: "/admin/schedule", label: "시공일정 관리", icon: CalendarDays },
  { href: "/admin/content", label: "콘텐츠 관리", icon: FileText },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { data: adminSession, isLoading } = useGetAdminMe({ query: { queryKey: getGetAdminMeQueryKey() } });
  const logout = useAdminLogout();

  useEffect(() => {
    if (!isLoading && !adminSession?.isAdmin) {
      setLocation("/admin/login");
    }
  }, [adminSession, isLoading, setLocation]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!adminSession?.isAdmin) {
    return null;
  }

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(getGetAdminMeQueryKey(), null);
        setLocation("/");
      }
    });
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-primary-foreground/10">
          <h2 className="text-xl font-bold tracking-tight">AquaDeco 관리자</h2>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <span className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md transition-colors cursor-pointer font-medium",
                  isActive ? "bg-primary-foreground/10 text-white" : "text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-white"
                )}>
                  <Icon className="w-5 h-5" />
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary-foreground/10 flex flex-col gap-2">
          <Link href="/">
            <span className="flex items-center gap-3 px-4 py-3 rounded-md text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-white transition-colors cursor-pointer">
              <Home className="w-5 h-5" />
              사이트 홈으로
            </span>
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-md text-red-400 hover:bg-red-400/10 transition-colors w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <header className="bg-white border-b border-border px-8 py-5 shadow-sm">
          <h1 className="text-2xl font-semibold text-foreground">
            {adminLinks.find(l => l.href === location)?.label || "관리자 대시보드"}
          </h1>
        </header>
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
