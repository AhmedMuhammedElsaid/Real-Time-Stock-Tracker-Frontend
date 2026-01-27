# 🚀 StockPulse - Real-Time Market Analysis

A high-performance, real-time stock monitoring dashboard built
 with **React 19**, **Vite**, and **TypeScript**. 
 This project demonstrates enterprise-grade architecture, "tech lead" level performance optimizations, and a premium design system.

---

## 🏗️ Architectural Foundations

### 🛠️ Technology Stack
| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Core** | React 19 | Leveraging concurrent rendering and the latest transitions. |
| **Build** | Vite 7 | Lightning-fast HMR and optimized production bundling. |
| **State** | Context API + useReducer | Robust, native state management for real-time price streams. |
| **Testing** | Vitest + RTL | Modern, fast test runner with a rich UI for developers. |
| **SEO** | react-helmet-async | Dynamic metadata management for real-time detail pages. |
| **Real-time** | WebSockets | Low-latency bi-directional price updates. |

### 📂 Directory Structure
The project follows a **Feature-Based Module System**, ensuring clarity as the codebase grows.
```bash
src/
├── api/               # Centralized data fetching layer
├── components/        # Global UI primitives (common/ErrorBoundary, Skeleton, etc.)
├── features/          # Domain-specific modules (Dashboard, Stocks analysis)
├── hooks/             # Specialized global hooks (useVirtualGrid, useWebSocket)
├── providers/         # Global state orchestrators
├── styles/            # Design system tokens and layout utilities
├── utils/             # Financial formatting and helper functions
└── types/             # Strict TypeScript definitions
```

---

## ⚡ Engineering Key Features

### 1. High-Performance Grid Virtualization
As a performance-first application, the stock list utilizes a custom **`useVirtualGrid`** implementation. 
- **Tech Lead Solution**: Instead of heavy external libraries, we use a custom hook to calculate visible items in a responsive grid.
- **Responsive Dimensions**: Automatically detects column counts and adjusts to window resizing via `ResizeObserver`.
- **Zero-Lag UX**: Only renders DOM nodes visible in the viewport, maintaining 60fps even with thousands of instruments.

### 2. Resilient "Self-Healing" Connectivity
- **Mount-Aware WebSockets**: Prevents memory leaks and "closed before established" errors by using mounting guards and aggressive listener cleanup.
- **Exponential Backoff**: Advanced reconnection logic (1s -> 30s) ensures the app remains stable during server-side volatility.

### 3. Premium Design System
- **Pixel-Perfect UI**: Integrated **Inter** typography and a curated CSS variable system for consistent brand identity.
- **Smooth Content Transitions**: Standardized `Skeleton` loaders for all async states, eliminating layout shifts (CLS).
- **CSS Encapsulation**: Refactored from inline styles to a modular CSS architecture for maintainability and performance.

### 4. Enterprise-Grade Error Handling
- **Scoped Error Boundaries**: Localized error catching ensures a single chart failure doesn't crash the entire dashboard.
- **Graceful Fallbacks**: Component-specific recovery states for isolated failure points.

---

## 🧪 Quality & Verification

### Testing Philosophy
We prioritize **Integration Stability** over simple unit coverage.
- **Vitest UI**: Full browser integration for test visualization.
- **Virtualized Test Environment**: Custom mocks for `ResizeObserver` and `useVirtualGrid` dimensions ensure tests pass reliably in headless environments.
- **Async Robustness**: Explicit `@testing-library/dom` declaration for precise async assertions.

### Available Scripts
- `npm run dev` — Launch dev server with instant HMR.
- `npm run build` — Compile, type-check, and optimize for production.
- `npm test` — Execute all unit and integration tests.
- `npm run test:ui` — Open the interactive test runner.

---

## 📈 Roadmap & Lead Recommendations
For future scale-up:
- **State Partitioning**: Transition complex state to **Zustand** or **Recoil** to optimize selector-based re-renders.
- **Advanced Caching**: Implement **TanStack Query** for persistent cache management across navigation cycles.
- **Web Workers**: Move data normalization for large charts to background threads to keep the main thread fluid.

---
**Author**: Ahmed Muhammed Elsaid  
**Maintainer**: [AhmedMuhammedElsaid](https://github.com/AhmedMuhammedElsaid)
