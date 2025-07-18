import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Header = () => {
  const navItems = [
    { to: "/", label: "Dashboard", icon: "LayoutDashboard" },
    { to: "/my-guides", label: "My Guides", icon: "BookOpen" },
    { to: "/templates", label: "Templates", icon: "Folder" },
    { to: "/settings", label: "Settings", icon: "Settings" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-surface-200 backdrop-blur-premium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ApperIcon name="Compass" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gradient-primary">Shepherd</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary-50 text-primary-600"
                      : "text-surface-600 hover:text-surface-900 hover:bg-surface-50"
                  )
                }
              >
                <ApperIcon name={item.icon} size={16} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="accent" size="sm">
              <ApperIcon name="Plus" size={16} />
              <span className="ml-2 hidden sm:inline">New Guide</span>
            </Button>
            
            <Button variant="ghost" size="sm">
              <ApperIcon name="HelpCircle" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;