import React, { useState } from "react";
import { Typography, Input, Button, Row, Col, message } from "antd";
import "antd/dist/antd.css";
import { socket } from "../../containers/App";

const { Title } = Typography;

const PostBroadcast = () => {
	const [input, setInput] = useState("");

	return (
		<>
			<Row>
				<Title style={{ float: "left", color: "#878787" }} level={3}>
					Broadcast
				</Title>
			</Row>
			<Row>
				<Col span={19}>
					<Input
						style={{ borderRadius: 20 }}
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
				</Col>
				<Col offset={1} span={4}>
					<Button
						type="primary"
						shape="round"
						style={{ float: "right" }}
						onClick={() => {
							if (input.length > 0)
								socket.emit(
									"broadcast",
									JSON.stringify({
										type: "Broadcast",
										msg: input,
										date: parseInt(
											new Date(Date.now()).getTime() / 1000 + 5 * 3600
										),
									})
								);
							else message.warn("Enter Broadcast");
						}}
					>
						Post
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default PostBroadcast;
