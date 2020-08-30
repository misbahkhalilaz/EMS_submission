import React, { useState } from "react";
import { Typography, Input, DatePicker, Button, Row, Col, message } from "antd";
import "antd/dist/antd.css";
import { socket } from "../../containers/App";

const { Title } = Typography;

const PostEvent = () => {
	const [input, setInput] = useState("");
	const [date, setDate] = useState();

	return (
		<>
			<Row>
				<Title style={{ float: "left", color: "#878787" }} level={3}>
					Event
				</Title>
			</Row>
			<Row>
				<Col span={16}>
					<Input
						style={{ borderRadius: 20 }}
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
				</Col>
				<Col span={5}>
					<DatePicker
						style={{ borderRadius: 20 }}
						onChange={(e) => {
							if (e)
								setDate(
									parseInt(new Date(e.toDate()).getTime() / 1000 /*+ 5 * 3600*/)
								);
						}}
					/>
				</Col>
				<Col span={2}>
					<Button
						type="primary"
						shape="round"
						onClick={(e) => {
							if (
								[input, date].includes("") ||
								[input, date].includes(undefined)
							) {
								message.warn("Enter Event message and select data");
							} else
								socket.emit(
									"broadcast",
									JSON.stringify({
										type: "event",
										msg: input,
										date: parseInt(
											new Date(Date.now()).getTime() / 1000 + 5 * 3600
										),
										eventDate: date,
									})
								);
						}}
					>
						Post
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default PostEvent;
