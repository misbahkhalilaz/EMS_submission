import React, { useState, useEffect } from "react";
import {
	Row,
	Col,
	Typography,
	Space,
	Button,
	Table,
	Modal,
	Form,
	Input,
	Select,
	DatePicker,
	Tooltip,
	message,
} from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import callAPI from "../callAPI";
import { useCookies } from "react-cookie";
import { addProjChat } from "../../redux/actionCreators";

const { Title } = Typography;
const { Option } = Select;

let tasks = [];

const ProjectTable = (props) => {
	const [cookies] = useCookies("session");
	const [task, setAssign] = useState(false);
	const [membersData, setMembersData] = useState([""]);
	const [selected, setSelected] = useState();
	const [tasksList, setTasksList] = useState(tasks);

	useEffect(() => {
		setSelected(props.projects[0]._id);
		props.setProj_id(props.projects[0]._id);
		props.setMembers(
			props.projects[0].other_members.map(
				(mem) => props.employees.filter((emp) => emp._id === mem)[0]
			)
		);
		props.setTasks(
			props.projects[0].tasks.map((task) => ({
				...task,
				deadline: new Date(task.deadline * 1000).toLocaleDateString("en-US"),
				// assign_date: new Date(task.assign_date * 1000).toLocaleDateString(
				//   "en-US"
				// ),
			}))
		);
	}, []);

	let data = props.projects.map((proj) => {
		let name = props.employees.filter(
			(emp) => emp._id === proj.leading_member
		)[0];
		return {
			...proj,
			deadline: new Date(proj.deadline * 1000).toLocaleDateString("en-US"),
			posted_date: new Date(proj.posted_date * 1000).toLocaleDateString(
				"en-US"
			),
			progress:
				proj.status === "Completed"
					? "100%"
					: proj.tasks.length > 0
					? (
							(proj.tasks.filter((task) => task.completed === true).length /
								proj.tasks.length) *
							100
					  ).toFixed(1) + "%"
					: "0%",
			assign:
				proj.leading_member === props.id ? (
					<Button
						type="primary"
						shape="round"
						onClick={() => {
							setMembersData(proj.other_members);
							console.log(membersData);
							setAssign(true);
						}}
					>
						Assign
					</Button>
				) : (
					<Button type="primary" shape="round" disabled={true}>
						Assign
					</Button>
				),
			leading_member: (
				<Tooltip title={proj.leading_member}>
					{name.first_name + " " + name.last_name}
				</Tooltip>
			),
		};
	});

	function assignTask() {
		setAssign(false);
	}

	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "_id",
		},
		{
			title: "Date Created",
			dataIndex: "posted_date",
			key: "_id",
		},
		{
			title: "Deadline",
			dataIndex: "deadline",
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
		{
			title: "Leading Member",
			dataIndex: "leading_member",
			key: "_id",
		},
		{
			title: "Assign Task",
			dataIndex: "assign",
			key: "_id",
		},
	];

	return (
		<>
			<Row style={{ textAlign: "center" }}>
				<Col span={24}>
					<Title style={{ float: "left", color: "#878787" }} level={3}>
						Active Projects List
					</Title>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Table
						columns={columns}
						dataSource={data}
						size="middle"
						pagination={false}
						scroll={{ y: 240 }}
						onRow={(r) => ({
							onClick: () => {
								setSelected(r._id);
								props.setProj_id(r._id);
								props.setMembers(
									props.projects
										.filter((proj) => proj._id === r._id)[0]
										.other_members.map(
											(mem) =>
												props.employees.filter((emp) => emp._id === mem)[0]
										)
								);
								props.setTasks(
									props.projects
										.filter((proj) => proj._id === r._id)[0]
										.tasks.map((task) => ({
											...task,
											deadline: new Date(
												task.deadline * 1000
											).toLocaleDateString("en-US"),
											// assign_date: new Date(
											//   task.assign_date * 1000
											// ).toLocaleDateString("en-US"),
										}))
								);
							},
							style: {
								cursor: "pointer",
								backgroundColor: r._id === selected ? "#f2f2f0" : "",
							},
						})}
					/>
				</Col>
			</Row>
			<Modal
				style={{ borderRadius: "20px" }}
				visible={task}
				width="665px"
				title="Assign Task"
				okText="Assign"
				destroyOnClose={true}
				okButtonProps={{
					style: { backgroundColor: "#1890ff", borderRadius: 20 },
				}}
				cancelButtonProps={{ style: { display: "none" } }}
				onOk={() => {
					callAPI(cookies.session, {
						query: `mutation {
                addTasks(
                      _id: "${selected}"
                      tasks: [${tasks
												.filter((t) => t.assign_date)
												.map(
													(t) =>
														"{member_id: " +
														'"' +
														t.member_id +
														'",' +
														"task: " +
														'"' +
														t.task +
														'",' +
														"deadline: " +
														t.deadline +
														"," +
														"assign_date: " +
														t.assign_date +
														"," +
														"completed: " +
														t.completed +
														"}"
												)}]
                )
              }`,
					})
						.then((res) => res.data.addTasks)
						.then((res) => {
							console.log(res);
							if (res === 1) {
								message.success("Tasks Added to the project: " + selected);
							} else message.error("Error");
						});
					tasks = [];
					setTasksList(tasks);
					setAssign(false);
				}}
				onCancel={() => {
					tasks = [];
					setTasksList(tasks);
					setAssign(false);
				}}
			>
				<Form name="dynamic_form_nest_item" autoComplete="off">
					<Form.List name="users">
						{(fields, { add, remove }) => {
							return (
								<div>
									{fields.map((field) => (
										<Space
											key={field.key}
											style={{ display: "flex", marginBottom: 8 }}
											align="start"
										>
											<Form.Item
												label="Task"
												{...field}
												name={[field.name, "task"]}
												fieldKey={[field.fieldKey, "task"]}
												rules={[{ required: true, message: "Missing task" }]}
											>
												<Input
													className="form-items"
													value={tasksList[field.key].task}
													onChange={(e) => {
														{
															tasks[field.key] = {
																...tasks[field.key],
																task: e.target.value,
															};
															setTasksList(tasks);
														}
														console.log(tasksList);
													}}
												/>
											</Form.Item>
											<Form.Item
												{...field}
												name={[field.name, "member"]}
												fieldKey={[field.fieldKey, "member"]}
												rules={[{ required: true, message: "Missing member" }]}
											>
												<Select
													className="form-items"
													style={{ width: 150 }}
													placeholder="Select a member"
													optionFilterProp="children"
													value={tasksList[field.key].member}
													onChange={(e) => {
														tasks[field.key] = {
															...tasks[field.key],
															member_id: e,
														};
														setTasksList(tasks);
													}}
												>
													{props.projects
														.filter((proj) => proj._id === selected)[0]
														.other_members.map(
															(mem) =>
																props.employees.filter(
																	(emp) => emp._id === mem
																)[0]
														)
														.map((member) => (
															<Option value={member._id} key={member._id}>
																<Tooltip
																	title={
																		member._id +
																		" " +
																		member.first_name +
																		" " +
																		member.last_name
																	}
																>
																	{member.first_name}
																</Tooltip>
															</Option>
														))}
												</Select>
											</Form.Item>
											<Form.Item
												label="Deadline"
												{...field}
												name={[field.name, "deadline"]}
												fieldKey={[field.fieldKey, "deadline"]}
												rules={[
													{ required: true, message: "Missing deadline" },
												]}
											>
												<DatePicker
													className="form-items"
													format={"DD/MM/YYYY"}
													onChange={(e) => {
														tasks[field.key] = {
															...tasks[field.key],
															deadline: parseInt(
																new Date(e.toDate()).getTime() / 1000
															),
														};
													}}
												/>
											</Form.Item>
											<MinusCircleOutlined
												style={{
													fontSize: 18,
													color: "#ff0000",
													paddingTop: 5,
												}}
												onClick={() => {
													tasks[field.key] = {};
													setTasksList(tasks);
													remove(field.name);
												}}
											/>
										</Space>
									))}
									<Button
										shape="round"
										style={{
											backgroundColor: "#00ff00",
											borderRadius: 20,
											position: "absolute",
											bottom: 10,
											left: 10,
										}}
										onClick={() => {
											tasks.push({
												assign_date: parseInt(
													new Date(Date.now()).getTime() / 1000 + 5 * 3600
												),
												completed: false,
											});
											setTasksList(tasks);
											add();
										}}
									>
										Add New Task
									</Button>
								</div>
							);
						}}
					</Form.List>
				</Form>
			</Modal>
		</>
	);
};

const mapStateToProps = (state, ownProps) => ({
	projects: state.projects.filter((proj) => !proj.completed),
	id: state.bio._id,
	employees: state.employees,
	setMembers: ownProps.setMembers,
	setTasks: ownProps.setTasks,
});

export default connect(mapStateToProps, { addProjChat })(ProjectTable);
