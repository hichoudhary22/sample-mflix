import Link from "next/link";
import Button from "../movie/button";
import SearchPopup from "./searchPopup";

export default function NavBar() {
  return (
    <nav className="my-1">
      <div className="flex justify-between py-2">
        <Link href="/movies">
          <h1 className="rounded-full bg-yellow-400 px-4 py-2 text-2xl font-bold text-black">
            sample_mflix
          </h1>
        </Link>
        <div className="flex gap-2">
          <SearchPopup />
          <button>login</button>
        </div>
      </div>
      <hr />
    </nav>
  );
}
