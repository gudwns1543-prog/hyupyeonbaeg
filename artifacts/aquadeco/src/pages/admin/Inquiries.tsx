import { useState } from "react";
import { 
  useListInquiries, 
  useUpdateInquiryStatus, 
  getListInquiriesQueryKey,
  getGetInquiryStatsQueryKey
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

type InquiryStatus = "pending" | "reviewed" | "completed";

export default function AdminInquiries() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const updateStatus = useUpdateInquiryStatus();

  // Parse filter for API
  const queryParams = statusFilter === "all" ? {} : { status: statusFilter as any };
  
  const { data: inquiriesData, isLoading } = useListInquiries(
    queryParams,
    { query: { queryKey: getListInquiriesQueryKey(queryParams) } }
  );

  const handleStatusChange = (id: number, newStatus: InquiryStatus) => {
    updateStatus.mutate(
      { id, data: { status: newStatus } },
      {
        onSuccess: () => {
          toast({ title: "상태가 변경되었습니다." });
          // Invalidate lists and stats
          queryClient.invalidateQueries({ queryKey: getListInquiriesQueryKey(queryParams) });
          queryClient.invalidateQueries({ queryKey: getGetInquiryStatsQueryKey() });
          
          if (selectedInquiry) {
            setSelectedInquiry({ ...selectedInquiry, status: newStatus });
          }
        },
        onError: () => {
          toast({ title: "상태 변경 실패", variant: "destructive" });
        }
      }
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none">대기중</Badge>;
      case "reviewed": return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">검토완료</Badge>;
      case "completed": return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 border-none">처리완료</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Client-side search filtering
  const filteredItems = inquiriesData?.items?.filter(item => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerQuery) || 
      item.phone.includes(lowerQuery) ||
      (item.email && item.email.toLowerCase().includes(lowerQuery))
    );
  }) || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>견적 문의 관리</CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="이름, 연락처 검색..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 보기</SelectItem>
                  <SelectItem value="pending">대기중</SelectItem>
                  <SelectItem value="reviewed">검토완료</SelectItem>
                  <SelectItem value="completed">처리완료</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground bg-muted/20 rounded-lg">
              해당하는 문의 내역이 없습니다.
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground uppercase">
                  <tr>
                    <th className="px-4 py-3 font-medium">접수일</th>
                    <th className="px-4 py-3 font-medium">이름/상호</th>
                    <th className="px-4 py-3 font-medium">연락처</th>
                    <th className="px-4 py-3 font-medium">문의유형</th>
                    <th className="px-4 py-3 font-medium">상태</th>
                    <th className="px-4 py-3 font-medium text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredItems.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-muted/50 bg-white transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">
                        {format(new Date(inquiry.createdAt), 'yyyy-MM-dd')}
                      </td>
                      <td className="px-4 py-4 font-medium">{inquiry.name}</td>
                      <td className="px-4 py-4 text-muted-foreground">{inquiry.phone}</td>
                      <td className="px-4 py-4 text-muted-foreground">{inquiry.inquiryType} / {inquiry.spaceType}</td>
                      <td className="px-4 py-4">{getStatusBadge(inquiry.status)}</td>
                      <td className="px-4 py-4 text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedInquiry(inquiry);
                            setIsDialogOpen(true);
                          }}
                        >
                          상세보기
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Inquiry Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-3">
              문의 상세 정보
              {selectedInquiry && getStatusBadge(selectedInquiry.status)}
            </DialogTitle>
            <DialogDescription>
              접수일: {selectedInquiry && format(new Date(selectedInquiry.createdAt), 'yyyy년 MM월 dd일 HH:mm')}
            </DialogDescription>
          </DialogHeader>

          {selectedInquiry && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">고객명/상호</p>
                  <p className="font-medium text-base">{selectedInquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">연락처</p>
                  <p className="font-medium text-base">{selectedInquiry.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">이메일</p>
                  <p className="text-base">{selectedInquiry.email || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">지역</p>
                  <p className="text-base">{selectedInquiry.area || "-"}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 border-b pb-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">문의 유형</p>
                  <p className="font-medium">{selectedInquiry.inquiryType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">공간 유형</p>
                  <p className="font-medium">{selectedInquiry.spaceType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">예상 예산</p>
                  <p className="font-medium">{selectedInquiry.budget || "-"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">상세 문의 내용</p>
                <div className="bg-muted/20 border p-4 rounded-lg min-h-[120px] whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex items-center justify-between sm:justify-between border-t pt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">상태 변경:</span>
              <Select 
                value={selectedInquiry?.status} 
                onValueChange={(val) => handleStatusChange(selectedInquiry.id, val as InquiryStatus)}
                disabled={updateStatus.isPending}
              >
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">대기중</SelectItem>
                  <SelectItem value="reviewed">검토완료</SelectItem>
                  <SelectItem value="completed">처리완료</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>닫기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
