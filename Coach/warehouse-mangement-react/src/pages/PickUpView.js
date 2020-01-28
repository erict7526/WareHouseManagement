import React, { useState } from "react";
import "../css/PickUpView.css";
import { Table } from "../component/Table.js";
import PopUp from "../component/PopUp.js";

const testData = Array(21)
	.fill(0)
	.map((_, i) => fakeData(i));

function fakeData(id) {
	let name = `test_name_${id}`;
	let specification = `test_specification_${id}`;
	let code = `${String(id).padStart(4, 0)}-${String(id).padStart(4, 0)}`;
	let remain_num = id;
	return { code, name, specification, remain_num };
}

function PickUpView(props) {
	let element;
	const [search_text, setSearchText] = useState("");
	const [checkedData, setCheckedData] = useState([]);
	const [clickedOn, setClickedOn] = useState({});

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
					<Table
						{...{
							data: testData,
							checkedData,
							setCheckedData,
							setClickedOn
						}}
					/>
				</div>
			</div>
			<PopUp
				hide={Object.keys(clickedOn).length === 0}
				{...{ checkedData, setCheckedData, setClickedOn, clickedOn }}
			/>
		</div>
	);

	return element;
}

export default PickUpView;
