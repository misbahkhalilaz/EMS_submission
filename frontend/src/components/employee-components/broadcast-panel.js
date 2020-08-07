import React from "react";
import { Badge, Typography } from "antd";
import "./broadcast.css";
import BroadcastMsg from "./broadcast-msg";

const { Title } = Typography;

const BroadcastPanel = (props) => {
	return (
		<>
			<div className="broadcast-panel-header">
				<Badge count={props.Msgs.length}>
					<Title level={3}>Broadcast</Title>
				</Badge>
			</div>

			<div className="broadcast-panel-body">
				{props.Msgs.map((msg) => (
					<BroadcastMsg
						key={msg.eventDate}
						type={msg.type}
						msg={msg.msg}
						eventDate={msg.eventDate}
					/>
				))}
			</div>
		</>
	);
};

export default BroadcastPanel;
