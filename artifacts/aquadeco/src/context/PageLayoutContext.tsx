import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export interface SectionConfig {
  key: string;
  visible: boolean;
  bgType: "none" | "color" | "image";
  bgColor: string;
  bgImage: string;
}

export interface SectionRegistryItem {
  key: string;
  label: string;
  component: React.ComponentType;
}

interface PageLayoutContextValue {
  layout: SectionConfig[];
  isLoading: boolean;
  pageKey: string;
  registry: SectionRegistryItem[];
  moveSection: (key: string, direction: "up" | "down") => void;
  reorderSection: (fromKey: string, toKey: string) => void;
  toggleVisibility: (key: string) => void;
  updateBackground: (
    key: string,
    bg: Partial<Pick<SectionConfig, "bgType" | "bgColor" | "bgImage">>
  ) => void;
  addSection: (key: string) => void;
  removeSection: (key: string) => void;
}

const PageLayoutContext = createContext<PageLayoutContextValue | null>(null);

export function PageLayoutProvider({
  pageKey,
  defaultKeys,
  registry,
  children,
}: {
  pageKey: string;
  defaultKeys: string[];
  registry: SectionRegistryItem[];
  children: ReactNode;
}) {
  const [layout, setLayout] = useState<SectionConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const contentKey = `page_layout_${pageKey}`;

  useEffect(() => {
    const defaultLayout = defaultKeys.map((key) => ({
      key,
      visible: true,
      bgType: "none" as const,
      bgColor: "",
      bgImage: "",
    }));

    fetch(`${API_BASE}/api/content`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        const item = data.items?.find((i: { key: string }) => i.key === contentKey);
        if (item) {
          const parsed: SectionConfig[] = JSON.parse(item.value);
          const merged: SectionConfig[] = defaultKeys.map((key) => {
            const found = parsed.find((s) => s.key === key);
            return found ?? { key, visible: true, bgType: "none", bgColor: "", bgImage: "" };
          });
          parsed.forEach((s) => {
            if (!merged.find((m) => m.key === s.key)) merged.push(s);
          });
          setLayout(merged);
        } else {
          setLayout(defaultLayout);
        }
      })
      .catch(() => setLayout(defaultLayout))
      .finally(() => setIsLoading(false));
  }, [contentKey]);

  const saveLayout = useCallback(
    async (newLayout: SectionConfig[]) => {
      setLayout(newLayout);
      try {
        await fetch(`${API_BASE}/api/content/${contentKey}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ value: JSON.stringify(newLayout) }),
        });
        queryClient.invalidateQueries({ queryKey: ["site-content"] });
      } catch {
      }
    },
    [contentKey, queryClient]
  );

  const moveSection = useCallback(
    (key: string, direction: "up" | "down") => {
      setLayout((prev) => {
        const idx = prev.findIndex((s) => s.key === key);
        if (idx < 0) return prev;
        const targetIdx = direction === "up" ? idx - 1 : idx + 1;
        if (targetIdx < 0 || targetIdx >= prev.length) return prev;
        const next = [...prev];
        [next[idx], next[targetIdx]] = [next[targetIdx], next[idx]];
        saveLayout(next);
        return next;
      });
    },
    [saveLayout]
  );

  const reorderSection = useCallback(
    (fromKey: string, toKey: string) => {
      setLayout((prev) => {
        const fromIdx = prev.findIndex((s) => s.key === fromKey);
        const toIdx = prev.findIndex((s) => s.key === toKey);
        if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return prev;
        const next = [...prev];
        const [moved] = next.splice(fromIdx, 1);
        next.splice(toIdx, 0, moved);
        saveLayout(next);
        return next;
      });
    },
    [saveLayout]
  );

  const toggleVisibility = useCallback(
    (key: string) => {
      setLayout((prev) => {
        const next = prev.map((s) =>
          s.key === key ? { ...s, visible: !s.visible } : s
        );
        saveLayout(next);
        return next;
      });
    },
    [saveLayout]
  );

  const updateBackground = useCallback(
    (
      key: string,
      bg: Partial<Pick<SectionConfig, "bgType" | "bgColor" | "bgImage">>
    ) => {
      setLayout((prev) => {
        const next = prev.map((s) => (s.key === key ? { ...s, ...bg } : s));
        saveLayout(next);
        return next;
      });
    },
    [saveLayout]
  );

  const addSection = useCallback(
    (key: string) => {
      setLayout((prev) => {
        if (prev.find((s) => s.key === key)) return prev;
        const next = [
          ...prev,
          { key, visible: true, bgType: "none" as const, bgColor: "", bgImage: "" },
        ];
        saveLayout(next);
        return next;
      });
    },
    [saveLayout]
  );

  const removeSection = useCallback(
    (key: string) => {
      setLayout((prev) => {
        const next = prev.filter((s) => s.key !== key);
        saveLayout(next);
        return next;
      });
    },
    [saveLayout]
  );

  return (
    <PageLayoutContext.Provider
      value={{
        layout,
        isLoading,
        pageKey,
        registry,
        moveSection,
        reorderSection,
        toggleVisibility,
        updateBackground,
        addSection,
        removeSection,
      }}
    >
      {children}
    </PageLayoutContext.Provider>
  );
}

export function usePageLayout() {
  const ctx = useContext(PageLayoutContext);
  if (!ctx) throw new Error("usePageLayout must be used within PageLayoutProvider");
  return ctx;
}
