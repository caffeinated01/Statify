import { useState, useCallback, useEffect } from "react";
import { makeSpotifyAPICall } from "../utils/spotifyUtils";

export const useSpotifyData = (token) => {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [tracksTimeRange, setTracksTimeRange] = useState("short_term");
  const [artistsTimeRange, setArtistsTimeRange] = useState("short_term");

  // Fetch tracks when token or timeRange changes
  useEffect(() => {
    if (!token) return;

    const fetchTracks = async () => {
      try {
        const data = await makeSpotifyAPICall(
          "https://api.spotify.com/v1/me/top/tracks",
          token,
          {
            time_range: tracksTimeRange,
            limit: 50,
            offset: 0,
          }
        );
        setTracks(data.items);
      } catch (error) {
        console.error("Failed to fetch top tracks:", error);
      }
    };

    fetchTracks();
  }, [token, tracksTimeRange]);

  // Fetch artists when token or timeRange changes
  useEffect(() => {
    if (!token) return;

    const fetchArtists = async () => {
      try {
        const data = await makeSpotifyAPICall(
          "https://api.spotify.com/v1/me/top/artists",
          token,
          {
            time_range: artistsTimeRange,
            limit: 50,
            offset: 0,
          }
        );
        setArtists(data.items);
      } catch (error) {
        console.error("Failed to fetch top artists:", error);
      }
    };

    fetchArtists();
  }, [token, artistsTimeRange]);

  // Functions to update time ranges (this will trigger the useEffect above)
  const setTracksTimeRangeAndFetch = useCallback((timeRange) => {
    setTracksTimeRange(timeRange);
  }, []);

  const setArtistsTimeRangeAndFetch = useCallback((timeRange) => {
    setArtistsTimeRange(timeRange);
  }, []);

  return {
    tracks,
    artists,
    setTracksTimeRangeAndFetch,
    setArtistsTimeRangeAndFetch,
  };
};
