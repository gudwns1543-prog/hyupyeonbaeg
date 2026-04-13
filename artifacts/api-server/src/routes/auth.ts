import { Router, type IRouter } from "express";
import { AdminLoginBody } from "@workspace/api-zod";
import { createHmac, timingSafeEqual } from "crypto";

const router: IRouter = Router();

const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "aquadeco2024!";
const JWT_SECRET = process.env["SESSION_SECRET"] ?? "aquadeco-admin-secret-2024";

function createToken(): string {
  const payload = JSON.stringify({ isAdmin: true, exp: Date.now() + 24 * 60 * 60 * 1000 });
  const encoded = Buffer.from(payload).toString("base64url");
  const sig = createHmac("sha256", JWT_SECRET).update(encoded).digest("base64url");
  return `${encoded}.${sig}`;
}

function verifyToken(token: string): boolean {
  try {
    const [encoded, sig] = token.split(".");
    const expectedSig = createHmac("sha256", JWT_SECRET).update(encoded).digest("base64url");
    const sigBuffer = Buffer.from(sig);
    const expectedBuffer = Buffer.from(expectedSig);
    if (sigBuffer.length !== expectedBuffer.length) return false;
    if (!timingSafeEqual(sigBuffer, expectedBuffer)) return false;
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    return payload.isAdmin === true && payload.exp > Date.now();
  } catch {
    return false;
  }
}

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
  const token = createToken();
  res.cookie("admin_token", token, {
    httpOnly: true,
    secure: process.
