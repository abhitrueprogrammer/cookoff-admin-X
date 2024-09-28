"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
function dashboard() {
    const router = useRouter()
  return (
    <div>
        <Button onClick={()=>{ router}} className="bg-bb m-4 hover:bg-slate-950" ><FaHome size={20} className="text-white"></FaHome></Button>
        <div className="flex h-screen w-screen items-center justify-around gap-20">
          <Button onClick={()=>{router.push("/question")}} className=" m-10 flex-grow h-80 border-2 p-15 border-orange-500 text-6xl">QUESTIONS</Button>
          <Button onClick={()=>{router.push("/users")}} className="m-10 flex-grow h-80 border-2 p-15 border-orange-500 text-6xl">USERS</Button>
        </div>
    </div>
  );
}

export default dashboard;
