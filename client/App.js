import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import BookshelfPage from './components/BookshelfPage';

class App extends Component {
  render() {
    return <div className="app">
      <Switch>
        <Route exact path="/" component={BookshelfPage} />
      </Switch>
    </div>;
  }
}

export default App;
