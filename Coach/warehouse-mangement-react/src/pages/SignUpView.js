import React, { useState } from "react";
import react_logo from "../image/react-logo.png";
import "./css/SignUpView.css";
import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useMutation } from "urql";

import bcrypt from "bcryptjs";

import Alert from "react-bootstrap/Alert";

const SIGN_UP_USER = `
	mutation signUp($account: String!,$name:String!,$hash:String!) {
		signUpUser(account: $account,name:$name,hash:$hash) {
			user{
				name
			}
		}
	}
`;

function SignUpView(props) {
	const history = useHistory();
	const { register, errors, handleSubmit, watch } = useForm();

	const watchPassword = watch("password");

	const [, signUpUserMutation] = useMutation(SIGN_UP_USER);

	const [showAlert, setShowAlert] = useState(false);

	const setCurrentUser = props.setCurrentUser;

	const onSubmit = (data) => {
		console.log(typeof data.account);
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(data.password, salt, function(err, hash) {
				if (err) {
					console.log(err);
				}
				signUpUserMutation({
					account: data.account,
					name: data.username,
					hash: hash,
				})
					.then((result) => {
						if (result.error) {
							throw result.error;
						}
						setCurrentUser(result.data.signUpUser.user);
						history.push("/main/search");
					})
					.catch((e) => {
						console.log(e);
						setShowAlert(true);
					});
			});
		});
	};

	let element;
	element = (
		<div className="sign_up_wrapper">
			<div className="logo">
				<img src={react_logo} alt="React Logo" />
			</div>
			{showAlert && (
				<Alert
					variant="danger"
					onClose={() => setShowAlert(false)}
					dismissible
				>
					<Alert.Heading>帳號已存在！</Alert.Heading>
					<p>試著登入或選擇另一個帳號</p>
				</Alert>
			)}

			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<div className="input_field">
					<input
						name="account"
						type="text"
						placeholder="帳號"
						ref={register({ required: true })}
					/>
					{errors.account && (
						<span className="error-message">需要填寫帳號</span>
					)}
				</div>
				<div className="input_field">
					<input
						name="username"
						type="text"
						placeholder="姓名"
						ref={register({ required: true })}
					/>
					{errors.username && (
						<span className="error-message">需要填寫姓名</span>
					)}
				</div>
				<div className="input_field">
					<input
						name="password"
						type="password"
						placeholder="密碼"
						ref={register({ required: true, maxLength: 50 })}
					/>
					{errors.password && errors.password.type === "required" && (
						<span className="error-message">需要填寫密碼</span>
					)}
					{errors.password &&
						errors.password.type === "maxLength" && (
							<span className="error-message">
								密碼超過50字元
							</span>
						)}
				</div>
				<div className="input_field">
					<input
						name="password2"
						type="password"
						placeholder="確認密碼"
						ref={register({
							required: true,
							validate: (value) => value === watchPassword,
						})}
					/>
					{errors.password2 &&
						errors.password2.type === "required" && (
							<span className="error-message">請確認密碼</span>
						)}
					{errors.password2 &&
						errors.password2.type === "validate" && (
							<span className="error-message">密碼不一致</span>
						)}
				</div>
				<button>Sign Up</button>
			</form>
			<div className="login">
				<p className="my-auto">Already have an account?</p>
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
