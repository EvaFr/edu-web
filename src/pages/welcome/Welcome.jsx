import React from 'react';
import { Link } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import Error from '../../components/Error';

const showLoader = loading => (loading ? <p>Loading</p> : <p />);

const renderBooks = books =>
  books &&
  books.map(book => (
    <li key={book.bookId}>
      <Link to={`/book/${book.bookId}`}>{book.name}</Link>
    </li>
  ));

const Welcome = () => {
  const [error, loading, bookList] = useHttp('api/Book/BookList', list =>
    list.books.map(book => ({ ...book }))
  );

  return (
    <>
      {showLoader(loading)}
      {error ? <Error error={error} /> : <ul>{renderBooks(bookList)}</ul>}
    </>
  );
};

export default Welcome;
