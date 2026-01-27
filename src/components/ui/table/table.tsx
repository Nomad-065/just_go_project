import InputField from "../input/input-field.tsx";
import {type ReactNode, useEffect, useRef, useState} from "react";
import ColumnVisibilityMenu from "./column-visibility-menu.tsx";
import {cn} from "../../../utils/cn.ts";

export type Column<T, K extends keyof T = keyof T> = {
  dataIndex: K;
  header: string;
  render?: (value: T[K], row: T) => React.ReactNode;
  onCellClick?: (value: T[K], row: T) => void; // optional per-cell click
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
  filterValue?: string;
  onFilterValueChange?: (value: string) => void;
  toolbarExtras?: ReactNode;
  onScrollEnd?: () => void;
  loading?: boolean;
  emptyText?: string;
};

function Table<T>({
                    columns = [],
                    data = [],
                    onRowClick,
                    filterValue = '',
                    onFilterValueChange,
                    toolbarExtras,
                    onScrollEnd,
                    loading = false,
                    emptyText = "No Data Available"
                  }: TableProps<T>) {
  const [visibleColumns, setVisibleColumns] = useState<Column<T>[]>(
    columns.map(col => ({...col, hidden: col.hidden ?? false}))
  );

  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.clientHeight + target.scrollTop >= target.scrollHeight - 50) {
      // scrolled to bottom
      onScrollEnd?.();
    }
  };

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

  useEffect(() => {
    if (!onScrollEnd || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          onScrollEnd();
        }
      },
      {threshold: 0.1}
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [onScrollEnd, loading]);

  return (
    <div className="h-full w-full flex flex-col p-1 border border-gray-300 rounded-lg overflow-hidden">
      <div className={'w-full p-1 grid grid-cols-3 h-12'}>
        {/* Filter bar */}
        <div className={'w-50'}>
          {onFilterValueChange && (
            <InputField
              value={filterValue}
              placeholder="Filter"
              onChange={(e) => onFilterValueChange(e.target.value)}
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

      <div className="w-full flex-1 divide-y divide-gray-300 rounded-lg flex flex-col overflow-auto relative">
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
        <div
          className="overflow-y-auto min-w-fit w-full h-full flex flex-col"
          onScroll={handleScroll}
        >
          {/*rows*/}
          {data.length > 0 && (
            data.map((row, idx) => (
              <div
                key={idx}
                className={cn("hover:bg-justgo-blue/30 w-full grid h-fit flex-shrink-0 odd:bg-justgo-green/10 border-b border-gray-300 truncate",
                  onRowClick ? 'cursor-pointer' : 'cursor-auto')}
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
            ))
          )}
          {!loading && data.length === 0 && (
            <div className="w-full flex-1 flex justify-center items-center place-content-center">
              <div className="text-center">
                {emptyText}
              </div>
            </div>
          )}
          {/* Sentinel element for intersection observer */}
          <div ref={sentinelRef} className="h-px"/>

          {loading &&
            Array.from({length: 20}).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="w-full grid h-8 flex-shrink-0 odd:bg-justgo-green/10 border-b border-gray-300"
                style={{
                  gridTemplateColumns: displayedColumns
                    .map((col) =>
                      col.width
                        ? typeof col.width === 'number'
                          ? `${col.width}px`
                          : col.width
                        : `${col.flex ?? 1}fr`
                    )
                    .join(' '),
                }}
              >
                {displayedColumns.map((col) => (
                  <div
                    key={col.dataIndex as string}
                    className="px-4 py-2 flex border-r border-gray-300 last:border-r-0"
                    style={{
                      minWidth: col.minWidth ? (typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth) : '120px',
                      maxWidth: col.maxWidth ? (typeof col.maxWidth === 'number' ? `${col.maxWidth}px` : col.maxWidth) : undefined,
                      textAlign: col.align ?? 'left'
                    }}
                  >
                    <span className={'bg-gray-300 animate-pulse w-full h-full rounded'}></span>
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
