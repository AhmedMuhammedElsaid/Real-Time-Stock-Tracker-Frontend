import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStockContext } from '../../../providers/StockProvider';
import { StockChart } from '../components/StockChart';
import './StockDetail.css';

export const StockDetail: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const { stocks, subscribe, unsubscribe } = useStockContext();
  const stock = symbol ? stocks[symbol] : undefined;

  useEffect(() => {
    if (symbol) {
      subscribe([symbol]);
      return () => {
        unsubscribe([symbol]);
      };
    }
  }, [symbol]);

  if (!stock) {
    return <main className="stock-detail-page">
      <p className="detail-loading">Stock not found or loading...</p>
    </main>;
  }

  return (
    <main className="stock-detail-page">
      <div className="detail-header">
        <Link to="/" className="back-link">← Back to Dashboard</Link>
        <h1>{stock.name} ({stock.symbol})</h1>
        <p className="detail-price">
          Current Price: <span>${stock.price?.toFixed(2)}</span>
        </p>
      </div>

      <div className="chart-container">
        <StockChart symbol={stock.symbol} />
      </div>
    </main>
  );
};
