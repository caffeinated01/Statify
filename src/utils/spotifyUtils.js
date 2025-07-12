import axios from "axios";

// Get token from localStorage
export const getStoredToken = () => {
  return window.localStorage.getItem("token");
};

// Save token to localStorage
export const saveToken = (token) => {
  window.localStorage.setItem("token", token);
};

// Remove token from localStorage
export const removeToken = () => {
  window.localStorage.removeItem("token");
};

// Extract token from URL hash
export const extractTokenFromHash = (hash) => {
  if (!hash) return null;

  const tokenParam = hash
    .substring(1)
    .split("&")
    .find((param) => param.startsWith("access_token"));

  return tokenParam ? tokenParam.split("=")[1] : null;
};

// Create axios headers
export const createAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

// Make authenticated API calls
export const makeSpotifyAPICall = async (url, token, params = {}) => {
  try {
    const response = await axios.get(url, {
      headers: createAuthHeaders(token),
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// Make authenticated POST requests
export const makeSpotifyAPIPost = async (url, token, data = {}) => {
  try {
    const response = await axios.post(url, data, {
      headers: createAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    console.error("API post failed:", error);
    throw error;
  }
};

// Build track URIs string
export const buildTrackURIs = (tracks) => {
  return tracks.map((track) => track.uri).join(",");
};
