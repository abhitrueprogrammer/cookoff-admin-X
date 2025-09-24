"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { cx } from "class-variance-authority";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "../ui/tableReact";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar } from "./DataTableToolbar";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  state: { rowSelection: RowSelectionState };
  enableRowSelection?: boolean;
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void;
}

export function DataTable<TData>({
  columns,
  data,
  enableRowSelection = false,
  onRowSelectionChange,
}: DataTableProps<TData>) {
  const pageSize = 10;

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection,
    onRowSelectionChange: (updater) => {
      setRowSelection(updater);
      onRowSelectionChange?.(updater); // expose selected rows to parent
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-3 rounded-md border-[1px] border-white/50 p-4">
      <DataTableToolbar table={table} />
      <div className="relative overflow-hidden overflow-x-auto">
        <Table className="border-[1px] border-white">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-y border-gray-200"
              >
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    className={cx(
                      "whitespace-nowrap px-0.5 py-1.5 text-sm sm:text-xs",
                      header.column.columnDef.meta?.className,
                    )}
                  >
                    <div className="px-3 py-1.5">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </div>
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cx("group hover:bg-[#F14A16]")}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={cx(
                        row.getIsSelected() ? "bg-[#F14A16]" : "",
                        "relative whitespace-nowrap px-1 py-1.5 text-white first:w-10 dark:text-gray-400",
                        cell.column.columnDef.meta?.className,
                      )}
                    >
                      {index === 0 && row.getIsSelected() && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600 dark:bg-indigo-500" />
                      )}
                      <div className="px-3 py-1.5">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        pageSize={table.getState().pagination.pageSize}
      />
    </div>
  );
}
