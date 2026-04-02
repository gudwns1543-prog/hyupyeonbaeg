import { useState, CSSProperties } from "react";
import {
  Eye, EyeOff, ChevronUp, ChevronDown, Palette,
  Trash2, PlusCircle, X, Check, Loader2,
} from "lucide-react";
import { useAdminMode } from "@/hooks/useAdminMode";
import { usePageLayout, SectionConfig } from "@/context/PageLayoutContext";
import { ImageUploadInput } from "@/components/ui/ImageUploadInput";
import { cn } from "@/lib/utils";

const PRESET_COLORS = [
  { label: "흰색", value: "#ffffff" },
  { label: "크림", value: "#faf8f4" },
  { label: "연 베이지", value: "#f5f0eb" },
  { label: "연 돌색", value: "#f5f5f0" },
  { label: "연 그린", value: "#eef5f0" },
  { label: "연 앰버", value: "#fdf5e8" },
  { label: "진한 그린", value: "#2d5a3d" },
  { label: "앰버", value: "#92611f" },
  { label: "어두운 배경", value: "#1a1a1a" },
  { label: "차콜", value: "#374151" },
  { label: "연 회색", value: "#f3f4f6" },
  { label: "회색", value: "#6b7280" },
];

function BgEditor({
  sectionKey,
  config,
  onClose,
}: {
  sectionKey: string;
  config: SectionConfig;
  onClose: () => void;
}) {
  const { updateBackground } = usePageLayout();
  const [bgType, setBgType] = useState<"none" | "color" | "image">(config.bgType);
  const [bgColor, setBgColor] = useState(config.bgColor || "#ffffff");
  const [bgImage, setBgImage] = useState(config.bgImage || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await updateBackground(sectionKey, { bgType, bgColor, bgImage });
    setIsSaving(false);
    onClose();
    window.location.reload();
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-base">섹션 배경 편집</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 mb-5">
          {(["none", "color", "image"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setBgType(opt)}
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-medium border transition-colors",
                bgType === opt
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-stone-600 border-stone-300 hover:border-primary hover:text-primary"
              )}
            >
              {opt === "none" ? "없음" : opt === "color" ? "배경색" : "이미지"}
            </button>
          ))}
        </div>

        {bgType === "color" && (
          <div>
            <p className="text-xs text-stone-500 mb-3 font-medium">배경색 선택</p>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setBgColor(c.value)}
                  title={c.label}
                  className={cn(
                    "w-full h-10 rounded-lg border-2 transition-transform hover:scale-110",
                    bgColor === c.value
                      ? "border-primary scale-105 shadow-md"
                      : "border-stone-200"
                  )}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-stone-200 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1 border border-stone-300 rounded-lg px-3 py-2 text-sm font-mono"
                placeholder="#ffffff"
              />
            </div>
          </div>
        )}

        {bgType === "image" && (
          <div>
            <p className="text-xs text-stone-500 mb-3 font-medium">배경 이미지</p>
            <ImageUploadInput value={bgImage} onChange={setBgImage} />
            {bgImage && (
              <label className="flex items-center gap-2 mt-3 text-xs text-stone-500">
                <input type="checkbox" className="rounded" />
                어두운 오버레이 추가
              </label>
            )}
          </div>
        )}

        {bgType === "none" && (
          <p className="text-sm text-stone-500 text-center py-4">
            섹션 배경 없음 (기본 설정)
          </p>
        )}

        <div className="flex gap-2 mt-5">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            적용
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg text-sm bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

function AddSectionPanel({
  onClose,
}: {
  onClose: () => void;
}) {
  const { layout, registry, addSection } = usePageLayout();
  const available = registry.filter((r) => !layout.find((l) => l.key === r.key));

  const handleAdd = (key: string) => {
    addSection(key);
    onClose();
    window.location.reload();
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base">섹션 추가</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {available.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-stone-400" />
            </div>
            <p className="text-sm text-stone-500">모든 섹션이 이미 추가되어 있습니다</p>
            <p className="text-xs text-stone-400 mt-1">
              숨겨진 섹션은 눈 아이콘으로 표시/숨김 전환하세요
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-stone-400 mb-3">
              레이아웃에서 제거된 섹션을 다시 추가할 수 있습니다
            </p>
            {available.map((s) => (
              <button
                key={s.key}
                onClick={() => handleAdd(s.key)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-200 hover:border-primary hover:bg-primary/5 transition-colors text-left group"
              >
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <PlusCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-medium text-stone-700">{s.label}</span>
                  <p className="text-xs text-stone-400">클릭하여 추가</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface SectionWrapperProps {
  sectionKey: string;
  children: React.ReactNode;
  overrideBg?: boolean;
  noReorder?: boolean;
  noAdd?: boolean;
  noRemove?: boolean;
}

export function SectionWrapper({
  sectionKey,
  children,
  overrideBg = true,
  noReorder = false,
  noAdd = false,
  noRemove = false,
}: SectionWrapperProps) {
  const { isAdmin } = useAdminMode();
  const { layout, registry, toggleVisibility, moveSection, removeSection } =
    usePageLayout();
  const [showBgEditor, setShowBgEditor] = useState(false);
  const [showAddPanel, setShowAddPanel] = useState(false);

  const config = layout.find((s) => s.key === sectionKey);
  const sectionInfo = registry.find((r) => r.key === sectionKey);
  const idx = layout.findIndex((s) => s.key === sectionKey);
  const isFirst = idx === 0;
  const isLast = idx === layout.length - 1;

  if (!config) return null;

  const bgStyle: CSSProperties = {};
  if (overrideBg) {
    if (config.bgType === "color" && config.bgColor) {
      bgStyle.backgroundColor = config.bgColor;
    } else if (config.bgType === "image" && config.bgImage) {
      bgStyle.backgroundImage = `url(${config.bgImage})`;
      bgStyle.backgroundSize = "cover";
      bgStyle.backgroundPosition = "center";
    }
  }

  const hasBg = config.bgType !== "none" && (config.bgColor || config.bgImage);

  if (!isAdmin) {
    if (!config.visible) return null;
    return (
      <div style={hasBg ? bgStyle : undefined}>
        {children}
      </div>
    );
  }

  return (
    <div className="relative group/section" style={hasBg ? bgStyle : undefined}>
      {/* Admin top bar - appears on hover */}
      <div className="absolute top-0 left-0 right-0 z-[60] opacity-0 group-hover/section:opacity-100 transition-opacity pointer-events-none group-hover/section:pointer-events-auto">
        <div className="flex items-center gap-0.5 bg-primary/95 backdrop-blur-sm text-white px-3 py-1.5 shadow-lg text-xs">
          <span className="font-semibold flex-1 truncate pr-2">
            📐 {sectionInfo?.label ?? sectionKey}
          </span>

          {/* Visibility */}
          <button
            onClick={() => toggleVisibility(sectionKey)}
            title={config.visible ? "섹션 숨기기" : "섹션 표시"}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/20 transition-colors"
          >
            {config.visible ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">표시중</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-yellow-300" />
                <span className="hidden sm:inline text-yellow-300">숨김</span>
              </>
            )}
          </button>

          {!noReorder && (
            <>
              <div className="w-px h-4 bg-white/20" />
              {/* Move */}
              <button
                onClick={() => moveSection(sectionKey, "up")}
                disabled={isFirst}
                title="위로 이동"
                className="p-1 rounded hover:bg-white/20 transition-colors disabled:opacity-30"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => moveSection(sectionKey, "down")}
                disabled={isLast}
                title="아래로 이동"
                className="p-1 rounded hover:bg-white/20 transition-colors disabled:opacity-30"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </>
          )}

          <div className="w-px h-4 bg-white/20" />

          {/* Background */}
          <button
            onClick={() => setShowBgEditor(true)}
            title="배경 편집"
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded hover:bg-white/20 transition-colors",
              hasBg && "text-yellow-300"
            )}
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">배경</span>
          </button>

          {!noAdd && (
            <>
              <div className="w-px h-4 bg-white/20" />
              {/* Add section */}
              <button
                onClick={() => setShowAddPanel(true)}
                title="섹션 추가"
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/20 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">추가</span>
              </button>
            </>
          )}

          {!noRemove && (
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `"${sectionInfo?.label ?? sectionKey}" 섹션을 레이아웃에서 제거하시겠습니까?\n나중에 다시 추가할 수 있습니다.`
                  )
                ) {
                  removeSection(sectionKey);
                  window.location.reload();
                }
              }}
              title="섹션 제거"
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-red-500/40 transition-colors text-red-300 hover:text-red-100 ml-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Hidden overlay */}
      {!config.visible && (
        <div className="absolute inset-0 bg-stone-900/50 z-[50] flex items-center justify-center pointer-events-none">
          <div className="bg-stone-800/90 text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-xl">
            <EyeOff className="w-4 h-4 text-yellow-300" />
            숨겨진 섹션 (방문자에게 보이지 않음)
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn(isAdmin && "group-hover/section:pt-8 transition-[padding]")}>
        {children}
      </div>

      {showBgEditor && (
        <BgEditor
          sectionKey={sectionKey}
          config={config}
          onClose={() => setShowBgEditor(false)}
        />
      )}
      {showAddPanel && (
        <AddSectionPanel onClose={() => setShowAddPanel(false)} />
      )}
    </div>
  );
}
