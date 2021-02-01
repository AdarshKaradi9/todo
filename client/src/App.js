import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import Todo from './components/todo/Todos';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import Landing from './components/layout/Landing'
import store from './store'
import { Container } from 'react-bootstrap';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';


  const App = () => {
    return (
      <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={ Landing } />
          <Alert />
          <Container>
            <Switch>
              <Route exact path='/todo' component={ Todo } />
              <Route exact path='/dashboard' component={ Dashboard } />
              <Route exact path='/register' component={ Register } />
              <Route exact path='/login' component={ Login } />
            </Switch>
          </Container>
        </Fragment>
      </Router>
    </Provider>
    )
  }
    
export default App;