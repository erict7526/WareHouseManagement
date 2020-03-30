export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
export function setSearchText(searchText) {
	return { type: SET_SEARCH_TEXT, searchText };
}

export const SET_LAST_DETAILS = "SET_LAST_DETAILS";
export function setLastDetails(lastDetails, lastDetailsSearchOn) {
	return { type: SET_LAST_DETAILS, lastDetails, lastDetailsSearchOn };
}

export const ADD_PICKUP_LIST = "ADD_PICKUP_LIST";
export function addPickupList(lastDetail, amount, status) {
	return { type: addPickupList, lastDetail, amount, status };
}

export const REMOVE_PICKUP_LIST = "REMOVE_PICKUP_LIST";
export function removePickupList(lastDetailID) {
	return { type: addPickupList, lastDetailID };
}
