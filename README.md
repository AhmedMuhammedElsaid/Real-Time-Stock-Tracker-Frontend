# Frontend Engineering Documentation

## 🛠️ Stack Overview

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| **Core** | React | 19.x | Concurrent features and robust ecosystem. |
| **Build** | Vite | 7.x | Instant HMR and efficient bundling. |
| **Testing** | Vitest | 4.x | Fast, modern test runner with Vite integration. |
| **RTL Core** | @testing-library/dom | 10.x | Explicitly declared for robust `waitFor` and async type resolution. |
| **SEO** | react-helmet-async | 2.x | Dynamic header management for titles/meta descriptions. |
| **Language** | TypeScript | 5.x | Strict type safety for financial data structures. |
| **Styling** | Vanilla CSS | - | High performance, GPU-accelerated animations using CSS variables. |
| **Typography** | Inter | - | Premium sans-serif font for professional readability. |
| **Routing** | React Router | 7.x | Modern SPA routing solution. |

---

## 📂 Project Architecture

The project follows a **Feature-Based Directory Structure** to ensure massive scalability and clear separation of concerns.

```bash
src/
├── api/               # Centralized API service layer
├── components/        # Global/Common UI components
│   └── common/        # Generic UI like ErrorBoundary, Skeleton, Header
├── features/          # Domain-specific logic & components
│   ├── dashboard/     # Market Overview composition (List, Card)
│   └── stocks/        # Detailed analysis (Chart, Detail Page)
├── hooks/             # Custom Global Hooks (useWebSocket)
├── providers/         # Global State Contexts (StockProvider)
├── styles/            # Global design tokens and performance-tuned CSS
├── utils/             # Reusable business logic utilities
└── types/             # Domain Model Definitions
```

---

## 🔧 Core Engineering Features

### 1. Dynamic SEO & Meta Management
- **Page-Specific Metadata**: Uses `react-helmet-async` to dynamically update document titles and meta descriptions (e.g., "AAPL Stock Details").
- **Social Graph Optimization**: Pre-configured meta tags in `index.html` ensure professional rendering across search engines and social platforms.

### 2. Premium Design System
- **Typography & Brand**: Integrated **Inter** font family via Google Fonts for a modern, enterprise-grade aesthetic.
- **Glassmorphism & Micro-animations**: Components feature subtle hover states, scale transitions, and custom `Bezier` easing.
- **Perceived Performance**: Implemented a global `Skeleton` loading system to eliminate layout shifts and provide immediate visual feedback.

### 3. Resilient Real-Time Connectivity
- **Self-Healing WebSocket**: Implementation of **Exponential Backoff** (1s -> 30s) to handle backend volatility.
- **Initial Price Snapshots**: Optimized boot time by fetching current market prices via REST before WebSocket initialization.

### 4. Precise Chart Stitching
- **Server-Driven Timing**: Live updates use backend timestamps to prevent drift.
- **Strict Minute Boundaries**: Data is normalized to provide clean, professional-looking OHLC-style charts.

---

## 🧪 Quality Assurance & Automation

### Automated Testing
The project uses **Vitest** + **React Testing Library** for automated verification.

- **Explicit Dependency Management**: `@testing-library/dom` is explicitly declared to resolve `waitFor` export conflicts common in modern React environments.
- **Verification Scenarios**:
    - **Unit Tests**: State transitions in `stockReducer`.
    - **Integration Tests**: Comprehensive rendering checks for `StockList` and `StockCard`.

---

## 🔧 Development Scripts

- `npm run dev`: Start dev server with HMR.
- `npm run build`: Type-check and production build.
- `npm test`: Run all tests once.
- `npm run test:ui`: Browser-based test runner UI.

---

## 📈 Author Recommendation
For enterprise-level scaling, consider moving from Context to **Zustand** for better selector-based rendering performance, and **TanStack Query** for advanced API lifecycle management.
