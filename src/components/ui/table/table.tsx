import * as React from "react";
import InputField from "../input/input-field.tsx";
import {type ReactNode, useState} from "react";
import ColumnVisibilityMenu from "./column-visibility-menu.tsx";

export type Column<T> = {
  dataIndex: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  onCellClick?: (value: T[keyof T], row: T) => void; // optional per-cell click
  hidden?: boolean;

  flex?: number,
  width?: number | string;      // e.g. 120 | '20%'
  minWidth?: number | string;
  maxWidth?: number | string;
  align?: 'left' | 'center' | 'right';
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void; // optional row click
  onFilterChange?: (value: string) => void;
  toolbarExtras?: ReactNode;
};

function Table<T>({
                    columns,
                    data,
                    onRowClick,
                    onFilterChange,
                    toolbarExtras
                  }: TableProps<T>) {
  const [visibleColumns, setVisibleColumns] = useState<Column<T>[]>(
    columns.map(col => ({...col, hidden: col.hidden ?? false}))
  );


  const toggleColumn = (dataIndex: keyof T) => {
    setVisibleColumns(prev => {
      const visibleCount = prev.filter(c => !c.hidden).length;
      const targetColumn = prev.find(c => c.dataIndex === dataIndex);

      // prevent hiding the last visible column
      if (targetColumn && !targetColumn.hidden && visibleCount === 1) {
        return prev;
      }

      return prev.map(col => {
        if (col.dataIndex !== dataIndex) return col;
        return {...col, hidden: !col.hidden};
      });
    });
  };

  const displayedColumns = visibleColumns.filter(column => !column.hidden);

  return (
    <div className="h-full w-full flex flex-col p-1 border border-gray-300 rounded-lg overflow-hidden">
      <div className={'w-full p-1 grid grid-cols-3 h-12'}>
        {/* Filter bar */}
        <div className={'w-50'}>
          {onFilterChange && (
            <InputField
              placeholder="Filter"
              onChange={(e) => onFilterChange(e.target.value)}
            />
          )}
        </div>
        <div className={'flex w-full items-center justify-center'}>
          {toolbarExtras}
        </div>
        <div className="flex justify-end">
          <ColumnVisibilityMenu
            columns={visibleColumns}
            onToggle={toggleColumn}
          />
        </div>

      </div>

      <div className="w-full flex-1 divide-y divide-gray-300 rounded-lg flex flex-col overflow-auto">
        {/*Header*/}
        <div
          className="w-full h-8 grid"
          style={{
            gridTemplateColumns: displayedColumns.map(col => {
              if (col.width) {
                return typeof col.width === 'number' ? `${col.width}px` : col.width;
              }
              return `${col.flex ?? 1}fr`;
            }).join(' ')
          }}
        >
          {displayedColumns.map((col) => (
            <div
              key={col.dataIndex as string}
              className="px-4 py-2 text-sm text-white font-semibold truncate bg-justgo-green border-r border-gray-300 last:border-r-0"

              style={{
                minWidth: col.minWidth ? (typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth) : '120px',
                maxWidth: col.maxWidth ? (typeof col.maxWidth === 'number' ? `${col.maxWidth}px` : col.maxWidth) : undefined,
                textAlign: col.align ?? 'left'
              }}
            >

              {col.header}
            </div>
          ))}
        </div>

        {/*body*/}
        <div className="overflow-y-auto min-w-fit w-full h-fit flex flex-col">
          {/*rows*/}
          {data.map((row, idx) => (
            <div
              key={idx}
              className="hover:bg-justgo-blue/30 w-full grid h-8 flex-shrink-0 odd:bg-justgo-green/10 border-b border-gray-300 truncate"
              style={{
                gridTemplateColumns: displayedColumns.map(col => {
                  if (col.width) {
                    return typeof col.width === 'number' ? `${col.width}px` : col.width;
                  }
                  return `${col.flex ?? 1}fr`;
                }).join(' ')
              }}
              onClick={() => onRowClick?.(row)}
            >
              {displayedColumns.map((col) => (
                <div
                  key={col.dataIndex as string}
                  className="px-4 py-2 text-sm truncate border-r border-gray-300 last:border-r-0"
                  onClick={(e) => {
                    if (col.onCellClick) {
                      e.stopPropagation(); // prevent triggering row click
                      col.onCellClick?.(row[col.dataIndex], row);
                    }
                  }}
                  style={{
                    minWidth: col.minWidth ? (typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth) : '120px',
                    maxWidth: col.maxWidth ? (typeof col.maxWidth === 'number' ? `${col.maxWidth}px` : col.maxWidth) : undefined,
                    textAlign: col.align ?? 'left'
                  }}
                >
                  {col.render
                    ? col.render(row[col.dataIndex], row)
                    : String(row[col.dataIndex])}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Table
