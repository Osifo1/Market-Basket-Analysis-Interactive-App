import { Users, ChevronRight, Zap, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";
import { parseCustomerSegments } from "../../data/parseData";

interface CustomerSegment {
  segment: string;
  count: number;
  avgFrequency: number;
  avgRecency: number;
  avgOrders: number;
}

interface SegmentExplorerProps {
  onSegmentSelect?: (segment: string) => void;
}

const segmentConfig: Record<string, { emoji: string; color: string; textColor: string; borderColor: string; desc: string; action: string }> = {
  "Champions": {
    emoji: "🏆",
    color: "#E8F5E9",
    textColor: "#2E7D32",
    borderColor: "#A5D6A7",
    desc: "High frequency, high spend",
    action: "VIP program: Early access, exclusive discounts",
  },
  "Loyal": {
    emoji: "❤️",
    color: "#FCE4EC",
    textColor: "#AD1457",
    borderColor: "#F48FB1",
    desc: "Regular repeat customers",
    action: "Loyalty rewards: Points multiplier on next purchase",
  },
  "At Risk": {
    emoji: "⚠️",
    color: "#FFF3E0",
    textColor: "#E65100",
    borderColor: "#FFCC80",
    desc: "Declining purchase frequency",
    action: "URGENT: Send 15% win-back offer within 7 days",
  },
  "Hibernating": {
    emoji: "💤",
    color: "#EDE7F6",
    textColor: "#4527A0",
    borderColor: "#CE93D8",
    desc: "No purchase in 90+ days",
    action: "Re-engagement campaign: 15% off next order",
  },
  "Potential": {
    emoji: "🌟",
    color: "#E3F2FD",
    textColor: "#1565C0",
    borderColor: "#90CAF9",
    desc: "Recent customers with potential",
    action: "Encourage more purchases: Buy 2 get 1 free",
  },
  "New": {
    emoji: "🆕",
    color: "#FFFDE7",
    textColor: "#F9A825",
    borderColor: "#FFF59D",
    desc: "Recently joined",
    action: "Welcome email with 10% off on next order",
  },
  "Need Attention": {
    emoji: "👀",
    color: "#F3E5F5",
    textColor: "#7B1FA2",
    borderColor: "#CE93D8",
    desc: "Average frequency, recent activity",
    action: "Personalized recommendations based on purchase history",
  },
};

export function SegmentExplorer({ onSegmentSelect }: SegmentExplorerProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRecommendation, setShowRecommendation] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/customer_segments.csv');
        const csvContent = await response.text();
        const parsedSegments = await parseCustomerSegments(csvContent);
        setSegments(parsedSegments);
      } catch (error) {
        console.error('Error loading customer segments:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSegmentClick = (segment: string) => {
    if (onSegmentSelect) {
      onSegmentSelect(segment);
    }
  };

  const handleGetRecommendation = (segment: string) => {
    setShowRecommendation(showRecommendation === segment ? null : segment);
  };

  const getSegmentConfig = (segmentName: string) => {
    // Try to match by partial name
    for (const [key, config] of Object.entries(segmentConfig)) {
      if (segmentName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(segmentName.toLowerCase())) {
        return config;
      }
    }
    // Default config
    return {
      emoji: "👥",
      color: "#F5F5F5",
      textColor: "#666",
      borderColor: "#DDD",
      desc: "Customer segment",
      action: "Review segment behavior",
    };
  };

  return (
    <div
      className="rounded-[12px] p-6 flex flex-col"
      style={{
        background: "var(--card)",
        boxShadow: "0 2px 12px rgba(46,125,50,0.08), 0 1px 3px rgba(0,0,0,0.05)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-2 mb-5">
        <Users className="w-5 h-5" style={{ color: "#2E7D32" }} />
        <h3 style={{ color: "var(--foreground)", margin: 0 }}>Customer Segments</h3>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "20px", color: "var(--muted-foreground)" }}>
          Loading data...
        </div>
      ) : (
        <div className="flex flex-col gap-3 flex-1">
          {segments.map((seg: CustomerSegment) => {
            const config = getSegmentConfig(seg.segment);
            return (
              <div key={seg.segment} className="rounded-[10px] overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                {/* Segment card */}
                <div 
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleSegmentClick(seg.segment)}
                >
                  <span style={{ fontSize: "1.25rem" }}>{config.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontWeight: 600, color: "var(--foreground)", margin: 0, fontSize: "0.9375rem" }}>
                      {seg.segment}
                    </p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)", margin: 0 }}>
                      {config.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p style={{ fontWeight: 700, color: config.textColor, margin: 0, fontSize: "0.875rem" }}>
                        {seg.count.toLocaleString()}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", margin: 0 }}>
                        customers
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                  </div>
                </div>

                {/* Expanded details */}
                {selected === seg.segment && (
                  <div style={{ borderTop: "1px solid var(--border)", padding: "12px 16px", background: "var(--secondary)" }}>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", margin: 0, marginBottom: "4px" }}>Avg Orders</p>
                        <p style={{ fontWeight: 700, color: "var(--foreground)", margin: 0, fontSize: "1rem" }}>
                          {seg.avgOrders.toFixed(1)}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", margin: 0, marginBottom: "4px" }}>Avg Frequency</p>
                        <p style={{ fontWeight: 700, color: "var(--foreground)", margin: 0, fontSize: "1rem" }}>
                          {seg.avgFrequency.toFixed(1)}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", margin: 0, marginBottom: "4px" }}>Avg Recency</p>
                        <p style={{ fontWeight: 700, color: "var(--foreground)", margin: 0, fontSize: "1rem" }}>
                          {seg.avgRecency.toFixed(1)} days
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGetRecommendation(seg.segment);
                      }}
                      className="w-full rounded-[8px] py-2 px-4 flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
                      style={{
                        background: config.textColor,
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        border: "none",
                        minHeight: "40px",
                      }}
                    >
                      <Lightbulb className="w-4 h-4" />
                      Get Recommendation
                    </button>
                  </div>
                )}

                {/* Recommendation display */}
                {showRecommendation === seg.segment && (
                  <div 
                    className="px-4 py-3 flex items-start gap-2"
                    style={{ borderTop: "1px solid var(--border)", background: config.color + "30" }}
                  >
                    <Zap className="w-4 h-4 mt-0.5" style={{ color: config.textColor, flexShrink: 0 }} />
                    <p style={{ fontSize: "0.875rem", color: config.textColor, margin: 0, fontWeight: 500 }}>
                      {config.action}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
