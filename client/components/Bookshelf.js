import { Component } from 'react';
import PropTypes from 'prop-types';

class Bookshelf extends Component {
  static propTypes = {
    shelf: PropTypes.object,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
  };

  static defaultProps = {
    shelf: {},
    onEdit: () => {
    },
    onDelete: () => {
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

  render() {
    return (
        <div className="form-group bookshelf">
          <div className="header-line">
            <span className="shelf-title">{this.state.shelf.title}</span>
            <button className="btn btn-default"
                    onClick={() => this.setState({ toggleBooks: !this.state.toggleBooks })}>
              Show books
            </button>
            <button className="btn btn-default" onClick={() => this.props.onEdit(this.state.shelf.id)}>Edit</button>
            <button className="btn btn-danger" onClick={() => this.props.onDelete(this.state.shelf.id)}>Delete</button>
          </div>
          <div className="books">
            {
              this.state.toggleBooks && this.props.books.map(book =>
                  <div>{book.title}</div>
              )
            }
          </div>
        </div>
    );
  }
}

export default Bookshelf;
