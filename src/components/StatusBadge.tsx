import { getStockStatus, getStatusLabel } from '../types';

interface Props {
  current: number;
  optimal: number;
}

export default function StatusBadge({ current, optimal }: Props) {
  const status = getStockStatus(current, optimal);
  const label = getStatusLabel(status);

  return (
    <span className={`badge ${status === 'shortage' ? 'badge-shortage' : 'badge-appropriate'}`}>
      {label}
    </span>
  );
}
