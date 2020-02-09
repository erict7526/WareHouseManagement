import React, { useState } from "react";
import { Redirect, Route, Switch, NavLink } from "react-router-dom";
import react_logo from "../image/react-logo.png";
import "../css/MainManagementView.css";
import { Table } from "../component/Table.js";

const testData = Array(21)
	.fill(0)
	.map((_, i) => fakeData(i));

function fakeData(id) {
	let name = `test_name_${id}`;
	let specification = `test_specification_${id}`;
	let code = `${String(id).padStart(4, 0)}-${String(id).padStart(4, 0)}`;
	let remain_num = id;
	return { code, name, specification, remain_num };
}

function MainManagementView({ match, history, ...props }) {
	const setIsUserLogin = props.setIsUserLogin;
	const [pageName, setPageName] = useState("出庫");
	const [stockOutItem, setStockOutItem] = useState([]);
	const [stockInItem, setStockInItem] = useState([]);
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
				<TopBar
					{...{
						stockOutItem,
						setStockOutItem,
						stockInItem,
						setStockInItem
					}}
				/>
			</div>
		</div>
	);

	return (
		<Route>{props.isUserLogin ? element : <Redirect to="/login" />}</Route>
	);
}

export default MainManagementView;

function TopBar(props) {
	const [searchText, setSearchText] = useState("");
	let element = (
		<div className="top-bar">
			<div>
				<Switch>
					<Route path="/main/search"></Route>
					<Route path="/">
						<NavLink
							to="/main/search"
							className="nav-link"
							activeClassName="active-link"
						>
							<i className="fas fa-arrow-left"></i>
						</NavLink>
					</Route>
				</Switch>
			</div>
			<div>
				<form
					onSubmit={e => {
						e.preventDefault();
						console.log(searchText);
					}}
				>
					<input
						type="text"
						placeholder="Search"
						value={searchText}
						onChange={e => {
							setSearchText(e.target.value);
						}}
					/>
					<button>
						<i className="fas fa-search"></i>
					</button>
				</form>
			</div>
			<div>
				<NavLink
					to="/main/stock_out"
					className="nav-link"
					activeClassName="active-link"
				>
					<i className="fas fa-upload"></i>
				</NavLink>
				<NavLink
					to="/main/stock_in"
					className="nav-link"
					activeClassName="active-link"
				>
					<i className="fas fa-download"></i>
				</NavLink>
				<NavLink
					to="/main/new_item"
					className="nav-link"
					activeClassName="active-link"
				>
					<i className="fas fa-plus"></i>
				</NavLink>
			</div>
		</div>
	);
	return element;
}
