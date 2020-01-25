import React, { useState } from "react";
import "./css/Table.css";
import { ButtonWithNum } from "./ButtonWithNum.js";

function Table(props) {
	const datas = props.datas;
	const checkedDatas = props.checkedDatas;
	const setCheckedDatas = props.setCheckedDatas;
	const [page, setPage] = useState(0);
	const [rowPerPage, setRowPerPage] = useState(10);
	let dataOnPage = datas.slice(
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
							checkedDatas={checkedDatas}
							setCheckedDatas={setCheckedDatas}
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
			<div className="tableFooter">
				<div className="tableFooter-left-area"></div>
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
							if (
								page <
								Math.ceil(datas.length / rowPerPage) - 1
							) {
								setPage(page + 1);
							}
						}}
					>
						>
					</button>
				</div>
				<div className="tableFooter-right-area">
					<ButtonWithNum datas={checkedDatas} />
				</div>
			</div>
		</div>
	);

	return element;
}

function DataTr(props) {
	let element;
	const data = props.data;
	const checkedDatas = props.checkedDatas;
	const setCheckedDatas = props.setCheckedDatas;
	element = (
		<tr
			onClick={() => {
				if (checkedDatas.includes(data)) {
					setCheckedDatas(checkedDatas.filter(d => d !== data));
				} else {
					setCheckedDatas([...checkedDatas, data]);
				}
			}}
			className={
				checkedDatas.includes(data) ? "checkedData" : "rowContent"
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

export { Table, DataTr };
