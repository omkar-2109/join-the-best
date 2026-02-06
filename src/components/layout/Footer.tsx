import { Link } from "react-router-dom";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="gradient-navy text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <span className="font-display text-sm font-bold text-accent-foreground">B</span>
              </div>
              <div>
                <div className="font-display text-lg font-bold">BBS</div>
                <div className="text-xs text-primary-foreground/70">Benefit Business Solutions Pvt Ltd</div>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70">
              Connecting global talent with opportunity. Your trusted recruitment partner for world-class hiring.
            </p>
            <div className="flex gap-3">
              <a
                href="https://in.linkedin.com/company/benefit-business-solutions-pvt-ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/bbs_pvt.ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Job Seekers */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold">For Job Seekers</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/jobs" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">Browse Jobs</Link>
              <Link to="/companies" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">Companies</Link>
              <Link to="/seeker-dashboard" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">My Dashboard</Link>
              <Link to="/candidate/1" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">Profile</Link>
            </nav>
          </div>

          {/* Recruiters */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold">For Recruiters</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/recruiter-dashboard" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">Dashboard</Link>
              <Link to="/ats" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">Applicant Tracking</Link>
              <Link to="/about" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">About Us</Link>
              <Link to="/signup" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">Get Started</Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold">Stay Updated</h4>
            <p className="text-sm text-primary-foreground/70">Get the latest job opportunities and hiring insights.</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40"
              />
              <Button size="sm" className="shrink-0 bg-accent text-accent-foreground hover:bg-gold-dark">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-primary-foreground/50">
              © {new Date().getFullYear()} Benefit Business Solutions Pvt Ltd. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link to="#" className="text-xs text-primary-foreground/50 hover:text-accent">Privacy Policy</Link>
              <Link to="#" className="text-xs text-primary-foreground/50 hover:text-accent">Terms of Service</Link>
              <Link to="#" className="text-xs text-primary-foreground/50 hover:text-accent">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
