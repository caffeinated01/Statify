import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Nav(){
    const [isOpen, setIsOpen] = useState(false)

    function toggleNavbar(){
        setIsOpen(!isOpen);
    }

    return(
        <>
        <nav className="flex justify-end">
            <div className="hidden w-full md:flex gap-4 justify-between">
                <Link to="/top_tracks">Top Tracks</Link>
                <Link to="/top_artists">Top Artists</Link>
            </div>
            <div className="md:hidden">
                <button onClick={toggleNavbar}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>
        </nav>
        {isOpen && (
            <div className="flex flex-col items-center basis-full">
                <Link to="/top_tracks">Top Tracks</Link>
                <Link to="/top_artists">Top Artists</Link>
            </div>
        )}
        </>
    );
}
export default Nav;
