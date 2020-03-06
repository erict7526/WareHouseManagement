import React, { useState } from "react";
import "./css/NewItemView.css";

import { makeStyles, withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles(theme => ({
	root: {
		background: "#454545",
		boxShadow: "0 3px 5px 2px #26262666",
		color: "white"
	},
	flexOne: {
		flex: "1"
	},
	saveButton: {
		margin: "0 10px 0 auto",
		background: "#faef28",
		"&:hover": {
			background: "#e8da00"
		}
	}
}));

const StyleTextField = withStyles({
	root: {
		margin: "0 10px",
		"& .MuiOutlinedInput-root": {
			color: "white",
			"& fieldset": {
				border: "1px solid lightgrey"
			},
			"&:hover fieldset": {
				border: "1px solid lightgrey"
			},
			"&.Mui-focused fieldset": { border: "1px solid lightgrey" }
		},
		"& .MuiInputLabel-root": {
			color: "white"
		}
	}
})(TextField);

function NewItemView(props) {
	const classes = useStyles();
	const itemList = props.itemList;
	const setItemList = props.setItemList;
	const newItemList = itemList.filter(item => item.checkState === "STOCK_IN");
	const [newItemProps, setNewItemProps] = useState({
		codeSystem: "",
		codeEq: "",
		codeItem: "",
		name: "",
		unit: "",
		num: 0,
		price: 0,
		specification: ""
	});

	const handleChange = prop => event => {
		setNewItemProps({ ...newItemProps, [prop]: event.target.value });
	};

	const handleAddNewItem = () => {
		const thing = {
			code: `${newItemProps.codeSystem}-${newItemProps.codeEq}-${newItemProps.codeItem}`,
			name: newItemProps.name,
			remain_num: newItemProps.num,
			specification: newItemProps.specification,
			unit: newItemProps.unit,
			price: newItemProps.price
		};
		const NewItemTmp = {
			thing: thing,
			num: newItemProps.num,
			checkState: "STOCK_IN"
		};
		setItemList([...itemList, NewItemTmp]);
		setNewItemProps({
			codeSystem: "",
			codeEq: "",
			codeItem: "",
			name: "",
			unit: "",
			num: 0,
			price: 0,
			specification: ""
		});
	};

	let element = (
		<Grid container spacing={3} className={classes.root}>
			<Grid item xs={12} sm={12} lg={6}>
				<List>
					<ListItem>
						<StyleTextField
							variant="outlined"
							size="small"
							margin="normal"
							label="系統編號"
							value={newItemProps.codeSystem}
							onChange={handleChange("codeSystem")}
							className={classes.flexOne}
							autoComplete
						/>
						-
						<StyleTextField
							variant="outlined"
							size="small"
							margin="normal"
							label="設備編號"
							value={newItemProps.codeEq}
							onChange={handleChange("codeEq")}
							className={classes.flexOne}
							autoComplete
						/>
						-
						<StyleTextField
							variant="outlined"
							size="small"
							margin="normal"
							label="物料編號"
							value={newItemProps.codeItem}
							onChange={handleChange("codeItem")}
							className={classes.flexOne}
							autoComplete
						/>
					</ListItem>
					<ListItem>
						<StyleTextField
							variant="outlined"
							size="small"
							margin="normal"
							label="名稱"
							fullWidth
							value={newItemProps.name}
							onChange={handleChange("name")}
						/>
					</ListItem>
					<ListItem>
						<StyleTextField
							variant="outlined"
							size="small"
							margin="normal"
							fullWidth
							label="數量"
							value={newItemProps.num}
							onChange={handleChange("num")}
						/>
						<StyleTextField
							variant="outlined"
							size="small"
							margin="normal"
							fullWidth
							label="單位"
							value={newItemProps.unit}
							onChange={handleChange("unit")}
						/>
					</ListItem>
					<ListItem>
						<StyleTextField
							variant="outlined"
							size="small"
							margin="normal"
							fullWidth
							label="單價"
							value={newItemProps.price}
							onChange={handleChange("price")}
						/>
					</ListItem>
					<ListItem>
						<StyleTextField
							variant="outlined"
							size="small"
							margin="normal"
							label="規格"
							multiline
							fullWidth
							rows="3"
							rowsMax="5"
							value={newItemProps.specification}
							onChange={handleChange("specification")}
						/>
					</ListItem>
					<ListItem>
						<Button
							variant="contained"
							className={classes.saveButton}
							startIcon={<SaveIcon />}
							size="large"
							onClick={handleAddNewItem}
						>
							存擋
						</Button>
					</ListItem>
				</List>
			</Grid>
			<Grid item xs={12} sm={12} lg={6}>
				<ArrayOfExpansionPanel newItemList={itemList} />
			</Grid>
		</Grid>
	);
	return element;
}
export default NewItemView;

function ArrayOfExpansionPanel(props) {
	const newItemListThing = props.newItemList.filter(
		item => item.checkState === "STOCK_IN"
	);
	const classes = useStyles();
	return newItemListThing.map(item => (
		<ExpansionPanel className={classes.root} key={item.thing.code}>
			<ExpansionPanelSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography>
					{item.thing.name} {item.num}
				</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Typography>
					{item.thing.code} <br />
					{item.thing.specification} <br />
					{item.thing.price}
				</Typography>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	));
}
