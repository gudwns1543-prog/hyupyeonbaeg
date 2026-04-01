import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "홈" },
  { href: "/services", label: "사업소개" },
  { href: "/portfolio", label: "시공사례" },
  { href: "/inquiry", label: "견적문의" },
  { href: "/contact", label: "고객센터" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-border/40 transition-all shadow-sm">
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-bold text-primary cursor-pointer tracking-tight flex items-center gap-2" data-testid="nav-logo">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">휴</span>
            </div>
            휴편백
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                  location === link.href ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
                )}
                data-testid={`nav-link-${link.href.replace("/", "") || "home"}`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-primary p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="btn-mobile-menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border p-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block text-lg font-medium p-3 rounded-md transition-colors cursor-pointer",
                  location === link.href ? "bg-primary/5 text-primary" : "text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
