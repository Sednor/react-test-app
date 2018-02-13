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

  state = {
    shelf: {},
    toggleBooks: false
  };

  componentWillMount() {
    this.setState({ shelf: this.props.shelf });
  }

  componentWillReceiveProps(props) {
    this.setState({ shelf: props.shelf });
  }

  renderBookList() {
    return this.props.books.map(book =>
        <Book key={book.id}
              book={book}
              onBookEdit={id => this.props.onBookEdit(id)}
              onBookDelete={id => this.props.onBookDelete(id)} />
    );
  }

  render() {
    return (
        <div className="form-group bookshelf">
          <div className="header-line">
            <div className="shelf-title">{this.state.shelf.title}</div>
            <button className="btn btn-default"
                    disabled={!this.props.books.length}
                    onClick={() => this.setState({ toggleBooks: !this.state.toggleBooks })}>
              Show books
            </button>
            <button className="btn btn-default" onClick={() => this.props.onEdit(this.state.shelf.id)}>Edit</button>
            <button className="btn btn-danger" onClick={() => this.props.onDelete(this.state.shelf.id)}>Delete</button>
          </div>
          <div className="books">
            {this.state.toggleBooks && this.renderBookList()}
          </div>
        </div>
    );
  }
}

export default Bookshelf;
