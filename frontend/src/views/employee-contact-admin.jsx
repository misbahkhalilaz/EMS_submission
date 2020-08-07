import React from "react";
import "antd/dist/antd.css";
import { Row, Col, Typography, List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

const EmployeeContactTab = () => {
	const data = [
		{
			adminName: "Admin 1",
			designation: "Designation",
		},
		{
			adminName: "Admin 2",
			designation: "Designation",
		},
		{
			adminName: "Admin 3",
			designation: "Designation",
		},
		{
			adminName: "Admin 4",
			designation: "Designation",
		},
	];

	return (
		<>
			<Row
				style={{
					margin: 30,
					height: "80%",
					backgroundColor: "#f2f2f0",
					borderRadius: 20,
				}}
				justify="space-around"
			>
				<Col span={7} className="col-display">
					<Title style={{ float: "left", color: "#878787" }} level={3}>
						{" "}
						Admin List
					</Title>
					<br />
					<br />
					<List
						itemLayout="horizontal"
						dataSource={data}
						renderItem={(item) => (
							<List.Item>
								<List.Item.Meta
									avatar={<Avatar size="large" icon={<UserOutlined />} />}
									title={<a>{item.adminName}</a>}
									description={item.designation}
								/>
							</List.Item>
						)}
					/>
				</Col>
				<Col span={17} className="col-display">
					<div
						style={{
							backgroundColor: "white",
							height: "100%",
							borderRadius: 20,
						}}
					>
						<Title style={{ textAlign: "center", color: "#878787" }} level={3}>
							Chat
						</Title>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default EmployeeContactTab;
