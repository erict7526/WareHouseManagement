import React, { useState } from "react";
import react_logo from "../image/react-logo.png";
import "../css/MainManagementView.css";
import PickUpView from "./PickUpView.js";
import { Redirect, Route, Switch } from "react-router-dom";

function MainManagementView({ match, history, ...props }) {
	const setIsUserLogin = props.setIsUserLogin;
	const [pageName, setPageName] = useState("出庫");
	let element;
	element = (
		<div className="main_management_view_wrappr">
			<div className="nav">
				<div className="left_area">
					<img src={react_logo} alt="React Logo" />
					<p className="title">物料管理系統</p>
				</div>
				<div className="center_area">
					<p className="title">{pageName}</p>
				</div>
				<div className="right_area">
					<button
						className="shopping_list round"
						onClick={() => {
							setPageName("出庫");
							history.push(`${match.url}/stock_out`);
						}}
					>
						出庫
					</button>
					<button
						className="buy_list round"
						onClick={() => {
							setPageName("入庫");
							history.push(`${match.url}/stock_in`);
						}}
					>
						入庫
					</button>
					<button
						className="round"
						onClick={() => {
							setIsUserLogin(false);
							history.push("/login");
						}}
					>
						登出
					</button>
				</div>
			</div>
			<div className="content_area">
				<Switch>
					<Route path={`${match.url}/stock_out`}>
						<PickUpView />
					</Route>
					<Route path={`${match.url}/stock_in`}>
						<h1>入庫</h1>
					</Route>
					<Route path={`${match.url}`}>
						<Redirect to={`${match.url}/stock_out`} />
					</Route>
				</Switch>
			</div>
		</div>
	);

	return (
		<Route>{props.isUserLogin ? element : <Redirect to="/login" />}</Route>
	);
}

export default MainManagementView;
