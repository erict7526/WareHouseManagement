import React, { useState } from "react";
import "./PickUpView.css";
import react_logo from "./react-logo.png";

function PickUpView(props) {
	let element;

	element = (
		<div className="pick-up-view-wrapper">
			<div className="search-center-area">
				<div className="search-bar">
					<input type="text" placeholder="Search" />
					<button>Search</button>
				</div>

				<div className="search-result">
					<table>
						<tr>
							<th>編號</th>
							<th>名稱</th>
							<th>規格</th>
						</tr>
						<tr>
							<td>1303-1621</td>
							<td>測試</td>
							<td>測試</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	);

	return element;
}

export default PickUpView;
