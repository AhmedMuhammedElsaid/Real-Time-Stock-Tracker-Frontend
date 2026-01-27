import React, { useEffect, useState, useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useStockContext } from '../../../providers/StockProvider';
import { fetchStockHistory } from '../../../api/api';
import { ErrorBoundary } from '../../../components/common/ErrorBoundary';
import { getTime } from '../../../utils/utils';
import Fallback from '../../../components/common/Fallback';

interface StockChartProps {
  symbol: string;
}

interface ChartData {
  time: number;
  displayTime: string;
  price: number;
}

export const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const { stocks } = useStockContext();
  const [history, setHistory] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  const stock = stocks[symbol];
  const currentPrice = stock?.price;
  const lastUpdated = stock?.lastUpdated;

  useEffect(() => {
    fetchStockHistory(symbol).then(data => {
      const formatted = data.map(d => {
        const date = new Date(d.timestamp);
        return {
          time: getTime(date),
          displayTime: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: d.price
        };
      });
      setHistory(formatted);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [symbol]);

  const chartData = useMemo(() => {
    if (!currentPrice || history.length === 0) return history;

    // Use server timestamp if available, otherwise fallback to local
    const now = lastUpdated ? new Date(lastUpdated) : new Date();
    const currentMinuteTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()).getTime();

    const lastHistoryPoint = history[history.length - 1];

    const livePoint: ChartData = {
      time: currentMinuteTime,
      displayTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: currentPrice
    };

    if (lastHistoryPoint && lastHistoryPoint.time === currentMinuteTime) {
      return [...history.slice(0, -1), livePoint];
    } else if (lastHistoryPoint && currentMinuteTime > lastHistoryPoint.time) {
      return [...history, livePoint];
    }

    return history;
  }, [history, currentPrice, lastUpdated]);

  if (loading) return <div>Loading chart...</div>;

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ErrorBoundary
        name="StockChart"
        fallback={<Fallback/>}
      >
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3182ce" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3182ce" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="displayTime"
              minTickGap={30}
            />
            <YAxis
              domain={['auto', 'auto']}
              tickFormatter={(val) => `$${val.toFixed(2)}`}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3182ce"
              fillOpacity={1}
              fill="url(#colorPrice)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ErrorBoundary>
    </div>
  );
};
