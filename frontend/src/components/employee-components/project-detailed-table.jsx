import React, { useState } from "react";
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
	Modal,
	Form,
	Input,
	Select,
	DatePicker,
} from "antd";
import { DownOutlined, MinusCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { connect } from "react-redux";

const { Title } = Typography;
const { Option } = Select;

const ProjectTable = (props) => {
	const [task, setAssign] = useState(false);

	function assignTask() {
		setAssign(false);
	}

	const membersData = [
		{
			Member: "ABC",
		},
		{
			Member: "ABC",
		},
		{
			Member: "ABC",
		},
	];

	const columns = [
		{
			title: "Title",
			dataIndex: "Title",
		},
		{
			title: "Date Created",
			dataIndex: "DateCreated",
		},
		{
			title: "Deadline",
			dataIndex: "Deadline",
		},
		{
			title: "Status",
			dataIndex: "Status",
		},
		{
			title: "Progress",
			dataIndex: "Progress",
		},
		{
			title: "Leading Member",
			dataIndex: "LeadingMember",
		},
		{
			title: "Assign Task",
			dataIndex: "Task",
			render: () => (
				<Button type="primary" shape="round" onClick={() => setAssign(true)}>
					Assign
				</Button>
			),
		},
	];

	const data = [
		{
			Title: "ABC",
			DateCreated: "24/01/1020",
			Deadline: "24/01/1021",
			Status: "Active",
			Progress: "80%",
			LeadingMember: "Mee",
		},
		{
			Title: "ADBC",
			DateCreated: "24/01/1020",
			Deadline: "24/01/1021",
			Status: "Active",
			Progress: "80%",
			LeadingMember: "Mee",
		},
		{
			Title: "FABC",
			DateCreated: "24/01/1020",
			Deadline: "24/01/1021",
			Status: "Active",
			Progress: "80%",
			LeadingMember: "Mee",
		},
		{
			Title: "EABC",
			DateCreated: "24/01/1020",
			Deadline: "24/01/1021",
			Status: "Active",
			Progress: "80%",
			LeadingMember: "Mee",
		},
		{
			Title: "GABC",
			DateCreated: "24/01/1020",
			Deadline: "24/01/1021",
			Status: "Active",
			Progress: "80%",
			LeadingMember: "Mee",
		},
		{
			Title: "IABC",
			DateCreated: "24/01/1020",
			Deadline: "24/01/1021",
			Status: "Active",
			Progress: "80%",
			LeadingMember: "Mee",
		},

		{
			Title: "TABC",
			DateCreated: "24/01/1020",
			Deadline: "24/01/1021",
			Status: "Active",
			Progress: "80%",
			LeadingMember: "Mee",
		},

		{
			Title: "LABC",
			DateCreated: "24/01/1020",
			Deadline: "24/01/1021",
			Status: "Active",
			Progress: "80%",
			LeadingMember: "Mee",
		},
	];

	const now = new Date().getUTCFullYear();
	const years = Array(now - (now - 20))
		.fill("")
		.map((idx) => now - idx);
	const months = moment.months();
	const currentMonth = moment(new Date()).month();

	const yearMenu = (
		<Menu>
			{years.map((year) => (
				<Menu.Item key={year}>{year}</Menu.Item>
			))}
		</Menu>
	);

	const monthMenu = (
		<Menu>
			{months.map((month) => (
				<Menu.Item key={month}>{month}</Menu.Item>
			))}
		</Menu>
	);

	return (
		<>
			<Row style={{ textAlign: "center" }}>
				<Col span={24}>
					<Title style={{ float: "left", color: "#878787" }} level={3}>
						Project List
					</Title>
					<Radio.Group value={1} style={{ paddingTop: 5 }}>
						<Radio value={1}>Active</Radio>
						<Radio value={2}>Completed</Radio>
						<Radio value={3}>All Projects</Radio>
					</Radio.Group>
					<div style={{ float: "right", display: "inline-block" }}>
						<Space>
							<Dropdown overlay={monthMenu} trigger={["click"]}>
								<a className="dropdown-archon">
									{months[currentMonth]}
									<DownOutlined className="dropdown-icon" />
								</a>
							</Dropdown>
							<Dropdown overlay={yearMenu} trigger={["click"]}>
								<a className="dropdown-archon">
									{years[0]} <DownOutlined className="dropdown-icon" />
								</a>
							</Dropdown>
						</Space>
					</div>
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
					/>
				</Col>
			</Row>
			<Modal
				style={{ borderRadius: "20px" }}
				visible={task}
				width="665px"
				title="Assign Task"
				okText="Assign"
				okButtonProps={{
					style: { backgroundColor: "#1890ff", borderRadius: 20 },
				}}
				cancelButtonProps={{ style: { display: "none" } }}
				onOk={assignTask}
				onCancel={() => setAssign(false)}
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
												<Input className="form-items" />
											</Form.Item>
											<Form.Item
												{...field}
												name={[field.name, "member"]}
												fieldKey={[field.fieldKey, "member"]}
												rules={[{ required: true, message: "Missing member" }]}
											>
												<Select
													className="form-items"
													showSearch
													style={{ width: 150 }}
													placeholder="Select a member"
													optionFilterProp="children"
													filterOption={(input, option) =>
														option.children
															.toLowerCase()
															.indexOf(input.toLowerCase()) >= 0
													}
												>
													{membersData
														.map((a) => a.Member)
														.map((member) => (
															<Option value={member}>{member}</Option>
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
												/>
											</Form.Item>
											<MinusCircleOutlined
												style={{
													fontSize: 18,
													color: "#ff0000",
													paddingTop: 5,
												}}
												onClick={() => {
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

const mapStateToProps = (state, ownProps) => ({ projects: state.projects });

export default connect(mapStateToProps)(ProjectTable);
