import React, { useState } from "react";
import "./css/NewItemView.css";

function NewItemView(props) {
	const itemList = props.itemList;
	const setItemList = props.setItemList;

	let element = (
		<div className="Table">
			<table>
				<tbody>
					<tr>
						<td className="flex-center">
							<input type="text" placeholder="系統編號" />
							<p>-</p>
							<input type="text" placeholder="物料編號" />
						</td>
						<td>
							<input type="text" placeholder="物料名稱" />
						</td>
						<td>
							<textarea
								name=""
								id=""
								cols="20"
								rows="3"
							></textarea>
						</td>
						<td>
							<input type="text" placeholder="單位" />
						</td>
						<td>
							<input type="text" placeholder="數量" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
	return element;
}
export default NewItemView;
