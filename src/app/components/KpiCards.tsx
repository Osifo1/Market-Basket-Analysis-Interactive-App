import { ShoppingBag, Users, Star, Clock, TrendingUp } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  iconBg: string;
  trend?: React.ReactNode;
  emoji?: string;
}

function KpiCard({ title, value, sub, icon, iconBg, trend, emoji }: KpiCardProps) {
  return (
    <div
      className="rounded-[12px] p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{
        background: "var(--card)",
        boxShadow: "0 2px 12px rgba(46,125,50,0.08), 0 1px 3px rgba(0,0,0,0.05)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-[10px] flex items-center justify-center"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        {trend}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.1 }}>
            {value}
          </span>
          {emoji && <span style={{ fontSize: "1.25rem" }}>{emoji}</span>}
        </div>
        <p style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)", marginTop: "2px" }}>{sub}</p>
      </div>
      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {title}
      </p>
    </div>
  );
}

export function KpiCards() {
  return (
    <section>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Orders"
          value="3.4M"
          sub="vs 3.1M last period"
          iconBg="#E8F5E9"
          icon={<ShoppingBag className="w-5 h-5" style={{ color: "#2E7D32" }} />}
          trend={
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "#E8F5E9" }}>
              <TrendingUp className="w-3.5 h-3.5" style={{ color: "#2E7D32" }} />
              <span style={{ fontSize: "0.75rem", color: "#2E7D32", fontWeight: 600 }}>+9.7%</span>
            </div>
          }
        />
        <KpiCard
          title="Total Customers"
          value="206K"
          sub="Active this month"
          iconBg="#F3E5F5"
          icon={<Users className="w-5 h-5" style={{ color: "#7B1FA2" }} />}
          trend={
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "#F3E5F5" }}>
              <TrendingUp className="w-3.5 h-3.5" style={{ color: "#7B1FA2" }} />
              <span style={{ fontSize: "0.75rem", color: "#7B1FA2", fontWeight: 600 }}>+4.2%</span>
            </div>
          }
        />
        <KpiCard
          title="Top Product"
          value="Banana"
          sub="12,840 units sold"
          iconBg="#FFFDE7"
          icon={<Star className="w-5 h-5" style={{ color: "#F9A825" }} />}
          emoji="🍌"
        />
        <KpiCard
          title="Peak Time"
          value="10 AM"
          sub="Sunday peak traffic"
          iconBg="#E3F2FD"
          icon={<Clock className="w-5 h-5" style={{ color: "#1565C0" }} />}
          emoji="☀️"
        />
      </div>
    </section>
  );
}
