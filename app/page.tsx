"iuse client";
import Link from "next/link";
import Navbar from "./components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div>
      <Navbar />
      <div className="w-full flex justify-center items-center gap-30 mt-20">
        <div className="w-[800px] flex flex-col items-center gap-4 -mr-30">
          <form action="" className="flex flex-col items-center gap-5 border-slate-300 border rounded-xl p-10 ">
            <p className="text-xl ">Login</p>
            <input type="text" placeholder="Username" className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700"/>
            <input type="password" placeholder="Password" className="bg-slate-200 rounded-sm px-3 py-1 w-52 border-b border-slate-700" />
            <button type="submit" className="bg-[#c853fe] rounded px-3 py-1 hover:bg-[#ff55d3]">Login</button>
            <p>didn't have an account<Link href={"/signup"} className="text-[#43a7fc] hover:underline "> Sign up</Link></p>
          </form>
        </div>
        <div>
          <Image src={"/landing-1.jpg"} alt="Landing" width={750} height={400} className="mr-10"
          />
        </div>
      </div>
    </div>
    </>
  );
}
