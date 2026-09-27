import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product, Employee, Transaction, Page } from '../types';
import { initialProducts, initialEmployees, initialTransactions } from '../data/sampleData';

interface PageParams {
  productId?: string;
  employeeId?: string;
  mode?: 'create' | 'edit';
}

interface AppContextType {
  currentPage: Page;
  pageParams: PageParams;
  navigateTo: (page: Page, params?: PageParams) => void;

  products: Product[];
  employees: Employee[];
  transactions: Transaction[];

  addProduct: (product: Omit<Product, 'id' | 'isActive'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  addEmployee: (employee: Omit<Employee, 'id' | 'isActive'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  addTransaction: (data: Omit<Transaction, 'id'>) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('inventory');
  const [pageParams, setPageParams] = useState<PageParams>({});
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const navigateTo = (page: Page, params: PageParams = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo(0, 0);
  };

  const addProduct = (data: Omit<Product, 'id' | 'isActive'>) => {
    const prefix = data.category === '飲料' ? 'D' : data.category === '乳製品' ? 'L' : data.category === '食材' ? 'F' : 'X';
    const nextNum = products.filter(p => p.id.startsWith(prefix)).length + 1;
    const id = `${prefix}${String(nextNum).padStart(3, '0')}`;
    setProducts(prev => [...prev, { ...data, id, isActive: true }]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const addEmployee = (data: Omit<Employee, 'id' | 'isActive'>) => {
    const nextNum = employees.length + 1;
    const id = `E${String(nextNum).padStart(3, '0')}`;
    setEmployees(prev => [...prev, { ...data, id, isActive: true }]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(e => (e.id === id ? { ...e, ...updates } : e)));
  };

  const addTransaction = (data: Omit<Transaction, 'id'>) => {
    const id = `TRX${Date.now()}`;
    setTransactions(prev => [{ ...data, id }, ...prev]);
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== data.productId) return p;
        const delta = data.type === 'in' ? data.quantity : -data.quantity;
        return { ...p, currentStock: Math.max(0, p.currentStock + delta) };
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        pageParams,
        navigateTo,
        products,
        employees,
        transactions,
        addProduct,
        updateProduct,
        addEmployee,
        updateEmployee,
        addTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
