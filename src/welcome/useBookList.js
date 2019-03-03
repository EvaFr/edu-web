import { useState, useEffect } from 'react';

const useBookList = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookList, setBookList] = useState([]);

  const url = 'api/Book/BookList';

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setBookList(data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    })();
  }, [url]);

  return [error, loading, bookList];
};

export default useBookList;
