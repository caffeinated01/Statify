import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoginContext from "../LoginContext";
import LinkIcon from "./LinkIcon";
import Select from "react-select";

function Artists() {
  const loginContext = useContext(LoginContext);
  const token = localStorage.getItem("token");
  const [artistsJSON, setArtistsJson] = useState([]);
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
    async function fetchTopArtists() {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/top/artists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            time_range: timeRange["value"],
            limit: 30,
            offset: 0,
          },
        }
      );
      setArtistsJson(data.items);
    }
    fetchTopArtists();

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
        <h1 className="text-2xl">Top Artists, {timeRange["label"]}</h1>
        <div className="flex flex-col items-center justify-center gap-1">
          <Select
            onChange={handleTimeRangeChange}
            options={timeRangeOptions}
            placeholder={"Select time range"}
            styles={selectStyle}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center">
          {artistsJSON.map((artist, index) => (
            <div
              key={index}
              className="bg-bg-secondary relative mx-4 my-4 flex flex-col items-center justify-center gap-2 rounded-md border-[1px] border-[#ffffff1a] px-5 py-5 shadow-2xl"
            >
              <div>
                <div className="flex justify-between">
                  <h1 className="py-1">
                    {index + 1}. {artist.name}
                  </h1>
                  <LinkIcon link={artist.external_urls["spotify"]} />
                </div>
                <img
                  className="h-[400px] w-[400px] rounded-sm object-scale-down"
                  src={artist.images[0]["url"]}
                ></img>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Artists;
