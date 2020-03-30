import React from "react";
import { connect } from "react-redux";
import { setSearchText } from "../actions";

function SearchTextInput({ searchText, setSearchText }) {
	return <input type="text" value={searchText} onChange={setSearchText} />;
}

const mapStateToProps = state => {
	return {
		searchText: state.searchText
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setSearchText: e => dispatch(setSearchText(e.target.value))
	};
};

const VisibleSearchTextInput = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchTextInput);

export default VisibleSearchTextInput;
