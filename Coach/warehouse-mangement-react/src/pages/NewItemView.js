// import React, { useState } from "react";
// import "./css/NewItemView.css";

// import { useForm } from "react-hook-form";

// import { makeStyles, withStyles } from "@material-ui/core/styles";

// import Grid from "@material-ui/core/Grid";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";

// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import Typography from "@material-ui/core/Typography";

// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import SaveIcon from "@material-ui/icons/Save";

// const useStyles = makeStyles(() => ({
// 	root: {
// 		background: "#454545",
// 		boxShadow: "0 3px 5px 2px #26262666",
// 		color: "white"
// 	},
// 	flexOne: {
// 		flex: "1"
// 	},
// 	saveButton: {
// 		margin: "0 10px 0 auto",
// 		background: "#faef28",
// 		"&:hover": {
// 			background: "#e8da00"
// 		}
// 	}
// }));

// const StyleTextField = withStyles({
// 	root: {
// 		margin: "0 10px",
// 		"& .MuiOutlinedInput-root": {
// 			color: "white",
// 			"& fieldset": {
// 				border: "1px solid lightgrey"
// 			},
// 			"&:hover fieldset": {
// 				border: "1px solid lightgrey"
// 			},
// 			"&.Mui-focused fieldset": { border: "1px solid lightgrey" }
// 		},
// 		"& .MuiInputLabel-root": {
// 			color: "white"
// 		}
// 	}
// })(TextField);

// function NewItemView(props) {
// 	const classes = useStyles();
// 	const itemList = props.itemList;
// 	const setItemList = props.setItemList;
// 	const { register, handleSubmit, errors, reset } = useForm();

// 	const handleAddNewItem = newItemProps => {
// 		const thing = {
// 			code: `${newItemProps.codeSystem}-${newItemProps.codeEq}-${newItemProps.codeItem}`,
// 			name: newItemProps.name,
// 			remain_num: newItemProps.num,
// 			specification: newItemProps.specification,
// 			unit: newItemProps.unit,
// 			price: newItemProps.price
// 		};
// 		const NewItemTmp = {
// 			thing: thing,
// 			num: newItemProps.num,
// 			checkState: "STOCK_IN"
// 		};
// 		setItemList([...itemList, NewItemTmp]);
// 		reset();
// 	};

// 	let element = (
// 		<Grid container spacing={3} className={classes.root}>
// 			<Grid item xs={12} sm={12} lg={6}>
// 				<List>
// 					<form onSubmit={handleSubmit(handleAddNewItem)}>
// 						<ListItem>
// 							<StyleTextField
// 								name="codeSystem"
// 								variant="outlined"
// 								size="small"
// 								margin="normal"
// 								label="系統編號"
// 								className={classes.flexOne}
// 								inputRef={register({ required: true })}
// 								error={errors.codeSystem ? true : false}
// 								helperText={errors.codeSystem ? "必填" : ""}
// 							/>
// 							-
// 							<StyleTextField
// 								name="codeEq"
// 								variant="outlined"
// 								size="small"
// 								margin="normal"
// 								label="設備編號"
// 								className={classes.flexOne}
// 								inputRef={register({ required: true })}
// 								error={errors.codeEq ? true : false}
// 								helperText={errors.codeEq ? "必填" : ""}
// 							/>
// 							-
// 							<StyleTextField
// 								name="codeItem"
// 								variant="outlined"
// 								size="small"
// 								margin="normal"
// 								label="物料編號"
// 								className={classes.flexOne}
// 								inputRef={register({ required: true })}
// 								error={errors.codeItem ? true : false}
// 								helperText={errors.codeItem ? "必填" : ""}
// 							/>
// 						</ListItem>
// 						<ListItem>
// 							<StyleTextField
// 								name="name"
// 								variant="outlined"
// 								size="small"
// 								margin="normal"
// 								label="名稱"
// 								fullWidth
// 								inputRef={register({ required: true })}
// 								error={errors.name ? true : false}
// 								helperText={errors.name ? "必填" : ""}
// 							/>
// 						</ListItem>
// 						<ListItem>
// 							<StyleTextField
// 								name="num"
// 								variant="outlined"
// 								size="small"
// 								margin="normal"
// 								fullWidth
// 								label="數量"
// 								type="number"
// 								inputRef={register({ required: true, min: 0 })}
// 								error={errors.num ? true : false}
// 								helperText={
// 									errors.num
// 										? errors.num.type === "required"
// 											? "必填"
// 											: "數量必須大於0"
// 										: ""
// 								}
// 							/>
// 							<StyleTextField
// 								name="unit"
// 								variant="outlined"
// 								size="small"
// 								margin="normal"
// 								fullWidth
// 								label="單位"
// 								inputRef={register({ required: true })}
// 								error={errors.unit ? true : false}
// 								helperText={errors.unit ? "必填" : ""}
// 							/>
// 						</ListItem>
// 						<ListItem>
// 							<StyleTextField
// 								name="price"
// 								variant="outlined"
// 								size="small"
// 								margin="normal"
// 								fullWidth
// 								label="單價"
// 								type="number"
// 								inputRef={register({ min: 0 })}
// 								error={errors.price ? true : false}
// 								helperText={errors.price ? "單價不可小於0" : ""}
// 							/>
// 						</ListItem>
// 						<ListItem>
// 							<StyleTextField
// 								name="specification"
// 								variant="outlined"
// 								size="small"
// 								margin="normal"
// 								label="規格"
// 								multiline
// 								fullWidth
// 								rows="3"
// 								rowsMax="5"
// 								inputRef={register({ required: true })}
// 								error={errors.specification ? true : false}
// 								helperText={errors.specification ? "必填" : ""}
// 							/>
// 						</ListItem>
// 						<ListItem>
// 							<Button
// 								variant="contained"
// 								className={classes.saveButton}
// 								startIcon={<SaveIcon />}
// 								size="large"
// 								type="submit"
// 							>
// 								存擋
// 							</Button>
// 						</ListItem>
// 					</form>
// 				</List>
// 			</Grid>
// 			<Grid item xs={12} sm={12} lg={6}>
// 				<ArrayOfExpansionPanel newItemList={itemList} />
// 			</Grid>
// 		</Grid>
// 	);
// 	return element;
// }
// export default NewItemView;

// function ArrayOfExpansionPanel(props) {
// 	const newItemListThing = props.newItemList.filter(
// 		item => item.checkState === "STOCK_IN"
// 	);
// 	const classes = useStyles();
// 	return newItemListThing.map(item => (
// 		<ExpansionPanel className={classes.root} key={item.thing.code}>
// 			<ExpansionPanelSummary
// 				expandIcon={<ExpandMoreIcon />}
// 				aria-controls="panel1a-content"
// 				id="panel1a-header"
// 			>
// 				<Typography>
// 					{item.thing.name} {item.num}
// 				</Typography>
// 			</ExpansionPanelSummary>
// 			<ExpansionPanelDetails>
// 				<Typography>
// 					{item.thing.code} <br />
// 					{item.thing.specification} <br />
// 					{item.thing.price}
// 				</Typography>
// 			</ExpansionPanelDetails>
// 		</ExpansionPanel>
// 	));
// }
