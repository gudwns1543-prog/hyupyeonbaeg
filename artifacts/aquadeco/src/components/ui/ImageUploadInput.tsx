import { useState, useRef } from "react";
import { Upload, ImageIcon, Link2, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type Props = {
  value: string;
  onChange: (url: string) => void;
  className?: string;
};

export function ImageUploadInput({ value, onChange, className }: Props) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewError, setPreviewError] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    setUploading(true);
    setUploadError("");

    try {
      const res = await fetch(`${BASE}/api/storage/uploads/request-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type }),
      });

      if (!res.ok) throw new Error("업로드 URL 요청 실패");
      const { uploadURL, objectPath } = await res.json();

      const putRes = await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!putRes.ok) throw new Error("파일 업로드 실패");

      const serveUrl = `${BASE}/api/storage${objectPath}`;
      onChange(serveUrl);
      setPreviewError(false);
    } catch (e: any) {
      setUploadError(e.message ?? "업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
            mode === "upload"
              ? "bg-primary text-white border-primary"
              : "bg-white text-stone-600 border-stone-300 hover:border-primary hover:text-primary"
          )}
        >
          <Upload className="w-3.5 h-3.5" /> PC에서 업로드
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
            mode === "url"
              ? "bg-primary text-white border-primary"
              : "bg-white text-stone-600 border-stone-300 hover:border-primary hover:text-primary"
          )}
        >
          <Link2 className="w-3.5 h-3.5" /> URL 직접 입력
        </button>
      </div>

      {/* Upload zone */}
      {mode === "upload" && (
        <div
          onClick={() => !uploading && fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors select-none",
            dragOver ? "border-primary bg-primary/5" : "border-stone-300 hover:border-primary hover:bg-stone-50",
            uploading && "pointer-events-none opacity-60"
          )}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />
          {uploading ? (
            <>
              <Loader2 className="w-7 h-7 text-primary animate-spin" />
              <p className="text-sm text-stone-500">업로드 중...</p>
            </>
          ) : (
            <>
              <Upload className="w-7 h-7 text-stone-400" />
              <p className="text-sm text-stone-600 font-medium">클릭하거나 이미지를 여기에 드래그하세요</p>
              <p className="text-xs text-stone-400">JPG, PNG, WEBP · 최대 10MB</p>
            </>
          )}
        </div>
      )}

      {/* URL input */}
      {mode === "url" && (
        <input
          type="url"
          value={value}
          onChange={(e) => { onChange(e.target.value); setPreviewError(false); }}
          placeholder="https://..."
          className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      )}

      {/* Error */}
      {uploadError && (
        <p className="text-xs text-red-500">{uploadError}</p>
      )}

      {/* Preview */}
      {value && (
        <div className="relative rounded-xl overflow-hidden border bg-stone-50 h-40 flex items-center justify-center group">
          {previewError ? (
            <div className="flex flex-col items-center text-stone-400 gap-1">
              <ImageIcon className="w-8 h-8" />
              <span className="text-xs">이미지를 불러올 수 없습니다</span>
            </div>
          ) : (
            <>
              <img
                src={value}
                alt="미리보기"
                className="h-full w-full object-cover"
                onError={() => setPreviewError(true)}
              />
              <button
                type="button"
                onClick={() => { onChange(""); setPreviewError(false); }}
                className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
