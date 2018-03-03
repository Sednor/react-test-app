import { Component } from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

class Bookshelf extends Component {
  static propTypes = {
    shelf: PropTypes.object,
    onBookEdit: PropTypes.func,
    onBookDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
  };

  static defaultProps = {
    shelf: {},
    onEdit: () => {
    },
    onDelete: () => {
    },
    onBookEdit: () => {
    },
    onBookDelete: () => {
    }
  };

  renderBookList() {
    if (this.props.books.length) {
      return this.props.books.map(book =>
          <Book key={book.id}
                book={book}
                onBookEdit={id => this.props.onBookEdit(id)}
                onBookDelete={id => this.props.onBookDelete(id)} />
      );
    }

    return <div className="font-bold text-center">No Books</div>
  }

  render() {
    return (
        <div className="form-group bookshelf">
          <div className="title-actions">
              <span>
                <i className="fa fa-pencil" onClick={() => this.props.onEdit(this.props.shelf.id)} />
              </span>
            <span>
                <i className="fa fa-trash" onClick={() => this.props.onDelete(this.props.shelf.id)} />
              </span>
          </div>
          <div className="shelf-header">
            <span className="shelf-title">{this.props.shelf.title}</span>
          </div>
          <div className="books">
            {this.renderBookList()}
          </div>
        </div>
    );
  }
}

export default Bookshelf;
