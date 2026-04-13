import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";

export function useAdminMode() {
  const { data } = useQuery({
    queryKey: ["admin-me"],
    queryFn: async () => {
      try {
        const res = await customFetch<{ isAdmin: boolean }>("/api/auth/me", {
          credentials: "include",
        });
        return res;
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
