import React, { useState } from "react";
import react_logo from "../image/react-logo.png";
import "./css/LoginView.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "urql";
import bcrypt from "bcryptjs";

import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LOGIN_USER = `query login($id:String!){
	allUsers(condition:{id:$id}){
		nodes{
			name
			hash
		}
	}
}`;

function LoginView(props) {
	const setCurrentUser = props.setCurrentUser;
	const history = useHistory();
	const { errors, register, handleSubmit } = useForm();
	const [userId, setUserId] = useState(null);
	const [password, setPassword] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const [loginResult] = useQuery({
		query: LOGIN_USER,
		variables: { id: userId },
		pause: !userId && !password,
	});

	const onSubmit = (data) => {
		setUserId(data.userId);
		setPassword(data.password);
	};

	if (userId && password && !loginResult.fetching && !loginResult.error) {
		if (loginResult.data.allUsers.nodes.length === 1) {
			bcrypt
				.compare(password, loginResult.data.allUsers.nodes[0].hash)
				.then((result) => {
					if (result) {
						setCurrentUser({
							name: loginResult.data.allUsers.nodes[0].name,
						});
						history.push("/main/search");
					} else {
						setErrorMessage("密碼錯誤！");
						setUserId(null);
						setPassword(null);
					}
				});
		} else {
			setErrorMessage("帳號不存在！請先註冊！");
			setUserId(null);
			setPassword(null);
		}
	}

	if (userId && password && loginResult.error) {
		setErrorMessage(loginResult.error.toString());
		setUserId(null);
		setPassword(null);
	}

	let element;
	element = (
		<Container>
			<Row>
				<Col>
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

							<form
								className="form d-flex flex-column align-items-center"
								onSubmit={handleSubmit(onSubmit)}
							>
								<div className="input_field w-100">
									<input
										type="text"
										name="userId"
										className="input"
										placeholder="Username"
										autoFocus
										ref={register({ required: true })}
									/>
									{errors.userId && (
										<span className="error-message">
											Username is required.
										</span>
									)}
								</div>
								<div className="input_field w-100">
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
								<button className="w-50">Log In</button>

								{history.location.state && (
									<span className="error-message">
										{history.location.state.error}
									</span>
								)}
							</form>
							<div className="signUp">
								<p className="my-auto">
									Don&apos;t have an account?
								</p>
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
				</Col>
			</Row>
		</Container>
	);

	return element;
}

export default LoginView;
