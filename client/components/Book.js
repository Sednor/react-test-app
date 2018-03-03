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
            <span className="book-icon">
              <i className="fa fa-3x fa-book" />
            </span>
            <div className="book-text">
              <span className="book-title">{this.props.book.title}</span>
              <div>by {this.props.book.author}</div>
              <div>ISBN: {this.props.book.isbn}</div>
            </div>
          </div>
          <div className="book-actions">
            <span>
              <i className="fa fa-pencil" onClick={() => this.props.onBookEdit(this.props.book.id)} />
            </span>
            <span>
              <i className="fa fa-trash" onClick={() => this.props.onBookDelete(this.props.book.id)} />
            </span>
          </div>
          <div className="separator" />
        </div>
    );
  }
}

export default Book;
