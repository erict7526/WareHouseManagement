import React, { useState } from "react";
import react_logo from "./react-logo.png";
import "./LoginView.css";

function LoginView(props) {
	return (
		<div align="center">
			<img src={react_logo} alt="React Logo" width="20%" height="auto" />
			<form action="" className="LoginView">
				<label htmlFor="userName">
					帳號
					<input type="text" className="Input" />
				</label>
				<br />
				<label htmlFor="password">
					密碼
					<input type="password" className="Input" />
				</label>
			</form>
		</div>
	);
}

export default LoginView;
