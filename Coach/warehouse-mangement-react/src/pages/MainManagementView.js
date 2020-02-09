import React, { useState } from "react";
import react_logo from "../image/react-logo.png";
import "../css/MainManagementView.css";
import PickUpView from "./PickUpView.js";
import { Redirect, Route, Switch } from "react-router-dom";

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
				<Switch>
					<Route
						path={`${match.url}/:where`}
						render={props => (
							<ContentView
								{...props}
								{...{
									stockOutItem,
									setStockOutItem,
									stockInItem,
									setStockInItem
								}}
							/>
						)}
					/>
					<Route path={`${match.url}`}>
						<Redirect to={`${match.url}/search`} />
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

function ContentView({
	stockOutItem,
	setStockOutItem,
	stockInItem,
	setStockInItem,
	...props
}) {
	const where = props.match.params.where;

	switch (where) {
		case "stock_out":
			return <h1>out</h1>;
		case "stock_in":
			return <h1>in</h1>;
		case "new":
			return <h1>new</h1>;
		default:
			return (
				<SearchView
					{...{
						stockOutItem,
						setStockOutItem,
						stockInItem,
						setStockInItem,
						where
					}}
				/>
			);
	}
}

function SearchView(props) {
	const [search_text, setSearchText] = useState("");
	const stockOutItem = props.stockOutItem;
	const setStockOutItem = props.setStockOutItem;
	const stockInItem = props.stockInItem;
	const setStockInItem = props.setStockInItem;
	const where = props.where;

	let element = (
		<div className="search-center-area">
			<div className="search-bar">
				<div>
					<button>
						<i className="fas fa-arrow-left"></i>
					</button>
				</div>
				<form
					onSubmit={e => {
						e.preventDefault();
						console.log(search_text);
					}}
				>
					<input
						type="text"
						placeholder="Search"
						value={search_text}
						onChange={e => {
							setSearchText(e.target.value);
						}}
					/>
					<button>
						<i className="fas fa-search"></i>
					</button>
				</form>
				<div>
					<button>in</button>
					<button>out</button>
					<button>new</button>
				</div>
			</div>

			<div className="search-result">
				<Table
					{...{
						data: testData,
						stockOutItem,
						setStockOutItem,
						stockInItem,
						setStockInItem,
						where
					}}
				/>
			</div>
		</div>
	);
	return element;
}
