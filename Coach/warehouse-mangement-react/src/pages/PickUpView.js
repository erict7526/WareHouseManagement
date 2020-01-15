import React, { useState } from "react";
import "../css/PickUpView.css";

const testData = [
	{
		number: "1269-6513",
		name: "test1",
		specification: "test1"
	},
	{
		number: "1235-4546",
		name: "test2",
		specification: "test2"
	},
	{
		number: "6549-6323",
		name: "test3",
		specification: "test3"
	},
	{
		number: "66854-11321",
		name: "test4",
		specification: "test4"
	}
];

function PickUpView(props) {
	let element;

	element = (
		<div className="pick-up-view-wrapper">
			<div className="search-center-area">
				<div className="search-bar">
					<input type="text" placeholder="Search" />
					<button>
						<i class="fas fa-search"></i>
					</button>
				</div>

				<div className="search-result">
					<Table data={testData} />
				</div>
			</div>
		</div>
	);

	return element;
}

export default PickUpView;

function Table(props) {
	let element;

	element = (
		<table>
			<tr>
				<th>編號</th>
				<th>名稱</th>
				<th>規格</th>
				<th>領取數量</th>
			</tr>
			{props.data.map(d => (
				<DataTr data={d} />
			))}
		</table>
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
