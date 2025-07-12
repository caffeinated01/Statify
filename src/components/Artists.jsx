import { useContext, useState } from "react";
import LoginContext from "../LoginContext";
import LinkIcon from "./LinkIcon";
import Select from "react-select";
import { TIME_RANGE_OPTIONS, SELECT_STYLES } from "../utils/constants";
import { useSpotifyData } from "../hooks/useSpotifyData";

function Artists() {
  const { token } = useContext(LoginContext);
  const { artists, setArtistsTimeRangeAndFetch } = useSpotifyData(token);
  const [timeRange, setTimeRange] = useState(TIME_RANGE_OPTIONS[0]);

  function handleTimeRangeChange(selected) {
    setTimeRange(selected);
    setArtistsTimeRangeAndFetch(selected.value);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 py-10">
        <h1 className="text-2xl">Top Artists, {timeRange.label}</h1>
        <div className="flex flex-col items-center justify-center gap-1">
          <Select
            onChange={handleTimeRangeChange}
            options={TIME_RANGE_OPTIONS}
            placeholder={"Select time range"}
            styles={SELECT_STYLES}
            value={timeRange}
          />
        </div>
        <div className="flex flex-wrap max-w-[1500px] items-center justify-center">
          {artists.map((artist, index) => (
            <div
              key={artist.id || index}
              className="bg-bg-secondary relative mx-4 my-4 flex flex-col items-center justify-center gap-2 rounded-md border-[1px] border-[#ffffff1a] px-5 py-5"
            >
              <div>
                <div className="flex justify-between">
                  <h1 className="py-1">
                    {index + 1}. {artist.name}
                  </h1>
                  <LinkIcon link={artist.external_urls?.spotify} />
                </div>
                <img
                  className="h-[400px] w-[400px] object-scale-down"
                  src={artist.images?.[0]?.url}
                  alt={`${artist.name} artist image`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Artists;
