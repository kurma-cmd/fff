import type { CostBand } from '../lib/universities';
import { QadamSelect } from './QadamSelect';

export type UniversityFilterState = {
  direction: string;
  cost: CostBand | 'Любая';
  fundingOnly: boolean;
  suitableEnglishOnly: boolean;
};

type Props = { filters: UniversityFilterState; onChange: (filters: UniversityFilterState) => void };
const directions = ['Все', 'IT', 'Бизнес', 'Медицина', 'Дизайн', 'Инженерия', 'Право'];

export function UniversityFilters({ filters, onChange }: Props) {
  return <section className="catalog-filters" aria-label="Фильтры университетов">
    <div className="filter-row">{directions.map(direction => <button className={filters.direction === direction ? 'filter-active' : ''} key={direction} onClick={() => onChange({ ...filters, direction })}>{direction}</button>)}</div>
    <div className="filter-details">
      <label>Стоимость<QadamSelect compact value={filters.cost} options={['Любая', 'Низкая', 'Средняя', 'Высокая'].map(value => ({ value, label: value }))} onChange={value => onChange({ ...filters, cost: value as UniversityFilterState['cost'] })} /></label>
      <label className="check-filter"><input type="checkbox" checked={filters.fundingOnly} onChange={event => onChange({ ...filters, fundingOnly: event.target.checked })} /> Только с финансированием</label>
      <label className="check-filter"><input type="checkbox" checked={filters.suitableEnglishOnly} onChange={event => onChange({ ...filters, suitableEnglishOnly: event.target.checked })} /> Подходит мой английский</label>
    </div>
  </section>;
}
