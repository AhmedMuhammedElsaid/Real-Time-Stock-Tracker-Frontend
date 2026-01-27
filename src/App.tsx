
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import StockProvider from './providers/StockProvider';
import Dashboard from './features/dashboard/pages/Dashboard';
import StockDetail from './features/stocks/pages/StockDetail';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary name="AppRoot">
      <HelmetProvider>
        <StockProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stocks/:symbol" element={<StockDetail />} />
            </Routes>
          </BrowserRouter>
        </StockProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
