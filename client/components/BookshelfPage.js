import { Component } from 'react';
import { URL } from '../config/url';

class BookshelfPage extends Component {
  state = {
    shelves: []
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

  render() {
    return (
        <div onClick={::this.fetchBookshelves}>Bookshelves</div>
    );
  }
}

export default BookshelfPage;
