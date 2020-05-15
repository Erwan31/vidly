import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Movies from './movies'
import { Switch, Route, Redirect} from 'react-router-dom'
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';


function App() {
  return (
   <main className="container">
    <NavBar />
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Route path="/movies/:id" component={MovieForm} />
      <Route path="/movies" render={ () => <Movies />} />
      <Route path="/customers" component={Customers} />
      <Route path="/rentals" component={Rentals} />
      <Redirect from="/" exact to="/movies" />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
   </main>
  );
}

export default App;
