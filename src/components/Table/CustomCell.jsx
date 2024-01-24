
import { memo } from 'react';
import { useRecoilState } from 'recoil';
import { Avatar } from "../Avatar/Avatar";
import { Select } from "../Select/Select";
import { Input } from '../Input/Input';
import { cellState } from '../../store';

const CustomCell = ({ id, type, row, options }) => {
  const [cell, setCell] = useRecoilState(cellState({ rowId: row.id, cellId: id }))
  const handleChange = (event) => {
    setCell(event.target.value);
  }

  return <>
    {type === 'image' && <Avatar avatar={cell} />}
    {type === 'select' && <Select onChange={handleChange} value={cell} list={options} label={id}/>}
    {type === 'boolean' && <Select value={cell} list={[true, false]}/>}
    {(type === 'string' || type === 'number') && <Input value={cell} onChange={handleChange} type={type} />}
  </> 
}

const MemoCell = memo(CustomCell, (prev, next) => prev.row.id === next.row.id);

export default MemoCell