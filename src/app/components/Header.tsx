import { ShoppingCart, Menu, X, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { id: "overview", label: "Dashboard", sectionId: "kpi-section" },
  { id: "products", label: "Products", sectionId: "product-lookup-section" },
  { id: "customers", label: "Customers", sectionId: "segment-explorer-section" },
  { id: "bundles", label: "Bundles", sectionId: "bundle-discovery-section" },
  { id: "assistant", label: "Assistant", sectionId: "decision-assistant-section" },
];

interface HeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

export function Header({ selectedDate, onDateChange, activeSection, onSectionChange }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      if (onSectionChange) onSectionChange(sectionId);
    }
  };

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Green gradient bar */}
      <div
        style={{
          background: "linear-gradient(90deg, #1B5E20 0%, #2E7D32 40%, #388E3C 70%, #43A047 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.2)" }}>
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-semibold tracking-tight" style={{ fontSize: "1.1rem" }}>
                FreshMart
              </span>
              <span className="text-white/60 ml-2 hidden sm:inline" style={{ fontSize: "0.75rem", fontWeight: 400 }}>
                Retail Intelligence
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.sectionId)}
                className="text-white/80 hover:text-white transition-colors"
                style={{ 
                  fontSize: "0.875rem", 
                  fontWeight: 500,
                  borderBottom: activeSection === link.sectionId ? "2px solid white" : "none",
                  paddingBottom: activeSection === link.sectionId ? "2px" : "0"
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Date selector + mobile hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-lg px-3 py-1.5"
              style={{ background: "rgba(255,255,255,0.15)" }}>
              <Calendar className="w-4 h-4 text-white/80" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="bg-transparent text-white border-none outline-none cursor-pointer"
                style={{ fontSize: "0.8125rem", colorScheme: "dark" }}
              />
            </div>
            <button
              className="md:hidden p-2 rounded-lg text-white"
              style={{ background: "rgba(255,255,255,0.15)", minHeight: "44px", minWidth: "44px" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden"
          style={{ background: "#1B5E20" }}>
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.sectionId)}
                className="text-white/90 py-2.5 px-3 rounded-lg hover:bg-white/10 transition-colors text-left"
                style={{ 
                  fontSize: "0.9375rem", 
                  minHeight: "44px", 
                  display: "flex", 
                  alignItems: "center",
                  borderBottom: activeSection === link.sectionId ? "2px solid white" : "none"
                }}
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-2 mt-2 px-3 py-2.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.1)" }}>
              <Calendar className="w-4 h-4 text-white/80" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="bg-transparent text-white border-none outline-none"
                style={{ fontSize: "0.875rem", colorScheme: "dark" }}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
