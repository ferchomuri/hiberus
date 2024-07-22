import React, { useState } from "react";
import Rating from "../Rating/Rating";
import "./Table.css";

export type ITableProps = {
  data: any[];
  columns: { label: string; name: string }[];
  loading: boolean;
  setSelectedRow?: Function;
};

const Table: React.FC<ITableProps> = ({
  data,
  columns,
  loading,
  setSelectedRow = () => {},
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      <table>
        <thead>
          <tr>
            <th>#</th>
            {columns.map((column, index) => (
              <th
                key={column.name + index + "header"}
                onClick={() => requestSort(column.name)}
                style={{ cursor: "pointer" }}
              >
                {capitalizeTitle(column.label)}
                {sortConfig && sortConfig.key === column.name
                  ? sortConfig.direction === "ascending"
                    ? " ↑"
                    : " ↓"
                  : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr
              key={row.id + index + "body"}
              onClick={() => setSelectedRow(row)}
            >
              <td>{index + 1}</td>
              {columns.map((column) => (
                <td key={column.name}>
                  {column.name === "rating" ? (
                    <Rating value={row[column.name]} />
                  ) : (
                    row[column.name]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const capitalizeTitle = (title: string) => {
  return title.charAt(0).toUpperCase() + title.slice(1);
};

export default Table;
