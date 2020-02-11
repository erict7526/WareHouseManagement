import React, { useState } from "react";
import "./css/Table.css";
import { ButtonWithNum } from "./ButtonWithNum.js";
import { useHistory } from "react-router-dom";

function Table({ itemList, setItemList, ...props }) {
	const data = props.data;
	const [clickedOn, setClickedOn] = useState({});
	const [page, setPage] = useState(0);
	const [rowPerPage, setRowPerPage] = useState(10);
	let dataOnPage = data.slice(
		rowPerPage * page,
		rowPerPage * page + rowPerPage
	);

	let emptyRow = rowPerPage - dataOnPage.length;

	let element;

	element = (
		<div className="Table">
			<table>
				<tbody>
					<tr className="rowHeader">
						<th className="data-code">編號</th>
						<th className="data-name">名稱</th>
						<th className="data-specifcation">規格</th>
						<th className="data-remain-num">剩餘數量</th>
						<th className="data-input">領取數量</th>
					</tr>
					{dataOnPage.map(d => (
						<DataTr
							{...{
								key: d.code,
								data: d,
								itemList,
								setItemList,
								setClickedOn
							}}
						/>
					))}
					{emptyRow > 0 && (
						<tr
							style={{
								height: emptyRow * 49 + 3 + "px"
							}}
						></tr>
					)}
				</tbody>
			</table>
			<TableFooter
				{...{
					page,
					setPage,
					data,
					rowPerPage,
					setRowPerPage
				}}
			/>
		</div>
	);

	return element;
}

function DataTr(props) {
	const data = props.data;
	const itemList = props.itemList;
	const setItemList = props.setItemList;
	const [clickedOn, setClickedOn] = useState({});
	const [inputNum, setInputNum] = useState(0);
	const isInItemList = itemList.find(item => item.thing === data);
	const [tmpInputNum, setTmpInputNum] = useState(0);

	const CHECK_STATE = isInItemList ? isInItemList.checkState : "NOT_CHECKED";

	const handleModify = () => {
		if (
			!Number.isInteger(parseInt(inputNum, 10)) ||
			parseInt(inputNum, 10) === 0
		) {
			setInputNum(0);
			return;
		}

		const itemList_tmp = itemList;
		itemList_tmp[
			itemList.findIndex(item => item.thing === data)
		].num = parseInt(inputNum, 10);
		setItemList(itemList_tmp);
	};

	if (isInItemList && isInItemList.num !== tmpInputNum) {
		setTmpInputNum(isInItemList.num);
		setInputNum(isInItemList.num);
	}

	let element;
	element = (
		<tr
			className={(() => {
				switch (CHECK_STATE) {
					case "STOCK_OUT":
						return "in-stock-out";
					case "STOCK_IN":
						return "in-stock-in";
					default:
						return "rowContent";
				}
			})()}
			onClick={() => {
				setClickedOn(data);
			}}
		>
			<td className="data-code">{data["code"]}</td>
			<td className="data-name">{data["name"]}</td>
			<td className="data-specification">{data["specification"]}</td>
			<td className="data-remain-num">{data["remain_num"]}</td>
			<td
				className="data-input"
				onClick={e => {
					e.stopPropagation();
				}}
			>
				<form
					onSubmit={e => {
						e.preventDefault();
					}}
				>
					<input
						type="text"
						className="input"
						value={inputNum}
						onChange={e => {
							setInputNum(e.target.value);
						}}
						onBlur={() => {
							if (isInItemList) {
								setInputNum(isInItemList.num);
							} else {
								setInputNum(0);
							}
						}}
					/>
					{(() => {
						switch (CHECK_STATE) {
							case "STOCK_IN":
								return (
									<div>
										<button
											className="checkedButton"
											onClick={handleModify}
										>
											<i className="fab fa-rev"></i>
										</button>
										<button className="checkedButton">
											<i className="fas fa-times"></i>
										</button>
									</div>
								);
							case "STOCK_OUT":
								return (
									<div>
										<button
											className="checkedButton"
											onClick={handleModify}
										>
											<i className="fab fa-rev"></i>
										</button>
										<button className="checkedButton">
											<i className="fas fa-times"></i>
										</button>
									</div>
								);
							default:
								return (
									<div>
										<button>
											<i
												className="fas fa-upload"
												onClick={() => {
													if (
														!Number.isInteger(
															parseInt(
																inputNum,
																10
															)
														) ||
														parseInt(
															inputNum,
															10
														) === 0
													) {
														setInputNum(0);
														return;
													}
													const item = {
														thing: data,
														num: parseInt(
															inputNum,
															10
														),
														checkState: "STOCK_OUT"
													};
													setItemList([
														...itemList,
														item
													]);
												}}
											></i>
										</button>
										<button
											onClick={() => {
												if (
													!Number.isInteger(
														parseInt(inputNum, 10)
													) ||
													parseInt(inputNum, 10) === 0
												) {
													setInputNum(0);
													return;
												}
												const item = {
													thing: data,
													num: parseInt(inputNum, 10),
													checkState: "STOCK_IN"
												};
												setItemList([
													...itemList,
													item
												]);
											}}
										>
											<i className="fas fa-download"></i>
										</button>
									</div>
								);
						}
					})()}
				</form>
			</td>
		</tr>
	);

	return element;
}

function TableFooter(props) {
	const [page, setPage] = [props.page, props.setPage];
	const [rowPerPage, setRowPerPage] = [props.rowPerPage, props.setRowPerPage];
	const data = props.data;
	const history = useHistory();
	let element;
	element = (
		<div className="tableFooter">
			<div className="tableFooter-left-area">
				<p>每頁行數：</p>
				<select
					name="row"
					value={rowPerPage}
					onChange={e => {
						setRowPerPage(parseInt(e.target.value));
						setPage(0);
					}}
				>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="15">15</option>
				</select>
			</div>
			<div className="tableFooter-center-area">
				<button
					className="pageBtn"
					onClick={() => {
						if (page > 0) {
							setPage(page - 1);
						}
					}}
				>
					&lt;
				</button>
				<p className="page-num">{page + 1}</p>
				<button
					className="pageBtn"
					onClick={() => {
						if (page < Math.ceil(data.length / rowPerPage) - 1) {
							setPage(page + 1);
						}
					}}
				>
					>
				</button>
			</div>
			<div className="tableFooter-right-area"></div>
		</div>
	);
	return element;
}

export { Table, DataTr };
