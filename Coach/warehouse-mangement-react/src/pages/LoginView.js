import React, { useState } from "react";
import react_logo from "../image/react-logo.png";
import "./css/LoginView.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const passwordDict = { "123456": "123456" };

function LoginView(props) {
	const setIsUserLogin = props.setIsUserLogin;
	const history = useHistory();
	const { errors, register, handleSubmit } = useForm();

	const onSubmit = data => {
		handleLogin(data.username, data.password, setIsUserLogin);
		history.push("/main/search");
	};

	let element;
	element = (
		<div className="wrapper">
			<div className="header">
				<div className="logo">
					<img src={react_logo} alt="React Logo" />
				</div>
				<div className="form">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="input_field">
							<input
								type="text"
								name="username"
								className="input"
								placeholder="Username"
								autoFocus
								ref={register({ required: true })}
							/>
							{errors.username && (
								<span className="error-message">
									Username is required.
								</span>
							)}
						</div>
						<div className="input_field">
							<input
								type="password"
								className="input"
								placeholder="Password"
								name="password"
								ref={register({ required: true })}
							/>
							{errors.password && (
								<span className="error-message">
									password is required.
								</span>
							)}
						</div>
						<div className="btn">
							<button>Log In</button>
						</div>
						{history.location.state && (
							<span className="error-message">
								{history.location.state.error}
							</span>
						)}
					</form>
				</div>
				<div className="signUp">
					<p>Don&apos;t have an account?</p>
					<button
						onClick={() => {
							history.push("/sign_up");
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
