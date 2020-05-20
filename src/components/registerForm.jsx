import React from 'react';
import Joi from 'joi-browser'
import Form from './common/form';

class RegisterForm extends Form {
    state = {
        data: { email: '', password: '', name:''},
        errors: {
            email: '',
            password: '',
            name: '',
        }
    }

    schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required().label('Email'),
        password: Joi.string().min(5).required().label('Password'),
        name: Joi.string().alphanum().min(3).required().label('Name'),
    }

    doSubmit = () => {
        // call the server
        console.log('Registered');
    }

    render() { 

        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                   {this.renderInput('email', 'Email', 'email')}
                   {this.renderInput('password', 'Password', "password")}
                   {this.renderInput('name', 'Name')}
                   {this.renderButton('Register')}
                </form>
            </div>
          );
    }
}
 
export default RegisterForm;