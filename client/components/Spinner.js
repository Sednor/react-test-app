import { PureComponent } from 'react';

class Spinner extends PureComponent {
  render() {
    return (
        <div className="no-data"><i className="fa fa-circle-o-notch fa-spin" /></div>
    );
  }
}

export default Spinner;
