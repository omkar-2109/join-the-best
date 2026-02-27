import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Briefcase, ArrowLeft } from "lucide-react";

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Pipeline", href: "/admin/pipeline", icon: Users },
  { label: "Manage Roles", href: "/admin/roles", icon: Briefcase },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
          <img src="/favicon.png" alt="BBS" className="h-8 w-8 rounded-lg" />
          <div>
            <div className="font-display text-sm font-bold text-sidebar-foreground">BBS Admin</div>
            <div className="text-[10px] text-sidebar-foreground/60">Internal Dashboard</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <Link to="/" className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground">
            <ArrowLeft className="h-3 w-3" /> Back to Platform
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-4 md:hidden">
          <Link to="/" className="flex items-center gap-2">
            <img src="/favicon.png" alt="BBS" className="h-7 w-7 rounded-lg" />
            <span className="font-display text-sm font-bold text-foreground">BBS Admin</span>
          </Link>
          <nav className="flex gap-1 overflow-x-auto">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                  location.pathname === link.href ? "bg-secondary text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1 bg-background">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
