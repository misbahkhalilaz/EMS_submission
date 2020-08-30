import React from "react";
import { Comment, Tooltip, Badge, Modal } from "antd";
import "./broadcast.css";
import { NotificationTwoTone, ScheduleTwoTone } from "@ant-design/icons";

function BroadcastMsg(props) {
	//props -> eventdate, msg, type, maybe createdate
	const type = props.type;
	var icon, showEvenDate;

	if (type === "Broadcast") {
		icon = <NotificationTwoTone style={{ marginTop: 5, fontSize: 30 }} />;
	} else {
		icon = <ScheduleTwoTone style={{ marginTop: 15, fontSize: 30 }} />;
		showEvenDate = [
			<Tooltip title="Event Date">
				<Badge color="blue" text={props.eventDate} />
			</Tooltip>,
		];
	}

	const config = {
		maskClosable: true,
		title: props.type,
		content: (
			<>
				<p>{props.msg}</p>
			</>
		),
		okText: "Got it !",
	};

	return (
		<>
			<Comment
				className="hovernow"
				actions={showEvenDate}
				avatar={icon}
				content={<span className="broadcast-msg">{props.msg}</span>}
				datetime={
					<Tooltip title="Created time">
						{props.date}
						{/* <span>{moment().subtract(1, "days").fromNow()}</span> */}
					</Tooltip>
				}
				onClick={() => {
					Modal.info(config);
				}}
			/>
		</>
	);
}

export default BroadcastMsg;
