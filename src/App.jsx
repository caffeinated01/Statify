import { useState, useEffect } from "react";

function App() {
  const CLIENT_ID = "b2f3191484834737a772a2700351dca1";
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  function logout() {
    setToken("");
    window.localStorage.removeItem("token");
  }

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((i) => i.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  return (
    <>
      <div className="mx-5 my-5 flex items-center justify-center py-10">
        <div className="flex w-[1200px] flex-col items-center justify-center gap-2 rounded-md bg-slate-200 px-5 py-5">
          <h1 className="text-2xl">Statify</h1>
          {!token ? (
            <>
              <p className="text-sm">Please login with Spotify to continue!</p>
              <a
                href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
              >
                <button className="rounded-md bg-[#1DB954] px-5 py-1 font-extralight text-white hover:bg-[#128039]">
                  Login with Spotify
                </button>
              </a>
            </>
          ) : (
            <>
              <p className="text-sm">Welcome to Statify!</p>
              <button
                onClick={logout}
                className="rounded-md bg-[#e54c3e] px-5 py-1 font-extralight text-white hover:bg-[#9d433b]"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
