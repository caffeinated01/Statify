import { Menu, X } from "lucide-react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../LoginContext";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useContext(LoginContext);

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <nav className="flex justify-end">
        <div className="hidden w-full justify-between gap-4 md:flex">
          <Link to="/top_tracks">Top Tracks</Link>
          <Link to="/top_artists">Top Artists</Link>
          <Link to="/privacy_policy">Privacy</Link>
          {isAuthenticated ? (
            <Link
              to="/"
              className="rounded-md bg-red-600 px-5 py-[0.5px] font-extralight text-white hover:bg-red-900 duration-100 ease-in"
            >
              Logout
            </Link>
          ) : (
            <></>
          )}
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
          <Link to="/privacy_policy" onClick={toggleNavbar}>
            Privacy
          </Link>
          {isAuthenticated && (
            <Link
              to="/"
              onClick={toggleNavbar}
              className="rounded-md bg-red-600 px-5 py-1 font-extralight text-white hover:bg-red-900 duration-100 ease-in"
            >
              Logout
            </Link>
          )}
        </div>
      )}
    </>
  );
}
export default Nav;
