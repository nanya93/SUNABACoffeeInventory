import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/sampleData';

export default function ProductMaster() {
  const { products, navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('すべて');

  const filtered = products.filter((p) => {
    const matchSearch = p.name.includes(search) || p.id.includes(search);
    const matchCategory = categoryFilter === 'すべて' || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">商品マスタ</h1>
          <p className="page-desc">取り扱う商品の情報を管理します。</p>
        </div>
        <button className="btn-primary" onClick={() => navigateTo('product-form', { mode: 'create' })}>
          ＋ 新規登録
        </button>
      </div>

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
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>商品コード</th>
                <th>商品名</th>
                <th>カテゴリ</th>
                <th>単位</th>
                <th className="text-right">適正在庫</th>
                <th className="text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="text-muted text-sm">{p.id}</td>
                  <td className="font-medium">{p.name}</td>
                  <td>
                    <span className="category-chip">{p.category}</span>
                  </td>
                  <td className="text-muted">{p.unit}</td>
                  <td className="text-right text-muted">{p.optimalStock}</td>
                  <td className="text-center">
                    <button
                      className="btn-action"
                      onClick={() => navigateTo('product-form', { mode: 'edit', productId: p.id })}
                    >
                      編集
                    </button>
                  </td>
                </tr>
              ))}
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
