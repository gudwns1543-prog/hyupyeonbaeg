import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const LOGO_URL = "https://cdn.imweb.me/thumbnail/20250512/ce3e25e3dd553.png";

type SubItem = { label: string; href: string };
type MegaGroup = { heading: string; href: string; items: SubItem[] };
type PlainNavItem = { label: string; href: string; children?: SubItem[] };
type MegaNavItem = { label: string; href: string; mega: MegaGroup[] };
type NavItem = PlainNavItem | MegaNavItem;

function isMegaItem(item: NavItem): item is MegaNavItem {
  return "mega" in item;
}

const navItems: NavItem[] = [
  { label: "홈", href: "/" },
  {
    label: "회사소개",
    href: "/about",
    children: [
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
  {
    label: "쇼핑(구매하기)",
    href: "/shop",
    mega: [
      {
        heading: "히노끼욕조",
        href: "/shop/bath",
        items: [
          { label: "반신욕조", href: "/shop/bath/half" },
          { label: "전신욕조", href: "/shop/bath/full" },
          { label: "주문제작형욕조", href: "/shop/bath/custom" },
          { label: "할인제품", href: "/shop/bath/sale" },
        ],
      },
      {
        heading: "악세사리",
        href: "/shop/accessory",
        items: [
          { label: "데크수전", href: "/shop/accessory/deck" },
          { label: "목함수전", href: "/shop/accessory/box" },
          { label: "외부계단", href: "/shop/accessory/stairs" },
          { label: "월풀 시스템", href: "/shop/accessory/whirlpool" },
        ],
      },
    ],
  },
  {
    label: "현장 시공사례",
    href: "/portfolio",
    children: [
      { label: "히노끼욕조 유절", href: "/portfolio/ujul" },
      { label: "히노끼욕조 무절", href: "/portfolio/mujul" },
      { label: "히노끼욕조 무절 마사메", href: "/portfolio/masame" },
      { label: "히노끼욕조 양산형", href: "/portfolio/yangsan" },
      { label: "현장별 시공사례", href: "/portfolio/location" },
    ],
  },
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

function MegaMenu({ groups, show }: { groups: MegaGroup[]; show: boolean }) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 bg-white border border-stone-200 rounded-lg shadow-xl py-4 px-2 z-50 transition-all duration-150 flex gap-2",
        show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
      )}
    >
      {groups.map((group) => (
        <div key={group.href} className="min-w-[160px]">
          <Link
            href={group.href}
            className="block px-3 pb-2 text-xs font-bold text-stone-500 uppercase tracking-wider hover:text-primary"
          >
            {group.heading}
          </Link>
          <div className="border-t border-stone-100 pt-1">
            {group.items.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="block px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-primary transition-colors rounded"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [location] = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location === href || location.startsWith(href + "/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled ? "bg-white/98 backdrop-blur-md shadow-md" : "bg-white/95 backdrop-blur-sm shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src={LOGO_URL}
              alt="휴편백 로고"
              className="h-9 md:h-10 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="text-xl font-bold text-foreground tracking-tight" data-testid="nav-logo">
              휴편백
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              const hasDropdown =
                (isMegaItem(item)) ||
                (!isMegaItem(item) && item.children && item.children.length > 0);

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
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
                    {hasDropdown && <ChevronDown className="w-3.5 h-3.5 mt-0.5 opacity-60" />}
                  </Link>

                  {!isMegaItem(item) && item.children && (
                    <DropdownMenu items={item.children} show={activeDropdown === item.label} />
                  )}
                  {isMegaItem(item) && (
                    <MegaMenu groups={item.mega} show={activeDropdown === item.label} />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Phone + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:010-0000-0000"
              className="hidden xl:flex items-center gap-1.5 text-sm font-medium text-stone-700 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>010-0000-0000</span>
            </a>
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
          {navItems.map((item) => {
            const hasSubs =
              isMegaItem(item) ||
              (!isMegaItem(item) && item.children && item.children.length > 0);
            const isExpanded = expandedMobile === item.label;

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
                    {isMegaItem(item)
                      ? item.mega.map((group) => (
                          <div key={group.href}>
                            <Link
                              href={group.href}
                              className="block py-1.5 text-xs font-bold text-stone-400 uppercase tracking-wide mt-2"
                            >
                              {group.heading}
                            </Link>
                            {group.items.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="block py-2 text-sm text-stone-600 hover:text-primary"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        ))
                      : (item as PlainNavItem).children?.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block py-2 text-sm text-stone-600 hover:text-primary"
                          >
                            {sub.label}
                          </Link>
                        ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="pt-3 pb-4 border-t border-stone-100 mt-2">
            <a href="tel:010-0000-0000" className="flex items-center gap-2 py-2 text-sm text-stone-700">
              <Phone className="w-4 h-4 text-primary" />
              <span>010-0000-0000</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
