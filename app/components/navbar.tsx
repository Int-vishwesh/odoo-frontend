import Link from "next/link";

export default function Navbar() {
  return (
    <>
    <header className="w-full flex justify-between p-1 px-5">
        <h1 className="text-[30px] font-semibold ">event<span className="text-[#c853fe]">Hive</span></h1>
        <Link href={"/"} className="text-[18px] mr-5 font-semibold"> Home </Link>
      </header>
    </>
  )}