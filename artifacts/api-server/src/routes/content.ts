import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contentItemsTable } from "@workspace/db";
import { UpdateContentItemBody, UpdateContentItemParams } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const defaultContent = [
  { key: "hero_title", value: "아쿠아데코 - 물과 공간의 아름다움", type: "text" },
  { key: "hero_subtitle", value: "전문적인 인테리어 어항 시공과 수경 디자인", type: "text" },
  { key: "hero_description", value: "주거, 상업 공간에 최적화된 어항 설치 및 관리 서비스를 제공합니다", type: "text" },
  { key: "company_name", value: "아쿠아데코 (AQUADECO)", type: "text" },
  { key: "company_intro", value: "아쿠아데코는 10년 이상의 경험을 가진 인테리어 어항 전문 기업입니다. 고객의 공간에 맞는 맞춤형 어항 디자인과 전문적인 시공을 제공합니다.", type: "text" },
  { key: "company_phone", value: "010-0000-0000", type: "text" },
  { key: "company_email", value: "info@aquadeco.kr", type: "text" },
  { key: "company_address", value: "서울특별시 강남구", type: "text" },
  { key: "business_hours", value: "평일 09:00 - 18:00 / 토요일 09:00 - 14:00", type: "text" },
  { key: "naver_talk_url", value: "https://talk.naver.com/", type: "text" },
  { key: "kakao_channel_url", value: "https://pf.kakao.com/", type: "text" },
  { key: "service_1_title", value: "주거 공간 어항", type: "text" },
  { key: "service_1_desc", value: "아파트, 주택 등 주거 공간에 특화된 인테리어 어항 설계 및 시공", type: "text" },
  { key: "service_2_title", value: "상업 공간 어항", type: "text" },
  { key: "service_2_desc", value: "레스토랑, 호텔, 사무실 등 상업 공간을 위한 대형 어항 솔루션", type: "text" },
  { key: "service_3_title", value: "인테리어 수경 디자인", type: "text" },
  { key: "service_3_desc", value: "수경 식물과 어항을 결합한 독창적인 인테리어 디자인", type: "text" },
  { key: "service_4_title", value: "유지관리 서비스", type: "text" },
  { key: "service_4_desc", value: "정기적인 어항 청소, 물고기 건강 관리, 설비 점검 서비스", type: "text" },
  { key: "footer_text", value: "© 2024 아쿠아데코. All rights reserved.", type: "text" },
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
