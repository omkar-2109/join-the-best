import { Link } from "react-router-dom";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => (
  <footer className="gradient-navy text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="BBS Logo" className="h-9 w-9 rounded-lg" />
            <div>
              <div className="font-display text-lg font-bold">BBS</div>
              <div className="text-xs text-primary-foreground/70">Benefit Business Solutions Pvt Ltd</div>
            </div>
          </div>
          <p className="text-sm text-primary-foreground/70">
            Your trusted recruitment partner. We connect talent with opportunity through a platform-managed hiring process.
          </p>
          <div className="flex gap-3">
            <a href="https://in.linkedin.com/company/benefit-business-solutions-pvt-ltd" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/bbs_pvt.ltd/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Candidates */}
        <div className="space-y-3">
          <h4 className="font-display text-sm font-semibold">For Candidates</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/jobs" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">Browse Roles</Link>
            <Link to="/seeker-dashboard" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">My Dashboard</Link>
            <Link to="/signup" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">Register</Link>
          </nav>
        </div>

        {/* Company */}
        <div className="space-y-3">
          <h4 className="font-display text-sm font-semibold">Company</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/about" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">About Us</Link>
            <Link to="#" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">How It Works</Link>
            <Link to="#" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">Privacy Policy</Link>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="space-y-3">
          <h4 className="font-display text-sm font-semibold">Stay Updated</h4>
          <p className="text-sm text-primary-foreground/70">Get the latest role openings delivered to your inbox.</p>
          <div className="flex gap-2">
            <Input type="email" placeholder="Your email" className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40" />
            <Button size="sm" className="shrink-0 bg-accent text-accent-foreground hover:bg-gold-dark">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-primary-foreground/10 pt-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-primary-foreground/50">© {new Date().getFullYear()} Benefit Business Solutions Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="text-xs text-primary-foreground/50 hover:text-accent">Privacy Policy</Link>
            <Link to="#" className="text-xs text-primary-foreground/50 hover:text-accent">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
