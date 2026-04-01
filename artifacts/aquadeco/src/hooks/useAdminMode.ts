import { useQuery } from "@tanstack/react-query";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function useAdminMode() {
  const { data } = useQuery({
    queryKey: ["admin-me"],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, { credentials: "include" });
        if (!res.ok) return { isAdmin: false };
        return await res.json();
      } catch {
        return { isAdmin: false };
      }
    },
    staleTime: 30_000,
    retry: false,
  });
  return { isAdmin: !!data?.isAdmin };
}
