import React, { useState } from "react";
import react_logo from "../image/react-logo.png";
import "../css/MainManagementView.css";
import PickUpView from "./PickUpView.js";

function MainManagementView(props) {
	let element;
	const setIsUserLogin = props.setIsUserLogin;
	const [pageName, setPageName] = useState("出庫");
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
						}}
					>
						出庫
					</button>
					<button
						className="buy_list round"
						onClick={() => {
							setPageName("入庫");
						}}
					>
						入庫
					</button>
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
				{pageName === "出庫" ? <PickUpView /> : <h1>入庫</h1>}
			</div>
		</div>
	);
	return element;
}

export default MainManagementView;
