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
	const [search_text, setSearchText] = useState("");

	element = (
		<div className="pick-up-view-wrapper">
			<div className="search-center-area">
				<div className="search-bar">
					<form
						onSubmit={e => {
							e.preventDefault();
							console.log(search_text);
						}}
					>
						<input
							type="text"
							placeholder="Search"
							value={search_text}
							onChange={e => {
								setSearchText(e.target.value);
							}}
						/>
						<button>
							<i className="fas fa-search"></i>
						</button>
					</form>
				</div>

				<div className="search-result">
					<Table datas={testData} />
				</div>
			</div>
		</div>
	);

	return element;
}

export default PickUpView;

function Table(props) {
	const datas = props.datas;
	let element;

	element = (
		<table>
			<tbody>
				<tr>
					<th>編號</th>
					<th>名稱</th>
					<th>規格</th>
					<th>領取數量</th>
				</tr>
				{datas.map((d, index) => (
					<DataTr key={index} data={d} />
				))}
			</tbody>
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
