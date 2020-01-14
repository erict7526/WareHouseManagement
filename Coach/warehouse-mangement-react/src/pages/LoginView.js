import React, { useState } from "react";
import react_logo from "../image/react-logo.png";
import "../css/LoginView.css";
import SignUpView from "./SignUpView.js";

const passwordDict = { "123456": "123456" };

function LoginView(props) {
	const setIsUserLogin = props.setIsUserLogin;
	const [isSignUpButtonClicked, setIsSignUpButtonClicked] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	let element;

	if (isSignUpButtonClicked) {
		return (
			<SignUpView
				className="sign_up_view"
				setIsSignUpButtonClicked={setIsSignUpButtonClicked}
			/>
		);
	}

	element = (
		<div className="wrapper">
			<div className="header">
				<div className="logo">
					<img src={react_logo} alt="React Logo" />
				</div>
				<div className="form">
					<form
						onSubmit={() => {
							handleLogin(username, password, setIsUserLogin);
						}}
					>
						<div className="input_field">
							<input
								type="text"
								id=""
								className="input"
								placeholder="Username"
								value={username}
								onChange={e => {
									setUsername(e.target.value);
								}}
							/>
						</div>
						<div className="input_field">
							<input
								type="password"
								className="input"
								placeholder="Password"
								value={password}
								onChange={e => {
									setPassword(e.target.value);
								}}
							/>
						</div>
						<div className="btn">
							<button>Log In</button>
						</div>
					</form>
				</div>
				<div className="signUp">
					<p>Don't have an account?</p>
					<button
						onClick={() => {
							setIsSignUpButtonClicked(true);
						}}
					>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);

	return element;
}

function handleLogin(username, password, setIsUserLogin) {
	setIsUserLogin(passwordDict[username] === password);
}

export default LoginView;
