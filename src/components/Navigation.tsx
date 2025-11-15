import { NavLink } from "@/components/NavLink";
import { Home, MessageSquare, BookOpen, FileText, Users, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
        <TooltipProvider>
          <div className="flex items-center justify-center space-x-2">
            {navItems.map((item) => (
              <Tooltip key={item.to}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className="p-3 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                    activeClassName="text-primary bg-muted"
                  >
                    <item.icon className="h-5 w-5" />
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default Navigation;
