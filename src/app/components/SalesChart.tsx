import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart2 } from "lucide-react";

const data = [
  { day: "Mon", orders: 42000, customers: 18200 },
  { day: "Tue", orders: 38500, customers: 16800 },
  { day: "Wed", orders: 47200, customers: 19600 },
  { day: "Thu", orders: 44800, customers: 18900 },
  { day: "Fri", orders: 56300, customers: 23400 },
  { day: "Sat", orders: 68900, customers: 28100 },
  { day: "Sun", orders: 74200, customers: 30600 },
];

function fmt(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
  return `${v}`;
}

export function SalesChart() {
  return (
    <div
      className="rounded-[12px] p-6"
      style={{
        background: "var(--card)",
        boxShadow: "0 2px 12px rgba(46,125,50,0.08), 0 1px 3px rgba(0,0,0,0.05)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5" style={{ color: "#2E7D32" }} />
          <h3 style={{ color: "var(--foreground)", margin: 0 }}>Weekly Performance</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#2E7D32" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Orders</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#FFC107" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Customers</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="custGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFC107" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#FFC107" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(46,125,50,0.08)" />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#5A7A5A" }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={fmt} tick={{ fontSize: 12, fill: "#5A7A5A" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", border: "1px solid #A5D6A7", background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
            labelStyle={{ color: "#1A2E1A", fontWeight: 600 }}
            itemStyle={{ color: "#5A7A5A" }}
            formatter={(v: number) => [fmt(v), ""]}
          />
          <Area type="monotone" dataKey="orders" stroke="#2E7D32" strokeWidth={2.5} fill="url(#ordersGrad)" dot={false} activeDot={{ r: 5, fill: "#2E7D32" }} />
          <Area type="monotone" dataKey="customers" stroke="#FFC107" strokeWidth={2.5} fill="url(#custGrad)" dot={false} activeDot={{ r: 5, fill: "#FFC107" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
