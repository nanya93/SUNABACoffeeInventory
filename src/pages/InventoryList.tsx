import { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import { getDiff } from '../types';
import { categories } from '../data/sampleData';

export default function InventoryList() {
  const { products, navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('すべて');
  const [statusFilter, setStatusFilter] = useState('すべて');

  const filtered = products.filter((p) => {
    const matchSearch = p.name.includes(search) || p.id.includes(search);
    const matchCategory = categoryFilter === 'すべて' || p.category === categoryFilter;
    const matchStatus =
      statusFilter === 'すべて' ||
      (statusFilter === '不足' && p.currentStock < p.optimalStock) ||
      (statusFilter === '適正' && p.currentStock >= p.optimalStock);
    return matchSearch && matchCategory && matchStatus;
  });

  const shortageCount = products.filter((p) => p.currentStock < p.optimalStock).length;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">在庫状況</h1>
          <p className="page-desc">商品の現在庫と適正在庫を確認できます。</p>
        </div>
        <button className="btn-primary" onClick={() => navigateTo('stock-entry')}>
          ＋ 入出庫入力へ
        </button>
      </div>

      {shortageCount > 0 && (
        <div className="alert-shortage">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>在庫不足の商品が <strong>{shortageCount}件</strong> あります。</span>
        </div>
      )}

      <div className="card">
        <div className="filter-bar">
          <div className="search-wrap">
            <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="input-search"
              placeholder="商品名で検索"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">カテゴリ</label>
            <select className="select-sm" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option>すべて</option>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">在庫状況</label>
            <select className="select-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>すべて</option>
              <option>適正</option>
              <option>不足</option>
            </select>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>商品コード</th>
                <th>商品名</th>
                <th>カテゴリ</th>
                <th className="text-right">適正在庫</th>
                <th className="text-right">現在の在庫数</th>
                <th className="text-right">過不足</th>
                <th className="text-center">在庫状況</th>
                <th className="text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const diff = getDiff(product.currentStock, product.optimalStock);
                return (
                  <tr key={product.id}>
                    <td className="text-muted text-sm">{product.id}</td>
                    <td className="font-medium">{product.name}</td>
                    <td>
                      <span className="category-chip">{product.category}</span>
                    </td>
                    <td className="text-right text-muted">
                      {product.optimalStock} {product.unit}
                    </td>
                    <td className="text-right font-medium">
                      {product.currentStock} {product.unit}
                    </td>
                    <td className={`text-right font-medium ${diff < 0 ? 'text-red' : diff > 0 ? 'text-blue' : 'text-muted'}`}>
                      {diff > 0 ? '+' : ''}{diff} {product.unit}
                    </td>
                    <td className="text-center">
                      <StatusBadge current={product.currentStock} optimal={product.optimalStock} />
                    </td>
                    <td className="text-center">
                      <button
                        className="btn-action"
                        onClick={() => navigateTo('stock-entry', { productId: product.id })}
                      >
                        入出庫
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="empty-state">該当する商品が見つかりません</div>
          )}
        </div>
      </div>
    </div>
  );
}
