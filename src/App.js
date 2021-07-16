import Synth from './Synth/Synth'
import Sequencer from './Sequencer/Sequencer'
import Home from './Home/Home'

import {
  HashRouter as Router,
  Route,
  Redirect,
  Link,
  Switch,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/synth">Synth</Link>
            </li>
            <li>
              <Link to="/sequencer">Sequencer</Link>
            </li>
          </ul>
        </nav>
      <Switch>
      <Route
          exact
          path="/">
          <Home/>
        </Route>
        <Route
          exact
          path="/synth">
          <Synth/>
        </Route>
        <Route
          exact
          path="/sequencer">
          <Sequencer/>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
