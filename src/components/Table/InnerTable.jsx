import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import DataTable from "react-data-table-component";

import CustomCell from "./CustomCell";
import { columns } from "../../utils/mockData";
import { selectedColumnsState } from "../../store";

const InnerTable = ({ data }) => {
  const selectedCols = useRecoilValue(selectedColumnsState);
  const cols = useMemo(()=> {
    const tableCols = columns.map((col) => ({
      ordinalNo: col.ordinalNo,
      width: col.width ? `${col.width}px` : null,
      selector: (row) => row[col.id],
      name: col.title,
      cell: (row) => <CustomCell row={row} {...col} />,
      omit: !selectedCols.has(col.title)
    }));
    tableCols.sort((a, b) => a.ordinalNo - b.ordinalNo);
    return tableCols
  }, [selectedCols])

  return (
    <DataTable
      className="table__main-table__collapsible-table"
      columns={cols}
      data={data.children}
      style={{ paddingRight: "50px" }}
      noTableHead={true}
    />
  );
};

export default InnerTable;
