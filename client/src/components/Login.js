import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {email:'',password:''}
	}
	
	onChange(event) {
		switch (event.target.name) {
			case 'email':
				this.setState({
					email: event.target.value
				})
				break;
			case 'password':
				this.setState({
					password: event.target.value
				});
				break;
			default:
				break;
		}
	}
	login(){
		this.props.Login(this.state);
	}
	render() {
		return (
			<div>
				<Form inline>
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        			    <Label for="exampleEmail" className="mr-sm-2">Email</Label>
        			    <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" onChange={this.onChange.bind(this)} />
					</FormGroup>
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="examplePassword" className="mr-sm-2">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" onChange={this.onChange.bind(this)} />
					</FormGroup>
					<Button onClick={this.login.bind(this)}>Submit</Button>
				</Form>
			</div>
		);
	}
}

export default Login;