import React, { useEffect, useState, Component } from "react";

import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { Button, DatePicker, Input } from 'antd';
import 'antd/dist/antd.css';
import 'react-popup-alert/dist/index.css'
import { post, get } from "../../../../utilities.js";
import Alert from 'react-popup-alert';

import { EXPERIENCE_PER_ACTIVITY, CURRENCY_PER_LEVEL, formatTime } from "../../../constants/constants.js";

const NewActivityPopup = (props) => {
	const { handleSubmit, control } = useForm();


	const [errorAlert, setErrorAlert] = React.useState({
		type: 'error',
		text: 'This is a error message.',
		show: false,
	});

	const [successAlert, setSuccessAlert] = React.useState({
		type: "success",
		text: "This is a success message.",
		show: false,
	});

	function onCloseErrorAlert() {
		setErrorAlert({
			type: '',
			text: '',
			show: false
		})
	}

	function onShowErrorAlert(type, text) {
		setErrorAlert({
			type: type,
			text: text,
			show: true
		})
	}

	function onCloseSuccessAlert() {
		setSuccessAlert({
			type: '',
			text: '',
			show: false
		})
	}

	function onShowSuccessAlert(type, text) {
		setSuccessAlert({
			type: type,
			text: text,
			show: true
		})
	}

	const isEmpty = (data) => {
		if (data === undefined || String(data).length === 0) {
			return true;
		} else {
			return false;
		}
	};

	const onSubmit = (data, e) => {
		const activityTime = new Date(data.activityTime);
		const activityName = data.activityName;
		if (isEmpty(data.activityTime) || isEmpty(data.activityName)) {
			onShowErrorAlert("invalidSubmission", "Either the date or the activity description was empty.\n");
		} else {
			post("/api/pairactivity", {
				userGoogleID: props.userGoogleID,
				otherGoogleID: props.otherGoogleID,
				activityName: activityName,
				activityTime: activityTime,
			}).then((data) => {
				console.log(data);
			});
			get("/api/userprofile", {
				googleID: props.userGoogleID,
			}).then((profile) => {
				post("/api/userprofileupdate", {
					userProfile: {
						googleID: props.userGoogleID,
					},
					update: {
						currency: profile.currency + CURRENCY_PER_LEVEL,
					},
				});
			});
			get("/api/pairprofileone", {
				userGoogleID: props.userGoogleID,
				otherGoogleID: props.otherGoogleID,
			}).then((profile) => {
				post("/api/pairprofileupdate", {
					pairProfile: {
						userGoogleID: props.userGoogleID,
						otherGoogleID: props.otherGoogleID,
					},
					update: {
						totalExperience: profile.totalExperience + EXPERIENCE_PER_ACTIVITY,
					},
				});
			});
			onShowSuccessAlert("validSubmission", "You have succecssfully added an activity!");
		}
	};

	const onError = (errors, e) => {
		console.log(errors, e);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<div>
					<h4>Enter new activities!</h4>
				</div>
				<Controller
					control={control}
					name="activityTime"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<DatePicker placeholder="select date" onChange={onChange}
							onBlur={onBlur}
							selected={value} />
					)}
				/>
				<Controller
					control={control}
					name="activityName"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="activity description" style={{ width: 400 }}
							onChange={onChange}
							onBlur={onBlur}
							selected={value} />
					)}
				/>
				<input type="submit" />
			</form>
			<Alert
				header={'Error in submission'}
				btnText={'Close'}
				text={errorAlert.text}
				type={errorAlert.type}
				show={errorAlert.show}
				onClosePress={onCloseErrorAlert}
				pressCloseOnOutsideClick={true}
				showBorderBottom={true}
				alertStyles={{}}
				headerStyles={{}}
				textStyles={{}}
				buttonStyles={{}}
			/>
			<Alert
				header={'Success!'}
				btnText={'Close'}
				text={successAlert.text}
				type={successAlert.type}
				show={successAlert.show}
				onClosePress={onCloseSuccessAlert}
				pressCloseOnOutsideClick={true}
				showBorderBottom={true}
				alertStyles={{}}
				headerStyles={{}}
				textStyles={{}}
				buttonStyles={{}}
			/>
		</div>

	);
}

export default NewActivityPopup;