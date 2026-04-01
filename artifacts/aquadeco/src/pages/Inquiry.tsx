import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateInquiry } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const inquirySchema = z.object({
  name: z.string().min(2, "이름/상호명을 입력해주세요."),
  phone: z.string().min(9, "연락처를 입력해주세요."),
  email: z.string().email("올바른 이메일 주소를 입력해주세요.").optional().or(z.literal("")),
  inquiryType: z.string().min(1, "문의 유형을 선택해주세요."),
  spaceType: z.string().min(1, "공간 유형을 선택해주세요."),
  area: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "문의 내용을 10자 이상 자세히 입력해주세요.")
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export default function Inquiry() {
  const { toast } = useToast();
  const createInquiry = useCreateInquiry();

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      inquiryType: "",
      spaceType: "",
      area: "",
      budget: "",
      message: ""
    }
  });

  function onSubmit(data: InquiryFormValues) {
    createInquiry.mutate({ data }, {
      onSuccess: () => {
        toast({
          title: "문의가 접수되었습니다",
          description: "담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          title: "오류가 발생했습니다",
          description: "문의 접수 중 문제가 발생했습니다. 다시 시도해주세요.",
          variant: "destructive"
        });
      }
    });
  }

  return (
    <div className="min-h-screen bg-muted/30 py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground tracking-tight">견적 문의</h1>
            <p className="text-lg text-muted-foreground">
              원하시는 수족관의 컨셉과 대략적인 예산을 남겨주시면, 담당자가 확인 후 상세한 맞춤 상담을 도와드립니다.
            </p>
          </div>

          <Card className="border-border/60 shadow-lg">
            <CardHeader className="bg-primary/5 border-b border-border/40 pb-6">
              <CardTitle className="text-xl">문의 양식 작성</CardTitle>
              <CardDescription>
                * 표시된 항목은 필수 입력 사항입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>이름 / 상호명 *</FormLabel>
                          <FormControl>
                            <Input placeholder="홍길동 또는 (주)아쿠아" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>연락처 *</FormLabel>
                          <FormControl>
                            <Input placeholder="010-0000-0000" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input placeholder="example@email.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="inquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>문의 유형 *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-type">
                                <SelectValue placeholder="선택해주세요" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="신규설치">신규 설치/시공</SelectItem>
                              <SelectItem value="리모델링">기존 수조 리모델링</SelectItem>
                              <SelectItem value="유지보수">정기 유지보수</SelectItem>
                              <SelectItem value="기타">기타 문의</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="spaceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>공간 유형 *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-space">
                                <SelectValue placeholder="선택해주세요" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="주거공간">주거 공간 (아파트, 빌라, 단독주택)</SelectItem>
                              <SelectItem value="상업공간">상업 공간 (카페, 식당, 매장)</SelectItem>
                              <SelectItem value="오피스">오피스/사무실</SelectItem>
                              <SelectItem value="의료시설">의료 시설 (병원, 한의원)</SelectItem>
                              <SelectItem value="기타">기타 공간</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>설치 예정 지역 (시/구)</FormLabel>
                          <FormControl>
                            <Input placeholder="예: 서울시 강남구" {...field} data-testid="input-area" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>예상 예산 (선택)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-budget">
                                <SelectValue placeholder="선택해주세요" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="300만이하">300만원 이하</SelectItem>
                              <SelectItem value="300-500만">300만원 ~ 500만원</SelectItem>
                              <SelectItem value="500-1000만">500만원 ~ 1,000만원</SelectItem>
                              <SelectItem value="1000만이상">1,000만원 이상</SelectItem>
                              <SelectItem value="미정">미정 / 상담 후 결정</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>상세 문의 내용 *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="원하시는 수족관의 크기, 설치될 공간의 형태, 선호하는 어종이나 디자인 컨셉 등을 자유롭게 적어주세요." 
                            className="min-h-[150px] resize-y"
                            {...field} 
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4 flex justify-end">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full sm:w-auto px-10 text-base h-14"
                      disabled={createInquiry.isPending}
                      data-testid="btn-submit-inquiry"
                    >
                      {createInquiry.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          제출 중...
                        </>
                      ) : (
                        "문의 접수하기"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
