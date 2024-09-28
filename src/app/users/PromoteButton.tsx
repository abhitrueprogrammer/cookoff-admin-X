import { User } from "@/api/users";
import { Table } from "@tanstack/react-table";
import React from "react";

function PromoteButton({ table }: { table: Table<User> }) {
  const selectedRows = table.getSelectedRowModel().rows;
  selectedRows.map((row)=>{
    return row.original.ID
  })
  console.log(selectedRows)
  return (
    <div>

    </div>
  );
}

export default PromoteButton;
