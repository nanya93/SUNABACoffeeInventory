import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { roles } from '../data/sampleData';

export default function EmployeeForm() {
  const { employees, pageParams, addEmployee, updateEmployee, navigateTo } = useApp();

  const isEdit = pageParams.mode === 'edit';
  const existing = isEdit ? employees.find((e) => e.id === pageParams.employeeId) : null;

  const [name, setName] = useState(existing?.name ?? '');
  const [role, setRole] = useState(existing?.role ?? roles[0]);
  const [isActive, setIsActive] = useState(existing?.isActive ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, role };
    if (isEdit && existing) {
      updateEmployee(existing.id, { ...data, isActive });
    } else {
      addEmployee(data);
    }
    navigateTo('employees');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? '従業員編集' : '従業員新規登録'}</h1>
          <p className="page-desc">{isEdit ? '従業員情報を編集します。' : '新しい従業員を登録します。'}</p>
        </div>
        <button className="btn-outline" onClick={() => navigateTo('employees')}>
          ← 従業員マスタへ
        </button>
      </div>

      <div className="card" style={{ maxWidth: '600px', padding: '32px' }}>
        <form onSubmit={handleSubmit} className="form-stack">
          {isEdit && existing && (
            <div className="form-row">
              <label className="form-label">従業員コード</label>
              <span className="text-muted">{existing.id}</span>
            </div>
          )}

          <div className="form-row">
            <label className="form-label">氏名 <span className="required">*</span></label>
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例：山田 太郎"
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">役職 <span className="required">*</span></label>
            <select className="input-field" value={role} onChange={(e) => setRole(e.target.value)}>
              {roles.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

          {isEdit && (
            <div className="form-row">
              <label className="form-label">在籍状況</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="status" checked={isActive} onChange={() => setIsActive(true)} />
                  <span>在籍</span>
                </label>
                <label className="radio-label">
                  <input type="radio" name="status" checked={!isActive} onChange={() => setIsActive(false)} />
                  <span>退職</span>
                </label>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="button" className="btn-outline" onClick={() => navigateTo('employees')} style={{ flex: 1 }}>
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
