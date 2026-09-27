import type { Product, Employee, Transaction } from '../types';

export const initialProducts: Product[] = [
  { id: 'C001', name: 'コーヒー豆（ブレンド）', category: '飲料', unit: 'g', optimalStock: 1000, currentStock: 800, isActive: true },
  { id: 'C002', name: 'コーヒー豆（エスプレッソ）', category: '飲料', unit: 'g', optimalStock: 500, currentStock: 700, isActive: true },
  { id: 'T001', name: '紅茶（アールグレイ）', category: '飲料', unit: 'g', optimalStock: 300, currentStock: 150, isActive: true },
  { id: 'M001', name: '牛乳', category: '乳製品', unit: '本', optimalStock: 10, currentStock: 12, isActive: true },
  { id: 'M002', name: '生クリーム', category: '乳製品', unit: '本', optimalStock: 5, currentStock: 2, isActive: true },
  { id: 'F001', name: 'ホットケーキミックス', category: '食材', unit: 'kg', optimalStock: 2, currentStock: 3, isActive: true },
  { id: 'S001', name: '砂糖', category: '調味料', unit: 'kg', optimalStock: 1, currentStock: 0.5, isActive: true },
  { id: 'S002', name: 'ガムシロップ', category: '調味料', unit: '個', optimalStock: 50, currentStock: 80, isActive: true },
];

export const initialEmployees: Employee[] = [
  { id: 'E001', name: '山田 太郎', role: '店長', isActive: true },
  { id: 'E002', name: '佐藤 花子', role: 'スタッフ', isActive: true },
  { id: 'E003', name: '鈴木 一郎', role: 'スタッフ', isActive: true },
  { id: 'E004', name: '高橋 美咲', role: 'スタッフ', isActive: true },
];

export const initialTransactions: Transaction[] = [
  {
    id: 'TRX001',
    date: '2024/04/18',
    type: 'in',
    productId: 'M001',
    productName: '牛乳',
    quantity: 5,
    unit: '本',
    employeeId: 'E001',
    employeeName: '山田 太郎',
    memo: '—',
  },
  {
    id: 'TRX002',
    date: '2024/04/17',
    type: 'out',
    productId: 'C001',
    productName: 'コーヒー豆（ブレンド）',
    quantity: 200,
    unit: 'g',
    employeeId: 'E002',
    employeeName: '佐藤 花子',
    memo: 'ドリップ用',
  },
  {
    id: 'TRX003',
    date: '2024/04/16',
    type: 'in',
    productId: 'M002',
    productName: '生クリーム',
    quantity: 3,
    unit: '本',
    employeeId: 'E001',
    employeeName: '山田 太郎',
    memo: '仕入れ分',
  },
  {
    id: 'TRX004',
    date: '2024/04/15',
    type: 'in',
    productId: 'C001',
    productName: 'コーヒー豆（ブレンド）',
    quantity: 500,
    unit: 'g',
    employeeId: 'E001',
    employeeName: '山田 太郎',
    memo: '月次仕入れ',
  },
  {
    id: 'TRX005',
    date: '2024/04/14',
    type: 'out',
    productId: 'S001',
    productName: '砂糖',
    quantity: 0.5,
    unit: 'kg',
    employeeId: 'E003',
    employeeName: '鈴木 一郎',
    memo: '',
  },
];

export const categories = ['飲料', '乳製品', '食材', '調味料'];
export const units = ['g', 'kg', '本', '個', '袋', 'L', 'ml'];
export const roles = ['店長', 'スタッフ', 'パート'];
