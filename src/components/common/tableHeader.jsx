import React from "react";

function TableHeader({ columns, sortColumn, onSort }) {
  const raiseSort = (path) => {
    const sc = { ...sortColumn };

    if (sc.path === path) sc.order = sc.order === "asc" ? "desc" : "asc";
    else {
      sc.path = path;
      sc.order = "asc";
    }

    onSort(sc);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="pointer"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
