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
	const [itemList, setItemList] = useState([]);

	let element;
	element = (
		<div className="main_management_view_wrappr">
			<div className="nav">
				<div className="left_area">
					<img src={react_logo} alt="React Logo" />
					<p className="title">物料管理系統</p>
				</div>
				<div className="center_area"></div>
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
						itemList,
						setItemList
					}}
				/>
				<RouteTable
					{...{
						itemList,
						setItemList
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
			<div className="left-area">
				<Switch>
					<Route path="/main/search">
						<span
							style={{
								visibility: "hidden",
								width: "3em",
								height: "3em",
								fontSize: "18px",
								margin: "0 10px"
							}}
						></span>
					</Route>
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
			</div>
			<div className="center-area">
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
			<div className="right-area">
				<Route path="/main/stock_out">
					<button className="print-button">列印領料單</button>
				</Route>
				<Route path="/main/stock_in">
					<button className="print-button">列印入料單</button>
				</Route>
				<Route path="/main/search">
					<button className="new-item-button">創建物料</button>
				</Route>
			</div>
		</div>
	);
	return element;
}

function RouteTable({ itemList, setItemList, ...props }) {
	let element;
	element = (
		<Switch>
			<Route
				path="/main/search"
				render={() => (
					<Table
						key="searchTable"
						{...{
							data: testData,
							itemList,
							setItemList
						}}
					/>
				)}
			/>

			<Route path="/main/stock_out">
				<Table
					key="stockOutTable"
					{...{
						data: itemList
							.filter(item => item.checkState === "STOCK_OUT")
							.map(item => item.thing),
						itemList,
						setItemList
					}}
				/>
			</Route>
			<Route
				path="/main/stock_in"
				render={() => (
					<Table
						key="stockInTable"
						{...{
							data: itemList
								.filter(item => item.checkState === "STOCK_IN")
								.map(item => item.thing),
							itemList,
							setItemList
						}}
					/>
				)}
			/>
		</Switch>
	);
	return element;
}
