import { useGetSiteContent, getGetSiteContentQueryKey } from "@workspace/api-client-react";

export function useSiteContent() {
  const { data: content } = useGetSiteContent({ query: { queryKey: getGetSiteContentQueryKey() } });

  const gc = (key: string, fallback: string): string => {
    if (!content?.items) return fallback;
    const item = content.items.find((i: { key: string; value: string }) => i.key === key);
    return item ? item.value : fallback;
  };

  return { gc };
}
