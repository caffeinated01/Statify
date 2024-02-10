import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoginContext from "../LoginContext";
import Select from "react-select";
import LinkIcon from "./LinkIcon";

function Tracks() {
  const loginContext = useContext(LoginContext);
  const token = localStorage.getItem("token");
  const [tracksJSON, setTracksJSON] = useState([]);
  const timeRangeOptions = [
    { value: "short_term", label: "Past 4 Weeks" },
    { value: "medium_term", label: "Past 6 Months" },
    { value: "long_term", label: "All Time" },
  ];
  const [timeRange, setTimeRange] = useState(timeRangeOptions[0]);

  const selectStyle = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#1b1a1b",
      borderRadius: "0.375rem",
      borderColor: "1px",
      borderColor: "#ffffff1a",
    }),
    option: (styles) => ({ ...styles, color: "white", backgroundColor: "" }),
    singleValue: (styles) => ({ ...styles, color: "white" }),
    container: (styles) => ({ ...styles, width: "12rem" }),
    menu: (styles) => ({ ...styles, backgroundColor: "#252526" }),
  };

  useEffect(() => {
    async function fetchTopTracks() {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            time_range: timeRange["value"],
            limit: 30,
            offset: 0,
          },
        },
      );
      setTracksJSON(data.items);
    }
    fetchTopTracks();

    function getNewToken() {
      window.location.href = loginContext.AUTH_URL;
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
  }, [timeRange]);

  function handleTimeRangeChange(selected) {
    setTimeRange(selected);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 py-10">
        <h1 className="text-2xl">Top Tracks, {timeRange["label"]}</h1>
        <div className="flex flex-col items-center justify-center gap-1">
          <Select
            onChange={handleTimeRangeChange}
            options={timeRangeOptions}
            placeholder={"Select time range"}
            styles={selectStyle}
          />
        </div>
        <div className="flex flex-col">
          {tracksJSON.map((track, index) => (
            <div
              key={index}
              className=" bg-bg-secondary relative mx-5 flex items-center justify-between border-[1px] border-b-0 border-[#ffffff1a] px-5 py-5 shadow-2xl first:rounded-t-md last:rounded-b-md last:border-b-[1px]"
            >
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl">{index + 1}.</h1>
                <img
                  className="h-[15vh] w-[15vw] rounded-sm object-scale-down"
                  src={track.album.images[0]["url"]}
                ></img>
                <div className="flex-col">
                  <div className="flex gap-2">
                    <h1 className="text-xl">
                      {track.name.length > 24
                        ? track.name.substring(0, 24) + "..."
                        : track.name}
                    </h1>
                  </div>
                  <div>
                    {track.artists.map((artist, index) => (
                      <div key={index}>{artist.name}</div>
                    ))}
                  </div>
                </div>
              </div>
              <LinkIcon link={track.external_urls["spotify"]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Tracks;
