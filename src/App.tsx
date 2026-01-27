
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StockProvider } from './providers/StockProvider';
import { Dashboard } from './features/dashboard/pages/Dashboard';
import { StockDetail } from './features/stocks/pages/StockDetail';

function App() {
  return (
      <StockProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stocks/:symbol" element={<StockDetail />} />
          </Routes>
        </BrowserRouter>
      </StockProvider>
  );
}

export default App;
