import { useGetInquiryStats, useListInquiries, getGetInquiryStatsQueryKey, getListInquiriesQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Users, FileText, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useGetInquiryStats({ 
    query: { queryKey: getGetInquiryStatsQueryKey() } 
  });
  
  const { data: recentInquiries, isLoading: inquiriesLoading } = useListInquiries(
    { status: "pending", limit: 5 },
    { query: { queryKey: getListInquiriesQueryKey({ status: "pending", limit: 5 }) } }
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none">대기중</Badge>;
      case "reviewed": return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">검토완료</Badge>;
      case "completed": return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 border-none">처리완료</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (statsLoading || inquiriesLoading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">총 문의 건수</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              최근 30일: +{stats?.recentCount || 0}건
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">대기중인 문의</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats?.pending || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              빠른 답변이 필요합니다
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">검토 완료</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.reviewed || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              상담 진행 중
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">처리 완료</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.completed || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              완료된 프로젝트
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Inquiries List */}
      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>최근 대기중인 문의</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">가장 최근에 접수된 미처리 문의 목록입니다.</p>
          </div>
          <Link href="/admin/inquiries">
            <Button variant="outline" size="sm">전체 보기</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {!recentInquiries?.items || recentInquiries.items.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground bg-muted/20 rounded-lg">
              대기중인 문의가 없습니다.
            </div>
          ) : (
            <div className="space-y-4">
              {recentInquiries.items.map((inquiry) => (
                <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full items-center">
                    <div className="font-medium text-base">{inquiry.name}</div>
                    <div className="text-sm text-muted-foreground">{inquiry.phone}</div>
                    <div className="text-sm text-muted-foreground">
                      {inquiry.inquiryType} / {inquiry.spaceType}
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(inquiry.createdAt), 'yyyy-MM-dd')}
                      </span>
                      {getStatusBadge(inquiry.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
