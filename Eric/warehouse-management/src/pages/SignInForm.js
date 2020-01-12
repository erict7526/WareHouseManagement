import React, { Component } from 'react';
import { Link, Route , Redirect } from 'react-router-dom';
import Main from './main';

class SignInForm extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            password: '',
            redirect: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        this.setState({
            ['redirect']: '/Main'
        })
    }

    render() {
        if(this.state.redirect){
            return <Redirect exact to = {
                this.state.redirect
            }/>
        }
        return (
        <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleSubmit}>
            <div className="FormField">
                <label className="FormField__Label" htmlFor="user">User Name</label>
                <input type="user" id="user" className="FormField__Input" placeholder="Enter your user name" name="user" value={this.state.user} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign In</button> <Link to="/" className="FormField__Link">Create an account</Link>
              </div>
            </form>
          </div>
        );
    }
}

export default SignInForm;