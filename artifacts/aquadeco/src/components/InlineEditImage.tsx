import { useState } from "react";
import { Camera, Check, X, Loader2 } from "lucide-react";
import { useAdminMode } from "@/hooks/useAdminMode";
import { ImageUploadInput } from "@/components/ui/ImageUploadInput";
import { useQueryClient } from "@tanstack/react-query";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface InlineEditImageProps {
  contentKey: string;
  src: string;
  alt?: string;
  containerClassName?: string;
  imgClassName?: string;
}

export function InlineEditImage({
  contentKey,
  src,
  alt = "",
  containerClassName = "",
  imgClassName = "",
}: InlineEditImageProps) {
  const { isAdmin } = useAdminMode();
  const [isEditing, setIsEditing] = useState(false);
  const [newSrc, setNewSrc] = useState(src);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const handleSave = async () => {
    if (!newSrc || newSrc === src) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/content/${contentKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ value: newSrc }),
      });
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["site-content"] });
        window.location.reload();
      }
    } catch {
      setNewSrc(src);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  return (
    <>
      <div className={`${containerClassName} relative group/imgedit`}>
        <img src={src} alt={alt} className={imgClassName} />
        {isAdmin && (
          <button
            type="button"
            onClick={() => { setNewSrc(src); setIsEditing(true); }}
            className="absolute inset-0 flex items-end justify-center pb-3 bg-black/0 group-hover/imgedit:bg-black/35 transition-all duration-200 z-10"
            title="이미지 변경"
          >
            <span className="opacity-0 group-hover/imgedit:opacity-100 transition-opacity flex items-center gap-1.5 bg-white text-stone-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg select-none">
              <Camera className="w-3.5 h-3.5" />
              이미지 변경
            </span>
          </button>
        )}
      </div>

      {isAdmin && isEditing && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4"
          onClick={() => !isSaving && setIsEditing(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base">이미지 변경</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-3 rounded-xl overflow-hidden border border-stone-200 h-32">
              <img src={src} alt="현재 이미지" className="w-full h-full object-cover" />
            </div>
            <p className="text-xs text-stone-400 mb-3">새 이미지를 업로드하거나 URL을 입력하세요</p>

            <ImageUploadInput value={newSrc} onChange={setNewSrc} />

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                disabled={isSaving || !newSrc}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                저장
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-lg text-sm bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
