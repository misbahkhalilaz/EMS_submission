import React, { useState, useEffect } from "react";
import {
	Row,
	Col,
	Typography,
	Radio,
	Menu,
	Dropdown,
	Space,
	Button,
	Table,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import moment from "moment";

const { Title } = Typography;

const AdminProject = (props) => {
	const [projects, setProjects] = useState();
	const [radio, setRadio] = useState("all");

	let data = props.projects.map((proj) =>
		Object.assign({}, proj, {
			total_members: proj.other_members.length,
			status:
				proj.completed === true
					? "Completed"
					: parseInt((new Date(Date.now()).getTime() / 1000).toFixed(0)) <
					  proj.deadline
					? "Active"
					: "delayed",
			posted_date1: new Date(proj.posted_date * 1000).toLocaleDateString(
				"en-US"
			),
			deadline1: new Date(proj.deadline * 1000).toLocaleDateString("en-US"),
		})
	);

	data = data.map((proj) =>
		Object.assign({}, proj, {
			progress:
				proj.status === "Completed"
					? "100%"
					: proj.tasks.length > 0
					? (proj.tasks.filter((task) => task.completed === true).length /
							proj.tasks.length) *
							100 +
					  "%"
					: "0%",
		})
	);

	useEffect(() => {
		setProjects(data);
	}, []);
	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "_id",
		},
		{
			title: "Date Created",
			dataIndex: "posted_date1",
			key: "_id",
		},
		{
			title: "Deadline",
			dataIndex: "deadline1",
			key: "_id",
		},
		{
			title: "Leading Member",
			dataIndex: "leading_member",
			key: "_id",
		},
		{
			title: "Total Members",
			dataIndex: "total_members",
			key: "_id",
		},

		{
			title: "Status",
			dataIndex: "status",
			key: "_id",
		},
		{
			title: "Progress",
			dataIndex: "progress",
			key: "_id",
		},
	];

	return (
		<Row style={{ padding: "30px 20px" }}>
			<Row style={{ width: "100%" }}>
				<Col span={24} className="col-display" style={{ textAlign: "center" }}>
					<Title style={{ float: "left", color: "#878787" }} level={3}>
						Project List
					</Title>
					<Radio.Group value={radio} style={{ paddingTop: 5 }}>
						<Radio
							value={"Active"}
							onClick={() => {
								setProjects(data.filter((proj) => proj.status === "Active"));
								setRadio("Active");
							}}
						>
							Active
						</Radio>
						<Radio
							value={"Completed"}
							onClick={() => {
								setProjects(data.filter((proj) => proj.status === "Completed"));
								setRadio("Completed");
							}}
						>
							Completed
						</Radio>
						<Radio
							value={"delayed"}
							onClick={() => {
								setProjects(data.filter((proj) => proj.status === "delayed"));
								setRadio("delayed");
							}}
						>
							Delayed
						</Radio>
						<Radio
							value={"all"}
							onClick={() => {
								setProjects(data);
								setRadio("all");
							}}
						>
							All Projects
						</Radio>
					</Radio.Group>

					<Table
						columns={columns}
						dataSource={projects}
						size="middle"
						pagination={false}
						scroll={{ y: 380 }}
					/>
				</Col>
			</Row>
			<Row
				style={{
					width: "100%",
					textAlign: "center",
					marginTop: "10px",
				}}
				className="col-display"
			>
				<Col offset={1} span={6}>
					<Title className="admin-project-title" level={3}>
						Total Active
					</Title>
					<Title style={{ display: "inline-block", margin: 0 }} level={2}>
						{data.filter((proj) => proj.status === "Active").length}
					</Title>
				</Col>
				<Col offset={2} span={7}>
					<Title className="admin-project-title" level={3}>
						Total Completed
					</Title>
					<Title style={{ display: "inline-block", margin: 0 }} level={2}>
						{data.filter((proj) => proj.status === "Completed").length}
					</Title>
				</Col>
				<Col offset={2} span={6}>
					<Title className="admin-project-title" level={3}>
						Total Delayed
					</Title>
					<Title style={{ display: "inline-block", margin: 0 }} level={2}>
						{data.filter((proj) => proj.status === "delayed").length}
					</Title>
				</Col>
			</Row>
		</Row>
	);
};

const mapStateToProps = (state, ownProps) => ({ projects: state.projects });

export default connect(mapStateToProps)(AdminProject);
