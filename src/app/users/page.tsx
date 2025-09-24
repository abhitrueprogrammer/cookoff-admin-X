"use client";

import { getUsers, type GetUsersResponse } from "@/api/users";
import ClientTable from "@/components/Table/ClientTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UserDataColumn } from "./user-columns";

const Page = () => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const { data, error, isLoading } = useQuery<GetUsersResponse, Error>({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const handleRowSelectionChange = (rowSelection: Record<string, boolean>) => {
    const selectedIds = Object.keys(rowSelection).filter(
      (id) => rowSelection[id],
    );

    const ids = selectedIds.map(
      (rowIndex) => data!.users[parseInt(rowIndex)].ID,
    );
    setSelectedUserIds(ids);
  };

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <div className="min-h-0 flex-1 p-4">
        <div className="h-full w-full overflow-auto">
          <ClientTable
            data={data?.users ?? []}
            error={error}
            isLoading={isLoading}
            columns={UserDataColumn}
            enableRowSelection
            onRowSelectionChange={handleRowSelectionChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
