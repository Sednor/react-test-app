import { Component } from 'react';

import BookshelfModal from './BookshelfModal';
import BookModal from './BookModal';
import Bookshelf from './Bookshelf';

import { URL } from '../config/url';

class BookshelfPage extends Component {
  state = {
    shelves: [],
    books: [],
    show: false,
    showBookModal: false,
    currentShelf: null,
    currentBook: null
  };

  componentDidMount() {
    this.fetchBookshelves();
    this.fetchBooks();
  }

  fetchBooks() {
    return fetch(URL.books, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '123123123123'
      }
    })
        .then(res => res.ok ? res.json() : [])
        .then(books => this.setState({ books }));
  }

  fetchBookshelves() {
    return fetch(URL.bookshelves, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '123123123123'
      }
    })
        .then(res => res.ok ? res.json() : [])
        .then(shelves => this.setState({ shelves }));
  }

  createBookshelf(title) {
    return fetch(URL.bookshelves, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({ bookshelf: { title } }),
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '123123123123'
      }
    })
        .then(() => this.setState({ show: false }))
        .then(() => this.fetchBookshelves());
  }

  handleOnEditShelf(id) {
    this.setState({ currentShelf: id, show: true });
  }

  handleEditShelf(title, id) {
    return fetch(URL.bookshelfById(id), {
      method: 'PUT',
      credentials: 'same-origin',
      body: JSON.stringify({ bookshelf: { title } }),
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '123123123123'
      }
    })
        .then(() => this.setState({ show: false }))
        .then(() => this.fetchBookshelves());
  }

  handleDeleteShelf(id) {
    return fetch(URL.bookshelfById(id), {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '123123123123'
      }
    })
        .then(() => this.fetchBookshelves());
  }

  handleCreateBook(book) {
    return fetch(URL.books, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '123123123123'
      }
    })
        .then(() => this.setState({ showBookModal: false, currentBook: false }))
        .then(() => {
          this.fetchBooks();
          this.fetchBookshelves();
        });
  }

  handleOnEditBook(id) {
    this.setState({ currentBook: id, showBookModal: true });
  }

  handleEditBook(book, id) {
    return fetch(URL.bookById(id), {
      method: 'PUT',
      credentials: 'same-origin',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '123123123123'
      }
    })
        .then(() => this.setState({ showBookModal: false, currentBook: false }))
        .then(() => {
          this.fetchBooks();
          this.fetchBookshelves();
        });
  }

  handleDeleteBook(id) {
    return fetch(URL.bookById(id), {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '123123123123'
      }
    })
        .then(() => {
          this.fetchBooks();
          this.fetchBookshelves();
        });
  }

  render() {
    return (
        <div className="bookshelf-page">
          <div className="page-header">
            <h1>
              Bookshelves
              <button className="btn btn-default" onClick={() => this.setState({ show: true })}>Create a
                Bookshelf</button>
              <button className="btn btn-default"
                      onClick={() => this.setState({ showBookModal: true })}>
                Create a book
              </button>
            </h1>
          </div>
          {
            this.state.shelves.map(shelf =>
                <Bookshelf key={shelf.id}
                           shelf={shelf}
                           books={this.state.books.filter(book => book.bookshelf_id === shelf.id)}
                           onEdit={::this.handleOnEditShelf}
                           onDelete={::this.handleDeleteShelf}
                           onBookEdit={::this.handleOnEditBook}
                           onBookDelete={::this.handleDeleteBook} />
            )
          }

          <BookshelfModal show={this.state.show}
                          currentShelf={this.state.shelves.find(shelf => shelf.id === this.state.currentShelf) || null}
                          onHide={() => this.setState({ show: false, currentShelf: null })}
                          onSubmit={::this.createBookshelf}
                          onEdit={::this.handleEditShelf}
                          title={`${this.state.currentShelf ? 'Edit' : 'Create'} a Bookshelf`} />

          <BookModal show={this.state.showBookModal}
                     shelves={this.state.shelves}
                     currentBook={this.state.books.find(book => book.id === this.state.currentBook) || null}
                     onHide={() => this.setState({ showBookModal: false, currentBook: null })}
                     onSubmit={::this.handleCreateBook}
                     onEdit={::this.handleEditBook} />
        </div>
    );
  }
}

export default BookshelfPage;
