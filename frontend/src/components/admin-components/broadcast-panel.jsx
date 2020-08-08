import React from "react";
import { useCookies } from "react-cookie";
import { Badge, Typography } from "antd";
import "antd/dist/antd.css";
import "../employee-components/broadcast.css";
import BroadcastMsg from "../employee-components/broadcast-msg";
import { connect } from "react-redux";

const { Title } = Typography;

const BroadcastPanel = (props) => {
	const [cookies] = useCookies("session");

	return (
		<>
			<div className="broadcast-panel-header">
				<Badge count={props.broadcasts.length}>
					<Title level={3}>Broadcasts</Title>
				</Badge>
			</div>

			<div className="broadcast-panel-body" style={{ height: "75vh" }}>
				{props.broadcasts.map((msg) => (
					<BroadcastMsg
						key={msg._id}
						type={msg.type}
						msg={msg.msg}
						eventDate={new Date(msg.eventDate * 1000).toLocaleDateString(
							"en-US"
						)}
						date={new Date(msg.date * 1000).toLocaleDateString("en-US")}
					/>
				))}
			</div>
		</>
	);
};

const mapStateToProps = (state, ownProps) => ({ broadcasts: state.broadcasts });

export default connect(mapStateToProps)(BroadcastPanel);
