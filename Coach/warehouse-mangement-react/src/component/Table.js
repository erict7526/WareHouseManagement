import React, { useState } from "react";
import "./css/Table.css";
import { ButtonWithNum } from "./ButtonWithNum.js";
import { useHistory } from "react-router-dom";

function Table({
	stockOutItem = [],
	setStockOutItem = null,
	stockInItem = [],
	setStockInItem = null,
	...props
}) {
	const data = props.data;
	const where = props.where;

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
						<th className="data-stock-out-input">領取數量</th>
					</tr>
					{dataOnPage.map(d => (
						<DataTr
							{...{
								key: d.code,
								data: d,
								stockOutItem,
								setStockOutItem,
								stockInItem,
								setStockInItem,
								where,
								setClickedOn
							}}
						/>
					))}
					{emptyRow > 0 && (
						<tr
							style={{
								height: emptyRow * 49 + 5 + "px"
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
					setRowPerPage,
					where
				}}
			/>
		</div>
	);

	return element;
}

function DataTr(props) {
	const data = props.data;
	const stockOutItem = props.stockOutItem;
	const setStockOutItem = props.setStockOutItem;
	const stockInItem = props.stockInItem;
	const setStockInItem = props.setStockInItem;
	const setClickedOn = props.setClickedOn;
	const [inputNum, setInputNum] = useState(0);
	const isInStockOut = stockOutItem.find(item => item.thing === data);
	const isInStockIn = stockInItem.find(item => item.thing === data);

	if (isInStockOut && isInStockOut.num !== inputNum) {
		setInputNum(isInStockOut.num);
	}

	if (isInStockIn && isInStockIn.num !== inputNum) {
		setInputNum(isInStockIn.num);
	}

	let element;
	element = (
		<tr
			className={
				isInStockOut
					? "in-stock-out"
					: isInStockIn
					? "in-stock-in"
					: "rowContent"
			}
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
					/>
					<button
						className={isInStockOut ? "checkedButton" : "button"}
					>
						{isInStockOut ? (
							<i className="fas fa-times"></i>
						) : (
							<i className="fas fa-upload"></i>
						)}
					</button>
					{isInStockOut ? (
						""
					) : (
						<button
							className={
								isInStockOut ? "checkedButton" : "button"
							}
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
	const where = props.where;
	const history = useHistory();
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
			<div className="tableFooter-right-area"></div>
		</div>
	);
	return element;
}

export { Table, DataTr };
