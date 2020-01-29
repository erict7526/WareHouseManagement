import React, { useState } from "react";
import "./css/Table.css";
import { ButtonWithNum } from "./ButtonWithNum.js";

function Table(props) {
	const data = props.data;
	const checkedData = props.checkedData;
	const setCheckedData = props.setCheckedData;
	const setClickedOn = props.setClickedOn;
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
								checkedData,
								setCheckedData,
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
					checkedData
				}}
			/>
		</div>
	);

	return element;
}

function DataTr(props) {
	const data = props.data;
	const checkedData = props.checkedData;
	const setCheckedData = props.setCheckedData;
	const setClickedOn = props.setClickedOn;
	const [stockOutNum, setStockOutNum] = useState(0);
	const checked = checkedData.find(item => item.thing === data);
	if (checked && checked.num !== stockOutNum) {
		setStockOutNum(checked.num);
	}
	let element;
	element = (
		<tr
			className={checked ? "checkedData" : "rowContent"}
			onClick={() => {
				if (!checked) {
					setClickedOn(data);
				}
			}}
		>
			<td className="data-code">{data["code"]}</td>
			<td className="data-name">{data["name"]}</td>
			<td className="data-specifcation">{data["specification"]}</td>
			<td className="data-remain-num">{data["remain_num"]}</td>
			<td
				className="data-stock-out-input"
				onClick={e => {
					e.stopPropagation();
				}}
			>
				<form
					onSubmit={e => {
						e.preventDefault();
						if (!Number.isInteger(parseInt(stockOutNum, 10))) {
							setStockOutNum(0);
							return;
						}
						if (checked) {
							setCheckedData(
								checkedData.filter(d => d.thing !== data)
							);
							setStockOutNum(0);
						} else if (stockOutNum !== 0) {
							const item = {
								thing: data,
								num: parseInt(stockOutNum, 10)
							};
							setCheckedData([...checkedData, item]);
						} else {
							setClickedOn(data);
						}
					}}
				>
					<input
						type="text"
						className="input"
						value={stockOutNum}
						onChange={e => {
							setStockOutNum(e.target.value);
						}}
					/>
					<button className={checked ? "checkedButton" : "button"}>
						{checked ? (
							<i className="fas fa-times"></i>
						) : (
							<i className="fas fa-plus"></i>
						)}
					</button>
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
	const checkedData = props.checkedData;
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
				<ButtonWithNum checkedData={checkedData} />
			</div>
		</div>
	);
	return element;
}

export { Table, DataTr };
