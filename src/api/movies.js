import { api } from "./axiosConfig";

export async function getPopularMovies(page) {
  const response = await api.get("/movie/popular", {
    params: {
      language: "pt-BR",
      page,
    },
  });

  return response.data;
}

export async function searchMovies(query) {
  const response = await api.get("/search/movie", {
    params: {
      query,
      language: "pt-BR",
      page: 1,
    },
  });

  return response.data.results;
}

export async function getMovieDetails(movieId) {
  const response = await api.get(`/movie/${movieId}`, {
    params: {
      language: "pt-BR",
    },
  });

  return response.data;
}