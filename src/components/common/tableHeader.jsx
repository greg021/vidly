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

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
