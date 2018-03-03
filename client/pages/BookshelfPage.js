import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BookshelfModal from '../components/modals/BookshelfModal';
import BookModal from '../components/modals/BookModal';
import Bookshelf from '../components/Bookshelf';
import Spinner from '../components/Spinner';

import * as bookshelfActions from '../actions/bookshelves';
import * as bookActions from '../actions/books';

import { URL } from '../config/url';

import api from '../utils/api';

class BookshelfPage extends Component {
  state = {
    show: false,
    showBookModal: false,
    currentShelfId: null,
    currentBookId: null,
    filter: ''
  };

  componentDidMount() {
    this.props.actions.fetchBookshelves();
    this.props.actions.fetchBooks();
  }

  createBookshelf(title) {
    api
        .post(URL.bookshelves, { bookshelf: { title } })
        .then(() => this.setState({ show: false }))
        .then(() => this.props.actions.fetchBookshelves());
  }

  handleOnEditShelf(id) {
    this.setState({ currentShelfId: id, show: true });
  }

  handleEditShelf(title, id) {
    api
        .put(URL.bookshelfById(id), { bookshelf: { title } })
        .then(() => this.setState({ show: false, currentShelfId: null }))
        .then(() => this.props.actions.fetchBookshelves());
  }

  handleDeleteShelf(id) {
    api
        .delete(URL.bookshelfById(id))
        .then(() => this.props.actions.fetchBookshelves());
  }

  handleCreateBook(book) {
    api
        .post(URL.books, book)
        .then(() => this.setState({ showBookModal: false, currentBookId: null }))
        .then(() => {
          this.props.actions.fetchBooks();
          this.props.actions.fetchBookshelves();
        });
  }

  handleOnEditBook(id) {
    this.setState({ currentBookId: id, showBookModal: true });
  }

  handleEditBook(book, id) {
    api
        .put(URL.bookById(id), book)
        .then(() => this.setState({ showBookModal: false, currentBookId: null }))
        .then(() => {
          this.props.actions.fetchBooks();
          this.props.actions.fetchBookshelves();
        });
  }

  handleDeleteBook(id) {
    api
        .delete(URL.bookById(id))
        .then(() => {
          this.props.actions.fetchBooks();
          this.props.actions.fetchBookshelves();
        });
  }

  render() {
    const REG_EXP = new RegExp(this.state.filter, 'i');
    const SHELVES = this.props.bookshelfStore.shelves.filter(shelf => REG_EXP.test(shelf.title));
    const BOOKS = this.props.bookStore.books;

    return (
        <div className="bookshelf-page">
          <div className="page-header text-center">
            <div className="page-header-title">
              <h1>
                Bookshelves
                <button className="btn btn-default" onClick={() => this.setState({ show: true })}>Create a
                  Bookshelf
                </button>
                <button className="btn btn-default"
                        onClick={() => this.setState({ showBookModal: true })}>
                  Create a book
                </button>
              </h1>
            </div>
            <div className="filter">
              <i className="fa fa-search" />
              <input type="text"
                     value={this.state.filter}
                     placeholder="Search a Bookshelf"
                     onChange={e => this.setState({ filter: e.target.value })} />
              <i className="fa fa-times" onClick={() => this.setState({ filter: '' })} />
            </div>
          </div>
          <div className="page-content">
            {
              SHELVES.map(shelf =>
                  <Bookshelf key={shelf.id}
                             shelf={shelf}
                             books={BOOKS.filter(book => book.bookshelf_id === shelf.id)}
                             onEdit={::this.handleOnEditShelf}
                             onDelete={::this.handleDeleteShelf}
                             onBookEdit={::this.handleOnEditBook}
                             onBookDelete={::this.handleDeleteBook} />
              )
            }
            {this.props.bookshelfStore.loading && <Spinner />}
            {
              !this.props.bookshelfStore.loading && !SHELVES.length &&
              <div className="text-center font-bold no-data">No Bookshelves</div>
            }
          </div>

          <BookshelfModal show={this.state.show}
                          currentShelf={SHELVES.find(shelf => shelf.id === this.state.currentShelfId) || null}
                          onHide={() => this.setState({ show: false, currentShelfId: null })}
                          onSubmit={::this.createBookshelf}
                          onEdit={::this.handleEditShelf}
                          title={`${this.state.currentShelfId ? 'Edit' : 'Create'} a Bookshelf`} />

          <BookModal show={this.state.showBookModal}
                     shelves={SHELVES}
                     currentBook={BOOKS.find(book => book.id === this.state.currentBookId) || null}
                     onHide={() => this.setState({ showBookModal: false, currentBookId: null })}
                     onSubmit={::this.handleCreateBook}
                     onEdit={::this.handleEditBook} />
        </div>
    );
  }
}

export default connect(
    state => ({
      bookshelfStore: state.bookshelves,
      bookStore: state.books
    }),
    dispatch => ({ actions: bindActionCreators({ ...bookshelfActions, ...bookActions }, dispatch) })
)(BookshelfPage);
