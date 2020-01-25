import React, { useState } from "react";
import "./css/Table.css";
import { ButtonWithNum } from "./ButtonWithNum.js";

function Table(props) {
	const data = props.data;
	const checkedData = props.checkedData;
	const setCheckedData = props.setCheckedData;
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
					</tr>
					{dataOnPage.map((d, index) => (
						<DataTr
							key={index}
							data={d}
							checkedData={checkedData}
							setCheckedData={setCheckedData}
						/>
					))}
					{emptyRow > 0 && (
						<tr
							style={{
								height: emptyRow * 42 + 5 + "px"
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
	let element;
	const data = props.data;
	const checkedData = props.checkedData;
	const setCheckedData = props.setCheckedData;
	element = (
		<tr
			onClick={() => {
				if (checkedData.includes(data)) {
					setCheckedData(checkedData.filter(d => d !== data));
				} else {
					setCheckedData([...checkedData, data]);
				}
			}}
			className={
				checkedData.includes(data) ? "checkedData" : "rowContent"
			}
		>
			<td className="data-code">{data["code"]}</td>
			<td className="data-name">{data["name"]}</td>
			<td className="data-specifcation">{data["specification"]}</td>
			<td className="data-remain-num">{data["remain_num"]}</td>
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
