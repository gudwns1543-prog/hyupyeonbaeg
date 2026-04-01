import { useState } from "react";
import { 
  useGetSiteContent, 
  useUpdateContentItem, 
  getGetSiteContentQueryKey 
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Edit2, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

// Inner component for individual editable items
function EditableContentItem({ 
  itemKey, 
  value, 
  type, 
  description,
  onSave 
}: { 
  itemKey: string; 
  value: string; 
  type: string; 
  description: string;
  onSave: (key: string, value: string) => Promise<void>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (editValue === value) {
      setIsEditing(false);
      return;
    }
    
    setIsSaving(true);
    await onSave(itemKey, editValue);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <div className="p-4 border rounded-lg hover:border-primary/50 transition-colors bg-card group relative">
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
            {itemKey}
          </span>
          <p className="text-sm font-medium mt-2">{description}</p>
        </div>
        
        {!isEditing && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 px-2"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="w-4 h-4 mr-1" />
            수정
          </Button>
        )}
      </div>

      <div className="mt-3">
        {isEditing ? (
          <div className="space-y-3">
            {type === "textarea" || type === "html" ? (
              <Textarea 
                value={editValue} 
                onChange={(e) => setEditValue(e.target.value)}
                className="min-h-[100px]"
                autoFocus
              />
            ) : (
              <Input 
                value={editValue} 
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
              />
            )}
            
            <div className="flex items-center gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isSaving}>
                <X className="w-4 h-4 mr-1" /> 취소
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Check className="w-4 h-4 mr-1" />}
                저장
              </Button>
            </div>
          </div>
        ) : (
          <div 
            className="bg-muted/30 p-3 rounded text-sm text-foreground/80 cursor-pointer min-h-[40px] whitespace-pre-wrap border border-transparent hover:border-border"
            onClick={() => setIsEditing(true)}
            title="클릭하여 수정"
          >
            {value}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminContentEditor() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: content, isLoading } = useGetSiteContent({ 
    query: { queryKey: getGetSiteContentQueryKey() } 
  });
  const updateContent = useUpdateContentItem();

  const handleSaveItem = async (key: string, value: string) => {
    try {
      await updateContent.mutateAsync({ key, data: { value } });
      toast({ title: "저장되었습니다." });
      queryClient.invalidateQueries({ queryKey: getGetSiteContentQueryKey() });
    } catch (error) {
      toast({ title: "저장에 실패했습니다.", variant: "destructive" });
      throw error;
    }
  };

  const getContentValue = (key: string, fallback: string) => {
    if (!content?.items) return fallback;
    const item = content.items.find(i => i.key === key);
    return item ? item.value : fallback;
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">웹사이트 콘텐츠 관리</h1>
        <p className="text-muted-foreground">홈페이지에 노출되는 주요 텍스트를 직접 수정할 수 있습니다.</p>
      </div>

      <Card>
        <CardHeader className="bg-muted/30 border-b">
          <CardTitle className="text-lg">메인 페이지 히어로 섹션</CardTitle>
          <CardDescription>홈페이지 접속 시 가장 먼저 보이는 상단 영역입니다.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <EditableContentItem 
            itemKey="hero_title" 
            description="메인 타이틀 (큰 글씨)" 
            value={getContentValue("hero_title", "공간에 자연의 숨결을 불어넣다")}
            type="text"
            onSave={handleSaveItem}
          />
          <EditableContentItem 
            itemKey="hero_subtitle" 
            description="서브 텍스트 (타이틀 아래 설명)" 
            value={getContentValue("hero_subtitle", "최고급 맞춤형 수족관 설계 및 설치부터 전문적인 유지보수까지. 아쿠아데코가 당신의 공간을 예술로 만듭니다.")}
            type="textarea"
            onSave={handleSaveItem}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-muted/30 border-b">
          <CardTitle className="text-lg">연락처 설정</CardTitle>
          <CardDescription>플로팅 버튼 및 푸터에 사용되는 외부 링크 설정입니다.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <EditableContentItem 
            itemKey="contact_naver_talk" 
            description="네이버 톡톡 링크 URL" 
            value={getContentValue("contact_naver_talk", "https://talk.naver.com/")}
            type="text"
            onSave={handleSaveItem}
          />
          <EditableContentItem 
            itemKey="contact_kakao_channel" 
            description="카카오톡 채널 링크 URL" 
            value={getContentValue("contact_kakao_channel", "https://pf.kakao.com/")}
            type="text"
            onSave={handleSaveItem}
          />
        </CardContent>
      </Card>
      
      <div className="text-sm text-muted-foreground text-center py-4">
        * 더 많은 콘텐츠 항목 관리는 향후 업데이트에서 지원될 예정입니다.
      </div>
    </div>
  );
}
