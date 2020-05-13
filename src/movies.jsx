import React, {Component} from "react";
import {getMovies} from "./fakeMovieService";
import {getGenres} from "./fakeGenreService";
import Pagination from "./components/common/page"
import ListGroupe from "./components/common/listGroup"
import { paginate } from './utils/paginate'
import MoviesTable from './components/moviesTable'
import _ from 'lodash'

class Movies extends Component {
    state = {
        movies: [],
        selectedPage: [true, false, false],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        selectedGenre: "All Genres",
        sortColumn: { path: 'title', order: 'asc' },
        }

    componentDidMount() {
        const genres = [{ _id: "", name: 'All Genres'}, ...getGenres()];

        this.setState({ movies: getMovies(), genres: genres});
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

    handleSelectGenre = (genre) => {
        this.setState( {selectedGenre: genre, currentPage: 1});
        console.log("Select Item", genre);
    }

    handleSort = sortColumn => {  
       this.setState({ sortColumn });
    }

    getPageData = () => {
        const { pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies } = this.state;

        let filtered = selectedGenre && selectedGenre._id ? allMovies.filter( m => m.genre._id === selectedGenre._id) 
        : allMovies ;

        const sorted = _.orderBy( filtered, [sortColumn.path], [sortColumn.order])
        
        const movies = paginate( sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies};
    }

    // 23
    render () {

        //const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn } = this.state;
        //console.log(this.state.heartState);

        if( this.state.movies.length === 0) return <p>Nothing left in the List</p>;

        const { totalCount, data: movies } = this.getPageData();

        return (
            <React.Fragment>
                <div className='row'>
                    <div className="col-2">
                        <ListGroupe onSelectItem = {this.handleSelectGenre}
                        genres={this.state.genres}
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}/>
                    </div>
                    <div className='col'>
                    <p> Showing {totalCount} movies in the database</p>
                    <MoviesTable 
                    movies={movies} 
                    sortColumn={sortColumn}
                    onLikeToggle={this.handleLikedClick} 
                    onDelete={this.handleDelete}
                    onSort={this.handleSort} />
                    <nav aria-label="Page navigation example">
                        <Pagination selection={this.state.selectedPage}
                        onPageChange={this.handlePage}
                        itemsCount={ totalCount }
                        pageSize={this.state.pageSize}
                        currentPage={this.state.currentPage} />
                    </nav>
                    </div>
                </div>
            </React.Fragment>
        )    
    }
}

export default Movies;