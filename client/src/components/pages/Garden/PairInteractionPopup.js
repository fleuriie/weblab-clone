import React, { useEffect, useState, Component } from "react";

import { get, post } from "../../../utilities.js";
import Avatar from "../Avatar/Avatar.js";
import NewActivityPopup from "./Representation/NewActivityPopup.js";
import RepresentationAvatar from "./Representation/RepresentationAvatar.js";
import { socket } from "../../../client-socket"

// Import React Table
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"
import Collapsible from 'react-collapsible';

import RepresentationChangePopup from "./RepresentationChangePopup.js";

const PairInteractionPopup = (props) => {
	const [userAvatar, setUserAvatar] = useState(undefined);
	const [otherAvatar, setOtherAvatar] = useState(undefined);
	const [representation, setRepresentation] = useState(undefined);
	const [activities, setActivities] = useState([]);
	const [userName, setUserName] = useState(undefined);
	const [otherName, setOtherName] = useState(undefined);

	useEffect(() => {
		get("/api/userprofile", {
			googleID: props.userGoogleID,
		}).then((profile) => {
			setUserName(profile.userName);
			setUserAvatar(<Avatar avatarID={profile.currentAvatarID} width={100} />);
		});
	}, []);

	useEffect(() => {
		get("/api/userprofile", {
			googleID: props.otherGoogleID,
		}).then((profile) => {
			setOtherAvatar(<Avatar avatarID={profile.currentAvatarID} width={100} />);
		});
	}, []);

	const resetRepresentation = () => {
		get("/api/pairprofileone", {
			userGoogleID: props.userGoogleID,
			otherGoogleID: props.otherGoogleID,
		}).then((pairProfile) => {
			setRepresentation(
				<RepresentationAvatar representationID={pairProfile.currentRepresentationID} width={100} />
			);
			setOtherName(pairProfile.pairName);
		});
	};

	useEffect(() => {
		resetRepresentation();
	}, []);

	const setPairActivities = (data) => {
		get("/api/pairactivity", {
			userGoogleID: props.userGoogleID,
			otherGoogleID: props.otherGoogleID,
		}).then((activityList) => {
			setActivities(activityList);
		});
	};

	const newPairProfileUpdate = (data) => {
		resetRepresentation();
	};

	useEffect(() => {
		setPairActivities({});
	}, []);

	useEffect(() => {
		socket.on("newPairProfileUpdate", newPairProfileUpdate);
		return () => {
			socket.off("newPairProfileUpdate", newPairProfileUpdate);
		};
	}, []);

	useEffect(() => {
		socket.on("newPairActivity", setPairActivities);
		return () => {
			socket.off("newPairActivity", setPairActivities);
		};
	}, []);

	return (
		<div>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
				<div>
					{userAvatar}
				</div>
				<div>
					<h1>{userName + " & " + otherName}</h1>
					{representation}
					<Collapsible trigger="Change Avatar">
						<RepresentationChangePopup userGoogleID={props.userGoogleID} otherGoogleID={props.otherGoogleID} />
					</Collapsible>
					{/* to do add something that would add a new activity */}
					<NewActivityPopup userGoogleID={props.userGoogleID} otherGoogleID={props.otherGoogleID} />
					<br />
					<div>
						<ReactTable
							data={activities}
							columns={[
								{
									Header: "Activities <3",
									columns: [
										{
											Header: "Activity Time",
											id: "activitytime",
											accessor: d => d.activityTime
										},
										{
											Header: "Activity Name",
											id: "activityName",
											accessor: d => d.activityName
										}
									]
								},
							]}
							defaultPageSize={20}
							style={{
								height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
							}}
							className="-striped -highlight"
						/>
						<br />
					</div>
				</div>
				<div>
					{otherAvatar}
				</div>
			</div>

		</div>
	);
};

export default PairInteractionPopup;