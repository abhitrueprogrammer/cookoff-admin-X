import { Roast, UnRoast, type User } from "@/api/users";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Row } from "@tanstack/react-table";
import { type ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
const BanBtn = ({ row }: { row: Row<User> }) => {
  const queryClient = useQueryClient();
  const handleUnban = useMutation({
    mutationFn: (id: string) => {
      return toast.promise(UnRoast(id), {
        loading: "UnRoasting...",
        success: "UnRoast success",
        error: (err: ApiError) => err.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleBan = useMutation({
    mutationFn: (id: string) => {
      return toast.promise(Roast(id), {
        loading: "Roasting...",
        success: "Roast success",
        error: (err: ApiError) => err.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const onRoastSubmit = (id: string) => {
    handleBan.mutate(id);
  };
  const onunRoastSubmit = (id: string) => {
    handleUnban.mutate(id);
  };
  return (
    <div>
      {row.original.IsBanned ? (
        <div>
          <Button
            onClick={() => {
              onunRoastSubmit(row.original.ID);
            }}
          >
            unRoast
          </Button>
        </div>
      ) : (
        <div>
          <Button
            disabled={row.original.Role === "admin"}
            onClick={() => {
              onRoastSubmit(row.original.ID);
            }}
          >
            Roast
          </Button>{" "}
        </div>
      )}
    </div>
  );
};
export default BanBtn;
