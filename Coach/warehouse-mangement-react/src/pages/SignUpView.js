import React, { useState, useEffect } from "react";
import react_logo from "../image/react-logo.png";
import "../css/SignUpView.css";
import LoginView from "./LoginView.js";
import { useHistory } from "react-router-dom";

function SignUpView(props) {
	const history = useHistory();
	let element;
	element = (
		<div className="sign_up_wrapper">
			<div className="logo">
				<img src={react_logo} alt="React Logo" />
			</div>
			<div className="form">
				<div class="input_field">
					<input type="text" placeholder="Username" />
				</div>
				<div className="input_field">
					<input type="password" placeholder="Password" />
				</div>
				<div className="btn">
					<button>Sign Up</button>
				</div>
			</div>
			<div className="login">
				<p>Already have an account?</p>
				<button
					onClick={() => {
						history.push("/login");
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
