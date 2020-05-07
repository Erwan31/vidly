import React, {Component} from "react";
import {getMovies} from "./fakeMovieService";

class Movies extends Component {
    state = {
        movies: getMovies()
    };

    //binding
    handleDelete = movie => {
      //let id = this.movie._id;
      let index = this.state.movies.indexOf(movie);
      let moviesMod =  this.state.movies.filter( m => m._id !== movie._id);
      console.log('clicked', index, moviesMod);
        this.setState({ movies: moviesMod});
    };

    // 23
    render () {

        const { length: count } = this.state.movies;

        if( this.state.movies.length === 0) return <p>Nothing left in the List</p>;
        
        return (
            <React.Fragment>
                <p> Showing {count} movies in the databse</p>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Number of Bla</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Delete Button</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.movies.map(movie => (
                        <tr key={movie._id}>
                            <th  scope="row"> {movie.title}</th>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td> <button onClick={() => this.handleDelete(movie)}
                                    className="btn btn-secondary btn-sm">Delete
                                </button>
                            </td>
                        </tr>
                    ))
                } 
                </tbody>
                </table>
            </React.Fragment>
        )    
    }
}

export default Movies;