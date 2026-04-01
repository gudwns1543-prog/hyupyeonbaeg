import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { noticesTable } from "@workspace/db";
import { eq, desc, asc } from "drizzle-orm";

const router: IRouter = Router();

const defaultNotices = [
  {
    title: "히노끼욕조 관리방법 업데이트 안내",
    content: `안녕하세요, 휴편백입니다.\n\n히노끼욕조 관리방법이 업데이트되었습니다.\n\n■ 주요 변경 내용\n- 오일링 주기 안내 변경 (3개월 → 1~2개월)\n- 세척 방법 추가 안내\n- 장기 미사용 시 보관 방법 상세 안내\n\n자세한 관리방법은 사업소개 > 관리방법 페이지를 참고해 주세요.\n\n감사합니다.`,
    isNew: true,
    isPinned: true,
  },
  {
    title: "2025년 설 연휴 운영 안내",
    content: `안녕하세요, 휴편백입니다.\n\n2025년 설 연휴 기간(1월 28일 ~ 1월 30일) 동안 휴무입니다.\n\n■ 휴무 기간: 2025년 1월 28일(화) ~ 1월 30일(목)\n■ 정상 운영: 2025년 1월 31일(금)부터 정상 운영\n\n연휴 기간 중 주문/문의 남겨주시면 운영 재개 후 순서대로 처리해 드리겠습니다.\n\n감사합니다.`,
    isNew: false,
  },
  {
    title: "히노끼욕조 악세사리 신제품 출시 안내",
    content: `안녕하세요, 휴편백입니다.\n\n히노끼욕조 관련 신규 악세사리 제품이 출시되었습니다.\n\n■ 신규 출시 제품\n- 월풀 시스템 업그레이드 버전\n- 히노끼 원목 외부계단 (2단형)\n\n자세한 내용은 쇼핑 > 악세사리 페이지에서 확인하실 수 있습니다.\n\n감사합니다.`,
    isNew: false,
  },
  {
    title: "원산지 증명서 발급 서비스 안내",
    content: `안녕하세요, 휴편백입니다.\n\n휴편백에서 제작한 모든 히노끼욕조에 대해 원산지 증명서를 무료로 발급해 드립니다.\n\n■ 발급 대상: 휴편백 구매 고객 전체\n■ 발급 내용: 일본산 히노끼(편백) 원목 원산지 증명\n■ 발급 방법: 고객센터 또는 견적문의를 통해 신청\n\n100% 정품 일본산 히노끼를 사용하는 휴편백만의 서비스입니다.\n\n감사합니다.`,
    isNew: false,
  },
];

async function ensureSeeded() {
  const existing = await db.select().from(noticesTable).limit(1);
  if (existing.length === 0) {
    await db.insert(noticesTable).values(defaultNotices);
  }
}

ensureSeeded().catch(console.error);

router.get("/", async (req, res) => {
  try {
    const items = await db
      .select()
      .from(noticesTable)
      .where(eq(noticesTable.isActive, true))
      .orderBy(desc(noticesTable.isPinned), desc(noticesTable.createdAt));
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const session = (req as any).session;
  if (!session?.isAdmin) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { title, content, isNew, isPinned } = req.body;
    if (!title || !content) return res.status(400).json({ error: "title and content required" });
    const [item] = await db.insert(noticesTable).values({ title, content, isNew: !!isNew, isPinned: !!isPinned }).returning();
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const session = (req as any).session;
  if (!session?.isAdmin) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { title, content, isNew, isPinned, isActive } = req.body;
    const [item] = await db
      .update(noticesTable)
      .set({ title, content, isNew: !!isNew, isPinned: !!isPinned, isActive: isActive !== false, updatedAt: new Date() })
      .where(eq(noticesTable.id, Number(req.params.id)))
      .returning();
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const session = (req as any).session;
  if (!session?.isAdmin) return res.status(401).json({ error: "Unauthorized" });

  try {
    await db.update(noticesTable)
      .set({ isActive: false })
      .where(eq(noticesTable.id, Number(req.params.id)));
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
