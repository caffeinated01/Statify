import { Routes, Route } from "react-router-dom";
import LoginContext from "./LoginContext";
import Header from "./components/Header";
import Tracks from "./components/Tracks";
import Artists from "./components/Artists";
import Privacy from "./components/Privacy";
import Footer from "./components/Footer";
import { AudioLines, ListMusic, Code } from "lucide-react";
import { useSpotifyAuth } from "./hooks/useSpotifyAuth";

function App() {
  const { token, userInfo, AUTH_URL, logout, isAuthenticated } =
    useSpotifyAuth();

  return (
    <>
      <div className="bg-bg-primary max-w-screen min-h-screen text-gray-200 select-none">
        <LoginContext.Provider
          value={{ AUTH_URL, userInfo, token, isAuthenticated }}
        >
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <div className="mx-5 my-5 flex items-center justify-center gap-10 py-10">
                    <div className="bg-bg-secondary relative flex w-[1000px] flex-col items-center justify-center text-center gap-2 rounded-md border-[1px] border-[#ffffff1a] px-5 py-5 shadow-2xl">
                      <h1 className="text-3xl">Statify</h1>
                      {!isAuthenticated ? (
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
                              {userInfo.display_name}
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
