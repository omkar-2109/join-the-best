import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "For Recruiters", href: "/recruiter-dashboard" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="font-display text-sm font-bold text-primary-foreground">B</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-lg font-bold text-foreground">BBS</span>
            <span className="ml-1 hidden text-xs text-muted-foreground lg:inline">Benefit Business Solutions</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground ${
                location.pathname === link.href
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-gold-dark" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
                  location.pathname === link.href
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-border pt-3">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to="/login" onClick={() => setMobileOpen(false)}>Sign In</Link>
              </Button>
              <Button size="sm" className="flex-1 bg-accent text-accent-foreground hover:bg-gold-dark" asChild>
                <Link to="/signup" onClick={() => setMobileOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
