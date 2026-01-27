import React from 'react';
import { StockList } from '../components/StockList';
import { useStockContext } from '../../../providers/StockProvider';

export const Dashboard: React.FC = () => {
  const { connectionStatus } = useStockContext();

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <header style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Market Overview</h1>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          fontSize: '0.875rem',
          color: connectionStatus === 'connected' ? 'green' : 'red'
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            backgroundColor: connectionStatus === 'connected' ? 'green' : 'red'
          }} />
          {connectionStatus === 'connected' ? 'Live' : 'Disconnected'}
        </div>
      </header>
      <StockList />
    </main>
  );
};
