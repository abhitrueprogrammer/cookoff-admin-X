import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation"

const  ModalUpdate = ({id, children}: {id:string, children: React.ReactNode;}) =>
{
  const router = useRouter()
  console.log(id)
  return(<Button className="bg-white flex justify-start p-0 text-black pl-1 hover:bg-orange-200 w-full text-left" onClick={()=>{router.push(`/question/create/${id}`)}}>{children}</Button>)

}

export default ModalUpdate;
