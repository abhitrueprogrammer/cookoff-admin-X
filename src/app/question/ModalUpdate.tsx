import { useRouter } from "next/navigation";

const ModalUpdate = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  console.log(id);
  return (
    <div
      className="flex w-full cursor-pointer justify-start rounded-md bg-gray-500 p-1 pl-1 text-left text-sm text-white hover:bg-gray-400"
      onClick={() => {
        router.push(`/question/create/${id}`);
      }}
    >
      {children}
    </div>
  );
};

export default ModalUpdate;
