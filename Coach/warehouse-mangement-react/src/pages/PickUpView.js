import React, { useState } from "react";
import "../css/PickUpView.css";
import { Table } from "../component/Table.js";

const testData = Array(100)
	.fill(0)
	.map((_, i) => fakeData(i));

function fakeData(id) {
	let name = `test_name_${id}`;
	let specification = `test_specification_${id}`;
	let number = String(id);
	return { number, name, specification };
}

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
