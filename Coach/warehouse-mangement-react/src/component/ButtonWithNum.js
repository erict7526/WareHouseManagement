import React from "react";
import "./css/ButtonWithNum.css";

function ButtonWithNum(props) {
	const data = props.checkedData;
	let element;

	element = (
		<div className="btn-with-num">
			<button>
				<i className="fas fa-shopping-basket"></i>
			</button>
			<p>{data.length}</p>
		</div>
	);

	return element;
}

export { ButtonWithNum };
