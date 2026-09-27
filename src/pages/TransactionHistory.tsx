import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/sampleData';

export default function TransactionHistory() {
  const { transactions } = useApp();
  const [typeFilter, setTypeFilter] = useState('すべて');
  const [categoryFilter, setCategoryFilter] = useState('すべて');
  const { products } = useApp();

  const getCategoryForProduct = (productId: string) => {
    return products.find((p) => p.id === productId)?.category ?? '';
  };

  const filtered = transactions.filter((t) => {
    const matchType =
      typeFilter === 'すべて' ||
      (typeFilter === '入庫' && t.type === 'in') ||
      (typeFilter === '出庫' && t.type === 'out');
    const matchCategory =
      categoryFilter === 'すべて' || getCategoryForProduct(t.productId) === categoryFilter;
    return matchType && matchCategory;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">入出庫履歴</h1>
          <p className="page-desc">入出庫の操作履歴を確認できます。</p>
        </div>
      </div>

      <div className="card">
        <div className="filter-bar">
          <div className="filter-group">
            <label className="filter-label">区分</label>
            <select className="select-sm" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option>すべて</option>
              <option>入庫</option>
              <option>出庫</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">カテゴリ</label>
            <select className="select-sm" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option>すべて</option>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <span className="text-muted text-sm" style={{ marginLeft: 'auto' }}>
            {filtered.length} 件
          </span>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>日付</th>
                <th className="text-center">区分</th>
                <th>商品名</th>
                <th>カテゴリ</th>
                <th className="text-right">数量</th>
                <th>担当者</th>
                <th>メモ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td className="text-muted text-sm">{t.date}</td>
                  <td className="text-center">
                    <span className={t.type === 'in' ? 'badge-in' : 'badge-out'}>
                      {t.type === 'in' ? '入庫' : '出庫'}
                    </span>
                  </td>
                  <td className="font-medium">{t.productName}</td>
                  <td>
                    <span className="category-chip">{getCategoryForProduct(t.productId)}</span>
                  </td>
                  <td className="text-right">
                    {t.quantity} {t.unit}
                  </td>
                  <td className="text-muted">{t.employeeName}</td>
                  <td className="text-muted text-sm">{t.memo || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="empty-state">履歴が見つかりません</div>
          )}
        </div>
      </div>
    </div>
  );
}
