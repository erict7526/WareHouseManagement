import React, { useState } from "react";
import "./css/PopUp.css";
import { useHistory } from "react-router-dom";

function PopUp(props) {
	const itemList = props.itemList;
	const setItemList = props.setItemList;
	const history = useHistory();
	const clickedOn = history.location.state.thing
		? history.location.state.thing
		: null;
	const [popUpStockOutNum, setPopUpStockOutNum] = useState(0);
	const [tmpValue, setTmpValue] = useState(0);
	const isClickOnCheck = itemList.find(item => item.thing === clickedOn);

	const handleResetToExit = () => {
		setPopUpStockOutNum(0);
		setTmpValue(0);
		history.replace(history.location.state.from);
	};

	const handleSubmit = action => {
		if (
			!Number.isInteger(parseInt(popUpStockOutNum, 10)) ||
			parseInt(popUpStockOutNum, 10) === 0
		) {
			setPopUpStockOutNum(0);
			setTmpValue(0);
			return;
		}
		switch (action) {
			case "modify":
				const itemList_tmp = itemList;
				itemList_tmp[
					itemList.findIndex(item => item.thing === clickedOn)
				].num = parseInt(popUpStockOutNum, 10);
				setItemList(itemList_tmp);
				break;
			case "STOCK_IN":
			case "STOCK_OUT":
				const item = {
					thing: clickedOn,
					num: parseInt(popUpStockOutNum, 10),
					checkState: action
				};
				setItemList([...itemList, item]);
				break;
			case "remove":
				itemList.splice(
					itemList.findIndex(item => item.thing === clickedOn),
					1
				);
				setItemList(itemList);
				break;
			default:
				alert("Some thing wrong!");
		}
		handleResetToExit();
	};

	if (isClickOnCheck && tmpValue !== isClickOnCheck.num) {
		setTmpValue(isClickOnCheck.num);
		setPopUpStockOutNum(isClickOnCheck.num);
	}

	let element;
	element = (
		<div
			className="block "
			onClick={() => {
				handleResetToExit();
			}}
		>
			<div
				className="pop-up "
				onClick={e => {
					e.stopPropagation();
				}}
			>
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
				<form
					onSubmit={e => {
						e.preventDefault();
						//handleSubmit();
					}}
				>
					<p>數量</p>
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
					{isClickOnCheck ? (
						<React.Fragment>
							<button
								onClick={e => {
									e.preventDefault();
									handleSubmit("remove");
								}}
								id="add-on-button"
							>
								刪除
							</button>
							<button
								onClick={e => {
									e.preventDefault();
									handleSubmit("modify");
								}}
								id="add-on-button"
							>
								修改
							</button>
						</React.Fragment>
					) : (
						<React.Fragment>
							<button
								onClick={e => {
									e.preventDefault();
									handleSubmit("STOCK_IN");
								}}
								id="add-on-button"
							>
								入料
							</button>
							<button
								onClick={e => {
									e.preventDefault();
									handleSubmit("STOCK_OUT");
								}}
								id="add-on-button"
							>
								領料
							</button>
						</React.Fragment>
					)}
				</div>
			</div>
		</div>
	);
	return element;
}
export default PopUp;
