import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginContext from "./LoginContext";
import Header from "./Components/Header";
import Tracks from "./Components/Tracks";
import Artists from "./Components/Artists";
import Privacy from "./Components/Privacy";
import Footer from "./Components/Footer";
import { AudioLines, ListMusic, Code, CalendarFold } from "lucide-react";
import axios from "axios";

function App() {
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = "b2f3191484834737a772a2700351dca1";
  const RESPONSE_TYPE = "token";
  const REDIRECT_URI = "https://statify-app.vercel.app/";
  const SCOPE =
    "user-top-read,playlist-modify-public,playlist-modify-private,user-read-private,user-read-email";

  const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

  const [token, setToken] = useState("");
  const [userInfoJSON, setUserInfoJSON] = useState({});

  function logout() {
    setToken("");
    window.localStorage.removeItem("token");
    setUserInfoJSON({});
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

    async function getUserData() {
      const { data } = await axios.get("https://api.spotify.com/v1/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUserInfoJSON(data);
    }

    getUserData();

    function getNewToken() {
      window.location.href = AUTH_URL;
      const hash = window.location.hash;
      let token = hash;
      window.location.hash = "";
      return token;
    }

    axios.interceptors.response.use(null, async (error) => {
      if (error.response.status === 401) {
        const newToken = await getNewToken();
        window.localStorage.setItem("token", newToken);
      }

      return Promise.reject(error);
    });
  }, []);

  return (
    <>
      <div className="bg-bg-primary max-w-screen min-h-screen text-gray-200 select-none">
        <LoginContext.Provider value={{ AUTH_URL, userInfoJSON }}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <div className="mx-5 my-5 flex items-center justify-center gap-10 py-10">
                    <div className="bg-bg-secondary relative flex w-[1000px] flex-col items-center justify-center gap-2 rounded-md border-[1px] border-[#ffffff1a] px-5 py-5 shadow-2xl">
                      <h1 className="text-3xl">Statify</h1>
                      {!token ? (
                        <>
                          <p className="text-sm">
                            Please login with Spotify to continue!
                          </p>
                          <a href={AUTH_URL}>
                            <button className="rounded-md bg-green-600 px-5 py-1 font-extralight text-white hover:bg-green-700 duration-100 ease-in">
                              Login with Spotify
                            </button>
                          </a>
                        </>
                      ) : (
                        <>
                          <p className="text-md">
                            Hi,{" "}
                            <span className="text-green-500">
                              {userInfoJSON.display_name}
                            </span>
                            . Welcome to Statify!
                          </p>
                          <button
                            onClick={logout}
                            className="rounded-md bg-red-600 px-5 py-1 font-extralight text-white hover:bg-red-900 duration-100 ease-in"
                          >
                            Logout
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="m-auto max-w-[400px]">
                    <div className="flex items-center justify-center gap-4 pb-7 mx-5">
                      <AudioLines
                        size={100}
                        strokeWidth={1.5}
                        className="text-gray-400"
                      />
                      <div className="flex-col">
                        <h1 className="text-2xl font-bold">
                          Your listening statistics
                        </h1>
                        <p className="text-gray-300">
                          View your most listened artists as well as tracks, in
                          three different time spans!
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 pb-7 mx-5">
                      <ListMusic
                        size={100}
                        strokeWidth={1.5}
                        className="text-gray-400"
                      />
                      <div className="flex-col">
                        <h1 className="text-2xl font-bold">
                          Generate playlists
                        </h1>
                        <p className="text-gray-300">
                          Create playlists based on your favourite tracks with
                          just a click of a button!
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 pb-7 mx-5">
                      <Code
                        size={100}
                        strokeWidth={1.5}
                        className="text-gray-400"
                      />
                      <div className="flex-col">
                        <h1 className="text-2xl font-bold">Open source</h1>
                        <p className="text-gray-300">
                          This website is entirely open source. Check out the
                          source code{" "}
                          <span className="underline">
                            <a href="https://github.com/caffeinated01/statify">
                              here
                            </a>
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 pb-7 mx-5">
                      <CalendarFold
                        size={100}
                        strokeWidth={1.5}
                        className="text-gray-400"
                      />
                      <div className="flex-col">
                        <h1 className="text-2xl font-bold">
                          More features planned
                        </h1>
                        <p className="text-gray-300">
                          Since this website is a work in progress, more
                          features will be added eventually
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/top_tracks" element={<Tracks />} />
            <Route path="/top_artists" element={<Artists />} />
            <Route path="/privacy_policy" element={<Privacy />} />
          </Routes>
          <Footer />
        </LoginContext.Provider>
      </div>
    </>
  );
}

export default App;
