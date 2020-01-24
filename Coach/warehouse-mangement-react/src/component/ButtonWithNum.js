import React from "react";
import "./css/ButtonWithNum.css";

function ButtonWithNum(props) {
	const datas = props.datas;
	let element;

	element = (
		<div className="btn-with-num">
			<button>
				<i className="fas fa-shopping-basket"></i>
			</button>
			<p>{datas.length}</p>
		</div>
	);

	return element;
}

export { ButtonWithNum };
