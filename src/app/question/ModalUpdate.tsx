import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation"

const  ModalUpdate = ({id, children}: {id:string, children: React.ReactNode;}) =>
{
  const router = useRouter()
  console.log(id)
  return(<div className=" cursor-pointer text-sm flex justify-start p-1 rounded-md text-white bg-gray-500 pl-1 hover:bg-gray-400 w-full text-left" onClick={()=>{router.push(`/question/create/${id}`)}}>{children}</div>)

}

export default ModalUpdate;
