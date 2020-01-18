import React, { useState } from "react";
import "./css/Table.css";

function Table(props) {
	const datas = props.datas;
	const [page, setPage] = useState(0);
	const [rowPerPage, setRowPerPage] = useState(10);
	let dataOnPage = datas.slice(
		rowPerPage * page,
		rowPerPage * page + rowPerPage
	);
	let element;

	element = (
		<div className="Table">
			<table>
				<tbody>
					<tr>
						<th>編號</th>
						<th>名稱</th>
						<th>規格</th>
						<th>領取數量</th>
					</tr>
					{dataOnPage.map((d, index) => (
						<DataTr key={index} data={d} />
					))}
				</tbody>
			</table>
			<div className="tableFooter">
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
				<p>{page + 1}</p>
				<button
					className="pageBtn"
					onClick={() => {
						if (page < Math.ceil(datas.length / rowPerPage) - 1) {
							setPage(page + 1);
						}
					}}
				>
					>
				</button>
			</div>
		</div>
	);

	return element;
}

function DataTr(props) {
	let element;
	const data = props.data;
	element = (
		<tr>
			<td>{data["number"]}</td>
			<td>{data["name"]}</td>
			<td>{data["specification"]}</td>
			<td>
				<input type="text" />
			</td>
		</tr>
	);

	return element;
}

export { Table, DataTr };
