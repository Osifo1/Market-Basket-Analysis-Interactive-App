# Retail Intelligence - Interactive App

This is the interactive frontend application for the Retail Intelligence & Market Basket Analysis project. It provides a user-friendly interface to explore product associations, customer segments, and business recommendations derived from the analysis.

## Features
- **Executive Overview** - KPI dashboard with key metrics
- **Product Lookup** - Search products and see top 5 associated items with lift scores
- **Customer Segment Explorer** - View all 7 customer segments with retention actions
- **Bundle Discovery** - Find optimal product bundles
- **Decision Assistant** - Filterable business recommendations

## Data Source
This app uses:
- `association_rules.csv` - Product association rules from the Apriori algorithm
- `customer_segments.csv` - RFM-based customer segmentation results


## Related Repository
**Main Analysis Repository:** [Retail-Intelligence-Analysis](https://github.com/Osifo1/Market Basket Analysis)
- Full data cleaning, EDA, Apriori algorithm implementation
- RFM customer segmentation
- Business recommendations and executive summary

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Recharts for visualizations

## Local Development
```bash
npm install
npm run dev


## Author
Goodness Osifo

## License
Educational/Portfolio use only
