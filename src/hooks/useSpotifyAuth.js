import { useState, useEffect } from "react";
import { SPOTIFY_CONFIG } from "../utils/constants";
import {
  getStoredToken,
  saveToken,
  removeToken,
  extractTokenFromHash,
  makeSpotifyAPICall,
} from "../utils/spotifyUtils";

export const useSpotifyAuth = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const AUTH_URL = `${SPOTIFY_CONFIG.AUTH_ENDPOINT}?client_id=${SPOTIFY_CONFIG.CLIENT_ID}&response_type=${SPOTIFY_CONFIG.RESPONSE_TYPE}&redirect_uri=${SPOTIFY_CONFIG.REDIRECT_URI}&scope=${SPOTIFY_CONFIG.SCOPE}`;

  const logout = () => {
    setToken("");
    removeToken();
    setUserInfo({});
  };

  const getUserData = async (authToken) => {
    if (!authToken) return;

    try {
      const data = await makeSpotifyAPICall(
        "https://api.spotify.com/v1/me/",
        authToken
      );
      setUserInfo(data);
    } catch (error) {
      console.error("Failed to get user data:", error);
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = getStoredToken();

    // Check if we have a token in the URL hash (from OAuth redirect)
    if (!storedToken && hash) {
      const newToken = extractTokenFromHash(hash);
      if (newToken) {
        storedToken = newToken;
        saveToken(newToken);
        window.location.hash = ""; // Clear the hash
      }
    }

    if (storedToken) {
      setToken(storedToken);
      getUserData(storedToken);
    }
  }, []);

  return {
    token,
    userInfo,
    AUTH_URL,
    logout,
    isAuthenticated: !!token,
  };
};
