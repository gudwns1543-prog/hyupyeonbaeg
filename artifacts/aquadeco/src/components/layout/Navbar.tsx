import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ChevronRight, Phone, ShoppingBag, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const SOCIAL_LINKS = [
  {
    label: "스마트스토어",
    href: "https://smartstore.naver.com/hyu_hinokki",
    icon: <ShoppingBag className="w-3.5 h-3.5" />,
  },
  {
    label: "네이버 블로그",
    href: "https://blog.naver.com/phjphk1",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
      </svg>
    ),
  },
  {
    label: "인스타그램",
    href: "https://instagram.com/the_hyu_hinokki",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "유튜브",
    href: "https://www.youtube.com/@%ED%9C%B4%ED%8E%B8%EB%B0%B1",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const LOGO_URL = "https://cdn.imweb.me/thumbnail/20250512/ce3e25e3dd553.png";

type ShopCategory = { id: number; slug: string; name: string; parentSlug: string | null; sortOrder: number };
type PortfolioCat = { key: string; label: string; parent?: string };
type CatNode = { label: string; href: string; children: CatNode[] };

const DEFAULT_PORTFOLIO_CATS: PortfolioCat[] = [
  { key: "ujul", label: "히노끼욕조 유절" },
  { key: "mujul", label: "히노끼욕조 무절" },
  { key: "masame", label: "히노끼욕조 무절 마사메" },
  { key: "yangsan", label: "히노끼욕조 양산형" },
  { key: "yangsan_full", label: "히노끼 전신욕조", parent: "yangsan" },
  { key: "yangsan_half", label: "히노끼 반신욕조", parent: "yangsan" },
  { key: "location", label: "현장별 시공사례" },
];

function getSubSlug(cat: ShopCategory, cats: ShopCategory[]): string {
  if (!cat.parentSlug) return cat.slug;
  const prefix = cat.parentSlug + "-";
  return cat.slug.startsWith(prefix) ? cat.slug.slice(prefix.length) : cat.slug;
}

function buildShopTree(cats: ShopCategory[]): CatNode[] {
  const buildHref = (cat: ShopCategory): string => {
    if (!cat.parentSlug) return `/shop/${cat.slug}`;
    const parent = cats.find((c) => c.slug === cat.parentSlug);
    const sub = getSubSlug(cat, cats);
    if (!parent?.parentSlug) return `/shop/${cat.parentSlug}/${sub}`;
    const parentSub = getSubSlug(parent, cats);
    return `/shop/${parent.parentSlug}/${parentSub}/${sub}`;
  };
  const buildNodes = (parentSlug: string | null): CatNode[] =>
    cats
      .filter((c) => c.parentSlug === parentSlug)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((c) => ({ label: c.name, href: buildHref(c), children: buildNodes(c.slug) }));
  return buildNodes(null);
}

function buildPortfolioTree(cats: PortfolioCat[]): CatNode[] {
  const buildNodes = (parentKey?: string): CatNode[] =>
    cats
      .filter((c) => (c.parent ?? undefined) === parentKey)
      .map((c) => ({ label: c.label, href: `/portfolio/${c.key}`, children: buildNodes(c.key) }));
  return buildNodes(undefined);
}

function FlyoutMenu({
  items,
  show,
  className,
}: {
  items: CatNode[];
  show: boolean;
  className?: string;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = (idx: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHoveredIdx(idx);
  };
  const onLeave = () => {
    timerRef.current = setTimeout(() => setHoveredIdx(null), 160);
  };

  if (!show) return null;

  return (
    <div
      className={cn(
        "absolute bg-white border border-stone-200 rounded-lg shadow-xl min-w-[180px] py-1.5 z-[70]",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.href}
          className="relative"
          onMouseEnter={() => onEnter(idx)}
          onMouseLeave={onLeave}
        >
          <Link
            href={item.href}
            className="flex items-center justify-between px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-primary transition-colors whitespace-nowrap"
          >
            <span>{item.label}</span>
            {item.children.length > 0 && (
              <ChevronRight className="w-3.5 h-3.5 ml-6 opacity-40 shrink-0" />
            )}
          </Link>
          {item.children.length > 0 && hoveredIdx === idx && (
            <FlyoutMenu
              items={item.children}
              show
              className="left-full top-0 -mt-1.5"
            />
          )}
        </div>
      ))}
    </div>
  );
}

type SubItem = { label: string; href: string };

function DropdownMenu({ items, show }: { items: SubItem[]; show: boolean }) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 bg-white border border-stone-200 rounded-lg shadow-xl min-w-[200px] py-1.5 z-50 transition-all duration-150",
        show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
      )}
    >
      {items.map((sub) => (
        <Link
          key={sub.href}
          href={sub.href}
          className="block px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-primary transition-colors"
        >
          {sub.label}
        </Link>
      ))}
    </div>
  );
}

type StaticNavItem = { label: string; href: string; children?: SubItem[] };
type DynamicNavItem = { label: string; href: string; dynamic: "shop" | "portfolio" };
type NavItem = StaticNavItem | DynamicNavItem;

function isDynamic(item: NavItem): item is DynamicNavItem {
  return "dynamic" in item;
}

const STATIC_NAV: NavItem[] = [
  { label: "홈", href: "/" },
  {
    label: "회사소개",
    href: "/about",
    children: [
      { label: "CEO 인사말", href: "/about/ceo" },
      { label: "경영이념", href: "/about/philosophy" },
      { label: "주요실적", href: "/about/achievements" },
      { label: "찾아오시는 길", href: "/about/location" },
    ],
  },
  {
    label: "사업소개",
    href: "/business",
    children: [
      { label: "히노끼란", href: "/business/hinoki" },
      { label: "제작방식", href: "/business/production" },
      { label: "관리방법", href: "/business/care" },
      { label: "원산지증명", href: "/business/certificate" },
    ],
  },
  { label: "쇼핑(구매하기)", href: "/shop", dynamic: "shop" },
  { label: "현장 시공사례", href: "/portfolio", dynamic: "portfolio" },
  { label: "시공일정", href: "/schedule" },
  {
    label: "고객센터",
    href: "/contact",
    children: [
      { label: "고객센터", href: "/contact" },
      { label: "견적문의", href: "/inquiry" },
      { label: "공지사항", href: "/notice" },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [location] = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { totalCount } = useCart();

  const [shopTree, setShopTree] = useState<CatNode[]>([]);
  const [portfolioTree, setPortfolioTree] = useState<CatNode[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/categories`)
      .then((r) => r.json())
      .then((d) => setShopTree(buildShopTree(d.categories || [])))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/api/content/portfolio_categories`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) { setPortfolioTree(buildPortfolioTree(DEFAULT_PORTFOLIO_CATS)); return; }
        try {
          const raw: PortfolioCat[] = JSON.parse(d.value || "[]");
          setPortfolioTree(buildPortfolioTree(raw.length ? raw : DEFAULT_PORTFOLIO_CATS));
        } catch { setPortfolioTree(buildPortfolioTree(DEFAULT_PORTFOLIO_CATS)); }
      })
      .catch(() => setPortfolioTree(buildPortfolioTree(DEFAULT_PORTFOLIO_CATS)));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setExpandedMobile(null);
  }, [location]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 160);
  };

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location === href || location.startsWith(href + "/");
  };

  const getDynamicTree = (item: DynamicNavItem): CatNode[] =>
    item.dynamic === "shop" ? shopTree : portfolioTree;

  const flattenForMobile = (nodes: CatNode[], depth = 0): { node: CatNode; depth: number }[] =>
    nodes.flatMap((n) => [{ node: n, depth }, ...flattenForMobile(n.children, depth + 1)]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled ? "bg-white/98 backdrop-blur-md shadow-md" : "bg-white/95 backdrop-blur-sm shadow-sm"
      )}
    >
      {/* Social Top Bar */}
      <div className="bg-primary text-primary-foreground border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-end h-9 gap-1">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              {link.icon}
              <span className="hidden sm:inline">{link.label}</span>
            </a>
          ))}
          <div className="w-px h-4 bg-primary-foreground/20 mx-1" />
          <a
            href="tel:031-501-3069"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span className="hidden sm:inline">031-501-3069</span>
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src={LOGO_URL}
              alt="휴편백 로고"
              className="h-9 md:h-10 w-auto object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <span className="text-xl font-bold text-foreground tracking-tight" data-testid="nav-logo">
              휴편백
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {STATIC_NAV.map((item) => {
              const hasDrop = isDynamic(item)
                ? getDynamicTree(item).length > 0
                : !!(item as StaticNavItem).children?.length;
              const isShowing = activeDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDrop && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-0.5 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                      isActive(item.href)
                        ? "text-primary"
                        : "text-stone-700 hover:text-primary hover:bg-stone-50"
                    )}
                  >
                    {item.label}
                    {hasDrop && <ChevronDown className="w-3.5 h-3.5 mt-0.5 opacity-60" />}
                  </Link>

                  {isDynamic(item) ? (
                    <div
                      className={cn(
                        "absolute top-full left-0 transition-all duration-150 z-50",
                        isShowing ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                      )}
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <FlyoutMenu items={getDynamicTree(item)} show={isShowing} />
                    </div>
                  ) : (
                    (item as StaticNavItem).children && (
                      <DropdownMenu items={(item as StaticNavItem).children!} show={isShowing} />
                    )
                  )}
                </div>
              );
            })}
          </nav>

          {/* Phone + Cart + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <a
              href="tel:010-5918-7778"
              className="hidden xl:flex items-center gap-1.5 text-sm font-medium text-stone-700 hover:text-primary transition-colors mr-1"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>010-5918-7778</span>
            </a>
            <Link href="/shop/cart">
              <button
                className="relative p-2 rounded-md text-stone-700 hover:text-primary transition-colors"
                aria-label="장바구니"
                data-testid="btn-cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                    {totalCount > 9 ? "9+" : totalCount}
                  </span>
                )}
              </button>
            </Link>
            <button
              className="lg:hidden p-2 rounded-md text-stone-700 hover:text-primary transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="메뉴 열기/닫기"
              data-testid="btn-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-stone-100",
          mobileOpen ? "max-h-[85vh] overflow-y-auto" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 py-3 space-y-0.5">
          {STATIC_NAV.map((item) => {
            const isExpanded = expandedMobile === item.label;
            let subItems: { label: string; href: string; depth: number }[] = [];

            if (isDynamic(item)) {
              subItems = flattenForMobile(getDynamicTree(item)).map((e) => ({
                label: e.node.label,
                href: e.node.href,
                depth: e.depth,
              }));
            } else {
              subItems = ((item as StaticNavItem).children || []).map((c) => ({
                label: c.label,
                href: c.href,
                depth: 0,
              }));
            }

            const hasSubs = subItems.length > 0;

            return (
              <div key={item.label}>
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex-1 py-3 text-sm font-medium transition-colors",
                      isActive(item.href) ? "text-primary" : "text-stone-800"
                    )}
                  >
                    {item.label}
                  </Link>
                  {hasSubs && (
                    <button
                      className="p-2 text-stone-500"
                      onClick={() => setExpandedMobile(isExpanded ? null : item.label)}
                    >
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isExpanded ? "rotate-180" : ""
                        )}
                      />
                    </button>
                  )}
                </div>

                {hasSubs && isExpanded && (
                  <div className="ml-3 mb-2 border-l-2 border-primary/20 pl-4 space-y-0.5">
                    {subItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block py-2 text-sm text-stone-600 hover:text-primary transition-colors"
                        style={{ paddingLeft: sub.depth * 12 }}
                      >
                        {sub.depth > 0 ? "└ " : ""}{sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="pt-3 pb-4 border-t border-stone-100 mt-2">
            <a href="tel:010-5918-7778" className="flex items-center gap-2 py-2 text-sm text-stone-700">
              <Phone className="w-4 h-4 text-primary" />
              <span>010-5918-7778</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
