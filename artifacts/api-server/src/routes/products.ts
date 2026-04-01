import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { productsTable, ordersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const defaultProducts = [
  {
    name: "히노끼 반신욕조",
    category: "bath",
    subCategory: "half",
    price: 1320000,
    priceText: "1,320,000원~",
    description: "욕실 공간을 효율적으로 활용하는 반신욕 전용 욕조입니다. 100% 일본산 히노끼(편백)나무로 제작되어 피톤치드 향으로 욕실을 가득 채웁니다. 반신욕을 통해 혈액순환 촉진과 피로회복에 탁월한 효과를 제공합니다.\n\n- 규격: 900×600×600(H)mm (기본형)\n- 소재: 100% 일본산 히노끼(편백) 원목\n- 마감: 무절/유절 선택 가능\n- 방수: FRP 방수 처리\n- 배수구: 스텐레스 재질 배수구 포함",
    imageUrl: "https://cdn.imweb.me/thumbnail/20220103/5c1275af617c1.jpg",
    inStock: true,
    sortOrder: 1,
  },
  {
    name: "히노끼 전신욕조",
    category: "bath",
    subCategory: "full",
    price: 1650000,
    priceText: "1,650,000원~",
    description: "전신을 편안하게 담글 수 있는 전신욕 전용 욕조입니다. 넓은 욕실에 최적화된 대형 사이즈로, 히노끼 특유의 향이 온몸을 감싸는 최고의 입욕 경험을 제공합니다.\n\n- 규격: 1200×700×650(H)mm (기본형)\n- 소재: 100% 일본산 히노끼(편백) 원목\n- 마감: 무절/유절 선택 가능\n- 방수: FRP 방수 처리\n- 배수구: 스텐레스 재질 배수구 포함",
    imageUrl: "https://cdn.imweb.me/thumbnail/20220301/5de4b9e35abfa.jpg",
    inStock: true,
    sortOrder: 2,
  },
  {
    name: "주문제작형 욕조",
    category: "bath",
    subCategory: "custom",
    price: null,
    priceText: "가격 문의",
    description: "고객의 욕실 공간과 취향에 맞게 100% 맞춤 제작하는 욕조입니다. 크기, 형태, 마감 방식 등 모든 사항을 고객과 협의하여 세상에 하나뿐인 나만의 히노끼 욕조를 제작해 드립니다.\n\n- 규격: 고객 맞춤 제작\n- 소재: 100% 일본산 히노끼(편백) 원목\n- 마감: 무절/유절/마사메 선택 가능\n- 방수: FRP 방수 / 짜맞춤 선택 가능\n- 납기: 약 4~6주 소요",
    imageUrl: "https://cdn.imweb.me/thumbnail/20220107/63a49465fff4d.jpg",
    inStock: true,
    sortOrder: 3,
  },
  {
    name: "할인 제품",
    category: "bath",
    subCategory: "sale",
    price: null,
    priceText: "할인가 문의",
    description: "전시 제품 및 소량 재고 할인 상품입니다. 동일한 히노끼 품질로 합리적인 가격에 구매하실 수 있습니다. 재고 소진 시 판매 종료됩니다.\n\n- 전시 욕조, 샘플 제품 등\n- 개별 문의 시 상세 안내\n- 재고 한정 특별가 적용",
    imageUrl: "https://cdn.imweb.me/thumbnail/20220111/4115b47534b28.jpg",
    inStock: true,
    sortOrder: 4,
  },
  {
    name: "데크수전",
    category: "accessory",
    subCategory: "deck",
    price: null,
    priceText: "가격 문의",
    description: "히노끼욕조에 최적화된 데크형 수전입니다. 욕조 상단 데크 위에 설치되어 편리하게 냉온수를 조절할 수 있습니다.\n\n- 황동 재질 도금 처리\n- 냉온수 혼합 방식\n- 욕조 규격에 맞게 선택 가능",
    imageUrl: "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/4c4d7ebebd2b0.jpg",
    inStock: true,
    sortOrder: 5,
  },
  {
    name: "목함수전",
    category: "accessory",
    subCategory: "box",
    price: null,
    priceText: "가격 문의",
    description: "히노끼 원목으로 제작된 목함 수전 커버입니다. 수전을 히노끼 박스로 감싸 디자인적으로 완성도 높은 욕실을 연출할 수 있습니다.\n\n- 히노끼 원목 제작\n- 기존 수전에 덧씌우는 방식\n- 맞춤 사이즈 제작 가능",
    imageUrl: "https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/d750cf1c3d080.jpg",
    inStock: true,
    sortOrder: 6,
  },
  {
    name: "외부계단",
    category: "accessory",
    subCategory: "stairs",
    price: null,
    priceText: "가격 문의",
    description: "욕조 출입을 편리하게 해주는 히노끼 원목 계단입니다. 미끄럼 방지 처리로 안전하게 욕조에 오르내릴 수 있습니다.\n\n- 히노끼 원목 제작\n- 미끄럼 방지 처리\n- 1단/2단 선택 가능\n- 욕조 규격에 맞춤 제작",
    imageUrl: null,
    inStock: true,
    sortOrder: 7,
  },
  {
    name: "월풀 시스템",
    category: "accessory",
    subCategory: "whirlpool",
    price: null,
    priceText: "가격 문의",
    description: "히노끼 욕조에 설치 가능한 월풀(자쿠지) 시스템입니다. 강력한 수압 마사지로 피로 회복과 혈액순환에 탁월한 효과를 제공합니다.\n\n- 욕조 내부 설치형\n- 노즐 수 / 위치 선택 가능\n- 방수 모터 사용\n- 전문 설치 서비스 포함",
    imageUrl: null,
    inStock: true,
    sortOrder: 8,
  },
];

async function seedProducts() {
  const existing = await db.select().from(productsTable);
  if (existing.length === 0) {
    await db.insert(productsTable).values(defaultProducts);
  }
}

seedProducts().catch(console.error);

router.get("/", async (req, res) => {
  try {
    const { category, sub } = req.query;
    let products = await db.select().from(productsTable);
    if (category) products = products.filter((p) => p.category === category);
    if (sub) products = products.filter((p) => p.subCategory === sub);
    products.sort((a, b) => a.sortOrder - b.sortOrder);
    res.json({ products });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch products");
    res.status(500).json({ error: "ServerError", message: "서버 오류가 발생했습니다" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "BadRequest", message: "잘못된 ID입니다" });
      return;
    }
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, id));
    if (!product) {
      res.status(404).json({ error: "NotFound", message: "제품을 찾을 수 없습니다" });
      return;
    }
    res.json(product);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch product");
    res.status(500).json({ error: "ServerError", message: "서버 오류가 발생했습니다" });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const { productId, productName, name, phone, email, quantity, address, message } = req.body;
    if (!productName || !name || !phone) {
      res.status(400).json({ error: "ValidationError", message: "필수 항목이 누락되었습니다" });
      return;
    }
    const [order] = await db
      .insert(ordersTable)
      .values({
        productId: productId || null,
        productName,
        name,
        phone,
        email: email || null,
        quantity: quantity || 1,
        address: address || null,
        message: message || null,
        status: "pending",
      })
      .returning();
    res.status(201).json(order);
  } catch (err) {
    req.log.error({ err }, "Failed to create order");
    res.status(500).json({ error: "ServerError", message: "서버 오류가 발생했습니다" });
  }
});

router.get("/orders/all", async (req, res) => {
  if (!req.session.isAdmin) {
    res.status(401).json({ error: "Unauthorized", message: "관리자 권한이 필요합니다" });
    return;
  }
  try {
    const orders = await db.select().from(ordersTable).orderBy(ordersTable.createdAt);
    res.json({ orders });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch orders");
    res.status(500).json({ error: "ServerError", message: "서버 오류가 발생했습니다" });
  }
});

router.patch("/orders/:id/status", async (req, res) => {
  if (!req.session.isAdmin) {
    res.status(401).json({ error: "Unauthorized", message: "관리자 권한이 필요합니다" });
    return;
  }
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const [updated] = await db
      .update(ordersTable)
      .set({ status, updatedAt: new Date() })
      .where(eq(ordersTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "NotFound", message: "주문을 찾을 수 없습니다" });
      return;
    }
    res.json(updated);
  } catch (err) {
    req.log.error({ err }, "Failed to update order");
    res.status(500).json({ error: "ServerError", message: "서버 오류가 발생했습니다" });
  }
});

export default router;
