/* eslint-disable */
import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';

class Signup extends React.Component{

    constructor(props){
        super(props);
        this.state={
          email:"",
          password:"",
          errors:{},
          submitted:false
        };
        this._handleChange=this._handleChange.bind(this);
        this._handleSubmit=this._handleSubmit.bind(this);
    }

     _handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    _handleSubmit(e){
        e.preventDefault();
        this.setState({errors:{},submitted:true});
        axios.post('/signup',{users:this.state})
            .then((response)=>{
                if(response.data.status){
                  browserHistory.push('/login');
               } else {
                 this.setState({errors:response.data,submitted:false});
               }
            });
    }

    render(){
        return (
            <div className="mdl-layout mdl-js-layout mdl-color--grey-100">
	<main className="mdl-layout__content">
<h1 id="title" style={{color:"#16a085"}}>Night Life Coordination</h1>
		<div id="login" className="mdl-card mdl-shadow--6dp">
			<div className="mdl-card__title mdl-color--primary mdl-color-text--white">
				<h2 className="mdl-card__title-text">Signup</h2>
			</div>
	  	<div className="mdl-card__supporting-text">
				<form onSubmit={this._handleSubmit}>
					<div className="mdl-textfield mdl-js-textfield">
					<p>Email {this.state.errors.email&&<span className="alert">{this.state.errors.email}</span>}</p>
						<input onChange={this._handleChange} className="mdl-textfield__input" type="text" name="email" />
					</div>
					<div className="mdl-textfield mdl-js-textfield">
					<p>Password {this.state.errors.password&&<span className="alert">{this.state.errors.password}</span>}</p>
						<input className="mdl-textfield__input" type="password" name="password"  onChange={this._handleChange}/>
					</div>
					<div className="mdl-card__actions mdl-card--border">
				<button id="loginButton" type="submit" disabled={this.state.submitted} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
				Signup
      </button> 	{this.state.submitted&&<div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>}
			</div>
				</form>
			</div>

		</div>
	</main>
  <div className="footer text-center">desinged & coded by <a href="https://github.com/Chan11/" target="_blank">
    <strong>Chandrahas</strong></a></div>
</div>
            );
    }
}

export default Signup;
