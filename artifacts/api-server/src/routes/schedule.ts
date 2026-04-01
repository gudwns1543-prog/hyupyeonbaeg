import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { scheduleEventsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    const events = await db
      .select()
      .from(scheduleEventsTable)
      .where(eq(scheduleEventsTable.isPublished, true))
      .orderBy(asc(scheduleEventsTable.date));
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  const session = (req as any).session;
  if (!session?.isAdmin) return res.status(401).json({ error: "Unauthorized" });
  try {
    const events = await db
      .select()
      .from(scheduleEventsTable)
      .orderBy(asc(scheduleEventsTable.date));
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const session = (req as any).session;
  if (!session?.isAdmin) return res.status(401).json({ error: "Unauthorized" });
  try {
    const { title, description, date, location, color, isPublished } = req.body;
    if (!title || !date) return res.status(400).json({ error: "title and date required" });
    const [item] = await db
      .insert(scheduleEventsTable)
      .values({ title, description, date, location, color: color || "green", isPublished: isPublished !== false })
      .returning();
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
    const { title, description, date, location, color, isPublished } = req.body;
    const [item] = await db
      .update(scheduleEventsTable)
      .set({ title, description, date, location, color, isPublished, updatedAt: new Date() })
      .where(eq(scheduleEventsTable.id, Number(req.params.id)))
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
    await db.delete(scheduleEventsTable).where(eq(scheduleEventsTable.id, Number(req.params.id)));
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
