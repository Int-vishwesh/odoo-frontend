import Navbar from "../components/navbar";
import Link from "next/link";
import Image from "next/image";

export default function Home(){
  return(
    <>
    <Navbar/>
    <div className="flex justify-between px-30 mt-10 w-full ">
    <select name="category" id="category">
      <option value="all">All Categories</option>
      <option value="sports">Sports</option>
      <option value="music">Music</option>
      <option value="tech">Tech</option>
      <option value="art">Art</option>
    </select>
    <select name="dates" id="dates">
      <option value="all">All Dates</option>
      <option value="today">Today</option>
      <option value="this-week">This Week</option>
      <option value="this-month">This Month</option>
      <option value="this-year">This Year</option>
    </select>
    <select name="event-type" id="event-type">
      <option value="all">All Event Types</option>
      <option value="online">Online</option>
      <option value="in-person">offline</option>
      <option value="hybrid">abroad</option>
    </select>
    <div>
      <input type="search" placeholder="search events" className="border-b border-black"/>
      <button type="submit" className=" cursor-pointer">🔍 </button>
    </div>
    </div>
    <main className="flex justify-center mt-10 gap-20 flex-wrap">
      <Link href="/homepage/events">
      <div className="relative w-[350px] flex flex-col border p-5 rounded-2xl border-slate-300 gap-2">
        <Image src="/landing.jpg" alt="homepage" width={1000} height={1000}/>
        <div className="flex justify-between -mt-2 w-full">
          <p className="rounded-[50%] bg-slate-700 py-1 px-3"> music</p>
          <p className="">10 nov, 2025</p>
        </div>
        <h1 className="font-semibold text-[18px]">Live jb</h1>
        <p className="text-[#437afc]"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem dolor quas asperiore</p>
        <p> 📍 location jdcbhjdbh </p>
      </div>
      </Link>
      <div className="relative w-[350px] flex flex-col border p-5 rounded-2xl border-slate-300 gap-2">
        <Image src="/landing.jpg" alt="homepage" width={1000} height={1000}/>
        <div className="flex justify-between -mt-2 w-full">
          <p className="rounded-[50%] bg-slate-700 py-1 px-3"> music</p>
          <p className="">10 nov, 2025</p>
        </div>
        <h1 className="font-semibold text-[18px]">Live jb</h1>
        <p className="text-[#437afc]"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem dolor quas asperiore</p>
        <p> 📍 location jdcbhjdbh </p>
      </div>
      <div className="relative w-[350px] flex flex-col border p-5 rounded-2xl border-slate-300 gap-2">
        <Image src="/landing.jpg" alt="homepage" width={1000} height={1000}/>
        <div className="flex justify-between -mt-2 w-full">
          <p className="rounded-[50%] bg-slate-700 py-1 px-3"> music</p>
          <p className="">10 nov, 2025</p>
        </div>
        <h1 className="font-semibold text-[18px]">Live jb</h1>
        <p className="text-[#437afc]"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem dolor quas asperiore</p>
        <p> 📍 location jdcbhjdbh </p>
      </div>
      <div className="relative w-[350px] flex flex-col border p-5 rounded-2xl border-slate-300 gap-2">
        <Image src="/landing.jpg" alt="homepage" width={1000} height={1000}/>
        <div className="flex justify-between -mt-2 w-full">
          <p className="rounded-[50%] bg-slate-700 py-1 px-3"> music</p>
          <p className="">10 nov, 2025</p>
        </div>
        <h1 className="font-semibold text-[18px]">Live jb</h1>
        <p className="text-[#437afc]"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem dolor quas asperiore</p>
        <p> 📍 location jdcbhjdbh </p>
      </div>
      <div className="relative w-[350px] flex flex-col border p-5 rounded-2xl border-slate-300 gap-2">
        <Image src="/landing.jpg" alt="homepage" width={1000} height={1000}/>
        <div className="flex justify-between -mt-2 w-full">
          <p className="rounded-[50%] bg-slate-700 py-1 px-3"> music</p>
          <p className="">10 nov, 2025</p>
        </div>
        <h1 className="font-semibold text-[18px]">Live jb</h1>
        <p className="text-[#437afc]"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem dolor quas asperiore</p>
        <p> 📍 location jdcbhjdbh </p>
      </div>
      <div className="relative w-[350px] flex flex-col border p-5 rounded-2xl border-slate-300 gap-2">
        <Image src="/landing.jpg" alt="homepage" width={1000} height={1000}/>
        <div className="flex justify-between -mt-2 w-full">
          <p className="rounded-[50%] bg-slate-700 py-1 px-3"> music</p>
          <p className="">10 nov, 2025</p>
        </div>
        <h1 className="font-semibold text-[18px]">Live jb</h1>
        <p className="text-[#437afc]"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem dolor quas asperiore</p>
        <p> 📍 location jdcbhjdbh </p>
      </div>
    </main>
    </>
  )
}