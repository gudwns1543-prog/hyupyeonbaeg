import { Router, type IRouter } from "express";
import { AdminLoginBody } from "@workspace/api-zod";

const router: IRouter = Router();

const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "aquadeco2024!";

router.post("/login", (req, res) => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "ValidationError", message: "Invalid request body" });
    return;
  }

  const { password } = parsed.data;

  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized", message: "비밀번호가 올바르지 않습니다" });
    return;
  }

  req.session.isAdmin = true;
  res.json({ success: true, message: "로그인 성공" });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      req.log.error({ err }, "Session destroy error");
    }
  });
  res.json({ success: true, message: "로그아웃 성공" });
});

router.get("/me", (req, res) => {
  if (!req.session.isAdmin) {
    res.status(401).json({ error: "Unauthorized", message: "로그인이 필요합니다" });
    return;
  }
  res.json({ isAdmin: true });
});

export default router;
