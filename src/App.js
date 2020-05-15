import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Movies from './movies'
import { Link, Switch, Route, Redirect, NavLink } from 'react-router-dom'
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';


function App() {
  return (
   <main className="container">
    <NavBar />
    <Switch>
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
