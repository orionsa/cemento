import Checkbox from '@mui/material/Checkbox';
import './FiltersBar.scss';

export const FiltersBar = ({ allFilters, selectedFilters, onSelect }) => {
  return (
    <div className='filters-bar'>
      {
        allFilters.map(item => (
          <button key={`filtersBar-${item}`} className='filters-bar__button' onClick={()=> onSelect(item)}>
            <Checkbox checked={selectedFilters.has(item)} size='small'/>
            <span>{item}</span>
          </button>
        ))
      }
    </div>
  )
}