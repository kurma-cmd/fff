const fireColors = ['#f59e0b', '#ef6c35', '#e83e5b', '#9b51e0', '#2878e3', '#16a085'];

export function StreakBadge({ days }: { days: number }) {
  const tier = Math.floor(days / 10);
  const color = fireColors[Math.min(tier, fireColors.length - 1)];
  const nextColor = (tier + 1) * 10;
  return <div className="streak-badge" title={`Следующий цвет огня на ${nextColor}-й день`}><span style={{ color }}>🔥</span><div><strong>{days}</strong><small>дней подряд</small></div></div>;
}
