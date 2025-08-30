"iuse client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div>
      <header>
        <h1>Quick<span className="">Sport</span></h1>
        <nav>
          <Link href={"/"}> Home </Link>
        </nav>
      </header>
      <div>
        <div></div>
        <div>
          <Image src={"/landing.jpg"} alt="Landing" width={400} height={400}
          />
        </div>
      </div>
    </div>
    </>
  );
}
