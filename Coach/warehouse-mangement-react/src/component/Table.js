import React, { useState } from "react";
import "./css/Table.css";

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
