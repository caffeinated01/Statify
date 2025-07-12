// Spotify API constants
export const SPOTIFY_CONFIG = {
  AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
  CLIENT_ID: "b2f3191484834737a772a2700351dca1",
  RESPONSE_TYPE: "token",
  REDIRECT_URI: "https://statify-app.vercel.app/",
  SCOPE:
    "user-top-read,playlist-modify-public,playlist-modify-private,user-read-private,user-read-email",
};

export const TIME_RANGE_OPTIONS = [
  { value: "short_term", label: "Past 4 Weeks" },
  { value: "medium_term", label: "Past 6 Months" },
  { value: "long_term", label: "All Time" },
];

export const SELECT_STYLES = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#1b1a1b",
    borderRadius: "0.375rem",
    borderColor: "#ffffff1a",
  }),
  option: (styles) => ({ ...styles, color: "white", backgroundColor: "" }),
  singleValue: (styles) => ({ ...styles, color: "white" }),
  container: (styles) => ({ ...styles, width: "12rem" }),
  menu: (styles) => ({ ...styles, backgroundColor: "#252526" }),
};
