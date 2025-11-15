import { NavLink } from "@/components/NavLink";
import { Home, MessageSquare, BookOpen, FileText, Users, Info } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/interview", label: "Interview Practice", icon: MessageSquare },
    { to: "/question-bank", label: "Question Bank", icon: BookOpen },
    { to: "/resume-review", label: "Resume Review", icon: FileText },
    { to: "/talk-to-industry", label: "Talk to Industry", icon: Users },
    { to: "/about", label: "About Us", icon: Info },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-1 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              activeClassName="text-primary border-b-2 border-primary"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
