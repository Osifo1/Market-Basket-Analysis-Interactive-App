import { Search, X, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { parseAssociationRules, getTopAssociationsForProduct, getAllProducts, getProductEmoji } from "../../data/parseData";

interface AssociationRule {
  antecedents: string[];
  consequents: string[];
  lift: number;
  confidence: number;
  support: number;
}

interface ProductLookupProps {
  onProductSelect?: (product: string) => void;
}

export function ProductLookup({ onProductSelect }: ProductLookupProps) {
  const [query, setQuery] = useState("");
  const [rules, setRules] = useState<AssociationRule[]>([]);
  const [allProducts, setAllProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/association_rules.csv');
        const csvContent = await response.text();
        const parsedRules = await parseAssociationRules(csvContent);
        setRules(parsedRules);
        const products = getAllProducts(parsedRules);
        setAllProducts(products.slice(0, 50)); // Top 50 products
      } catch (error) {
        console.error('Error loading association rules:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const results = query.trim() 
    ? allProducts.filter(p => p.toLowerCase().includes(query.toLowerCase())).slice(0, 10)
    : [];

  const selectedProduct = results.length > 0 ? results[0] : null;
  const selectedAssociations = selectedProduct
    ? getTopAssociationsForProduct(rules, selectedProduct, 5)
    : [];

  // Notify parent when product is selected
  useEffect(() => {
    if (selectedProduct && onProductSelect) {
      onProductSelect(selectedProduct);
    }
  }, [selectedProduct, onProductSelect]);

  return (
    <section>
      <div
        className="rounded-[12px] p-6"
        style={{
          background: "var(--card)",
          boxShadow: "0 2px 12px rgba(46,125,50,0.08), 0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Section header */}
        <div className="flex items-center gap-2 mb-5">
          <span style={{ fontSize: "1.25rem" }}>🔍</span>
          <h2 style={{ color: "var(--foreground)", margin: 0 }}>Product Lookup</h2>
        </div>

        {/* Product dropdown */}
        <div className="mb-5">
          <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
            Select Product
          </label>
          <select
            value={selectedProduct || ""}
            onChange={(e) => setQuery(e.target.value)}
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
            <option value="">Choose a product...</option>
            {allProducts.map((p: string) => (
              <option key={p} value={p}>{getProductEmoji(p)} {p}</option>
            ))}
          </select>
        </div>

        {/* Selected product associations */}
        {selectedAssociations.length > 0 && (
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
              Top Associations for "{selectedProduct}"
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedAssociations.map((assoc) => (
                <div
                  key={assoc.product}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full"
                  style={{
                    background: "#E8F5E9",
                    border: "1.5px solid #A5D6A7",
                    minHeight: "44px",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>{getProductEmoji(assoc.product)}</span>
                  <span style={{ fontWeight: 600, color: "#2E7D32", fontSize: "0.875rem" }}>{assoc.product}</span>
                  <span
                    className="px-1.5 py-0.5 rounded-full"
                    style={{ background: "#2E7D3222", fontSize: "0.75rem", fontWeight: 700, color: "#2E7D32" }}
                  >
                    Lift {assoc.lift.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign: "center", padding: "20px", color: "var(--muted-foreground)" }}>
            Loading data...
          </div>
        )}
      </div>
    </section>
  );
}
