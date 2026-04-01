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
import { Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";

const inquirySchema = z.object({
  name: z.string().min(2, "이름/상호명을 입력해주세요."),
  phone: z.string().min(9, "연락처를 입력해주세요."),
  email: z.string().email("올바른 이메일 주소를 입력해주세요.").optional().or(z.literal("")),
  inquiryType: z.string().min(1, "문의 유형을 선택해주세요."),
  spaceType: z.string().min(1, "욕실 유형을 선택해주세요."),
  area: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "문의 내용을 10자 이상 자세히 입력해주세요.")
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export default function Inquiry() {
  const { toast } = useToast();
  const createInquiry = useCreateInquiry();
  const [submitted, setSubmitted] = useState(false);

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
        setSubmitted(true);
        toast({
          title: "견적 문의가 접수되었습니다",
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-4">문의 접수 완료</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            견적 문의가 성공적으로 접수되었습니다.<br />
            담당자 확인 후 입력하신 연락처로 연락드리겠습니다.
          </p>
          <Button onClick={() => setSubmitted(false)} data-testid="btn-new-inquiry">새 문의 작성하기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground tracking-tight">견적 문의</h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              원하시는 히노끼욕조의 종류와 욕실 환경을 알려주시면,<br className="hidden sm:block" />
              담당자가 확인 후 맞춤 견적을 안내해 드립니다.
            </p>
          </div>

          <Card className="border-stone-200 shadow-lg">
            <CardHeader className="bg-primary/5 border-b border-stone-200 pb-6">
              <CardTitle className="text-xl text-foreground">문의 양식 작성</CardTitle>
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
                            <Input placeholder="홍길동 또는 (주)휴편백" {...field} data-testid="input-name" />
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
                        <FormLabel>이메일 (선택)</FormLabel>
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
                          <FormLabel>문의 제품 *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-type">
                                <SelectValue placeholder="제품을 선택해주세요" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="반신욕조">히노끼 반신욕조</SelectItem>
                              <SelectItem value="전신욕조">히노끼 전신욕조</SelectItem>
                              <SelectItem value="주문제작">주문 제작형 욕조</SelectItem>
                              <SelectItem value="악세사리">악세사리 (데크수전, 월풀 등)</SelectItem>
                              <SelectItem value="기타">기타 / 상담 후 결정</SelectItem>
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
                          <FormLabel>욕실 유형 *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-space">
                                <SelectValue placeholder="선택해주세요" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="아파트">아파트</SelectItem>
                              <SelectItem value="단독주택">단독주택 / 전원주택</SelectItem>
                              <SelectItem value="펜션">펜션 / 숙박업소</SelectItem>
                              <SelectItem value="호텔스파">호텔 / 스파</SelectItem>
                              <SelectItem value="상업시설">상업 시설 (찜질방, 목욕탕 등)</SelectItem>
                              <SelectItem value="기타">기타</SelectItem>
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
                          <FormLabel>예산 범위 (선택)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-budget">
                                <SelectValue placeholder="선택해주세요" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="150만이하">150만원 이하</SelectItem>
                              <SelectItem value="150-200만">150만원 ~ 200만원</SelectItem>
                              <SelectItem value="200-300만">200만원 ~ 300만원</SelectItem>
                              <SelectItem value="300만이상">300만원 이상</SelectItem>
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
                            placeholder="원하시는 욕조의 크기, 욕실 공간, 선호하는 나무 등급(유절/무절/마사메), 추가 옵션(월풀 등) 등을 자유롭게 적어주세요."
                            className="min-h-[150px] resize-y"
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-2 flex justify-end">
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
                        "견적 문의 접수하기"
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
