import { banUser, unbanUser, type User } from "@/api/users";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Row } from "@tanstack/react-table";
import toast from "react-hot-toast";

const BanBtn = ({ row }: { row: Row<User> }) => {
  const queryClient = useQueryClient();

  const handleBan = useMutation({
    mutationFn: (id: string) =>
      toast.promise(banUser(id), {
        loading: "Banning...",
        success: "User banned successfully",
        error: (err: unknown) => {
          if (err instanceof Error) return err.message;
          return "Error banning user";
        },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleUnban = useMutation({
    mutationFn: (id: string) =>
      toast.promise(unbanUser(id), {
        loading: "Unbanning...",
        success: "User unbanned successfully",
        error: (err: unknown) => {
          if (err instanceof Error) return err.message;
          return "Error unbanning user";
        },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <div>
      {row.original.IsBanned ? (
        <Button onClick={() => handleUnban.mutate(row.original.ID)}>
          Unban
        </Button>
      ) : (
        <Button
          disabled={row.original.Role === "admin"}
          onClick={() => handleBan.mutate(row.original.ID)}
        >
          Ban
        </Button>
      )}
    </div>
  );
};

export default BanBtn;
