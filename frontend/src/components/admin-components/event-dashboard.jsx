import React from "react";
import { Typography, Input, DatePicker, Button, Row, Col } from "antd";
import "antd/dist/antd.css";

const { Title } = Typography;

const PostEvent = () => {
	return (
		<>
			<Row>
				<Title style={{ float: "left", color: "#878787" }} level={3}>
					Event
				</Title>
			</Row>
			<Row>
				<Col span={16}>
					<Input style={{ borderRadius: 20 }} />
				</Col>
				<Col span={5}>
					<DatePicker style={{ borderRadius: 20 }} />
				</Col>
				<Col span={2}>
					<Button type="primary" shape="round">
						Post
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default PostEvent;
