import { useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useRecoilState, useRecoilValue } from "recoil";

import { getUsers, columns, groupByKeys } from "../../utils/mockData";
import { FiltersBar } from "./FiltersBar/FiltersBar";
import { get, set } from "../../utils/localStorage";
import {
  dataState,
  searchTextState,
  groupedDataState,
  selectedColumnsState
} from "../../store";
import { SearchBar } from "../SearcBar/SearchBar";
import GroupTableCell from "./GroupTableCell";
import InnerTable from "./InnerTable";
import "./Table.scss";

export const Table = () => {
  const [, setData] = useRecoilState(dataState);
  const [selectedCols, setSelectedCols] = useRecoilState(selectedColumnsState);
  const [search, setSearch] = useRecoilState(searchTextState);
  const grouped = useRecoilValue(groupedDataState);
  const cols = useMemo(()=> {
    const tableCols = groupByKeys.map((col, index) => ({
      width: index === 0 ? "400px" : null, 
      selector: (row) => row[col.id], 
      name: col.title,
      cell: row => <GroupTableCell summery={row[col.id]}/>,
      omit: !selectedCols.has(col.title)
    }));
    return tableCols
  },[selectedCols])

  useEffect(() => {
    initData();
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

  const handleSelectFilter = (item) => {
    let newSet = new Set(selectedCols);
    if (selectedCols.has(item)) {
      newSet.delete(item);
    } else {
      newSet.add(item);
    }
    setSelectedCols(newSet);
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
          selectedFilters={selectedCols}
        />
        <SearchBar onChange={handleSearch} value={search} />
      </div>
      {grouped && <DataTable
        columns={cols}
        data={grouped}
        expandableRows
        expandableRowExpanded={() => true}
        className="table__main-table"
        expandableRowsComponent={InnerTable}
      />}
    </div>
  );
};
