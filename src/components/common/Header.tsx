import React from 'react';
import { Link } from 'react-router-dom';
import { useStockContext } from '../../providers/StockProvider';
import { Landmark, Activity } from 'lucide-react';

export const Header: React.FC = () => {
  const { connectionStatus } = useStockContext();
  const isConnected = connectionStatus === 'connected';

  return (
    <header style={{
      height: '72px',
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          color: 'var(--text-main)',
          fontSize: '1.25rem',
          fontWeight: 800
        }}>
          <div style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Landmark size={20} />
          </div>
          <span style={{ letterSpacing: '-0.02em' }}>StockPulse</span>
        </Link>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '6px 12px',
          backgroundColor: isConnected ? '#f0fff4' : '#fff5f5',
          borderRadius: '20px',
          border: `1px solid ${isConnected ? '#c6f6d5' : '#fed7d7'}`,
          transition: 'all 0.3s ease'
        }}>
          <Activity 
            size={14} 
            color={isConnected ? 'var(--success)' : 'var(--error)'} 
            className={isConnected ? 'pulse-slow' : ''}
          />
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: isConnected ? 'var(--success)' : 'var(--error)'
          }}>
            {isConnected ? 'Market Open' : 'Connecting...'}
          </span>
        </div>
      </div>
    </header>
  );
};
