import PropTypes from 'prop-types';
import { Component } from 'react';

import { Modal } from 'react-bootstrap';

class BookshelfModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    currentShelf: PropTypes.object,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onSubmit: PropTypes.func,
    onEdit: PropTypes.func
  };

  static defaultProps = {
    title: '',
    currentShelf: null,
    show: false,
    onHide: () => {
    },
    onSubmit: () => {
    },
    onEdit: () => {
    }
  };

  state = {
    shelfTitle: ''
  };

  componentWillReceiveProps(props) {
    if (props.currentShelf) {
      this.setState({ shelfTitle: props.currentShelf.title });
    }
  }

  handleSubmit() {
    if (this.props.currentShelf) {
      return this.props.onEdit(this.state.shelfTitle, this.props.currentShelf.id);
    }

    return this.props.onSubmit(this.state.shelfTitle);
  }

  render() {
    return (
        <Modal show={this.props.show} onHide={this.props.onHide} bsSize="sm" enforceFocus={false}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group ">
              <label htmlFor="shelfTitle">Title:</label>
              <input id="shelfTitle"
                     placeholder="Enter a shelf title"
                     className="form-control"
                     value={this.state.shelfTitle}
                     onChange={e => this.setState({ shelfTitle: e.target.value })} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="separator" />
            <button className="btn btn-default" onClick={this.props.onHide}>Cancel</button>
            <button className="btn btn-default"
                    onClick={::this.handleSubmit}
                    disabled={!this.state.shelfTitle}>
              {this.props.currentShelf ? 'Edit' : 'Create'}
            </button>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default BookshelfModal;
