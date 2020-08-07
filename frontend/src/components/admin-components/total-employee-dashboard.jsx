import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
	Typography,
	Button,
	Input,
	Modal,
	Form,
	Select,
	Divider,
	DatePicker,
	message,
} from "antd";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { gotJobs, gotEmployees } from "../../redux/actionCreators";
import callAPI from "../callAPI";

const { Title } = Typography;
const { Option } = Select;

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

const TotalEmployee = (props) => {
	const [newEmployee, setnewEmployee] = useState(false);
	const [cookies] = useCookies("session");
	const [empid, setEmpid] = useState(randomNum());
	const [first_name, setFirst_name] = useState();
	const [last_name, setLast_name] = useState();
	const [jobid, setJobid] = useState();
	const [mobile, setMobile] = useState();
	const [email, setEmail] = useState();
	const [address, setAddress] = useState();
	const [timestamp, setTimestamp] = useState();
	const [password, setPassword] = useState();
	let arr = [
		empid,
		first_name,
		last_name,
		mobile,
		address,
		email,
		timestamp,
		jobid,
		password,
	];

	const getEmployees = () => {
		callAPI(cookies.session, {
			query: `query{
		  readEmployees{
		  _id
			job_id
			first_name
			last_name
			mobile
			email
			address
			joining_date
			password
		}
	}`,
		}).then((res) => props.gotEmployees(res.data.readEmployees));
	};

	useEffect(() => {
		getEmployees();
	}, []);

	return (
		<>
			<Title style={{ float: "left", color: "#878787" }} level={3}>
				Total Employees
			</Title>
			<Title level={1}>{props.employees.length}</Title>
			<br />
			<Button
				type="primary"
				shape="round"
				size="large"
				onClick={() => setnewEmployee(true)}
			>
				Add New Employee
			</Button>

			<Modal
				style={{ borderRadius: "20px" }}
				visible={newEmployee}
				width="580px"
				title="New Employee"
				okText="Add Employee"
				okButtonProps={{
					style: { backgroundColor: "#1890ff", borderRadius: 20 },
				}}
				cancelButtonProps={{ style: { display: "none" } }}
				onOk={() => {
					if (arr.includes(undefined) || arr.includes(""))
						message.warning("Fill all fields");
					else {
						callAPI(cookies.session, {
							query: `mutation {
							createEmployee(
								employee: {
								_id: "${empid}"
								did: "admin"
								job_id: "${jobid}"
								first_name: "${first_name}"
								last_name: "${last_name}"
								mobile: "${mobile}"
								email: "${email}"
								address: "${address}"
								joining_date: ${timestamp}
								password: "${password}"
								}
							)
							}`,
						})
							.then((res) => res.data.createEmployee)
							.then((res) => {
								if (res === 1) {
									message.success("Employee created with id: " + empid);
									getEmployees();
									setnewEmployee(false);
									setEmpid(randomNum());
								} else message.error("error occured");
							})
							.catch((err) => message.error(err));
					}
				}}
				onCancel={() => {
					setnewEmployee(false);
					setEmpid(randomNum());
				}}
			>
				<Form
					wrapperCol={{ offset: 2, span: 14 }}
					size="middle"
					colon={false}
					labelAlign="left"
					layout="inline"
				>
					<Form.Item label="ID" style={{ width: "-webkit-fill-available" }}>
						<Title level={4} className="form-items">
							{empid}
						</Title>
					</Form.Item>
					<Form.Item label="First Name">
						<Input
							className="form-items"
							value={first_name}
							onChange={(e) => {
								setFirst_name(e.target.value);
								if (e.target.value[0])
									setEmpid(e.target.value[0] + empid.slice(1, 8));
							}}
						/>
					</Form.Item>
					<Form.Item label="Joining Date" style={{ paddingBottom: 10 }}>
						<DatePicker
							className="form-items"
							format={"DD/MM/YYYY"}
							onChange={(e) =>
								setTimestamp(
									parseInt((new Date(e.toDate()).getTime() / 1000).toFixed(0))
								)
							}
						/>
					</Form.Item>
					<Form.Item label="Last Name">
						<Input
							value={last_name}
							className="form-items"
							onChange={(e) => {
								setLast_name(e.target.value);
								if (e.target.value[0])
									setEmpid(empid[0] + e.target.value[0] + empid.slice(2, 7));
							}}
						/>
					</Form.Item>
					<Form.Item
						label="Select Job"
						style={{ paddingBottom: 10, paddingLeft: 15 }}
					>
						<Select
							className="form-items"
							showSearch
							style={{ width: 140 }}
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
							onChange={(e) => {
								setJobid(e);
							}}
						>
							{props.jobs.map((job) => (
								<Option value={job._id} key={job._id}>
									{job._id + " " + job.title}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						wrapperCol={{ offset: 0, span: 16 }}
						label="Phone Number"
						style={{ width: "-webkit-fill-available", paddingBottom: 10 }}
					>
						<Input
							className="form-items"
							value={mobile}
							onChange={(e) => setMobile(e.target.value)}
						/>
					</Form.Item>
					<Form.Item
						wrapperCol={{ offset: 2, span: 16 }}
						label="Email"
						style={{
							width: "-webkit-fill-available",
							paddingBottom: 10,
							paddingLeft: 20,
						}}
					>
						<Input
							className="form-items"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Item>
					<Form.Item
						wrapperCol={{ offset: 2, span: 16 }}
						label="Address"
						style={{ width: "-webkit-fill-available", paddingBottom: 10 }}
					>
						<Input
							className="form-items"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</Form.Item>
					<Divider dashed />
					<Form.Item
						label="User ID"
						style={{ width: "-webkit-fill-available" }}
					>
						<Title level={4} className="form-items">
							{empid}
						</Title>
					</Form.Item>
					<Form.Item
						wrapperCol={{ offset: 1, span: 16 }}
						label="Password"
						style={{ width: "-webkit-fill-available", paddingLeft: 5 }}
					>
						<Input.Password
							className="form-items"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

const mapStateToProps = (state, ownProps) => ({
	jobs: state.jobs,
	employees: state.employees,
});

export default connect(mapStateToProps, { gotJobs, gotEmployees })(
	TotalEmployee
);
