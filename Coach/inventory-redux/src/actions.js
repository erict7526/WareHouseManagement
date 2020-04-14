export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
export function setSearchText(searchText) {
	return { type: SET_SEARCH_TEXT, searchText };
}

export const SET_LAST_DETAILS = "SET_LAST_DETAILS";
export function setLastDetails(lastDetails, lastDetailsSearchOn) {
	return { type: SET_LAST_DETAILS, lastDetails, lastDetailsSearchOn };
}

/* Pickup List Item Status */

export const ItemStatusFilter = {
	STOCK_IN: "STOCK_IN",
	STOCK_OUT: "STOCK_OUT",
	NEW_ITEM: "NEW_ITEM",
	SHOW_ALL: "SHOW_ALL"
};

export const SET_ITEM_STATUS_FILTER = "SET_ITEM_STATUS_FILTER";

export function setItemStatusFilter(filter) {
	return { type: SET_ITEM_STATUS_FILTER, filter };
}

/* Pickup List Actions */

export const ADD_PICKUP_LIST = "ADD_PICKUP_LIST";
export function addPickupList(lastDetail, amount, status) {
	return { type: addPickupList, lastDetail, amount, status };
}

export const REMOVE_PICKUP_LIST = "REMOVE_PICKUP_LIST";
export function removePickupList(lastDetailID) {
	return { type: addPickupList, lastDetailID };
}

/* User Actions */

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export function setCurrentUser(userName, userAccount, isLogin) {
	return { type: SET_CURRENT_USER, userAccount, isLogin };
}
