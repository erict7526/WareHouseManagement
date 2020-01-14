import React, { useState, useEffect } from "react";
import react_logo from "../image/react-logo.png";
import "../css/SignUpView.css";
import LoginView from "./LoginView.js";

function SignUpView(props) {
	let element;
	let setIsSignUpButtonClicked = props.setIsSignUpButtonClicked;
	element = (
		<div className="sign_up_wrapper">
			<div className="logo">
				<img src={react_logo} alt="React Logo" />
			</div>
			<div class="form">
				<div class="input_field">
					<input type="text" placeholder="Username" />
				</div>
				<div class="input_field">
					<input type="password" placeholder="Password" />
				</div>
				<div class="btn">
					<button>Sign Up</button>
				</div>
			</div>
			<div className="login">
				<p>Already have an account?</p>
				<button
					onClick={() => {
						setIsSignUpButtonClicked(false);
					}}
				>
					Sign in
				</button>
			</div>
		</div>
	);
	return element;
}

export default SignUpView;
