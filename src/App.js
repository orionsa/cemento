import { useRecoilValue } from 'recoil';
import Button from '@mui/material/Button';

import { Table } from './components/Table/Table'
import { dataState } from './store';
import { set } from './utils/localStorage';
import './App.css';

function App() {
  const data = useRecoilValue(dataState);
  const handleSave = () => {
    set('data', data);
  }

  return (
    <div className="App">
      <Table />
      <Button variant="contained" onClick={handleSave}>Save</Button>
    </div>
  );
}

export default App;
