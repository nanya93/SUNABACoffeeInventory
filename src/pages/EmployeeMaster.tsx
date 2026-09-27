import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function EmployeeMaster() {
  const { employees, navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('すべて');

  const filtered = employees.filter((e) => {
    const matchSearch = e.name.includes(search) || e.id.includes(search);
    const matchStatus =
      statusFilter === 'すべて' ||
      (statusFilter === '在籍' && e.isActive) ||
      (statusFilter === '退職' && !e.isActive);
    return matchSearch && matchStatus;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">従業員マスタ</h1>
          <p className="page-desc">従業員の情報を管理します。</p>
        </div>
        <button className="btn-primary" onClick={() => navigateTo('employee-form', { mode: 'create' })}>
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
              placeholder="従業員名で検索"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">在籍状況</label>
            <select className="select-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>すべて</option>
              <option>在籍</option>
              <option>退職</option>
            </select>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>従業員コード</th>
                <th>氏名</th>
                <th>役職</th>
                <th className="text-center">在籍状況</th>
                <th className="text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id}>
                  <td className="text-muted text-sm">{emp.id}</td>
                  <td className="font-medium">{emp.name}</td>
                  <td className="text-muted">{emp.role}</td>
                  <td className="text-center">
                    <span className={emp.isActive ? 'badge-appropriate' : 'badge-inactive'}>
                      {emp.isActive ? '在籍' : '退職'}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn-action"
                      onClick={() => navigateTo('employee-form', { mode: 'edit', employeeId: emp.id })}
                    >
                      編集
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="empty-state">該当する従業員が見つかりません</div>
          )}
        </div>
      </div>
    </div>
  );
}
