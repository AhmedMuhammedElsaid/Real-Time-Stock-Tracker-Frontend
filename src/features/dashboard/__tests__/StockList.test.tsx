import { render, screen, act, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { StockList } from '../components/StockList';
import { useStockContext } from '../../../providers/StockProvider';
import { BrowserRouter } from 'react-router-dom';
import * as api from '../../../api/api';

// Mock the context hook
vi.mock('../../../providers/StockProvider', () => ({
  useStockContext: vi.fn()
}));

// Mock the API service
vi.mock('../../../api/api', () => ({
  fetchStockList: vi.fn()
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('StockList Component', () => {
  const mockStocks = {
    'AAPL': { symbol: 'AAPL', name: 'Apple Inc', price: 150.00 },
    'GOOGL': { symbol: 'GOOGL', name: 'Alphabet Inc', price: 2800.00 }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (api.fetchStockList as any).mockResolvedValue([]);
  });

  it('renders loading state initially when no stocks', async () => {
    (useStockContext as any).mockReturnValue({
      stocks: {},
      setInitialStocks: vi.fn(),
      subscribe: vi.fn()
    });

    render(
      <BrowserRouter>
        <StockList />
      </BrowserRouter>
    );

    expect(screen.getByText(/Loading stocks.../i)).toBeInTheDocument();
  });

  it('renders stock cards when stocks are available', async () => {
    (useStockContext as any).mockReturnValue({
      stocks: mockStocks,
      setInitialStocks: vi.fn(),
      subscribe: vi.fn()
    });

    render(
      <BrowserRouter>
        <StockList />
      </BrowserRouter>
    );

    // Should not show loading because hasStocks is true potentially? 
    // Actually loading is init to true. 
    // But in our previous fix, if hasStocks is true, we don't set loading to true in useEffect.
    // However, it's still true from useState(true).
    
    // Wait, the component will render with loading=true first.
    // Then useEffect runs, hasStocks=true, so setLoading(true) is SKIPPED.
    // But then fetchStockList finishes and setLoading(false) is called.
    
    await waitFor(() => {
      expect(screen.getByText('AAPL')).toBeInTheDocument();
    });

    expect(screen.getByText('Apple Inc')).toBeInTheDocument();
    expect(screen.getByText('GOOGL')).toBeInTheDocument();
  });
});
