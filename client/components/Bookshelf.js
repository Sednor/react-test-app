import { Component } from 'react';
import PropTypes from 'prop-types';

class Bookshelf extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  static defaultProps = {
    data: []
  };

  state = {
    data: []
  };

  componentWillReceiveProps(props) {
    this.setState({  });
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

export default Bookshelf;
