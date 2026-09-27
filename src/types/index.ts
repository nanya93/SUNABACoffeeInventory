export interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  optimalStock: number;
  currentStock: number;
  isActive: boolean;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'in' | 'out';
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  employeeId: string;
  employeeName: string;
  memo: string;
}

export type Page =
  | 'inventory'
  | 'stock-entry'
  | 'products'
  | 'employees'
  | 'master'
  | 'history'
  | 'product-form'
  | 'employee-form';

export type StockStatus = 'appropriate' | 'shortage';

export function getStockStatus(current: number, optimal: number): StockStatus {
  return current < optimal ? 'shortage' : 'appropriate';
}

export function getStatusLabel(status: StockStatus): string {
  return status === 'shortage' ? '不足' : '適正';
}

export function formatStock(value: number, unit: string): string {
  return `${value} ${unit}`;
}

export function getDiff(current: number, optimal: number): number {
  return current - optimal;
}
