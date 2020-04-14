import React from "react";

import { connect } from "react-redux";

import logo from "../logo.svg";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { useForm } from "react-hook-form";

function LoginForm({ state, dispatch, history }) {
	const { register, handleSubmit, errors } = useForm();
	const onSubmit = (data) => {
		console.log(data);
	};
	console.log(history);
	let element = (
		<div className="w-50 mx-auto p-5 d-flex flex-column align-items-center">
			<div className="w-50 pt-5 mx-auto">
				<Image src={logo} />
			</div>
			<Form onSubmit={handleSubmit(onSubmit)} className="pt-2 w-50">
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						name="userEmail"
						ref={register({
							required: {
								value: true,
								message: "Please Enter Your Email.",
							},
						})}
						type="email"
						placeholder="Enter email"
						isInvalid={!!errors.userEmail}
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
					<Form.Control.Feedback type="invalid">
						{errors.userEmail && errors.userEmail.message}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="userPassword"
						ref={register({
							required: {
								value: true,
								message: "Please Enter Your Password.",
							},
						})}
						type="password"
						placeholder="Password"
						isInvalid={!!errors.userPassword}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.userPassword && errors.userPassword.message}
					</Form.Control.Feedback>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
	return element;
}

LoginForm = connect()(LoginForm);

export default LoginForm;
