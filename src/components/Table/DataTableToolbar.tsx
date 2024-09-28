"use client";

import { Table } from "@tanstack/react-table";

// import { Search } from "@/assets/icons";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  function handleClick() {
    const selectedRow = table.getSelectedRowModel().rows;
    selectedRow.map((d) => {
      alert(d.original);
    });
  }
  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={() => {
          handleClick();
        }}
      >
        {" "}
        Hello
      </Button>
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-2">
            {/* <Search /> */}
          </div>
          <Input
            placeholder="Search"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-full rounded-[8px] border-[1px] pl-8"
            style={{ boxShadow: "0px 1px 2px 0px #00000014" }}
          />
        </div>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-fit rounded-[8px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                Last {pageSize} Month
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
