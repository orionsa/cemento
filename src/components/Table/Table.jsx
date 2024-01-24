import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useRecoilState, useRecoilValue } from "recoil";

import CustomCell from "./CustomCell";
import { getUsers, columns, groupByKeys } from "../../utils/mockData";
import { FiltersBar } from "./FiltersBar/FiltersBar";
import { get, set } from "../../utils/localStorage";
import {
  dataState,
  searchTextState,
  groupedDataState
} from "../../store";
import { SearchBar } from "../SearcBar/SearchBar";
import { OuterCell } from "./OuterCell";
import "./Table.scss";

export const Table = () => {
  const [, setData] = useRecoilState(dataState);
  const [cols, setCols] = useState([]);
  const [outerCols, setOuterCols] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(
    new Set(columns.map((col) => col.title))
  );
  const [search, setSearch] = useRecoilState(searchTextState);
  const grouped = useRecoilValue(groupedDataState);

  useEffect(() => {
    initData();
    getTableCols();
    getOuterCol();
  }, []);

  const initData = () => {
    const storageData = get("data");
    if (storageData) {
      setData(storageData);
      return;
    }
    const mockUsers = getUsers(10);
    setData(mockUsers);
    set("data", mockUsers);
  };

  const getTableCols = () => {
    const tableCols = columns.map((col) => ({
      ordinalNo: col.ordinalNo,
      width: col.width ? `${col.width}px` : null,
      selector: (row) => row[col.id],
      name: col.title,
      cell: (row) => <CustomCell row={row} {...col} />,
    }));
    tableCols.sort((a, b) => a.ordinalNo - b.ordinalNo);
    setCols(tableCols);
  };

  const getOuterCol = () => {
    const tableCols = groupByKeys.map((col, index) => ({
      width: index === 0 ? "400px" : null, 
      selector: (row) => row[col.id], 
      name: col.title,
      cell: row => <OuterCell summery={row[col.id]}/>
    }));

    setOuterCols(tableCols);
  }

  const handleSelectFilter = (item) => {
    let newSet = new Set(selectedFilters);
    if (selectedFilters.has(item)) {
      newSet.delete(item);
    } else {
      newSet.add(item);
    }
    setSelectedFilters(newSet);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="table">
      <div className="table__filters">
        <FiltersBar
          allFilters={columns.map((col) => col.title)}
          onSelect={handleSelectFilter}
          selectedFilters={selectedFilters}
        />
        <SearchBar onChange={handleSearch} value={search} />
      </div>
      {grouped && <DataTable
        columns={outerCols.filter(c => selectedFilters.has(c.name))}
        data={grouped}
        expandableRows
        expandableRowExpanded={() => true}
        className="table__main-table"
        expandableRowsComponent={({ data }) => 
          <DataTable
            className="table__main-table__collapsible-table" 
            columns={cols.filter(c => selectedFilters.has(c.name))}
            data={data.children}
            style={{ paddingRight: '50px' }}
            noTableHead={true}
          />
        }
      />}
    </div>
  );
};
