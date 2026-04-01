import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contentItemsTable } from "@workspace/db";
import { UpdateContentItemBody, UpdateContentItemParams } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const defaultContent = [
  { key: "hero_title", value: "자연의 향기를 담은\n히노끼 욕조", type: "text" },
  { key: "hero_subtitle", value: "일본 히노끼(편백)나무로 만든 최고급 욕조. 피톤치드와 향긋한 나무 향으로 몸과 마음을 치유하세요.", type: "text" },
  { key: "hero_description", value: "히노끼욕조 전문 제작·판매·시공 업체 휴편백입니다.", type: "text" },
  { key: "company_name", value: "휴편백", type: "text" },
  { key: "company_intro", value: "휴편백은 100% 일본산 히노끼(편백)나무를 직수입하여 국내 최고의 장인 기술로 욕조를 제작하는 전문 기업입니다. 나무의 자연 방향 성분인 피톤치드가 몸과 마음을 치유합니다.", type: "text" },
  { key: "company_phone", value: "010-0000-0000", type: "text" },
  { key: "company_email", value: "info@hyupyeonbaek.kr", type: "text" },
  { key: "company_address", value: "주소를 입력해주세요", type: "text" },
  { key: "business_hours", value: "평일 09:00 - 18:00 / 토요일 09:00 - 14:00", type: "text" },
  { key: "naver_talk_url", value: "https://talk.naver.com/", type: "text" },
  { key: "kakao_channel_url", value: "https://pf.kakao.com/", type: "text" },
  { key: "service_1_title", value: "히노끼 반신욕조", type: "text" },
  { key: "service_1_desc", value: "욕실 공간을 효율적으로 활용하는 반신욕 전용 욕조. 1,320,000원부터 시작합니다.", type: "text" },
  { key: "service_2_title", value: "히노끼 전신욕조", type: "text" },
  { key: "service_2_desc", value: "전신을 편안하게 담글 수 있는 전신욕 전용 욕조. 1,650,000원부터 시작합니다.", type: "text" },
  { key: "service_3_title", value: "주문 제작형 욕조", type: "text" },
  { key: "service_3_desc", value: "고객 욕실 공간과 취향에 맞게 100% 맞춤 제작하는 욕조.", type: "text" },
  { key: "service_4_title", value: "악세사리", type: "text" },
  { key: "service_4_desc", value: "데크수전, 목함수전, 외부계단, 월풀 시스템 등 히노끼욕조 관련 악세사리.", type: "text" },
  { key: "footer_text", value: "© 2024 휴편백. All rights reserved.", type: "text" },
];

async function seedDefaultContent() {
  const existing = await db.select().from(contentItemsTable);
  if (existing.length === 0) {
    await db.insert(contentItemsTable).values(defaultContent);
  }
}

seedDefaultContent().catch(console.error);

router.get("/", async (req, res) => {
  try {
    const items = await db.select().from(contentItemsTable);
    res.json({ items });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch content");
    res.status(500).json({ error: "ServerError", message: "서버 오류가 발생했습니다" });
  }
});

router.put("/:key", async (req, res) => {
  if (!req.session.isAdmin) {
    res.status(401).json({ error: "Unauthorized", message: "관리자 권한이 필요합니다" });
    return;
  }

  const paramsParsed = UpdateContentItemParams.safeParse(req.params);
  if (!paramsParsed.success) {
    res.status(400).json({ error: "ValidationError", message: "Invalid key" });
    return;
  }

  const bodyParsed = UpdateContentItemBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: "ValidationError", message: "Invalid request body" });
    return;
  }

  const { key } = paramsParsed.data;
  const { value } = bodyParsed.data;

  try {
    const [updated] = await db
      .update(contentItemsTable)
      .set({ value, updatedAt: new Date() })
      .where(eq(contentItemsTable.key, key))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "NotFound", message: "콘텐츠를 찾을 수 없습니다" });
      return;
    }

    res.json(updated);
  } catch (err) {
    req.log.error({ err }, "Failed to update content");
    res.status(500).json({ error: "ServerError", message: "서버 오류가 발생했습니다" });
  }
});

export default router;
