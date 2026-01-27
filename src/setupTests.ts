import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('lucide-react', () => ({
  Landmark: () => null,
  Activity: () => null,
  ArrowLeft: () => null,
}));

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => children,
  AreaChart: ({ children }: any) => children,
  Area: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
}));
