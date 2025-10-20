import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
  <div >
    <h1 className="font-bold text-4xl">Home</h1>
    <div className="flex items-center justify-between ">
      <h1>Snippet</h1>
      <Link href={"/snippet/new"}><Button>New</Button></Link>
    </div>
  </div>
  );
}
