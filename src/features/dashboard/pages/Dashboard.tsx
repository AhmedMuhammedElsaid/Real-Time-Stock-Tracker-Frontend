import { StockList } from '../components/StockList';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../../components/common/Header';

export const Dashboard: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>StockPulse | Real-Time Market Overview</title>
        <meta name="description" content="Track your favorite stocks with real-time price updates, professional charts, and live market data." />
      </Helmet>
      
      <Header />

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <header style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Market Overview
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: '1.125rem' }}>
            Real-time insights into your watched symbols.
          </p>
        </header>
        <StockList />
      </main>
    </>
  );
};
