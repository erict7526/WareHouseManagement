import React, { useState } from "react";
import react_logo from "./react-logo.png";
import "./MainManagementView.css";
import PickUpView from "./PickUpView.js";

function MainManagementView(props) {
	let element;
	const setIsUserLogin = props.setIsUserLogin;
	element = (
		<div className="main_management_view_wrappr">
			<div className="nav">
				<div className="left_area">
					<img src={react_logo} alt="React Logo" />
					<p className="title">物料管理系統</p>
				</div>
				<div className="center_area">
					<p className="title">領料</p>
				</div>
				<div className="right_area">
					<button className="shopping_list round">出庫</button>
					<button className="buy_list round">入庫</button>
					<button
						className="round"
						onClick={() => {
							setIsUserLogin(false);
						}}
					>
						登出
					</button>
				</div>
			</div>
			<div className="content_area">
				<PickUpView />
			</div>
		</div>
	);
	return element;
}

export default MainManagementView;
