import "../styles/fonts.css";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { KpiCards } from "./components/KpiCards";
import { ProductLookup } from "./components/ProductLookup";
import { SegmentExplorer } from "./components/SegmentExplorer";
import { BundleDiscovery } from "./components/BundleDiscovery";
import { DecisionAssistant } from "./components/DecisionAssistant";
import { SalesChart } from "./components/SalesChart";

function ProduceBubble({ emoji, style }: { emoji: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{ fontSize: "1.5rem", opacity: 0.12, ...style }}
    >
      {emoji}
    </div>
  );
}

export default function App() {
  /* MARKER-MAKE-KIT-INVOKED */
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [activeSection, setActiveSection] = useState("kpi-section");
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();
  const [selectedSegment, setSelectedSegment] = useState<string | undefined>();

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["kpi-section", "product-lookup-section", "segment-explorer-section", "bundle-discovery-section", "decision-assistant-section"];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", fontFamily: "'Inter', sans-serif", position: "relative", overflowX: "hidden" }}
    >
      {/* Subtle organic texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(46,125,50,0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,193,7,0.04) 0%, transparent 50%)`,
          zIndex: 0,
        }}
      />

      {/* Decorative background produce icons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <ProduceBubble emoji="🍌" style={{ top: "15%", right: "8%", fontSize: "3rem" }} />
        <ProduceBubble emoji="🥑" style={{ top: "45%", right: "3%", fontSize: "2.5rem" }} />
        <ProduceBubble emoji="🍋" style={{ top: "70%", left: "4%", fontSize: "2rem" }} />
        <ProduceBubble emoji="🌿" style={{ top: "30%", left: "2%", fontSize: "2.5rem" }} />
        <ProduceBubble emoji="🍓" style={{ bottom: "20%", right: "6%", fontSize: "2rem" }} />
        <ProduceBubble emoji="🍅" style={{ top: "60%", left: "3%", fontSize: "1.5rem" }} />
      </div>

      {/* Header */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Header 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      {/* Hero store image — square banner */}
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          maxHeight: "100vw",
          position: "relative",
          overflow: "hidden",
          background: "#1B5E20",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1670684684445-a4504dca0bbc?w=1400&h=1400&fit=crop&auto=format&q=85"
          alt="Bright supermarket aisle stocked with groceries and fresh produce"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        {/* Dark gradient overlay for text legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.82) 100%)",
          }}
        />
        {/* Text overlay at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "clamp(20px, 5vw, 48px)",
          }}
        >
          <div className="max-w-7xl mx-auto">
            <p style={{ fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)", fontWeight: 700, color: "#81C784", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>
              Retail Intelligence · Live Dashboard
            </p>
            <h1
              style={{
                margin: 0,
                color: "#FFFFFF",
                fontSize: "clamp(1.6rem, 5vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                textShadow: "0 2px 16px rgba(0,0,0,0.4)",
              }}
            >
              FreshMart Analytics
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                marginTop: "10px",
                fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
                maxWidth: "480px",
                lineHeight: 1.5,
              }}
            >
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {" · "}Real-time grocery analytics for smarter retail decisions.
            </p>
            {/* Quick stat pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: "3.4M Orders", emoji: "🛒" },
                { label: "206K Customers", emoji: "👥" },
                { label: "#1 Banana", emoji: "🍌" },
                { label: "Peak 10 AM", emoji: "☀️" },
              ].map((pill) => (
                <div
                  key={pill.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    fontSize: "clamp(0.7rem, 1.5vw, 0.8125rem)",
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  <span>{pill.emoji}</span>
                  <span>{pill.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8" style={{ position: "relative", zIndex: 1 }}>

        {/* Section 2: KPI Cards */}
        <div id="kpi-section" className="mb-6">
          <KpiCards />
        </div>

        {/* Weekly performance chart */}
        <div className="mb-6">
          <SalesChart />
        </div>

        {/* Section 3: Product Lookup */}
        <div id="product-lookup-section" className="mb-6">
          <ProductLookup onProductSelect={setSelectedProduct} />
        </div>

        {/* Section 4: Customer Segments + Bundle Discovery */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div id="segment-explorer-section">
            <SegmentExplorer onSegmentSelect={setSelectedSegment} />
          </div>
          <div id="bundle-discovery-section">
            <BundleDiscovery />
          </div>
        </div>

        {/* Section 5: AI Decision Assistant */}
        <div id="decision-assistant-section" className="mb-8">
          <DecisionAssistant selectedProduct={selectedProduct} selectedSegment={selectedSegment} />
        </div>

        {/* Footer */}
        <footer className="text-center py-4" style={{ borderTop: "1px solid var(--border)" }}>
          <p style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>
            FreshMart Retail Intelligence · Updated{" "}
            {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            <span className="mx-2">·</span>
            <span style={{ color: "#2E7D32", fontWeight: 500 }}>🌿 Powered by basket analytics</span>
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "8px" }}>
            This app was built by Goodness Osifo
          </p>
        </footer>
      </main>
    </div>
  );
}
