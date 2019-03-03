import React from 'react';
import useBookList from './useBookList';

const showLoader = loading => (loading ? <p>Loading</p> : <p />);

const renderBooks = books =>
  books && books.map(book => <li key={book.bookId}>{book.name}</li>);

const showError = error => (error ? <p>{error}</p> : <p />);

const Welcome = () => {
  const [error, loading, bookList] = useBookList();

  return (
    <div>
      {showLoader(loading)}
      <p>Welcome</p>
      <ul>{renderBooks(bookList.books)}</ul>
      {showError(error)}
    </div>
  );
};

export default Welcome;
