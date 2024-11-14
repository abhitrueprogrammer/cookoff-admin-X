"use client";

import { RiMoreFill } from "react-icons/ri";
import { type Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface Action<TData> {
  label: string;
  onClick: (row: Row<TData>) => void;
  className?: string;
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  editAction?: Action<TData>;
  destructiveAction?: Action<TData>;
  additionalActions?: Action<TData>[];
  children?: React.ReactNode;
}

export function DataTableRowActions<TData>({
  row,
  editAction,
  destructiveAction,
  additionalActions = [],
  children,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group aspect-square p-1.5 hover:border hover:border-gray-300 data-[state=open]:border-gray-300 data-[state=open]:bg-gray-50 hover:dark:border-gray-700 data-[state=open]:dark:border-gray-700 data-[state=open]:dark:bg-gray-900"
        >
          <RiMoreFill
            className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-data-[state=open]:text-gray-700 group-hover:dark:text-gray-300 group-data-[state=open]:dark:text-gray-300"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {additionalActions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => action.onClick(row)}
            className={action.className}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
        {editAction && (
          <DropdownMenuItem
            onClick={() => editAction.onClick(row)}
            className={editAction.className}
          >
            {editAction.label}
          </DropdownMenuItem>
        )}
        {destructiveAction && (
          <DropdownMenuItem
            onClick={() => destructiveAction.onClick(row)}
            className={`text-red-600 dark:text-red-500 ${destructiveAction.className ?? ""}`}
          >
            {destructiveAction.label}
          </DropdownMenuItem>
        )}
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
