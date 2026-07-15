import { tmdbApi } from "./axiosConfig";

export async function getPopularMovies() {
  const response = await tmdbApi.get("/movie/popular", {
    params: {
      language: "pt-BR",
      page: 1,
    },
  });

  return response.data.results;
}

export async function searchMovies(query) {
  const response = await tmdbApi.get("/search/movie", {
    params: {
      query,
      language: "pt-BR",
      page: 1,
    },
  });

  return response.data.results;
}

export async function getMovieDetails(movieId) {
  const response = await tmdbApi.get(`/movie/${movieId}`, {
    params: {
      language: "pt-BR",
    },
  });

  return response.data;
}