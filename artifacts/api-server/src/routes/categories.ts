import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { productCategoriesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const defaultCategories = [
  { slug: "bath", name: "히노끼욕조", parentSlug: null, sortOrder: 1 },
  { slug: "bath-half", name: "반신욕조", parentSlug: "bath", sortOrder: 1 },
  { slug: "bath-full", name: "전신욕조", parentSlug: "bath", sortOrder: 2 },
  { slug: "bath-custom", name: "주문제작형욕조", parentSlug: "bath", sortOrder: 3 },
  { slug: "bath-sale", name: "할인제품", parentSlug: "bath", sortOrder: 4 },
  { slug: "accessory", name: "악세사리", parentSlug: null, sortOrder: 2 },
  { slug: "accessory-deck", name: "데크수전", parentSlug: "accessory", sortOrder: 1 },
  { slug: "accessory-box", name: "목함수전", parentSlug: "accessory", sortOrder: 2 },
  { slug: "accessory-stairs", name: "외부계단", parentSlug: "accessory", sortOrder: 3 },
  { slug: "accessory-whirlpool", name: "월풀 시스템", parentSlug: "accessory", sortOrder: 4 },
];

async function seedCategories() {
  const existing = await db.select().from(productCategoriesTable);
  if (existing.length === 0) {
    await db.insert(productCategoriesTable).values(defaultCategories);
  }
}
seedCategories().catch(console.error);

// GET /categories — public
router.get("/", async (req, res) => {
  try {
    const categories = await db
      .select()
      .from(productCategoriesTable)
      .orderBy(productCategoriesTable.sortOrder);
    res.json({ categories });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch categories");
    res.status(500).json({ error: "ServerError", message: "서버 오류" });
  }
});

// POST /categories — admin only
router.post("/", async (req, res) => {
  if (!req.session.isAdmin) {
    res.status(401).json({ error: "Unauthorized", message: "관리자 권한 필요" });
    return;
  }
  try {
    const { slug, name, parentSlug, sortOrder } = req.body;
    if (!slug || !name) {
      res.status(400).json({ error: "ValidationError", message: "slug와 name은 필수입니다" });
      return;
    }
    const [cat] = await db
      .insert(productCategoriesTable)
      .values({ slug, name, parentSlug: parentSlug || null, sortOrder: sortOrder ?? 0 })
      .returning();
    res.status(201).json(cat);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("unique")) {
      res.status(409).json({ error: "Conflict", message: "이미 존재하는 slug입니다" });
      return;
    }
    req.log.error({ err }, "Failed to create category");
    res.status(500).json({ error: "ServerError", message: "서버 오류" });
  }
});

// PATCH /categories/:id — admin only
router.patch("/:id", async (req, res) => {
  if (!req.session.isAdmin) {
    res.status(401).json({ error: "Unauthorized", message: "관리자 권한 필요" });
    return;
  }
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "BadRequest", message: "잘못된 ID" });
      return;
    }
    const { name, sortOrder } = req.body;
    const updates: Record<string, unknown> = {};
    if (name !== undefined) updates.name = name;
    if (sortOrder !== undefined) updates.sortOrder = Number(sortOrder);

    const [updated] = await db
      .update(productCategoriesTable)
      .set(updates)
      .where(eq(productCategoriesTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "NotFound", message: "카테고리를 찾을 수 없습니다" });
      return;
    }
    res.json(updated);
  } catch (err) {
    req.log.error({ err }, "Failed to update category");
    res.status(500).json({ error: "ServerError", message: "서버 오류" });
  }
});

// DELETE /categories/:id — admin only
router.delete("/:id", async (req, res) => {
  if (!req.session.isAdmin) {
    res.status(401).json({ error: "Unauthorized", message: "관리자 권한 필요" });
    return;
  }
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "BadRequest", message: "잘못된 ID" });
      return;
    }
    const [deleted] = await db
      .delete(productCategoriesTable)
      .where(eq(productCategoriesTable.id, id))
      .returning();
    if (!deleted) {
      res.status(404).json({ error: "NotFound", message: "카테고리를 찾을 수 없습니다" });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete category");
    res.status(500).json({ error: "ServerError", message: "서버 오류" });
  }
});

export default router;
