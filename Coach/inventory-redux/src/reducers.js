import {
	SET_SEARCH_TEXT,
	SET_LAST_DETAILS,
	ADD_PICKUP_LIST,
	REMOVE_PICK_LIST
} from "./actions";
import { combineReducers } from "redux";

function searchText(state = "", action) {
	switch (action.type) {
		case SET_SEARCH_TEXT:
			return action.searchText;
		default:
			return state;
	}
}

function lastDetails(state = {}, action) {
	switch (action.type) {
		case SET_LAST_DETAILS:
			return {
				lastDetails: action.lastDetails,
				lastDetailsSearchOn: action.lastDetailsSearchOn
			};
		default:
			return state;
	}
}

function pickupList(state = [], action) {
	switch (action.type) {
		case ADD_PICKUP_LIST:
			return [
				...state,
				{
					lastDetail: action.lastDetail,
					amount: action.amount,
					status: action.status
				}
			];
		case REMOVE_PICK_LIST:
			return state.filter(
				lastDetail => lastDetail.no !== action.lastDetailID
			);
		default:
			return state;
	}
}

const inventoryManagerStore = combineReducers({
	searchText,
	lastDetails,
	pickupList
});

export default inventoryManagerStore;