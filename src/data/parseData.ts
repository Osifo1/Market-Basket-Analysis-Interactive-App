// Data parsing utilities for retail intelligence app

export interface AssociationRule {
  antecedents: string[];
  consequents: string[];
  lift: number;
  confidence: number;
  support: number;
}

export interface CustomerSegment {
  segment: string;
  count: number;
  avgFrequency: number;
  avgRecency: number;
  avgOrders: number;
}

export interface KPIData {
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  avgOrderValue: number;
  topProduct: string;
  topProductSales: number;
}

// Parse frozenset string to array of product names
function parseFrozenset(frozensetStr: string): string[] {
  const match = frozensetStr.match(/frozenset\(\{([^}]+)\}\)/);
  if (!match) return [];
  const content = match[1];
  return content.split(',').map(s => s.trim().replace(/'/g, ''));
}

// Parse association rules CSV
export async function parseAssociationRules(csvContent: string): Promise<AssociationRule[]> {
  const lines = csvContent.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',');
  const data: AssociationRule[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length < headers.length) continue;

    const rule: AssociationRule = {
      antecedents: parseFrozenset(values[0]),
      consequents: parseFrozenset(values[1]),
      lift: parseFloat(values[6]),
      confidence: parseFloat(values[5]),
      support: parseFloat(values[4]),
    };
    data.push(rule);
  }

  return data;
}

// Parse customer segments CSV - handles quoted fields properly
export async function parseCustomerSegments(csvContent: string): Promise<CustomerSegment[]> {
  const lines = csvContent.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',');
  
  const segmentMap = new Map<string, { count: number; totalFreq: number; totalRecency: number; totalOrders: number }>();

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Handle quoted CSV fields
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    if (values.length < 8) continue;

    const segment = values[7].replace(/"/g, '');
    const frequency = parseFloat(values[1]);
    const recency = parseFloat(values[2]);
    const orders = parseFloat(values[3]);

    if (!segment || isNaN(frequency) || isNaN(recency) || isNaN(orders)) continue;

    if (!segmentMap.has(segment)) {
      segmentMap.set(segment, { count: 0, totalFreq: 0, totalRecency: 0, totalOrders: 0 });
    }

    const segData = segmentMap.get(segment)!;
    segData.count++;
    segData.totalFreq += frequency;
    segData.totalRecency += recency;
    segData.totalOrders += orders;
  }

  const segments: CustomerSegment[] = [];
  for (const [segment, data] of segmentMap.entries()) {
    segments.push({
      segment,
      count: data.count,
      avgFrequency: data.totalFreq / data.count,
      avgRecency: data.totalRecency / data.count,
      avgOrders: data.totalOrders / data.count,
    });
  }

  return segments.sort((a, b) => b.count - a.count);
}

// Get top associations for a product
export function getTopAssociationsForProduct(
  rules: AssociationRule[],
  productName: string,
  limit: number = 5
): Array<{ product: string; lift: number; confidence: number }> {
  const associations = new Map<string, { lift: number; confidence: number }>();

  for (const rule of rules) {
    // Check if product is in antecedents
    if (rule.antecedents.some(a => a.toLowerCase().includes(productName.toLowerCase()))) {
      for (const consequent of rule.consequents) {
        const existing = associations.get(consequent);
        if (!existing || rule.lift > existing.lift) {
          associations.set(consequent, { lift: rule.lift, confidence: rule.confidence });
        }
      }
    }
  }

  return Array.from(associations.entries())
    .map(([product, data]) => ({ product, lift: data.lift, confidence: data.confidence }))
    .sort((a, b) => b.lift - a.lift)
    .slice(0, limit);
}

// Get bundle analysis for two products
export function getBundleAnalysis(
  rules: AssociationRule[],
  productA: string,
  productB: string
): { lift: number; confidence: number; support: number; found: boolean } | null {
  for (const rule of rules) {
    const hasA = rule.antecedents.some(a => a.toLowerCase().includes(productA.toLowerCase()));
    const hasB = rule.antecedents.some(a => a.toLowerCase().includes(productB.toLowerCase()));
    const hasConsequentA = rule.consequents.some(c => c.toLowerCase().includes(productA.toLowerCase()));
    const hasConsequentB = rule.consequents.some(c => c.toLowerCase().includes(productB.toLowerCase()));

    // Check if both products are in the rule (either as antecedents or consequents)
    if ((hasA && hasB) || (hasA && hasConsequentB) || (hasConsequentA && hasB) || (hasConsequentA && hasConsequentB)) {
      return {
        lift: rule.lift,
        confidence: rule.confidence,
        support: rule.support,
        found: true,
      };
    }
  }

  return null;
}

// Get all unique products from association rules
export function getAllProducts(rules: AssociationRule[]): string[] {
  const productSet = new Set<string>();
  for (const rule of rules) {
    for (const ant of rule.antecedents) {
      productSet.add(ant);
    }
    for (const cons of rule.consequents) {
      productSet.add(cons);
    }
  }
  return Array.from(productSet).sort();
}

// Product emoji mapping
export const productEmojis: Record<string, string> = {
  'banana': '🍌',
  'strawberries': '🍓',
  'avocado': '🥑',
  'lime': '🍋',
  'lemon': '🍋',
  'apple': '🍎',
  'tomato': '🍅',
  'onion': '🧅',
  'garlic': '🧄',
  'cilantro': '🌿',
  'spinach': '🥬',
  'cucumber': '🥒',
  'blueberries': '🫐',
  'raspberries': '🫐',
  'milk': '🥛',
  'eggs': '🥚',
  'bread': '🍞',
  'cheese': '🧀',
  'yogurt': '🥛',
  'carrot': '🥕',
  'potato': '🥔',
  'broccoli': '🥦',
  'pepper': '🫑',
};

export function getProductEmoji(productName: string): string {
  const lower = productName.toLowerCase();
  for (const [key, emoji] of Object.entries(productEmojis)) {
    if (lower.includes(key)) {
      return emoji;
    }
  }
  return '🛒';
}
