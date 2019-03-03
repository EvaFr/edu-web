import React from 'react';
import { Link } from 'react-router-dom';
import useBookList from './useBookList';

const showLoader = loading => (loading ? <p>Loading</p> : <p />);

const renderBooks = books =>
  books &&
  books.map(book => (
    <li key={book.bookId}>
      <Link to={`/book/${book.bookId}`}>{book.name}</Link>
    </li>
  ));

const showError = error => {
  if (process.env.NODE_ENV === 'production') {
    return (
      <>
        An error occured while loading this page. The error is logged and we
        will fix it ASAP!
      </>
    );
  }

  return (
    <>
      <p>Error: {error.name}</p>
      <p>Message: {error.message}</p>
      <p>Stack: {error.stack}</p>
    </>
  );
};

const Welcome = () => {
  const [error, loading, bookList] = useBookList();

  return (
    <>
      {showLoader(loading)}
      {error ? showError(error) : <ul>{renderBooks(bookList.books)}</ul>}
    </>
  );
};

export default Welcome;
