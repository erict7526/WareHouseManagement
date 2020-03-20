import React, { useState } from "react";
import { Redirect, Route, Switch, NavLink } from "react-router-dom";
import react_logo from "../image/react-logo.png";
import "./css/MainManagementView.css";
import { Table } from "../component/Table.js";
import PopUp from "../component/PopUp.js";
import NewItemView from "./NewItemView.js";

import { useQuery } from "urql";
import { gql } from "apollo-boost";

// const testData = Array(21)
// 	.fill(0)
// 	.map((_, i) => fakeData(i));

const GET_SEARCHED_LASTS = gql`
	query getSearch($search: String) {
		searchByAPI(search: $search) {
			no
			productNo
			id
			name
			unit
			spec
			countx
			unitPrice
		}
	}
`;

function dataTranformer(rawdata) {
	let name = rawdata.name;
	let specification = rawdata.spec;
	let code = rawdata.id;
	let remain_num = parseInt(rawdata.countx);
	let dataID = rawdata.no;
	return { dataID, code, name, specification, remain_num };
}

function MainManagementView({ match, history, ...props }) {
	const setIsUserLogin = props.setIsUserLogin;
	const [itemList, setItemList] = useState([]);
	const [searchText, setSearchText] = useState("");

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
						setItemList,
						history,
						searchText,
						setSearchText
					}}
				/>
				<RouteTable
					{...{
						itemList,
						setItemList,
						searchText
					}}
				/>
			</div>
			<Route
				path="/main/:where/pop_up"
				render={() => (
					<PopUp
						{...{
							itemList,
							setItemList
						}}
					/>
				)}
			/>
		</div>
	);

	return (
		<Route>
			{props.isUserLogin ? (
				element
			) : (
				<Redirect
					to={{
						pathname: "/login",
						state: {
							error: "Wrong Password or Username."
						}
					}}
				/>
			)}
		</Route>
	);
}

export default MainManagementView;

function TopBar(props) {
	const [searchText, setSearchText] = [props.searchText, props.setSearchText];
	const itemList = props.itemList;
	const history = props.history;
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
					<p>
						{
							itemList.filter(
								item => item.checkState === "STOCK_OUT"
							).length
						}
					</p>
				</NavLink>
				<NavLink
					to="/main/stock_in"
					className="nav-link"
					activeClassName="active-link"
				>
					<i className="fas fa-download"></i>
					<p>
						{
							itemList.filter(
								item => item.checkState === "STOCK_IN"
							).length
						}
					</p>
				</NavLink>
			</div>
			<div className="center-area">
				<form
					onSubmit={e => {
						e.preventDefault();
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
					<button
						className="new-item-button"
						onClick={() => {
							history.push("/main/new_item");
						}}
					>
						創建物料
					</button>
				</Route>
			</div>
		</div>
	);
	return element;
}

function RouteTable({ itemList, setItemList, ...props }) {
	const searchText = props.searchText;
	const [queryResult] = useQuery({
		query: GET_SEARCHED_LASTS,
		variables: { search: searchText }
	});
	console.log(searchText);
	const [dataToShow, setDataToShow] = useState([]);
	if (queryResult.error) {
		return (
			<div style={{ height: "55vh" }}>
				<h4 style={{ textAlign: "center", color: "#e63e60" }}>
					Can&apos;t get data from database. Error:
					{queryResult.error.message}
				</h4>
			</div>
		);
	} else if (
		!queryResult.fetching &&
		dataToShow.length !== queryResult.data.searchByAPI.length
	) {
		setDataToShow(
			queryResult.data.searchByAPI.map(last => dataTranformer(last))
		);
	}

	let element;
	element = (
		<Switch>
			<Route
				path="/main/search"
				render={() => (
					<Table
						key="searchTable"
						{...{
							data: dataToShow,
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
			<Route
				path="/main/new_item"
				render={() => <NewItemView {...{ itemList, setItemList }} />}
			/>
		</Switch>
	);
	return element;
}
