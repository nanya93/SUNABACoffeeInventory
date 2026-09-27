import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { categories, units } from '../data/sampleData';

export default function ProductForm() {
  const { products, pageParams, addProduct, updateProduct, navigateTo } = useApp();

  const isEdit = pageParams.mode === 'edit';
  const existing = isEdit ? products.find((p) => p.id === pageParams.productId) : null;

  const [name, setName] = useState(existing?.name ?? '');
  const [category, setCategory] = useState(existing?.category ?? categories[0]);
  const [unit, setUnit] = useState(existing?.unit ?? units[0]);
  const [optimalStock, setOptimalStock] = useState(String(existing?.optimalStock ?? ''));
  const [currentStock, setCurrentStock] = useState(String(existing?.currentStock ?? ''));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      category,
      unit,
      optimalStock: parseFloat(optimalStock),
      currentStock: parseFloat(currentStock),
    };
    if (isEdit && existing) {
      updateProduct(existing.id, data);
    } else {
      addProduct(data);
    }
    navigateTo('products');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? '商品編集' : '商品新規登録'}</h1>
          <p className="page-desc">{isEdit ? '商品情報を編集します。' : '新しい商品を登録します。'}</p>
        </div>
        <button className="btn-outline" onClick={() => navigateTo('products')}>
          ← 商品マスタへ
        </button>
      </div>

      <div className="card" style={{ maxWidth: '600px', padding: '32px' }}>
        <form onSubmit={handleSubmit} className="form-stack">
          {isEdit && existing && (
            <div className="form-row">
              <label className="form-label">商品コード</label>
              <span className="text-muted">{existing.id}</span>
            </div>
          )}

          <div className="form-row">
            <label className="form-label">商品名 <span className="required">*</span></label>
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例：コーヒー豆（ブレンド）"
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">カテゴリ <span className="required">*</span></label>
            <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">単位 <span className="required">*</span></label>
            <select className="input-field" value={unit} onChange={(e) => setUnit(e.target.value)}>
              {units.map((u) => <option key={u}>{u}</option>)}
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">適正在庫 <span className="required">*</span></label>
            <div className="input-with-unit">
              <input
                type="number"
                className="input-field"
                value={optimalStock}
                onChange={(e) => setOptimalStock(e.target.value)}
                min="0"
                step="any"
                required
              />
              <span className="unit-label">{unit}</span>
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">現在庫 <span className="required">*</span></label>
            <div className="input-with-unit">
              <input
                type="number"
                className="input-field"
                value={currentStock}
                onChange={(e) => setCurrentStock(e.target.value)}
                min="0"
                step="any"
                required
              />
              <span className="unit-label">{unit}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="button" className="btn-outline" onClick={() => navigateTo('products')} style={{ flex: 1 }}>
              キャンセル
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
              {isEdit ? '更新する' : '登録する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
