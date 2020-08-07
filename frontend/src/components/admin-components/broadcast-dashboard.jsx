import React from "react";
import { Typography, Input, Button, Row, Col } from "antd";
import "antd/dist/antd.css";

const { Title } = Typography;

const PostBroadcast = () => {
	return (
		<>
			<Row>
				<Title style={{ float: "left", color: "#878787" }} level={3}>
					Broadcast
				</Title>
			</Row>
			<Row>
				<Col span={19}>
					<Input style={{ borderRadius: 20 }} />
				</Col>
				<Col offset={1} span={4}>
					<Button type="primary" shape="round" style={{ float: "right" }}>
						Post
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default PostBroadcast;
