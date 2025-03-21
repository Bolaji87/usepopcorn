import { useEffect, useState } from "react";

const KEY = "7b1a62ea";
const BASE_URL = `http://www.omdbapi.com/?apikey=${KEY}&`;

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        setIsLoading(true);
        setError("");
        try {
          const response = await fetch(`${BASE_URL}s=${query}`, {
            signal: controller.signal,
          });

          if (!response.ok)
            throw new Error("Something went wrong with fetching...");

          const data = await response.json();
          if (data.Response === "False") throw new Error("Movie not found!");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (!query || query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      //   handleCloseMovie();
      callback?.();
      fetchMovies();

      return () => {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
