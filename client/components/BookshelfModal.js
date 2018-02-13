import PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from 'react-bootstrap';

class BookshelfModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    title: '',
    show: false,
    onHide: () => {
    },
    onSubmit: () => {
    }
  };

  state = {};

  componentWillReceiveProps(props) {
  }

  handleSubmit() {
    this.props.onSubmit();
  }

  render() {
    return (
        <Modal show={this.props.show} onHide={this.props.onHide} bsSize="sm">
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Modal</div>
          </Modal.Body>
          <Modal.Footer>
            <div className="separator" />
            <button className="btn btn-default" onClick={this.props.onHide}>Cancel</button>
            <button className="btn btn-default" onClick={::this.handleSubmit}>Create</button>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default BookshelfModal;
