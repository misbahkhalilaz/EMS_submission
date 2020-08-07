import React, { useState } from "react";
import { useCookies } from "react-cookie";
import {
	Row,
	Col,
	Typography,
	Button,
	Table,
	Modal,
	Form,
	Input,
	message,
} from "antd";
import callAPI from "../components/callAPI";
import { connect } from "react-redux";
import { gotJobs } from "../redux/actionCreators";

const { Title } = Typography;

const AdminJobs = (props) => {
	const getJobs = () => {
		callAPI(cookies.session, {
			query: `query {
					readJobs {
						_id
						title	
						pay
						start_time
						exit_time
						late_charges
						abs_charges
					}
					} `,
		}).then((res) => {
			props.gotJobs(res.data.readJobs);
		});
	};
	const columns = [
		{
			title: "Job ID",
			dataIndex: "_id",
		},
		{
			title: "Title",
			dataIndex: "title",
		},
		{
			title: "Start Time",
			dataIndex: "start_time",
		},
		{
			title: "Exit Time",
			dataIndex: "exit_time",
		},

		{
			title: "Basic Salary",
			dataIndex: "pay",
		},
		{
			title: "Total Employees",
			dataIndex: "employee",
		},
		{
			title: "View/Edit",
			dataIndex: "_id",
			render: (dataIndex) => (
				<Button
					type="primary"
					shape="round"
					onClick={() => {
						let obj = props.jobs.filter((job) => job._id === dataIndex)[0];
						setId(obj._id);
						setLate_charges(obj.late_charges);
						setAbsent_charges(obj.abs_charges);
						setPay(obj.pay);
						setStart_time(obj.start_time);
						setExit_time(obj.exit_time);
						setTitle(obj.title);
						setJobView(true);
					}}
				>
					View/Edit
				</Button>
			),
		},
	];

	const [jobView, setJobView] = useState(false);
	const [id, setId] = useState();
	const [title, setTitle] = useState();
	const [pay, setPay] = useState();
	const [start_time, setStart_time] = useState();
	const [exit_time, setExit_time] = useState();
	const [late_charges, setLate_charges] = useState();
	const [absent_charges, setAbsent_charges] = useState();
	const [cookies] = useCookies("session");

	return (
		<Row style={{ padding: "30px 20px" }}>
			<div style={{ minHeight: "85vh" }}>
				<Col span={23} className="col-display">
					<Title style={{ float: "left", color: "#878787" }} level={3}>
						Jobs List
					</Title>
					<Table
						columns={columns}
						dataSource={props.jobs.map((job) =>
							Object.assign({}, job, {
								employee: props.employees.filter(
									(emp) => emp.job_id === job._id
								).length,
							})
						)}
						size="middle"
						pagination={false}
						scroll={{ y: 450 }}
					/>
				</Col>
			</div>
			<Modal
				style={{ borderRadius: "20px" }}
				visible={jobView}
				width="580px"
				title="New Job"
				okText="Add Job"
				okButtonProps={{
					style: { backgroundColor: "#1890ff", borderRadius: 20 },
				}}
				cancelButtonProps={{ style: { display: "none" } }}
				onOk={() =>
					callAPI(cookies.session, {
						query: `mutation {
							updateJob(
								job: {
									_id: "${id}"
									title: "${title}"
									pay: ${pay}
									start_time: "${start_time}"
									exit_time: "${exit_time}"
									late_charges: ${late_charges}
									abs_charges: ${absent_charges}
								}
							)
							}`,
					}).then((res) => {
						if (res.data.updateJob === 1) {
							message.success("updated Job: " + id);
							getJobs();
							setJobView(false);
						}
					})
				}
				onCancel={() => setJobView(false)}
			>
				<Form
					wrapperCol={{ offset: 6, span: 12 }}
					size="middle"
					colon={false}
					labelAlign="left"
					layout="inline"
				>
					<Form.Item label="ID" style={{ width: "-webkit-fill-available" }}>
						<Title level={4} className="form-items">
							{id}
						</Title>
					</Form.Item>
					<Form.Item label="Title">
						<Input
							className="form-items"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Form.Item>
					<Form.Item label="Start Time" style={{ paddingBottom: 10 }}>
						<Input
							className="form-items"
							value={start_time}
							onChange={(e) => setStart_time(e.target.value)}
						/>
					</Form.Item>
					<Form.Item label="Pay" style={{ paddingLeft: 5 }}>
						<Input
							className="form-items"
							value={pay}
							onChange={(e) => setPay(e.target.value)}
						/>
					</Form.Item>
					<Form.Item
						label="End Time"
						style={{ paddingBottom: 10, paddingLeft: 5 }}
					>
						<Input
							className="form-items"
							value={exit_time}
							onChange={(e) => setExit_time(e.target.value)}
						/>
					</Form.Item>
					<Form.Item
						wrapperCol={{ offset: 1, span: 16 }}
						label="Late Charges"
						style={{ width: "-webkit-fill-available", paddingBottom: 10 }}
					>
						<Input
							className="form-items"
							value={late_charges}
							onChange={(e) => setLate_charges(e.target.value)}
						/>
					</Form.Item>
					<Form.Item
						wrapperCol={{ span: 16 }}
						label="Absent Charges"
						style={{
							width: "-webkit-fill-available",
							paddingBottom: 10,
							paddingLeft: 10,
						}}
					>
						<Input
							className="form-items"
							value={absent_charges}
							onChange={(e) => setAbsent_charges(e.target.value)}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</Row>
	);
};

const mapStateToProps = (state, ownProps) => ({
	jobs: state.jobs,
	employees: state.employees,
});

export default connect(mapStateToProps, { gotJobs })(AdminJobs);
function updateJob() {}
