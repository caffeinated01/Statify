import Nav from "./Nav";
import { Link } from "react-router-dom";

function Header(){
    return(
        <header className="backdrop-blur-md sticky top-0 flex-wrap z-[10] mx-auto flex w-full items-center justify-between border-b border-gray-200 px-6 py-2">
            <Link className="text-2xl" to="/">Statify</Link>
            <Nav />
        </header>
    );
}

export default Header;
