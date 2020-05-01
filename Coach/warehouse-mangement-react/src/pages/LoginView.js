import React, { useState } from "react";
import react_logo from "../image/react-logo.png";
import "./css/LoginView.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "urql";
import bcrypt from "bcryptjs";

import Alert from "react-bootstrap/Alert";

const passwordDict = { "123456": "123456" };

const LOGIN_USER = `query login($id:String!){
	allUsers(condition:{id:$id}){
		nodes{
			hash
		}
	}
}`;

function LoginView(props) {
	const setIsUserLogin = props.setIsUserLogin;
	const history = useHistory();
	const { errors, register, handleSubmit } = useForm();
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const [loginResult] = useQuery({
		query: LOGIN_USER,
		variables: { id: username },
		pause: !username,
	});

	const onSubmit = (data) => {
		setUsername(data.username);
		setPassword(data.password);
	};

	if (username && password && !loginResult.fetching) {
		if (loginResult.data.allUsers.nodes.length === 1) {
			bcrypt
				.compare(password, loginResult.data.allUsers.nodes[0].hash)
				.then((result) => {
					if (result) {
						setIsUserLogin(true);
						history.push("/main/search");
					} else {
						setErrorMessage("密碼錯誤！");
						setUsername(null);
						setPassword(null);
					}
				});
		} else {
			setErrorMessage("帳號不存在！請先註冊！");
			setUsername(null);
			setPassword(null);
		}
	}

	let element;
	element = (
		<div className="wrapper">
			<div className="header">
				<div className="logo">
					<img src={react_logo} alt="React Logo" />
				</div>
				{errorMessage && (
					<Alert
						variant="danger"
						onClose={() => {
							setErrorMessage(null);
						}}
						dismissible
					>
						<Alert.Heading>錯誤！</Alert.Heading>
						<p>{errorMessage}</p>
					</Alert>
				)}
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
