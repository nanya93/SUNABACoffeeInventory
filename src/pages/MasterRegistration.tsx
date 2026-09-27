import type { ReactElement } from 'react';
import { useApp } from '../context/AppContext';

interface MasterCard {
  title: string;
  desc: string;
  icon: ReactElement;
  action: () => void;
}

function IconBox() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  );
}

function IconPerson() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconTag() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function IconRuler() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="21" x2="21" y2="3" />
      <path d="M7 21l-4-4 14-14 4 4" />
      <line x1="7" y1="14" x2="10" y2="17" />
      <line x1="14" y1="7" x2="17" y2="10" />
      <line x1="3" y1="21" x2="21" y2="3" />
    </svg>
  );
}

export default function MasterRegistration() {
  const { navigateTo } = useApp();

  const cards: MasterCard[] = [
    {
      title: '商品マスタ登録',
      desc: '新しい商品を登録します。',
      icon: <IconBox />,
      action: () => navigateTo('product-form', { mode: 'create' }),
    },
    {
      title: '従業員マスタ登録',
      desc: '新しい従業員を登録します。',
      icon: <IconPerson />,
      action: () => navigateTo('employee-form', { mode: 'create' }),
    },
    {
      title: 'カテゴリマスタ登録',
      desc: '商品カテゴリを登録します。',
      icon: <IconTag />,
      action: () => {},
    },
    {
      title: '単位マスタ登録',
      desc: '商品の単位を登録します。',
      icon: <IconRuler />,
      action: () => {},
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">マスタ登録</h1>
          <p className="page-desc">各種マスタの新規登録を行います。</p>
        </div>
      </div>

      <div className="master-grid">
        {cards.map((card) => (
          <button key={card.title} className="master-card" onClick={card.action}>
            <div className="master-card-icon">{card.icon}</div>
            <div className="master-card-body">
              <div className="master-card-title">{card.title}</div>
              <div className="master-card-desc">{card.desc}</div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8', flexShrink: 0 }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
