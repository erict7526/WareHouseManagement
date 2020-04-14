import {
	SET_SEARCH_TEXT,
	SET_LAST_DETAILS,
	ADD_PICKUP_LIST,
	REMOVE_PICKUP_LIST,
	SET_CURRENT_USER,
	ItemStatusFilter,
	SET_ITEM_STATUS_FILTER
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
		case REMOVE_PICKUP_LIST:
			return state.filter(
				lastDetail => lastDetail.no !== action.lastDetailID
			);
		default:
			return state;
	}
}

function setItemStatusFilter(state = ItemStatusFilter.SHOW_ALL, action) {
	switch (action.type) {
		case SET_ITEM_STATUS_FILTER:
			return action.filter;
		default:
			return state;
	}
}

function currentUser(state = {}, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				userName: action.userName,
				userAccount: action.userAccount,
				isLogin: action.isLogin
			};
		default:
			return state;
	}
}

const inventoryManagerStore = combineReducers({
	searchText,
	lastDetails,
	pickupList,
	currentUser,
	setItemStatusFilter
});

export default inventoryManagerStore;
