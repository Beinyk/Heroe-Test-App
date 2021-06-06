import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/layout/Header';
import { Provider } from './context';

import 'bootstrap/dist/css/bootstrap.min.css';

// import './App.css';
import Heroes from './components/heroes/Heroes';
import AddHeroe from './components/heroes/AddHeroe';
import NotFound from './components/pages/NotFound';
import EditHeroe from './components/heroes/EditHeroe';
import HeroeInfo from './components/layout/heroeInfo/HeroeInfo';



function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Heroes}></Route>
              <Route exact path="/heroe/add" component={AddHeroe}></Route>
              <Route exact path="/heroe/edit/:id" component={EditHeroe}></Route>
              <Route exact path="/heroe/info/:id" component={HeroeInfo}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
