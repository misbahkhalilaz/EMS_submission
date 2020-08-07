import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Typography, Button, Input, Modal, Form, message } from "antd";
import { connect } from "react-redux";
import { gotJobs } from "../../redux/actionCreators";
import callAPI from "../callAPI";
import { useCookies } from "react-cookie";

const { Title } = Typography;

function randomNum() {
	return (
		Math.floor(Math.random() * 10).toString() +
		Math.floor(Math.random() * 10).toString() +
		Math.floor(Math.random() * 10).toString() +
		Math.floor(Math.random() * 10).toString() +
		Math.floor(Math.random() * 10).toString() +
		Math.floor(Math.random() * 10).toString() +
		Math.floor(Math.random() * 10).toString() +
		Math.floor(Math.random() * 10).toString()
	);
}

const TotalJobs = (props) => {
	const [cookies] = useCookies("session");
	const [newJob, setnewJob] = useState(false);
	const [jobid, setJobid] = useState(randomNum());
	const [title, setTitle] = useState();
	const [pay, setPay] = useState();
	const [start_time, setStart_time] = useState();
	const [exit_time, setExit_time] = useState();
	const [late_charges, setLate_charges] = useState();
	const [abs_charges, setAbs_charges] = useState();
	const arr = [
		jobid,
		title,
		pay,
		start_time,
		exit_time,
		late_charges,
		abs_charges,
	];
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

	useEffect(() => getJobs(), []);

	return (
		<>
			<Title style={{ float: "left", color: "#878787" }} level={3}>
				Total Jobs
			</Title>
			<Title level={1}>{props.jobsCount}</Title>
			<br />
			<Button
				type="primary"
				shape="round"
				size="large"
				onClick={() => setnewJob(true)}
			>
				Add New Job
			</Button>
			<Modal
				style={{ borderRadius: "20px" }}
				visible={newJob}
				width="580px"
				title="New Job"
				okText="Add Job"
				okButtonProps={{
					style: { backgroundColor: "#1890ff", borderRadius: 20 },
				}}
				cancelButtonProps={{ style: { display: "none" } }}
				onOk={() => {
					if (arr.includes("") || arr.includes(undefined))
						message.warning("Fill all fields");
					else {
						callAPI(cookies.session, {
							query: `mutation {
							createJob(
								job: {
									_id: "${jobid}"
									title: "${title}"
									pay: ${pay}
									start_time: "${start_time}"
									exit_time: "${exit_time}"
									late_charges: ${late_charges}
									abs_charges: ${abs_charges}
								}
							)
							}`,
						})
							.then((res) => res.data.createJob)
							.then((res) => {
								if (res === 1) {
									message.success("Created Job with ID: " + jobid);
									getJobs();
									setnewJob(false);
									setJobid(randomNum());
								} else message.error("error occured");
							})
							.catch((err) => message.error(err));
					}
				}}
				onCancel={() => {
					setnewJob(false);
					setJobid(randomNum());
				}}
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
							{jobid}
						</Title>
					</Form.Item>
					<Form.Item label="Title">
						<Input
							value={title}
							className="form-items"
							onChange={(e) => {
								setTitle(e.target.value);
								if (e.target.value[0] && e.target.value[1] && e.target.value[2])
									setJobid(
										e.target.value[0] +
											e.target.value[1] +
											e.target.value[2] +
											jobid.slice(3, 8)
									);
							}}
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
							value={abs_charges}
							onChange={(e) => setAbs_charges(e.target.value)}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

const mapStateToProps = (state, ownProps) => ({ jobsCount: state.jobs.length });

export default connect(mapStateToProps, { gotJobs })(TotalJobs);

function addNewJob() {}
