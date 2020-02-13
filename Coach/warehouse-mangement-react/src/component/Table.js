import React, { useState } from "react";
import "./css/Table.css";
import { useHistory, Route } from "react-router-dom";

function Table({ itemList, setItemList, ...props }) {
	const data = props.data;
	const show = props.show;
	const [clickedOn, setClickedOn] = useState({});
	const [page, setPage] = useState(0);
	const [rowPerPage, setRowPerPage] = useState(10);
	let dataOnPage = data.slice(
		rowPerPage * page,
		rowPerPage * page + rowPerPage
	);

	let emptyRow = rowPerPage - dataOnPage.length;

	let element;

	element = (
		<div className="Table">
			<table>
				<tbody>
					<tr className="rowHeader">
						<th className="data-code">編號</th>
						<th className="data-name">名稱</th>
						<th className="data-specifcation">規格</th>
						<th className="data-remain-num">剩餘數量</th>
						<th className="data-input">領取數量</th>
					</tr>
					{dataOnPage.map(d => (
						<DataTr
							{...{
								key: d.code,
								data: d,
								itemList,
								setItemList,
								setClickedOn
							}}
						/>
					))}
					{emptyRow > 0 && (
						<tr
							style={{
								height: emptyRow * 49 + 3 + "px"
							}}
						></tr>
					)}
				</tbody>
			</table>
			<TableFooter
				{...{
					page,
					setPage,
					data,
					rowPerPage,
					setRowPerPage
				}}
			/>
		</div>
	);

	return element;
}

function DataTr(props) {
	const data = props.data;
	const itemList = props.itemList;
	const setItemList = props.setItemList;
	const [clickedOn, setClickedOn] = useState({});
	const [inputNum, setInputNum] = useState(0);
	const isInItemList = itemList.find(item => item.thing === data);
	const [tmpInputNum, setTmpInputNum] = useState(0);
	const history = useHistory();
	const currentPath = history.location.pathname;

	const CHECK_STATE = isInItemList ? isInItemList.checkState : "NOT_CHECKED";

	const handleSubmit = action => {
		if (
			!Number.isInteger(parseInt(inputNum, 10)) ||
			parseInt(inputNum, 10) === 0
		) {
			setInputNum(0);
			return;
		}

		switch (action) {
			case "modify":
				const itemList_tmp = itemList;
				itemList_tmp[
					itemList.findIndex(item => item.thing === data)
				].num = parseInt(inputNum, 10);
				setItemList(itemList_tmp);
				history.replace(currentPath);
				break;
			case "STOCK_IN":
			case "STOCK_OUT":
				const item = {
					thing: data,
					num: parseInt(inputNum, 10),
					checkState: action
				};
				setItemList([...itemList, item]);
				break;
			case "remove":
				itemList.splice(
					itemList.findIndex(item => item.thing === data),
					1
				);
				setInputNum(0);
				setItemList(itemList);
				history.replace(currentPath);
				break;
			default:
				alert("Some thing wrong!");
		}
	};

	if (isInItemList && isInItemList.num !== tmpInputNum) {
		setTmpInputNum(isInItemList.num);
		setInputNum(isInItemList.num);
	}

	let element;
	element = (
		<tr
			className={(() => {
				switch (CHECK_STATE) {
					case "STOCK_OUT":
						return "in-stock-out";
					case "STOCK_IN":
						return "in-stock-in";
					default:
						return "rowContent";
				}
			})()}
			onClick={() => {
				setClickedOn(data);
			}}
		>
			<td className="data-code">{data["code"]}</td>
			<td className="data-name">{data["name"]}</td>
			<td className="data-specification">{data["specification"]}</td>
			<td className="data-remain-num">{data["remain_num"]}</td>
			<td
				className="data-input"
				onClick={e => {
					e.stopPropagation();
				}}
			>
				<form
					onSubmit={e => {
						e.preventDefault();
					}}
				>
					<input
						type="text"
						className="input"
						value={inputNum}
						onChange={e => {
							setInputNum(e.target.value);
						}}
						onBlur={() => {
							if (!Number.isInteger(parseInt(inputNum, 10))) {
								setInputNum(0);
							}
						}}
					/>
					{isInItemList ? (
						<button
							className={
								isInItemList.checkState === "STOCK_IN"
									? "in-stock-in"
									: "in-stock-out"
							}
							onClick={() => {
								handleSubmit("modify");
							}}
						>
							<i className="fas fa-retweet"></i>
						</button>
					) : (
						<button
							className="not-checked"
							onClick={() => {
								handleSubmit("STOCK_OUT");
							}}
						>
							<i className="fas fa-upload"></i>
						</button>
					)}
					{isInItemList ? (
						<button
							className="remove"
							onClick={() => {
								handleSubmit("remove");
							}}
						>
							<i className="fas fa-times"></i>
						</button>
					) : (
						<button
							className="not-checked"
							onClick={() => {
								handleSubmit("STOCK_IN");
							}}
						>
							<i className="fas fa-download"></i>
						</button>
					)}
				</form>
			</td>
		</tr>
	);

	return element;
}

function TableFooter(props) {
	const [page, setPage] = [props.page, props.setPage];
	const [rowPerPage, setRowPerPage] = [props.rowPerPage, props.setRowPerPage];
	const data = props.data;
	let element;
	element = (
		<div className="tableFooter">
			<div className="tableFooter-left-area">
				<p>每頁行數：</p>
				<select
					name="row"
					value={rowPerPage}
					onChange={e => {
						setRowPerPage(parseInt(e.target.value));
						setPage(0);
					}}
				>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="15">15</option>
				</select>
			</div>
			<div className="tableFooter-center-area">
				<button
					className="pageBtn"
					onClick={() => {
						if (page > 0) {
							setPage(page - 1);
						}
					}}
				>
					&lt;
				</button>
				<p className="page-num">{page + 1}</p>
				<button
					className="pageBtn"
					onClick={() => {
						if (page < Math.ceil(data.length / rowPerPage) - 1) {
							setPage(page + 1);
						}
					}}
				>
					>
				</button>
			</div>
			<div className="tableFooter-right-area">
				<Route path="/main/stock_out">
					<button className="print-button">列印領料單</button>
				</Route>
				<Route path="/main/stock_in">
					<button className="print-button">列印入料單</button>
				</Route>
				<Route path="/main/search">
					<button className="new-item-button">新增</button>
				</Route>
			</div>
		</div>
	);
	return element;
}

export { Table, DataTr };
