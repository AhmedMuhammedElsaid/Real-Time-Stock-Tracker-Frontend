import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import type { ConnectionStatus, Stock, PriceUpdate } from '../types';

export interface StockState {
  stocks: Record<string, Stock>;
  connectionStatus: ConnectionStatus;
}

export type Action = 
  | { type: 'UPDATE_PRICE'; payload: PriceUpdate }
  | { type: 'SET_STOCKS'; payload: Stock[] } // If we fetch initial list
  | { type: 'SET_CONNECTION_STATUS'; payload: ConnectionStatus };

export const initialState: StockState = {
  stocks: {},
  connectionStatus: 'disconnected',
};

export function stockReducer(state: StockState, action: Action): StockState {
  switch (action.type) {
    case 'UPDATE_PRICE': {
      const { symbol, price, timestamp } = action.payload;
      const currentStock = state.stocks[symbol];
      if (!currentStock) return state;

      return {
        ...state,
        stocks: {
          ...state.stocks,
          [symbol]: { ...currentStock, price, lastUpdated: timestamp },
        },
      };
    }
    case 'SET_CONNECTION_STATUS':
      return { ...state, connectionStatus: action.payload };
    case 'SET_STOCKS':
      const newStocks = action.payload.reduce((acc, stock) => {
        const existingStock = state.stocks[stock.symbol];
        acc[stock.symbol] = {
          ...stock,
          // Preserve price and lastUpdated if they exist and the new stock has price 0
          price: (stock.price === 0 && existingStock?.price !== undefined) ? existingStock.price : stock.price,
          lastUpdated: existingStock?.lastUpdated || stock.lastUpdated,
        };
        return acc;
      }, {} as Record<string, Stock>);
      return { ...state, stocks: { ...state.stocks, ...newStocks } }; // Merge to preserve prices if any
    default:
      return state;
  }
}

interface StockContextType extends StockState {
  subscribe: (symbols: string[]) => void;
  unsubscribe: (symbols: string[]) => void;
  setInitialStocks: (stocks: Stock[]) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(stockReducer, initialState);
  const { status, send, registerMessageHandler } = useWebSocket();

  useEffect(() => {
    dispatch({ type: 'SET_CONNECTION_STATUS', payload: status });
  }, [status]);

  useEffect(() => {
    registerMessageHandler((data: any) => {
      // Backend definition: type PriceUpdate { symbol, price, timestamp }
      // Check if it's a price update
      if (data.symbol && data.price) {
        dispatch({ type: 'UPDATE_PRICE', payload: data as PriceUpdate });
      }
    });
  }, [registerMessageHandler]);

  const subscribe = useCallback((symbols: string[]) => {
    send({ action: 'subscribe', symbols });
  }, [send]);

  const unsubscribe = useCallback((symbols: string[]) => {
    send({ action: 'unsubscribe', symbols });
  }, [send]);

  const setInitialStocks = useCallback((stocks: Stock[]) => {
    dispatch({ type: 'SET_STOCKS', payload: stocks });
  }, []);

  return (
    <StockContext.Provider value={{ ...state, subscribe, unsubscribe, setInitialStocks }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStockContext() {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStockContext must be used within a StockProvider');
  }
  return context;
}
