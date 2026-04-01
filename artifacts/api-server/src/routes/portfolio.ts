import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { portfolioItemsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router: IRouter = Router();

const defaultPortfolioItems = [
  { title: "히노끼욕조 유절 시공 (1)", category: "히노끼욕조 유절", categoryKey: "ujul", imageUrl: "https://cdn.imweb.me/thumbnail/20220111/0f63ba036910f.jpg", description: "자연스러운 옹이(유절)가 살아있는 히노끼 반신욕조 시공 사례입니다.", sortOrder: 1 },
  { title: "히노끼욕조 유절 시공 (2)", category: "히노끼욕조 유절", categoryKey: "ujul", imageUrl: "https://cdn.imweb.me/thumbnail/20220111/22aaafb2b6581.jpg", description: "유절 히노끼 전신욕조. 나무의 자연스러운 결과 옹이가 그대로 살아있습니다.", sortOrder: 2 },
  { title: "히노끼욕조 유절 시공 (3)", category: "히노끼욕조 유절", categoryKey: "ujul", imageUrl: "https://cdn.imweb.me/thumbnail/20220111/349bd24ed6809.jpg", description: "편안한 욕실 분위기를 연출하는 유절 히노끼욕조 현장 시공 사례입니다.", sortOrder: 3 },
  { title: "히노끼욕조 유절 시공 (4)", category: "히노끼욕조 유절", categoryKey: "ujul", imageUrl: "https://cdn.imweb.me/thumbnail/20220111/4115b47534b28.jpg", description: "자연의 옹이가 살아있는 유절 히노끼욕조로 욕실을 따뜻하게 꾸몄습니다.", sortOrder: 4 },
  { title: "히노끼욕조 유절 시공 (5)", category: "히노끼욕조 유절", categoryKey: "ujul", imageUrl: "https://cdn.imweb.me/thumbnail/20220111/802d6ce746cd8.jpg", description: "고객 맞춤 제작된 유절 히노끼 욕조. 자연미 넘치는 목욕 공간을 완성했습니다.", sortOrder: 5 },
  { title: "히노끼욕조 유절 시공 (6)", category: "히노끼욕조 유절", categoryKey: "ujul", imageUrl: "https://cdn.imweb.me/thumbnail/20220111/9b5080956a692.jpg", description: "편백나무 특유의 향과 온기를 느낄 수 있는 유절 히노끼욕조 시공 사례입니다.", sortOrder: 6 },
  { title: "히노끼욕조 무절 시공 (1)", category: "히노끼욕조 무절", categoryKey: "mujul", imageUrl: "https://cdn.imweb.me/thumbnail/20200923/21c6f8cee6e87.jpg", description: "결점 없는 무절 히노끼로 제작한 깔끔하고 고급스러운 욕조 시공 사례입니다.", sortOrder: 7 },
  { title: "히노끼욕조 무절 시공 (2)", category: "히노끼욕조 무절", categoryKey: "mujul", imageUrl: "https://cdn.imweb.me/thumbnail/20210115/c0d5b7e2f3a91.jpg", description: "흠없이 깨끗한 무절 히노끼로 제작된 고급 전신욕조 시공 사례입니다.", sortOrder: 8 },
  { title: "히노끼욕조 무절 시공 (3)", category: "히노끼욕조 무절", categoryKey: "mujul", imageUrl: "https://cdn.imweb.me/thumbnail/20200923/b3f82d1e90c45.jpg", description: "무절 히노끼의 깔끔한 표면으로 모던한 욕실 분위기를 완성했습니다.", sortOrder: 9 },
  { title: "히노끼욕조 무절 시공 (4)", category: "히노끼욕조 무절", categoryKey: "mujul", imageUrl: "https://cdn.imweb.me/thumbnail/20210115/7a1e3d9c5b82f.jpg", description: "프리미엄 무절 히노끼 반신욕조. 군더더기 없는 깔끔한 외관이 특징입니다.", sortOrder: 10 },
  { title: "히노끼욕조 무절 마사메 (1)", category: "히노끼욕조 무절 마사메", categoryKey: "masame", imageUrl: "https://cdn.imweb.me/thumbnail/20220107/63a49465fff4d.jpg", description: "일직선의 곧은 결(마사메)이 아름다운 최고급 무절 히노끼욕조 시공 사례입니다.", sortOrder: 11 },
  { title: "히노끼욕조 무절 마사메 (2)", category: "히노끼욕조 무절 마사메", categoryKey: "masame", imageUrl: "https://cdn.imweb.me/thumbnail/20220110/8d3f5e9a4c721.jpg", description: "마사메 결 히노끼의 최고급 원목만을 엄선하여 제작한 욕조입니다.", sortOrder: 12 },
  { title: "히노끼욕조 무절 마사메 (3)", category: "히노끼욕조 무절 마사메", categoryKey: "masame", imageUrl: "https://cdn.imweb.me/thumbnail/20220107/2b5f1a8e7d094.jpg", description: "일직선의 곧은 나무결이 만들어내는 자연의 아름다움을 그대로 담은 욕조입니다.", sortOrder: 13 },
  { title: "히노끼욕조 양산형 (1)", category: "히노끼욕조 양산형", categoryKey: "yangsan", imageUrl: "https://cdn.imweb.me/thumbnail/20210204/0660c0ff1c639.jpg", description: "합리적인 가격으로 즐기는 히노끼욕조. 품질은 그대로 유지하는 양산형 반신욕조입니다.", sortOrder: 14 },
  { title: "히노끼욕조 양산형 (2)", category: "히노끼욕조 양산형", categoryKey: "yangsan", imageUrl: "https://cdn.imweb.me/thumbnail/20210204/3a8c5e1f9d726.jpg", description: "표준화된 규격으로 빠른 납기가 가능한 양산형 히노끼 전신욕조 시공 사례입니다.", sortOrder: 15 },
  { title: "히노끼욕조 양산형 (3)", category: "히노끼욕조 양산형", categoryKey: "yangsan", imageUrl: "https://cdn.imweb.me/thumbnail/20210204/b4d2f0a6e1853.jpg", description: "동일한 히노끼 품질로 합리적인 가격에 만나보는 양산형 욕조입니다.", sortOrder: 16 },
  { title: "현장별 시공사례 (1)", category: "현장별 시공사례", categoryKey: "location", imageUrl: "https://cdn.imweb.me/thumbnail/20240905/17a681d712222.jpg", description: "다양한 현장에서 완성된 휴편백의 히노끼욕조 시공 사례를 소개합니다.", sortOrder: 17 },
  { title: "현장별 시공사례 (2)", category: "현장별 시공사례", categoryKey: "location", imageUrl: "https://cdn.imweb.me/thumbnail/20230102/4e9f2a7c8b035.jpg", description: "욕실 환경에 맞게 최적화된 히노끼욕조 현장 시공 사례입니다.", sortOrder: 18 },
  { title: "현장별 시공사례 (3)", category: "현장별 시공사례", categoryKey: "location", imageUrl: "https://cdn.imweb.me/thumbnail/20240905/c8b3e5f1a9467.jpg", description: "고객의 욕실에 완벽하게 맞춤 설치된 히노끼욕조 시공 사례입니다.", sortOrder: 19 },
  { title: "현장별 시공사례 (4)", category: "현장별 시공사례", categoryKey: "location", imageUrl: "https://cdn.imweb.me/thumbnail/20230102/9d1c7f4b2e816.jpg", description: "다양한 욕실 환경에서 최적의 결과를 보여주는 휴편백의 시공 사례입니다.", sortOrder: 20 },
];

async function ensureSeeded() {
  const existing = await db.select().from(portfolioItemsTable).limit(1);
  if (existing.length === 0) {
    await db.insert(portfolioItemsTable).values(defaultPortfolioItems);
  }
}

ensureSeeded().catch(console.error);

router.get("/", async (req, res) => {
  try {
    const { categoryKey } = req.query;
    let items = await db
      .select()
      .from(portfolioItemsTable)
      .where(eq(portfolioItemsTable.isActive, true))
      .orderBy(asc(portfolioItemsTable.sortOrder));

    if (categoryKey && typeof categoryKey === "string") {
      items = items.filter((i) => i.categoryKey === categoryKey);
    }

    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch portfolio items" });
  }
});

router.post("/", async (req, res) => {
  if (!req.session.isAdmin) return res.status(401).json({ error: "Unauthorized" });
  try {
    const { title, category, categoryKey, imageUrl, description, sortOrder } = req.body;
    if (!title || !category || !categoryKey || !imageUrl) {
      return res.status(400).json({ error: "title, category, categoryKey, imageUrl are required" });
    }
    const [item] = await db
      .insert(portfolioItemsTable)
      .values({ title, category, categoryKey, imageUrl, description: description ?? "", sortOrder: sortOrder ?? 999 })
      .returning();
    res.status(201).json({ item });
  } catch (err) {
    res.status(500).json({ error: "Failed to create portfolio item" });
  }
});

router.put("/:id", async (req, res) => {
  if (!req.session.isAdmin) return res.status(401).json({ error: "Unauthorized" });
  try {
    const id = Number(req.params.id);
    const { title, category, categoryKey, imageUrl, description, sortOrder, isActive } = req.body;
    const [item] = await db
      .update(portfolioItemsTable)
      .set({
        ...(title !== undefined && { title }),
        ...(category !== undefined && { category }),
        ...(categoryKey !== undefined && { categoryKey }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(description !== undefined && { description }),
        ...(sortOrder !== undefined && { sortOrder }),
        ...(isActive !== undefined && { isActive }),
        updatedAt: new Date(),
      })
      .where(eq(portfolioItemsTable.id, id))
      .returning();
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json({ item });
  } catch (err) {
    res.status(500).json({ error: "Failed to update portfolio item" });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.session.isAdmin) return res.status(401).json({ error: "Unauthorized" });
  try {
    const id = Number(req.params.id);
    await db.delete(portfolioItemsTable).where(eq(portfolioItemsTable.id, id));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete portfolio item" });
  }
});

export default router;
