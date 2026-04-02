import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type Product = {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  price: number | null;
  priceText: string;
  description: string;
  imageUrl: string | null;
  inStock: boolean;
  sortOrder: number;
};

type Category = {
  id: number;
  slug: string;
  name: string;
  parentSlug: string | null;
  sortOrder: number;
};

function getCatLabel(categories: Category[], slug: string): string {
  return categories.find((c) => c.slug === slug)?.name || slug;
}

// Find a mid/leaf category by its sub-slug (the portion after the parent prefix)
// Supports both compound slugs (bath-full) and sub-slug only (full)
function findCatBySubSlug(
  categories: Category[],
  parentSlug: string,
  subSlug: string
): Category | undefined {
  // 1. Exact compound slug match
  const exact = categories.find((c) => c.slug === `${parentSlug}-${subSlug}`);
  if (exact) return exact;
  // 2. Match by parentSlug + stripped sub-slug
  return categories.find(
    (c) =>
      c.parentSlug === parentSlug &&
      (c.slug === subSlug ||
        (c.slug.startsWith(parentSlug + "-")
          ? c.slug.slice(parentSlug.length + 1) === subSlug
          : c.slug === subSlug))
  );
}

function ProductCard({ product, categories }: { product: Product; categories: Category[] }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      priceText: product.priceText,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    toast({ title: "장바구니에 추가되었습니다", description: product.name });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md transition-all group">
      <div className="relative h-56 bg-stone-100 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400">
            <span className="text-4xl">🛁</span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-stone-800 px-4 py-2 rounded-full text-sm font-medium">품절</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="text-xs text-primary font-medium mb-1">
          {getCatLabel(categories, product.category)}
        </div>
        <h3 className="text-base font-bold text-foreground mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description.split("\n")[0]}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-primary">{product.priceText}</span>
          <div className="flex gap-2">
            <Link href={`/shop/product/${product.id}`}>
              <Button size="sm" variant="outline" className="text-xs">상세보기</Button>
            </Link>
            {product.inStock && (
              <Button
                size="sm"
                className="text-xs"
                onClick={handleAddToCart}
                data-testid={`btn-add-cart-${product.id}`}
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                담기
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const params = useParams<{ category?: string; sub?: string; subsub?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { totalCount } = useCart();

  const activeCategory = params.category;
  const activeSub = params.sub;
  const activeSubSub = params.subsub;

  // Load categories from API
  useEffect(() => {
    fetch(`${API_BASE}/api/categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []))
      .catch(() => setCategories([]));
  }, []);

  // Load products filtered by category levels
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `${API_BASE}/api/products`;
        const q: string[] = [];
        if (activeCategory) q.push(`category=${activeCategory}`);
        if (activeSub) q.push(`sub=${activeSub}`);
        if (activeSubSub) q.push(`subsub=${activeSubSub}`);
        if (q.length) url += "?" + q.join("&");
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory, activeSub, activeSubSub]);

  // Category tree helpers
  const topLevel = categories.filter((c) => !c.parentSlug).sort((a, b) => a.sortOrder - b.sortOrder);
  const childrenOf = (slug: string) =>
    categories.filter((c) => c.parentSlug === slug).sort((a, b) => a.sortOrder - b.sortOrder);

  // Sub-slug helpers (strip parent prefix)
  const getSubSlug = (cat: Category): string => {
    if (!cat.parentSlug) return cat.slug;
    const prefix = cat.parentSlug + "-";
    return cat.slug.startsWith(prefix) ? cat.slug.slice(prefix.length) : cat.slug;
  };

  // Resolved category objects from URL params
  const activeMidCatObj =
    activeCategory && activeSub
      ? findCatBySubSlug(categories, activeCategory, activeSub)
      : undefined;

  const activeLeafCatObj =
    activeMidCatObj && activeSubSub
      ? findCatBySubSlug(categories, activeMidCatObj.slug, activeSubSub)
      : undefined;

  const activeMidCats = activeCategory ? childrenOf(activeCategory) : [];
  const activeLeafCats = activeMidCatObj ? childrenOf(activeMidCatObj.slug) : [];

  // Page title (always shows name, never slug)
  const pageTitle = (() => {
    if (activeLeafCatObj) return activeLeafCatObj.name;
    if (activeMidCatObj) return activeMidCatObj.name;
    if (activeCategory) return getCatLabel(categories, activeCategory);
    return "전체 제품";
  })();

  // Breadcrumb (always shows name, never slug)
  const breadcrumb = [
    { label: "쇼핑", href: "/shop" },
    ...(activeCategory
      ? [{ label: getCatLabel(categories, activeCategory), href: `/shop/${activeCategory}` }]
      : []),
    ...(activeMidCatObj
      ? [{ label: activeMidCatObj.name, href: `/shop/${activeCategory}/${activeSub}` }]
      : []),
    ...(activeLeafCatObj
      ? [{ label: activeLeafCatObj.name, href: `/shop/${activeCategory}/${activeSub}/${activeSubSub}` }]
      : []),
  ];

  const pillCls = (active: boolean) =>
    cn(
      "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
      active
        ? "bg-primary text-white border-primary"
        : "bg-white text-stone-700 border-stone-200 hover:border-primary hover:text-primary"
    );

  const subPillCls = (active: boolean) =>
    cn(
      "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
      active
        ? "bg-stone-800 text-white border-stone-800"
        : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
    );

  return (
    <div className="min-h-screen pt-[104px]">
      {/* Page Header */}
      <div className="bg-stone-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">쇼핑(구매하기)</h1>
          <p className="text-stone-300">히노끼욕조 및 악세사리 구매</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb + Cart */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                <Link
                  href={crumb.href}
                  className={cn(
                    i === breadcrumb.length - 1
                      ? "text-foreground font-medium"
                      : "hover:text-primary"
                  )}
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
          </div>
          <Link href="/shop/cart">
            <Button variant="outline" size="sm" className="relative" data-testid="btn-cart">
              <ShoppingCart className="w-4 h-4 mr-1.5" />
              장바구니
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* 대분류 Filter Row */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Link href="/shop">
            <button className={pillCls(!activeCategory)}>전체</button>
          </Link>
          {topLevel.map((cat) => (
            <Link key={cat.slug} href={`/shop/${cat.slug}`}>
              <button className={pillCls(activeCategory === cat.slug)}>{cat.name}</button>
            </Link>
          ))}
        </div>

        {/* 중분류 Filter Row (shows when 대분류 is active and has children) */}
        {activeCategory && activeMidCats.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <Link href={`/shop/${activeCategory}`}>
              <button className={subPillCls(!activeSub)}>전체</button>
            </Link>
            {activeMidCats.map((cat) => {
              const subSlug = getSubSlug(cat);
              return (
                <Link key={cat.slug} href={`/shop/${activeCategory}/${subSlug}`}>
                  <button className={subPillCls(activeSub === subSlug)}>{cat.name}</button>
                </Link>
              );
            })}
          </div>
        )}

        {/* 소분류 Filter Row (shows when 중분류 is active and has children) */}
        {activeSub && activeLeafCats.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <Link href={`/shop/${activeCategory}/${activeSub}`}>
              <button
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-colors border",
                  !activeSubSub
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
                )}
              >
                전체
              </button>
            </Link>
            {activeLeafCats.map((cat) => {
              const subSubSlug = getSubSlug(cat);
              return (
                <Link key={cat.slug} href={`/shop/${activeCategory}/${activeSub}/${subSubSlug}`}>
                  <button
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-medium transition-colors border",
                      activeSubSub === subSubSlug
                        ? "bg-primary/10 text-primary border-primary/30"
                        : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
                    )}
                  >
                    {cat.name}
                  </button>
                </Link>
              );
            })}
          </div>
        )}

        {/* Section title */}
        {(activeCategory || activeSub || activeSubSub) && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">{pageTitle}</h2>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-stone-100 animate-pulse h-80" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm">등록된 제품이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} categories={categories} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
