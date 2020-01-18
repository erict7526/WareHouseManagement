import React, { useState } from "react";

function Table(props) {
	const datas = props.datas;
	const [page, setPage] = useState(0);
	const [rowPerPage, setRowPerPage] = useState(10);
	const pagesMaxium = datas.length / rowPerPage; //float
	if (page >= pagesMaxium) {
		setPage(pagesMaxium - 1);
	}
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
			<button
				className="pageBtn"
				onClick={() => {
					setPage(page + 1);
				}}
			></button>
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
