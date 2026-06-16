import { Lightbulb, Heart, Package, Sun, CheckCircle, TrendingUp, Users, ShoppingBag } from "lucide-react";
import { useState, useMemo } from "react";

interface DecisionAssistantProps {
  selectedProduct?: string;
  selectedSegment?: string;
}

export function DecisionAssistant({ selectedProduct, selectedSegment }: DecisionAssistantProps) {
  const [applied, setApplied] = useState<Set<string>>(new Set());

  const recommendations = useMemo(() => {
    const baseRecommendations = [
      {
        id: "winback",
        icon: Heart,
        iconBg: "#FCE4EC",
        iconColor: "#C62828",
        emoji: "💌",
        title: "Win-back Campaign",
        desc: "31,620 hibernating customers haven't purchased in 90+ days. A targeted email with a 15% coupon on their last category could recover 18–22% of this segment.",
        tag: "High Impact",
        tagColor: "#C62828",
        tagBg: "#FCE4EC",
        applyColor: "#C62828",
        applyBg: "#FCE4EC",
      },
      {
        id: "guacamole",
        icon: Package,
        iconBg: "#E8F5E9",
        iconColor: "#2E7D32",
        emoji: "🥑",
        title: "Guacamole Bundle",
        desc: "Avocado + Lime + Cilantro shows a 7.89 lift score. Bundle these in a 'Taco Night' pack at a 5% discount — projected +12% basket size on weekend transactions.",
        tag: "Bundle Opportunity",
        tagColor: "#2E7D32",
        tagBg: "#E8F5E9",
        applyColor: "#2E7D32",
        applyBg: "#E8F5E9",
      },
      {
        id: "sunday",
        icon: Sun,
        iconBg: "#FFFDE7",
        iconColor: "#F9A825",
        emoji: "☀️",
        title: "Sunday Promo",
        desc: "Sunday 10 AM is your busiest hour. Deploy a flash deal on Bananas and Strawberries starting at 9:30 AM — estimated +8% conversion on the AM produce category.",
        tag: "Peak Timing",
        tagColor: "#E65100",
        tagBg: "#FFF3E0",
        applyColor: "#E65100",
        applyBg: "#FFF3E0",
      },
    ];

    // Add dynamic recommendations based on selections
    const dynamicRecs: any[] = [];

    if (selectedProduct) {
      dynamicRecs.push({
        id: "product-promo",
        icon: ShoppingBag,
        iconBg: "#E3F2FD",
        iconColor: "#1565C0",
        emoji: "🛒",
        title: `Promote ${selectedProduct}`,
        desc: `Based on association analysis, ${selectedProduct} has strong cross-sell potential. Feature it in a "Frequently Bought Together" section to increase basket size by ~15%.`,
        tag: "Product Focus",
        tagColor: "#1565C0",
        tagBg: "#E3F2FD",
        applyColor: "#1565C0",
        applyBg: "#E3F2FD",
      });
    }

    if (selectedSegment) {
      const segmentActions: Record<string, string> = {
        "Champions (Best Customers)": "Offer VIP loyalty program with exclusive early access to new products",
        "At Risk (High Value)": "Send 20% discount offer to re-engage high-value customers",
        "Hibernating": "Send 15% reactivation offer with personalized product recommendations",
        "Loyal Customers": "Offer bundle deals to increase purchase frequency",
        "Potential Loyalists": "Encourage more purchases with loyalty points bonus",
        "New Customers": "Welcome email with 10% off on next order",
        "Need Attention": "Send personalized recommendations based on purchase history",
      };

      dynamicRecs.push({
        id: "segment-action",
        icon: Users,
        iconBg: "#F3E5F5",
        iconColor: "#7B1FA2",
        emoji: "👥",
        title: `${selectedSegment} Action`,
        desc: segmentActions[selectedSegment] || "Review segment behavior and create targeted campaign",
        tag: "Segment Targeted",
        tagColor: "#7B1FA2",
        tagBg: "#F3E5F5",
        applyColor: "#7B1FA2",
        applyBg: "#F3E5F5",
      });
    }

    if (selectedProduct && selectedSegment) {
      dynamicRecs.push({
        id: "combined-strategy",
        icon: TrendingUp,
        iconBg: "#FFF3E0",
        iconColor: "#E65100",
        emoji: "📈",
        title: "Combined Strategy",
        desc: `Target ${selectedSegment} with ${selectedProduct} promotions. This personalized approach could increase conversion by 25% and average order value by 18%.`,
        tag: "High Priority",
        tagColor: "#E65100",
        tagBg: "#FFF3E0",
        applyColor: "#E65100",
        applyBg: "#FFF3E0",
      });
    }

    return [...dynamicRecs, ...baseRecommendations];
  }, [selectedProduct, selectedSegment]);

  return (
    <section>
      <div
        className="rounded-[12px] p-6"
        style={{
          background: "linear-gradient(135deg, #F1F8E9 0%, #E8F5E9 100%)",
          border: "1.5px solid #A5D6A7",
          boxShadow: "0 2px 12px rgba(46,125,50,0.1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-[10px] flex items-center justify-center"
            style={{ background: "#2E7D32" }}
          >
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 style={{ margin: 0, color: "#1B5E20" }}>AI Recommendations</h2>
            <p style={{ fontSize: "0.8125rem", color: "#5A7A5A", margin: 0 }}>
              Powered by retail basket analytics · Updated Jun 12, 2026
            </p>
          </div>
        </div>

        {/* Tiles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => {
            const Icon = rec.icon;
            const isApplied = applied.has(rec.id);

            return (
              <div
                key={rec.id}
                className="rounded-[12px] p-5 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  background: "var(--card)",
                  border: isApplied ? `1.5px solid ${rec.applyColor}` : "1px solid var(--border)",
                  boxShadow: isApplied ? `0 0 0 3px ${rec.applyColor}18` : "0 1px 6px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-9 h-9 rounded-[9px] flex items-center justify-center"
                    style={{ background: rec.iconBg }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: rec.iconColor, width: "18px", height: "18px" }} />
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{ background: rec.tagBg, fontSize: "0.7rem", fontWeight: 700, color: rec.tagColor, letterSpacing: "0.03em" }}
                  >
                    {rec.tag}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ fontSize: "1.125rem" }}>{rec.emoji}</span>
                    <p style={{ fontWeight: 700, color: "var(--foreground)", margin: 0, fontSize: "0.9375rem" }}>
                      {rec.title}
                    </p>
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)", margin: 0, lineHeight: 1.6 }}>
                    {rec.desc}
                  </p>
                </div>

                <button
                  onClick={() => setApplied((prev) => {
                    const next = new Set(prev);
                    if (next.has(rec.id)) next.delete(rec.id);
                    else next.add(rec.id);
                    return next;
                  })}
                  className="mt-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-[8px] transition-all hover:opacity-90 active:scale-[0.97]"
                  style={{
                    background: isApplied ? rec.applyColor : rec.applyBg,
                    color: isApplied ? "#fff" : rec.applyColor,
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    border: "none",
                    cursor: "pointer",
                    minHeight: "44px",
                  }}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Applied
                    </>
                  ) : (
                    "Apply"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
