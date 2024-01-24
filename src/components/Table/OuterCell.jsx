export const OuterCell = ({ summery }) => {
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