import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

const CreateButton = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Button
      className="m-2 bg-slate-800 text-orange-500 hover:bg-slate-600 hover:text-orange-600"
      onClick={() => {
        router.push("/question/create");
      }}
    >
      {children}
    </Button>
  );
};

export default CreateButton;
