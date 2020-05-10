import React, {Component} from "react";
import {getMovies} from "./fakeMovieService";
import Like from "./components/common/like"
import Pagination from "./components/common/page"
import { paginate } from './utils/paginate'

class Movies extends Component {
    state = {
        movies: getMovies(),
        selectedPage: [true, false, false],
        pageSize: 4,
        currentPage: 1,
        }

    //binding
    handleDelete = movie => {
      //let id = this.movie._id;
      let index = this.state.movies.indexOf(movie);
      let moviesMod =  this.state.movies.filter( m => m._id !== movie._id);
      console.log('clicked', index, moviesMod);
        this.setState({ movies: moviesMod});
    };

    handleLikedClick = (movie) => {   
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }

    handlePage = (page) => {
        //page.preventDefault();
        //let selectedPage = this.state.selectedPage.indexOf(page);
        //console.log("Page Click", page);
        this.setState({ currentPage: page});
    }

    // 23
    render () {

        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies } = this.state;

        console.log(this.state.heartState);

        if( this.state.movies.length === 0) return <p>Nothing left in the List</p>;

        const movies = paginate(allMovies, currentPage, pageSize);
        
        return (
            <React.Fragment>
                <p> Showing {count} movies in the database</p>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Number of Bla</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Like</th>
                    <th scope="col">Delete Button</th>
                    </tr>
                </thead>
                <tbody>
                {movies.map(movie => (
                        <tr key={movie._id}>
                            <th  scope="row"> {movie.title}</th>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td> <Like liked={movie.liked} 
                            onLikeToggle={ () => this.handleLikedClick(movie)} /> 
                            </td>      
                            <td> <button onClick={() => this.handleDelete(movie)}
                                    className="btn btn-danger btn-sm">Delete
                                </button>
                            </td>
                        </tr>
                    ))
                } 
                </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <Pagination selection={this.state.selectedPage}
                     onPageChange={this.handlePage}
                     itemsCount={ count }
                     pageSize={this.state.pageSize}
                     currentPage={this.state.currentPage} />
                </nav>
            </React.Fragment>
        )    
    }
}

export default Movies;