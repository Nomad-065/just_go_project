import * as React from "react";

export type Column<T> = {
  dataIndex: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  onCellClick?: (value: T[keyof T], row: T) => void; // optional per-cell click
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void; // optional row click
};

function Table<T>({columns, data, onRowClick}: TableProps<T>) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th
              key={col.dataIndex as string}
              className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
            >
              {col.header}
            </th>
          ))}
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
        {data.map((row, idx) => (
          <tr
            key={idx}
            className="hover:bg-justgo-blue/30"
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((col) => (
              <td
                key={col.dataIndex as string}
                className="px-4 py-2 text-sm text-gray-600"
                onClick={(e) => {
                  e.stopPropagation(); // prevent triggering row click
                  col.onCellClick?.(row[col.dataIndex], row);
                }}
              >
                {col.render
                  ? col.render(row[col.dataIndex], row)
                  : String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table
