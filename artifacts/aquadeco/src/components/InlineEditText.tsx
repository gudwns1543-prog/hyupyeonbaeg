import { useState, useRef, useEffect } from "react";
import { Pencil, Check, X, Loader2 } from "lucide-react";
import { useAdminMode } from "@/hooks/useAdminMode";
import { useQueryClient } from "@tanstack/react-query";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface InlineEditTextProps {
  contentKey: string;
  value: string;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
  className?: string;
  multiline?: boolean;
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
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.selectionStart = inputRef.current.value.length;
      }
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (editValue === value) { setIsEditing(false); return; }
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/content/${contentKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ value: editValue }),
      });
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["site-content"] });
        queryClient.invalidateQueries({ queryKey: ["admin-me"] });
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
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleCancel();
    if (e.key === "Enter" && !multiline && !e.shiftKey) { e.preventDefault(); handleSave(); }
  };

  if (!isAdmin) {
    return <Tag className={className}>{value}</Tag>;
  }

  if (isEditing) {
    return (
      <span className="inline-flex flex-col gap-1 w-full">
        {multiline ? (
          <textarea
            ref={inputRef as React.Ref<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border-2 border-primary rounded px-2 py-1 text-inherit font-inherit bg-white text-stone-900 resize-none min-h-[60px]"
            style={{ fontSize: "inherit", lineHeight: "inherit" }}
            rows={3}
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
        <span className="flex gap-1">
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
        </span>
      </span>
    );
  }

  return (
    <Tag
      className={`${className} group/inline relative inline`}
      title="클릭하여 수정"
    >
      {value}
      <button
        onClick={() => setIsEditing(true)}
        className="inline-flex items-center ml-1.5 opacity-0 group-hover/inline:opacity-100 transition-opacity bg-primary/90 text-white rounded px-1.5 py-0.5 text-[10px] gap-0.5 align-middle"
        title={`"${contentKey}" 수정`}
      >
        <Pencil className="w-2.5 h-2.5" />
        수정
      </button>
    </Tag>
  );
}
