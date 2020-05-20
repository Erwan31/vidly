import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

class NewMovieForm extends Form {
    state = {
        data: { title: '', genre: '', stock:'', rate:''},
        errors: {
            title: '',
            genreId: '',
            stock: '',
            rate:'',
        },
        genres: [],
        errors: {}
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.required().label('Genre'),
        stock: Joi.number().integer().min(0).max(100).required().label('Stock'),
        rate: Joi.number().min(0).max(10).required().label('Rate'),
    }

    doSubmit = (data) => {
        // call the server
        console.log('New movie submitted with: ', data);
        this.setState( { data } );
    }

    render() { 

        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                   {this.renderInput('title', 'Title', 'title')}
                   {this.renderInput('genre', 'Genre', "genre")}
                   <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Genre
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li className="dropdown-item" type="button">Action</li>
                        <li className="dropdown-item" type="button">Comedy</li>
                        <li className="dropdown-item" type="button">Thriller</li>
                        </ul>
                    </div>
                   {this.renderInput('stock', 'Stock', "stock")}
                   {this.renderInput('rate', 'Rate')}
                   {this.renderButton('Save')}
                </form>
            </div>
          );
    }
}
 
export default NewMovieForm;