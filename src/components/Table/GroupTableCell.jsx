import { memo } from 'react';

export const GroupTableCell = ({ summery }) => {
  return (
    <> 
      {
        Object.entries(summery).map(([key, value]) => (
          <div key={`outer-cell-${key}${value}`} style={{ margin: '5px' }}>
            <span>{key}: {value}</span>
          </div>
        ))
      }
    </>
  )
}

const Memoized = memo(GroupTableCell, (prev, next) => JSON.stringify(next.summery) === JSON.stringify(prev.summery))
export default Memoized;