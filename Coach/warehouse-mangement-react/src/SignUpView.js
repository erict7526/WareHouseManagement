import React, { useState, useEffect } from "react";
import react_logo from "./react-logo.png";
import "./SignUpView.css";

function SignUpView(props) {
	let element;
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
		</div>
	);
	return element;
}

export default SignUpView;
