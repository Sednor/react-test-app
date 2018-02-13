import { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object,
    onBookEdit: PropTypes.func,
    onBookDelete: PropTypes.func
  };

  static defaultProps = {
    book: {},
    onBookEdit: () => {
    },
    onBookDelete: () => {
    }
  };

  render() {
    return (
        <div className="form-group book">
          <div className="book-info">
            <div><span className="font-bold book-field">Title:</span> {this.props.book.title}</div>
            <div><span className="font-bold book-field">Author:</span> {this.props.book.author}</div>
            <div><span className="font-bold book-field">ISBN:</span> {this.props.book.isbn}</div>
          </div>
          <button className="btn btn-default" onClick={() => this.props.onBookEdit(this.props.book.id)}>Edit</button>
          <button className="btn btn-danger" onClick={() => this.props.onBookDelete(this.props.book.id)}>Delete</button>
        </div>
    );
  }
}

export default Book;
