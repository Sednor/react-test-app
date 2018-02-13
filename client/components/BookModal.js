import PropTypes from 'prop-types';
import { Component } from 'react';

import { Modal } from 'react-bootstrap';

class BookModal extends Component {
  static propTypes = {
    currentBook: PropTypes.object,
    shelves: PropTypes.array,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onSubmit: PropTypes.func,
    onEdit: PropTypes.func
  };

  static defaultProps = {
    currentBook: null,
    shelves: [],
    show: false,
    onHide: () => {
    },
    onSubmit: () => {
    },
    onEdit: () => {
    }
  };

  state = {
    title: '',
    author: '',
    isbn: '',
    bookshelf_id: null
  };

  componentDidMount() {
    this.setState({ bookshelf_id: this.props.shelves ? this.props.shelves[0] : null });
  }

  componentWillReceiveProps(props) {
    if (props.currentBook) {
      this.setState({
        title: props.currentBook.title,
        author: props.currentBook.author,
        isbn: props.currentBook.isbn,
        bookshelf_id: props.currentBook.bookshelf_id
      });
    }
  }

  handleSubmit() {
    if (this.props.currentBook) {
      return this.props.onEdit(this.state, this.props.currentBook.id);
    }

    return this.props.onSubmit(this.state);
  }

  render() {
    return (
        <Modal show={this.props.show} onHide={this.props.onHide} bsSize="sm">
          <Modal.Header closeButton>
            <Modal.Title>{`${this.props.currentBook ? 'Edit' : 'Create'} a Book`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group ">
              <label htmlFor="title">Title:</label>
              <input id="title"
                     placeholder="Enter a title title"
                     className="form-control"
                     value={this.state.title}
                     onChange={e => this.setState({ title: e.target.value })} />
            </div>
            <div className="form-group ">
              <label htmlFor="author">Author:</label>
              <input id="author"
                     placeholder="Enter an author"
                     className="form-control"
                     value={this.state.author}
                     onChange={e => this.setState({ author: e.target.value })} />
            </div>
            <div className="form-group ">
              <label htmlFor="isbn">ISBN:</label>
              <input id="isbn"
                     placeholder="Enter ISBN"
                     className="form-control"
                     value={this.state.isbn}
                     onChange={e => this.setState({ isbn: e.target.value })} />
            </div>
            <div className="form-group ">
              <label htmlFor="bookshelf">Bookshelf:</label>
              <select id="bookshelf"
                      onChange={e => this.setState({ bookshelf_id: e.target.value })}>
                {
                  this.props.shelves.map(shelf =>
                      <option key={shelf.id} value={shelf.id}>{shelf.title}</option>
                  )
                }
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="separator" />
            <button className="btn btn-default" onClick={this.props.onHide}>Cancel</button>
            <button className="btn btn-default"
                    onClick={::this.handleSubmit}
                    disabled={!this.state.title}>
              {this.props.currentBook ? 'Edit' : 'Create'}
            </button>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default BookModal;
