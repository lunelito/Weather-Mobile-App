import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setIsPending(true);
      setError(null);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Błąd HTTP: ${res.status}`);
        }

        const json = await res.json();

        if (!isCancelled) {
          setData(json);
          setIsPending(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          setIsPending(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return { data, isPending, error };
}
