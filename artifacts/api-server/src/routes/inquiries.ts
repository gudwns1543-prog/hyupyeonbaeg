import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { inquiriesTable } from "@workspace/db";
import {
  CreateInquiryBody,
  ListInquiriesQueryParams,
  GetInquiryParams,
  UpdateInquiryStatusParams,
  UpdateInquiryStatusBody,
} from "@workspace/api-zod";
import { eq, desc, count, sql, and, gte } from "drizzle-orm";

const router: IRouter = Router();

router.get("/stats", async (req, res) => {
  if (!req.session.isAdmin) {
    res.status(401).json({ error: "Unauthorized", message: "관리자 권한이 필요합니다" });
    return;
  }

  try {
    const [totalResult] = await db.select({ count: count() }).from(inquiriesTable);
    const [pendingResult] = await db
      .select({ count: count() })
      .from(inquiriesTable)
      .where(eq(inquiriesTable.status, "pending"));
    const [reviewedResult] = await db
      .select({ count: count() })
      .from(inquiriesTable)
      .where(eq(inquiriesTable.status, "reviewed"));
    const [completedResult] = await db
      .select({ count: count() })
      .from(inquiriesTable)
      .where(eq(inquiriesTable.status, "completed"));

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const [recentResult] = await db
      .select({ count: count() })
      .from(inquiriesTable)
      .where(gte(inquiriesTable.createdAt, sevenDaysAgo));

    res.json({
      total: totalResult?.count ?? 0,
      pending: pendingResult?.count ?? 0,
      reviewed: reviewedResult?.count ?? 0,
      completed: completedResult?.count ?? 0,
      recentCount: recentResult?.count ?? 0,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch inquiry stats");
    res.status(500).json({ error: "ServerError", message: "서버 오류가 발생했습니다" });
  }
});

router.post("/", async (req, res) => {
  const parsed = CreateInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "ValidationError", message: "필수 항목을 입력해주세요" });
    return;
  }

  const { name, phone, email, inquiryType, spaceType, area, budget, message } = parsed.data;

  try {
    const [created] = await db
      .insert(inquiriesTable)
      .values({
        name,
        phone,
        email,
        inquiryType,
        spaceType,
        area,
        budget,
        message,
        status: "pending",
      })
      .returning();

    res.status(201).json(created);
  } catch (err) {
    req.log.error({ err }, "Failed to create inquiry");
    res.status(500).json({ error: "ServerError", message: "서버 오류가 발생했습니다" });
  }
});

router.get("/", async (req, res) => {
  if (!req.session.isAdmin) {
    res.status(401).json({ error: "Unauthorized", message: "관리자 권한이 필요합니다" });
    return;
  }

  const parsed = ListInquiriesQueryParams.safeParse(req.query);
  const { status, limit = 20, offset = 0 } = parsed.success ? parsed.data : {};

  try {
    const conditions = [];
    if (status) {
      conditions.push(eq(inquiriesTable.status, status));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const items = await db
      .select()
      .from(inquiriesTable)
      .where(whereClause)
      .orderBy(desc(inquiriesTable.createdAt))
      .limit(limit ?? 20)
      .offset(offset ?? 0);

    const [totalResult] = await db
      .select({ count: count() })
      .from(inquiriesTable)
      .where(whereClause);

    res.json({ items, total: totalResult?.count ?? 0 });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch inquiries");
    res.status(500).json({ error: "ServerError", message: "서버 오류가 발생했습니다" });
  }
});

router.get("/:id", async (req, res) => {
  if (!req.session.isAdmin) {
    res.status(401).json({ error: "Unauthorized", message: "관리자 권한이 필요합니다" });
    return;
  }

  const parsed = GetInquiryParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: "ValidationError", message: "Invalid ID" });
    return;
  }

  const { id } = parsed.data;

  try {
    const [inquiry] = await db
      .select()
      .from(inquiriesTable)
      .where(eq(inquiriesTable.id, id));

    if (!inquiry) {
      res.status(404).json({ error: "NotFound", message: "문의를 찾을 수 없습니다" });
      return;
    }

    res.json(inquiry);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch inquiry");
    res.status(500).json({ error: "ServerError", message: "서버 오류가 발생했습니다" });
  }
});

router.patch("/:id", async (req, res) => {
  if (!req.session.isAdmin) {
    res.status(401).json({ error: "Unauthorized", message: "관리자 권한이 필요합니다" });
    return;
  }

  const paramsParsed = UpdateInquiryStatusParams.safeParse(req.params);
  if (!paramsParsed.success) {
    res.status(400).json({ error: "ValidationError", message: "Invalid ID" });
    return;
  }

  const bodyParsed = UpdateInquiryStatusBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: "ValidationError", message: "Invalid status" });
    return;
  }

  const { id } = paramsParsed.data;
  const { status } = bodyParsed.data;

  try {
    const [updated] = await db
      .update(inquiriesTable)
      .set({ status, updatedAt: new Date() })
      .where(eq(inquiriesTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "NotFound", message: "문의를 찾을 수 없습니다" });
      return;
    }

    res.json(updated);
  } catch (err) {
    req.log.error({ err }, "Failed to update inquiry");
    res.status(500).json({ error: "ServerError", message: "서버 오류가 발생했습니다" });
  }
});

export default router;
