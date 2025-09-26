"use client";

import { getUsers, type GetUsersResponse } from "@/api/users";
import ClientTable from "@/components/Table/ClientTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UserDataColumn } from "./user-columns";

const ACCENT_GREEN = "#1ba94c";
const ACCENT_COLOR_TEXT = "text-[#1ba94c]";
const DARK_BG = "bg-[#0E150F]";

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
    <div className={`min-h-screen p-8 text-white`}>
      <h1
        className={`mb-8 pb-3 text-3xl font-extrabold uppercase tracking-widest ${ACCENT_COLOR_TEXT} border-b border-[${ACCENT_GREEN}]/50`}
      >
        User Management
      </h1>

      <div className="flex h-full flex-col space-y-6">
        <div className="flex-1">
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
