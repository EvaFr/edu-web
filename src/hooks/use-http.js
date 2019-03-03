import { useState, useEffect } from 'react';

const useHttp = (url, mapper) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        let mappedResult = result;
        if (mapper) {
          mappedResult = mapper(result);
        }
        setData(mappedResult);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    })();
  }, [url]);

  return [error, loading, data];
};

export default useHttp;
