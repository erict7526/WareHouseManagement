import React, { useState } from "react";
import "./css/PopUp.css";

function PopUp(props) {
	const hide = props.hide;
	const clickedOn = props.clickedOn;
	const setClickedOn = props.setClickedOn;
	const checkedData = props.checkedData;
	const setCheckedData = props.setCheckedData;
	const [popUpStockOutNum, setPopUpStockOutNum] = useState(0);

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
				{hide ? (
					<div></div>
				) : (
					<table>
						<tbody>
							<tr>
								<th>編號</th>
								<th>名稱</th>
								<th>規格</th>
								<th>剩餘數量</th>
							</tr>
							<tr>
								<td>{clickedOn.code}</td>
								<td>{clickedOn.name}</td>
								<td>{clickedOn.specification}</td>
								<td>{clickedOn.remain_num}</td>
							</tr>
						</tbody>
					</table>
				)}
				<form
					onSubmit={e => {
						e.preventDefault();
						console.log("form trigger");
						if (!Number.isInteger(parseInt(popUpStockOutNum, 10))) {
							setPopUpStockOutNum(0);
							return;
						}
						const item = {
							thing: clickedOn,
							num: parseInt(popUpStockOutNum, 10)
						};
						if (popUpStockOutNum !== 0) {
							setCheckedData([...checkedData, item]);
							setClickedOn({});
							setPopUpStockOutNum(0);
						}
					}}
				>
					<p>領取數量</p>
					<input
						type="text"
						value={popUpStockOutNum}
						onChange={e => {
							setPopUpStockOutNum(e.target.value);
						}}
					/>
				</form>
				<div className="button">
					<button
						className="cancel-button"
						onClick={e => {
							e.preventDefault();
							console.log("cancel button trigger");
							setClickedOn({});
							setPopUpStockOutNum(0);
						}}
					>
						取消
					</button>
					<button
						onClick={e => {
							e.preventDefault();
							console.log("form trigger");
							if (
								!Number.isInteger(
									parseInt(popUpStockOutNum, 10)
								)
							) {
								setPopUpStockOutNum(0);
								return;
							}
							const item = {
								thing: clickedOn,
								num: parseInt(popUpStockOutNum, 10)
							};
							if (popUpStockOutNum !== 0) {
								setCheckedData([...checkedData, item]);
								setClickedOn({});
								setPopUpStockOutNum(0);
							}
						}}
					>
						加入
					</button>
				</div>
			</div>
		</div>
	);
	return element;
}
export default PopUp;

function handleAddon(e) {}
