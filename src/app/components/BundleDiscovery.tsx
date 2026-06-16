import { Package, ChevronDown, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { parseAssociationRules, getBundleAnalysis, getAllProducts, getProductEmoji } from "../../data/parseData";

interface AssociationRule {
  antecedents: string[];
  consequents: string[];
  lift: number;
  confidence: number;
  support: number;
}

export function BundleDiscovery() {
  const [productA, setProductA] = useState("");
  const [productB, setProductB] = useState("");
  const [rules, setRules] = useState<AssociationRule[]>([]);
  const [allProducts, setAllProducts] = useState<string[]>([]);
  const [result, setResult] = useState<{ lift: number; confidence: number; support: number; found: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/association_rules.csv');
        const csvContent = await response.text();
        const parsedRules = await parseAssociationRules(csvContent);
        setRules(parsedRules);
        const products = getAllProducts(parsedRules);
        setAllProducts(products);
        if (products.length >= 2) {
          setProductA(products[0]);
          setProductB(products[1]);
        }
      } catch (error) {
        console.error('Error loading association rules:', error);
      } finally {
        setDataLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCalculate = () => {
    if (productA === productB) return;
    setLoading(true);
    setTimeout(() => {
      const analysis = getBundleAnalysis(rules, productA, productB);
      setResult(analysis || { lift: 0, confidence: 0, support: 0, found: false });
      setLoading(false);
    }, 600);
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
        <Package className="w-5 h-5" style={{ color: "#2E7D32" }} />
        <h3 style={{ color: "var(--foreground)", margin: 0 }}>Bundle Discovery</h3>
      </div>

      {dataLoading ? (
        <div style={{ textAlign: "center", padding: "20px", color: "var(--muted-foreground)" }}>
          Loading data...
        </div>
      ) : (
        <>
          <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", marginBottom: "20px" }}>
            Find high-lift product pairs using market basket analysis.
          </p>

          <div className="flex flex-col gap-3 mb-4">
            {[{ value: productA, set: setProductA, label: "Product A" }, { value: productB, set: setProductB, label: "Product B" }].map(({ value, set, label }) => (
              <div key={label} className="relative">
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
                  {label}
                </label>
                <div className="relative">
                  <select
                    value={value}
                    onChange={(e) => { set(e.target.value); setResult(null); }}
                    className="w-full appearance-none rounded-[10px] px-4 py-3 pr-10 outline-none transition-all"
                    style={{
                      background: "var(--input-background)",
                      border: "1.5px solid var(--border)",
                      color: "var(--foreground)",
                      fontSize: "0.9375rem",
                      minHeight: "44px",
                      cursor: "pointer",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#2E7D32")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  >
                    {allProducts.map((p: string) => (
                      <option key={p} value={p}>{getProductEmoji(p)} {p}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--muted-foreground)" }} />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleCalculate}
            disabled={productA === productB || loading}
            className="w-full rounded-[10px] py-3 flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "#2E7D32",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9375rem",
              minHeight: "44px",
              border: "none",
              cursor: productA === productB ? "not-allowed" : "pointer",
            }}
          >
            <Zap className="w-4 h-4" />
            {loading ? "Calculating…" : "Calculate Bundle"}
          </button>

          {result && (
            <div
              className="mt-4 rounded-[10px] p-4"
              style={{ background: result.found ? "#E8F5E9" : "#FFF3E0", border: `1.5px solid ${result.found ? "#A5D6A7" : "#FFCC80"}` }}
            >
              <div className="grid grid-cols-3 gap-3 mb-3">
                {[
                  { label: "Lift", val: result.lift.toFixed(2) },
                  { label: "Confidence", val: (result.confidence * 100).toFixed(1) + "%" },
                  { label: "Support", val: (result.support * 100).toFixed(2) + "%" },
                ].map(({ label, val }) => (
                  <div key={label} className="text-center">
                    <p style={{ fontSize: "1.25rem", fontWeight: 700, color: result.found ? "#2E7D32" : "#E65100", margin: 0 }}>{val}</p>
                    <p style={{ fontSize: "0.75rem", color: result.found ? "#5A7A5A" : "#A1887F", margin: 0 }}>{label}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.875rem", color: result.found ? "#2E7D32" : "#E65100", fontWeight: 500, margin: 0, textAlign: "center" }}>
                {result.found ? "✅ Strong association detected!" : "⚠️ No direct association found"}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
