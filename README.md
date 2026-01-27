# Frontend Engineering Documentation

## 🛠️ Stack Overview

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| **Core** | React | 19.x | Concurrent features and robust ecosystem. |
| **Build** | Vite | 7.x | Instant HMR and efficient bundling. |
| **Testing** | Vitest | 4.x | Fast, modern test runner with Vite integration. |
| **Language** | TypeScript | 5.x | Strict type safety for financial data structures. |
| **Styling** | Vanilla CSS | - | High performance, GPU-accelerated animations. |
| **Charts** | Recharts | 3.x | Component-based, SVG-centric visualization. |
| **Routing** | React Router | 7.x | Modern SPA routing solution. |

---

## 📂 Project Architecture

The project follows a **Feature-Based Directory Structure** to ensure massive scalability and clear separation of concerns.

```bash
src/
├── api/               # Centralized API service layer
├── components/        # Global/Common UI components
│   └── common/        # Generic UI like ErrorBoundary, Fallback
├── features/          # Domain-specific logic & components
│   ├── dashboard/     # Market Overview composition (List, Card)
│   └── stocks/        # Detailed analysis (Chart, Detail Page)
├── hooks/             # Custom Global Hooks (useWebSocket)
├── providers/         # Global State Contexts (StockProvider)
├── utils/             # Reusable business logic utilities
└── types/             # Domain Model Definitions
```

---

## 🔧 Core Engineering Features

### 1. Resilient Real-Time Connectivity
- **Self-Healing WebSocket**: Implementation of **Exponential Backoff** (1s -> 30s) to handle backend volatility.
- **Subscription Recovery**: Automatically recovers active subscriptions upon reconnection.
- **Initial Price Snapshots**: Optimized boot time by fetching current market prices via REST before WebSocket initialization, eliminating "0.00" flicker.

### 2. Precise Chart Stitching & Time-Bucketing
- **Server-Driven Timing**: Live updates use backend timestamps to prevent drift.
- **Strict Minute Boundaries**: Both history and live ticks are normalized to the start of the minute.
- **Finalization Logic**: The `StockChart` component automatically updates the current minute's data point or creates a new one as time progresses.

### 3. Resilience & Error Handling
- **Global Error Boundary**: Protects the root application tree from crashing.
- **Component Isolation**: The `StockChart` is wrapped in an independent `ErrorBoundary` with a specialized `Fallback` UI, ensuring the rest of the dashboard remains interactive even if visualization fails.

### 4. Accessibility & Semantic HTML
- **Semantic Tags**: Used `<main>`, `<header>`, and `<section>` to improve SEO and screen reader navigation.
- **Accessible Inputs**: Stock Cards are implemented as `<button>` elements with `onKeyDown` support for full keyboard navigation.

---

## 🧪 Quality Assurance & Automation

### Automated Testing
The project uses **Vitest** + **React Testing Library** for automated verification.

- **Unit Tests**: Verifies complex state transitions in the `stockReducer`.
- **Integration Tests**: Verifies component rendering, loading states, and data injection.

### Verified Scenarios
| Feature | status |
|---------|--------|
| **Resilience** | ✅ Exponential backoff verified |
| **Continuity** | ✅ Re-subscription success |
| **UI Stability** | ✅ Error Boundary isolation successful |
| **Data Integrity** | ✅ Initial price loading verified |

---

## 🔧 Development Scripts

- `npm run dev`: Start dev server with HMR.
- `npm run build`: Type-check and production build.
- `npm test`: Run all tests once.
- `npm run test:ui`: Browser-based test runner UI.

---

## 📈 Author Recommendation
For enterprise-level scaling, consider moving from Context to **Zustand** for better selector-based rendering performance, and **TanStack Query** for advanced API lifecycle management.

