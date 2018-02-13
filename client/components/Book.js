import { Component } from 'react';
import { URL } from '../config/url';

class Book extends Component {
  state = {
    books: [],
    loading: false,
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.setState({ loading: true });
    //get
  }

  render() {
    return (
        <div>Book</div>
    );
  }
}

export default Book;
