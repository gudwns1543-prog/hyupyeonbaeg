import { useQuery } from "@tanstack/react-query";

const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

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
    staleTime: 0,
    gcTime: 60_000,
    retry: false,
    refetchOnWindowFocus: true,
  });
  return { isAdmin: !!data?.isAdmin };
}
