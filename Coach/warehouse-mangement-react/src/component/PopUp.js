import React, { useState } from "react";
import "./css/PopUp.css";

function PopUp(props) {
	const hide = props.hide;
	const clickedOn = props.clickedOn;
	const setClickedOn = props.setClickedOn;
	const checkedData = props.checkedData;
	const setCheckedData = props.setCheckedData;
	const [popUpStockOutNum, setPopUpStockOutNum] = useState(0);
	const [tmpValue, setTmpValue] = useState(0);
	const clickOnCheck = checkedData.find(item => item.thing === clickedOn);

	const handleResetToExit = () => {
		setClickedOn({});
		setPopUpStockOutNum(0);
		setTmpValue(0);
	};

	const handleSubmit = () => {
		if (
			!Number.isInteger(parseInt(popUpStockOutNum, 10)) ||
			parseInt(popUpStockOutNum, 10) === 0
		) {
			setPopUpStockOutNum(0);
			setTmpValue(0);
			return;
		}
		const item = {
			thing: clickedOn,
			num: parseInt(popUpStockOutNum, 10)
		};
		if (!clickOnCheck) {
			setCheckedData([...checkedData, item]);
			handleResetToExit();
		} else {
			const checkedData_tmp = checkedData;
			checkedData_tmp[
				checkedData.findIndex(item => item === clickOnCheck)
			].num = parseInt(popUpStockOutNum, 10);
			setCheckedData(checkedData_tmp);
			handleResetToExit();
		}
	};

	if (clickOnCheck && tmpValue !== clickOnCheck.num) {
		setTmpValue(clickOnCheck.num);
		setPopUpStockOutNum(clickOnCheck.num);
	}

	let element;
	element = (
		<div
			className={"block " + (hide ? "hide" : "")}
			onClick={() => {
				handleResetToExit();
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
						handleSubmit();
					}}
				>
					<p>領取數量</p>
					<input
						type="text"
						value={popUpStockOutNum}
						onChange={e => {
							setPopUpStockOutNum(e.target.value);
						}}
						ref={input => {
							input && input.focus();
						}}
					/>
				</form>
				<div className="button">
					<button
						id="cancel-button"
						onClick={e => {
							e.preventDefault();
							handleResetToExit();
						}}
					>
						取消
					</button>
					<button
						onClick={e => {
							e.preventDefault();
							handleSubmit();
						}}
						id="add-on-button"
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
