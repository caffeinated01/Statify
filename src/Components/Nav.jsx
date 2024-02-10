import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <nav className="flex justify-end">
        <div className="hidden w-full justify-between gap-4 md:flex">
          <Link to="/top_tracks">Top Tracks</Link>
          <Link to="/top_artists">Top Artists</Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex basis-full flex-col items-center">
          <Link to="/top_tracks" onClick={toggleNavbar}>
            Top Tracks
          </Link>
          <Link to="/top_artists" onClick={toggleNavbar}>
            Top Artists
          </Link>
        </div>
      )}
    </>
  );
}
export default Nav;
