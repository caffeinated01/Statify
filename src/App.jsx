import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoginContext from "./LoginContext";
import Header from "./Components/Header";
import Tracks from "./Components/Tracks";
import Artists from "./Components/Artists";

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
      <div className="bg-bg-primary h-screen text-gray-200">
        <LoginContext.Provider value={{ token, setToken }}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <div className="mx-5 my-5 flex flex-col items-center justify-center gap-10 py-10">
                  <div className="bg-bg-secondary relative flex w-[1000px] flex-col items-center justify-center gap-2 rounded-md border-[1px] border-[#ffffff1a] px-5 py-5 shadow-2xl">
                    <h1 className="text-2xl">Statify</h1>
                    {!token ? (
                      <>
                        <p className="text-sm">
                          Please login with Spotify to continue!
                        </p>
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
                  {token ? (
                    <>
                      {" "}
                      <h1>Choose what to see</h1>
                    </>
                  ) : (
                    <>
                      <h1>what u can see</h1>
                    </>
                  )}
                </div>
              }
            />

            <Route path="/top_tracks" element={<Tracks />} />
            <Route path="/top_artists" element={<Artists />} />
          </Routes>
        </LoginContext.Provider>
      </div>
    </>
  );
}

export default App;
