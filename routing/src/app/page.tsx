import Image from "next/image";

export default function Home() {
  return (
    <div>
      <nav className="flex justify-around items-center p-5 bg-gray-200">
        <h1>Home</h1>
        <div>
        <h1>Performance</h1>
        <h1>Reliability</h1>
        </div>
      </nav>
    </div>
  );
}
