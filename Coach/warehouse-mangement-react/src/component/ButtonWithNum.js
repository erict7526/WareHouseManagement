import React from "react";
import "./css/ButtonWithNum.css";
import { useHistory } from "react-router-dom";

function ButtonWithNum(props) {
	const data = props.checkedData;
	let element;
	const history = useHistory();

	element = (
		<div className="btn-with-num">
			<button
				onClick={() => {
					history.push("/main/stock_out/print");
				}}
			>
				<i className="fas fa-shopping-basket"></i>
			</button>
			<p>{data.length}</p>
		</div>
	);

	return element;
}

export { ButtonWithNum };
