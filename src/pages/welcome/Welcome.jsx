import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import useHttp from '../../hooks/use-http';
import Error from '../../components/Error';

const showLoader = loading => (loading ? <p>Loading</p> : <p />);

const renderBooks = books =>
  books &&
  books.map(book => (
    <ListGroup.Item key={book.bookId}>
      <Link to={`/book/${book.bookId}`}>{book.name}</Link>
    </ListGroup.Item>
  ));

const Welcome = () => {
  const [error, loading, bookList] = useHttp('api/Book/BookList', list =>
    list.books.map(book => ({ ...book }))
  );

  return (
    <>
      {showLoader(loading)}
      {error ? (
        <Error error={error} />
      ) : (
        <Card style={{ width: '18rem' }}>
          <ListGroup variant="flush">{renderBooks(bookList)}</ListGroup>
        </Card>
      )}
    </>
  );
};

export default Welcome;
