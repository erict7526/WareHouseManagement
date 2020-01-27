import React, { useState } from "react";
import "./css/PopUp.css";

function PopUp(props) {
	const hide = props.hide;
	const clickedOn = props.data;
	const setClickedOn = props.setClickedOn;
	const checkedData = props.checkedData;
	let element;
	element = (
		<div
			className={"block " + (hide ? "hide" : "")}
			onClick={() => {
				setClickedOn({});
			}}
		>
			<div
				className={"pop-up " + (hide ? "hide" : "")}
				onClick={e => {
					e.stopPropagation();
				}}
			>
				<p>
					{checkedData.length !== 0
						? checkedData[checkedData.length - 1].thing.code
						: ""}
				</p>
				<button>測試</button>
				<button>測試</button>
			</div>
		</div>
	);
	return element;
}
export default PopUp;
