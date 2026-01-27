import { useState, useEffect, useRef, useCallback } from 'react';
import type { ConnectionStatus } from '../types';

const WS_URL = 'ws://localhost:3000/realtime-prices-ws';
const INITIAL_RECONNECT_INTERVAL = 1000;
const MAX_RECONNECT_INTERVAL = 30000;

export function useWebSocket() {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const ws = useRef<WebSocket | null>(null);
  const messageHandler = useRef<((data: any) => void) | null>(null);
  const isComponentMounted = useRef(true);
  const reconnectCount = useRef(0);
  const subscriptions = useRef<Set<string>>(new Set());

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN || ws.current?.readyState === WebSocket.CONNECTING) return;
    if (!isComponentMounted.current) return;

    setStatus('connecting');
    const socket = new WebSocket(WS_URL);
    ws.current = socket;

    socket.onopen = () => {
      if (!isComponentMounted.current) {
        socket.close();
        return;
      }
      setStatus('connected');
      reconnectCount.current = 0;
      console.log('WebSocket Connected');
      
      // Recover subscriptions
      if (subscriptions.current.size > 0) {
        const symbols = Array.from(subscriptions.current);
        socket.send(JSON.stringify({ action: 'subscribe', symbols }));
        console.log('Recovered subscriptions:', symbols);
      }
    };

    socket.onclose = () => {
      if (!isComponentMounted.current) return;

      setStatus('disconnected');
      const delay = Math.min(
        INITIAL_RECONNECT_INTERVAL * Math.pow(2, reconnectCount.current),
        MAX_RECONNECT_INTERVAL
      );
      console.log(`WebSocket Disconnected, retrying in ${delay}ms...`);
      setTimeout(() => {
        if (isComponentMounted.current) {
          connect();
        }
      }, delay);
      reconnectCount.current++;
    };

    socket.onerror = (error) => {
      if (!isComponentMounted.current) return;
      console.error('WebSocket Error:', error);
      setStatus('error');
    };

    socket.onmessage = (event) => {
      if (!isComponentMounted.current) return;
      try {
        const data = JSON.parse(event.data);
        if (messageHandler.current) {
          messageHandler.current(data);
        }
      } catch (e) {
        console.error('Failed to parse WS message', e);
      }
    };
  }, []);

  useEffect(() => {
    isComponentMounted.current = true;
    connect();
    return () => {
      isComponentMounted.current = false;
      if (ws.current) {
        // Clear listeners to prevent logs during unmount closure
        ws.current.onopen = null;
        ws.current.onclose = null;
        ws.current.onerror = null;
        ws.current.onmessage = null;
        ws.current.close();
      }
    };
  }, [connect]);

  const send = useCallback((data: any) => {
    // Track subscriptions for recovery
    if (data.action === 'subscribe') {
      data.symbols.forEach((s: string) => subscriptions.current.add(s));
    } else if (data.action === 'unsubscribe') {
      data.symbols.forEach((s: string) => subscriptions.current.delete(s));
    }

    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket not connected, subscription buffered:', data);
    }
  }, []);

  const registerMessageHandler = useCallback((handler: (data: any) => void) => {
    messageHandler.current = handler;
  }, []);

  return { status, send, registerMessageHandler };
}
