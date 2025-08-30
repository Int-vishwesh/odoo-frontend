import Image from "next/image"
import Link from "next/link"
import Navbar from "../components/navbar"

export default function Signup(){
  return(
    <>
    <div>
      <Navbar/>
      <div className="w-full flex justify-center items-center gap-30 mt-20">
        <div className="w-[800px] flex flex-col items-center gap-4">
          <form action="" className="flex flex-col items-center gap-5 border-slate-300 border rounded-xl p-10 ">
            <p className="text-xl ">Login</p>
            <input type="text" placeholder="Username" className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700"/>
            <input type="email" placeholder="email" className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700"/>
            <input type="number" placeholder="phone" className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700"/>
            <input type="password" placeholder="Password" className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700" />
            <button type="submit" className="bg-[#c853fe] rounded px-3 py-1 hover:bg-[#ff55d3]">Sign up</button>
            <p>Already have an account<Link href={"/"} className="text-[#43a7fc] hover:underline "> Login</Link></p>
          </form>
        </div>
        <div>
          <Image src={"/landing.jpg"} alt="Landing" width={550} height={400} className="mr-10"
          />
        </div>
      </div>
    </div>
    </>
  )
}