import { Component } from 'react';

import { Modal } from 'react-bootstrap';

import BookshelfModal from './BookshelfModal';

import { URL } from '../config/url';

class BookshelfPage extends Component {
  state = {
    shelves: [],
    show: false
  };

  componentDidMount() {
    this.fetchBookshelves();
  }

  fetchBookshelves() {
    return fetch(URL.getBookshelves, {
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

  createBookshelf() {

  }

  render() {
    return (
        <div onClick={::this.fetchBookshelves}>
          <h1>Bookshelves</h1>
          <button className="btn btn-default" onClick={() => this.setState({ show: true })}>Create</button>
          {
            this.state.shelves.map(shelf =>
                <Bookshelf key={shelf.id} data={shelf} />
            )
          }

          <BookshelfModal show={this.state.show}
                          onHide={() => this.setState({ show: false })}
                          onSubmit={::this.createBookshelf}
                          title="Create a Bookshelf" />
        </div>
    );
  }
}

export default BookshelfPage;
