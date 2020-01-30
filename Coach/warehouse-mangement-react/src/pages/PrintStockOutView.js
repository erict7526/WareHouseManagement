import React, { useState } from "react";
import { Table } from "../component/Table.js";
import "../css/PrintStockOutView.css";

function PrintStockOutView(props) {
	const checkedData = props.checkedData;
	const setCheckedData = props.setCheckedData;
	const setClickedOn = props.setClickedOn;

	let element = (
		<div className="print-stock-out">
			<Table
				{...{
					data: checkedData.map(item => item.thing),
					checkedData,
					setCheckedData,
					setClickedOn
				}}
			/>
		</div>
	);
	return element;
}

export default PrintStockOutView;
