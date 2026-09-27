import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function StockEntry() {
  const { products, employees, transactions, addTransaction, pageParams, navigateTo } = useApp();

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');

  const [date, setDate] = useState(today);
  const [type, setType] = useState<'in' | 'out'>('in');
  const [productId, setProductId] = useState(pageParams.productId || '');
  const [quantity, setQuantity] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [memo, setMemo] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (pageParams.productId) setProductId(pageParams.productId);
  }, [pageParams.productId]);

  const selectedProduct = products.find((p) => p.id === productId);
  const selectedEmployee = employees.find((e) => e.id === employeeId);

  const recentTransactions = transactions.slice(0, 5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !quantity || !employeeId || !selectedProduct || !selectedEmployee) return;
    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) return;

    addTransaction({
      date: date.replace(/-/g, '/'),
      type,
      productId,
      productName: selectedProduct.name,
      quantity: qty,
      unit: selectedProduct.unit,
      employeeId,
      employeeName: selectedEmployee.name,
      memo,
    });

    setQuantity('');
    setMemo('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">入出庫入力</h1>
          <p className="page-desc">商品の入庫・出庫を登録します。</p>
        </div>
        <button className="btn-outline" onClick={() => navigateTo('inventory')}>
          ← 在庫一覧へ
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        <div className="card" style={{ padding: '28px' }}>
          {success && (
            <div className="alert-success">
              登録が完了しました。在庫数に反映されました。
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-stack">
            <div className="form-row">
              <label className="form-label">日付</label>
              <input
                type="date"
                className="input-field"
                value={date.replace(/\//g, '-')}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label className="form-label">区分</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="type"
                    value="in"
                    checked={type === 'in'}
                    onChange={() => setType('in')}
                  />
                  <span>入庫</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="type"
                    value="out"
                    checked={type === 'out'}
                    onChange={() => setType('out')}
                  />
                  <span>出庫</span>
                </label>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">商品</label>
              <select
                className="input-field"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
              >
                <option value="">商品を選択してください</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.id}　{p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label className="form-label">数量</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  className="input-field"
                  placeholder="数量を入力"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="0"
                  step="any"
                  required
                />
                {selectedProduct && (
                  <span className="unit-label">{selectedProduct.unit}</span>
                )}
              </div>
              {selectedProduct && (
                <p className="input-hint">
                  現在庫: {selectedProduct.currentStock} {selectedProduct.unit}
                </p>
              )}
            </div>

            <div className="form-row">
              <label className="form-label">担当者</label>
              <select
                className="input-field"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              >
                <option value="">担当者を選択してください</option>
                {employees.filter((e) => e.isActive).map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label className="form-label">メモ</label>
              <textarea
                className="input-field"
                placeholder="備考を入力（任意）"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                rows={3}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              登録する
            </button>
          </form>
        </div>

        <div className="card" style={{ padding: '28px' }}>
          <h2 className="section-title">直近の入出庫履歴</h2>
          <div className="table-wrap" style={{ marginTop: '16px' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>日付</th>
                  <th>区分</th>
                  <th>商品名</th>
                  <th className="text-right">数量</th>
                  <th>担当者</th>
                  <th>メモ</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((t) => (
                  <tr key={t.id}>
                    <td className="text-muted text-sm">{t.date}</td>
                    <td>
                      <span className={t.type === 'in' ? 'badge-in' : 'badge-out'}>
                        {t.type === 'in' ? '入庫' : '出庫'}
                      </span>
                    </td>
                    <td>{t.productName}</td>
                    <td className="text-right">
                      {t.quantity} {t.unit}
                    </td>
                    <td className="text-muted">{t.employeeName}</td>
                    <td className="text-muted text-sm">{t.memo || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
