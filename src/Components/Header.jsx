import Nav from "./Nav";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-[10] mx-auto flex w-full flex-wrap items-center justify-between border-[1px] border-b border-[#ffffff1a] px-6 py-2 backdrop-blur-md">
      <Link className="text-2xl" to="/">
        Statify
      </Link>
      <Nav />
    </header>
  );
}

export default Header;
