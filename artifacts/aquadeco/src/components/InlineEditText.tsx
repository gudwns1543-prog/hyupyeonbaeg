import { useState, useRef, useEffect, Fragment, CSSProperties } from "react";
import {
  Pencil, Check, X, Loader2,
  Bold, AlignLeft, AlignCenter, AlignRight, Palette,
} from "lucide-react";
import { useAdminMode } from "@/hooks/useAdminMode";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface TextStyleConfig {
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";
  color?: string;
  fontSize?: string;
}

const FONT_SIZES = [
  { label: "XS", value: "0.75rem" },
  { label: "S", value: "0.875rem" },
  { label: "M", value: "1rem" },
  { label: "L", value: "1.25rem" },
  { label: "XL", value: "1.5rem" },
  { label: "2XL", value: "2rem" },
  { label: "3XL", value: "2.5rem" },
  { label: "4XL", value: "3rem" },
];

const TEXT_COLORS = [
  { label: "기본", value: "" },
  { label: "흰색", value: "#ffffff" },
  { label: "검정", value: "#1a1a1a" },
  { label: "그레이", value: "#6b7280" },
  { label: "그린", value: "#2d5a3d" },
  { label: "앰버", value: "#92611f" },
  { label: "빨강", value: "#dc2626" },
  { label: "파랑", value: "#2563eb" },
];

interface InlineEditTextProps {
  contentKey: string;
  value: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
  className?: string;
  multiline?: boolean;
}

function renderLines(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <Fragment key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ));
}

function StyleToolbar({
  styleConfig,
  onChange,
}: {
  styleConfig: TextStyleConfig;
  onChange: (s: TextStyleConfig) => void;
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div
      className="flex items-center gap-1 flex-wrap bg-stone-800 text-white rounded-lg px-2 py-1.5 text-xs shadow-lg mb-1 w-full"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Font weight */}
      <button
        title="굵게"
        onClick={() =>
          onChange({
            ...styleConfig,
            fontWeight: styleConfig.fontWeight === "bold" ? "normal" : "bold",
          })
        }
        className={cn(
          "p-1 rounded transition-colors",
          styleConfig.fontWeight === "bold"
            ? "bg-white/30"
            : "hover:bg-white/10"
        )}
      >
        <Bold className="w-3.5 h-3.5" />
      </button>

      {/* Alignment */}
      {(["left", "center", "right"] as const).map((align) => {
        const Icon =
          align === "left" ? AlignLeft : align === "center" ? AlignCenter : AlignRight;
        return (
          <button
            key={align}
            title={align === "left" ? "왼쪽" : align === "center" ? "가운데" : "오른쪽"}
            onClick={() => onChange({ ...styleConfig, textAlign: align })}
            className={cn(
              "p-1 rounded transition-colors",
              styleConfig.textAlign === align
                ? "bg-white/30"
                : "hover:bg-white/10"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        );
      })}

      <div className="w-px h-4 bg-white/20" />

      {/* Font size */}
      <select
        value={styleConfig.fontSize ?? ""}
        onChange={(e) =>
          onChange({ ...styleConfig, fontSize: e.target.value || undefined })
        }
        className="bg-transparent border border-white/30 rounded px-1 py-0.5 text-[10px] cursor-pointer hover:border-white/60"
      >
        <option value="">크기</option>
        {FONT_SIZES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <div className="w-px h-4 bg-white/20" />

      {/* Color */}
      <div className="relative">
        <button
          title="텍스트 색상"
          onClick={() => setShowColorPicker((v) => !v)}
          className="p-1 rounded hover:bg-white/10 transition-colors flex items-center gap-1"
        >
          <Palette className="w-3.5 h-3.5" />
          <span
            className="w-3 h-3 rounded-full border border-white/40"
            style={{ backgroundColor: styleConfig.color || "#fff" }}
          />
        </button>
        {showColorPicker && (
          <div className="absolute top-7 left-0 z-50 bg-stone-800 rounded-lg p-2 shadow-xl grid grid-cols-4 gap-1 min-w-[120px]">
            {TEXT_COLORS.map((c) => (
              <button
                key={c.value}
                title={c.label}
                onClick={() => {
                  onChange({ ...styleConfig, color: c.value || undefined });
                  setShowColorPicker(false);
                }}
                className={cn(
                  "w-7 h-7 rounded-md border-2 transition-transform hover:scale-110",
                  styleConfig.color === c.value
                    ? "border-white"
                    : "border-stone-600"
                )}
                style={{
                  backgroundColor: c.value || "#6b7280",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reset */}
      {(styleConfig.fontWeight || styleConfig.textAlign || styleConfig.color || styleConfig.fontSize) && (
        <button
          title="스타일 초기화"
          onClick={() => onChange({})}
          className="p-1 rounded hover:bg-white/10 transition-colors ml-auto text-stone-400 hover:text-white"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

export function InlineEditText({
  contentKey,
  value,
  as: Tag = "span",
  className = "",
  multiline = false,
}: InlineEditTextProps) {
  const { isAdmin } = useAdminMode();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const [styleConfig, setStyleConfig] = useState<TextStyleConfig>({});
  const [styleDirty, setStyleDirty] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => { setEditValue(value); }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.selectionStart = inputRef.current.value.length;
      }
    }
  }, [isEditing]);

  useEffect(() => {
    if (!isAdmin) return;
    const styleKey = `${contentKey}_style`;
    const allContent = queryClient.getQueryData<{ items?: { key: string; value: string }[] }>(
      ["get-site-content"]
    );
    const found = allContent?.items?.find((i) => i.key === styleKey);
    if (found) {
      try { setStyleConfig(JSON.parse(found.value)); } catch {}
    }
  }, [contentKey, isAdmin, queryClient]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const promises: Promise<Response>[] = [];
      if (editValue !== value) {
        promises.push(
          fetch(`${API_BASE}/api/content/${contentKey}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ value: editValue }),
          })
        );
      }
      if (styleDirty) {
        promises.push(
          fetch(`${API_BASE}/api/content/${contentKey}_style`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ value: JSON.stringify(styleConfig) }),
          })
        );
      }
      if (promises.length > 0) {
        await Promise.all(promises);
        queryClient.invalidateQueries({ queryKey: ["site-content"] });
        window.location.reload();
      }
    } catch {
      setEditValue(value);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
    setStyleDirty(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleCancel();
    if (e.key === "Enter" && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  const computedStyle: CSSProperties = {
    fontWeight: styleConfig.fontWeight || undefined,
    textAlign: styleConfig.textAlign || undefined,
    color: styleConfig.color || undefined,
    fontSize: styleConfig.fontSize || undefined,
  };

  if (!isAdmin) {
    return (
      <Tag className={className} style={computedStyle}>
        {renderLines(value)}
      </Tag>
    );
  }

  if (isEditing) {
    return (
      <span className="inline-flex flex-col gap-1 w-full">
        <StyleToolbar
          styleConfig={styleConfig}
          onChange={(s) => { setStyleConfig(s); setStyleDirty(true); }}
        />
        {multiline ? (
          <textarea
            ref={inputRef as React.Ref<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border-2 border-primary rounded px-2 py-1 text-inherit font-inherit bg-white text-stone-900 resize-none min-h-[60px]"
            style={{ fontSize: "inherit", lineHeight: "inherit" }}
            rows={4}
          />
        ) : (
          <input
            ref={inputRef as React.Ref<HTMLInputElement>}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border-2 border-primary rounded px-2 py-1 text-inherit font-inherit bg-white text-stone-900"
            style={{ fontSize: "inherit", lineHeight: "inherit" }}
          />
        )}
        <span className="flex gap-1 items-center">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1 px-2 py-0.5 bg-primary text-white rounded text-xs"
          >
            {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
            저장
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 px-2 py-0.5 bg-stone-200 text-stone-700 rounded text-xs"
          >
            <X className="w-3 h-3" /> 취소
          </button>
          {multiline && (
            <span className="text-[10px] text-stone-400 ml-1">Enter = 줄바꿈 / Esc = 취소</span>
          )}
        </span>
      </span>
    );
  }

  return (
    <Tag
      className={`${className} group/inline relative`}
      onClick={() => setIsEditing(true)}
      style={{ ...computedStyle, cursor: "pointer" }}
      title="클릭하여 수정"
    >
      <span className="group-hover/inline:outline group-hover/inline:outline-1 group-hover/inline:outline-dashed group-hover/inline:outline-primary/50 group-hover/inline:rounded group-hover/inline:bg-primary/5">
        {renderLines(value)}
      </span>
      <span className="inline-flex items-center ml-1.5 opacity-40 group-hover/inline:opacity-100 transition-opacity bg-white text-primary border border-primary/40 rounded px-1.5 py-0.5 text-[10px] gap-0.5 align-middle shadow-sm select-none">
        <Pencil className="w-2.5 h-2.5" />
        수정
      </span>
    </Tag>
  );
}
