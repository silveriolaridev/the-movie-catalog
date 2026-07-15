import axios from "axios";
const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;


export const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${tmdbToken}`,
    accept: "application/json",
  },
});