import React, {Component} from "react";
import {getMovies, deleteMovie } from "./Services/MovieService";
import Pagination from "./components/common/page"
import ListGroupe from "./components/common/listGroup"
import { paginate } from './utils/paginate'
import MoviesTable from './components/moviesTable'
import _ from 'lodash'
import { Link } from 'react-router-dom';
import SearchBox from './components/common/searchBox';
//import http from './httpService';
//import config from './config.json';
import { getGenres } from './Services/GenreService';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: { path: "title", order: "asc" }
      };

     async componentDidMount() {
         const { data } = await getGenres();
        // pending
        //const { data: genres } = await http.get(config.apiEndPoint);
        const genres = [{ _id: "", name: "All Genres" }, ...data ];
        //console.log(genres);

        const { data: movies } = await getMovies();

        this.setState({ movies: movies, genres: genres });
    }

    //binding
    handleDelete = async (movie) => {

      const originalMovies = this.state.movies;
      const movies = originalMovies.filter( m => m._id !== movie._id);

      this.setState({ movies });

      try{
          await deleteMovie(movie._id);
       }
       catch (ex) {
            if( ex.response && ex.response.status === 404){
                console.error("404");
            }
        }
      
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
        //console.log("Select Item", genre);
    }

    handleSort = sortColumn => {  
       this.setState({ sortColumn });
    }

    handleSearch = (query) => {
        this.setState( { searchQuery: query, selectedGenre: null, currentPage: 1});
    }

    getPageData = () => {
        const { pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies, searchQuery } = this.state;
        let filtered = allMovies;
        
        if(searchQuery){
            filtered = allMovies.filter( m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()) );
        }
        else if(selectedGenre && selectedGenre._id){ 
            //console.log("Selected genre ", selectedGenre);
            filtered = allMovies.filter( m => m.genre._id === selectedGenre._id);
        }

        const sorted = _.orderBy( filtered, [sortColumn.path], [sortColumn.order])
        
        const movies = paginate( sorted, currentPage, pageSize);
        //console.log("Sorted movies ", movies);

        return { totalCount: filtered.length, data: movies};
    }

    // 23
    render () {

        //const { length: count } = this.state.movies;
        const { sortColumn, searchQuery } = this.state;
        //console.log(this.state.heartState);

        if( this.state.movies.length === 0) return <p>Nothing left in the List</p>;

        const { totalCount, data: movies } = this.getPageData();

        return (
            <React.Fragment>
                <div className='row'>
                    <div className="col-2">
                        <ListGroupe 
                        onSelectItem = {this.handleSelectGenre}
                        genres={this.state.genres}
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}/>
                    </div>
                    <div className='col'>
                    <Link
                        to="/movies/new"
                        className="btn btn-primary"
                        style={{ marginBottom: 20 }}
                    >
                        New Movie
                    </Link>
                    <SearchBox onChange={this.handleSearch} value={searchQuery}></SearchBox>
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