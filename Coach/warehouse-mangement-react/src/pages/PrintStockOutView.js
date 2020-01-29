import React, { useState } from "react";
import { Table } from "../component/Table.js";
import "../css/PrintStockOutView.css";

function PrintStockOutView(props) {
	const checkedData = props.checkedData;
	const setCheckedData = props.setCheckedData;
	const [page, setPage] = useState(0);
	const [rowPerPage, setRowPerPage] = useState(10);
	let dataOnPage = checkedData.slice(
		rowPerPage * page,
		rowPerPage * page + rowPerPage
	);
	let emptyRow = rowPerPage - dataOnPage.length;

	let element = (
		<div className="print-stock-out">
			<table>
				<tbody>
					<tr className="rowHeader">
						<th className="data-code">編號</th>
						<th className="data-name">名稱</th>
						<th className="data-specifcation">規格</th>
						<th className="data-remain-num">剩餘數量</th>
						<th className="data-stock-out-input">領取數量</th>
					</tr>
					{dataOnPage.map(item => (
						<PrintDataTr
							key={item.thing.code}
							{...{ checkedData: item, setCheckedData }}
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
		</div>
	);
	return element;
}

function PrintDataTr(props) {
	const checkedData = props.checkedData;
	const setCheckedData = props.setCheckedData;
	let element = (
		<tr>
			<td className="data-code">{checkedData.thing.code}</td>
			<td className="data-name">{checkedData.thing.name}</td>
			<td className="data-specifcation">
				{checkedData.thing.specifcation}
			</td>
			<td className="data-remain-num">{checkedData.thing.remain_num}</td>
			<td className="data-stock-out-input">
				<form>
					<input type="text" value={checkedData.num} />
					<button>
						<i className="fas fa-plus"></i>
					</button>
				</form>
			</td>
		</tr>
	);

	return element;
}

export default PrintStockOutView;
