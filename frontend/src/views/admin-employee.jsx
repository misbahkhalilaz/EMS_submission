import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Button, Table, Select, message } from "antd";
import { connect } from "react-redux";
import { gotMonthlyAtd } from "../redux/actionCreators";
import callAPI from "../components/callAPI";
import { useCookies } from "react-cookie";

const { Title } = Typography;
const { Option } = Select;

const AdminEmployee = (props) => {
	const [tableData, setTableData] = useState();
	const [cookies] = useCookies("session");
	let data = props.employees.map((emp) =>
		Object.assign({}, emp, {
			joining_date: new Date(emp.joining_date * 1000).toLocaleDateString(
				"en-US"
			),
			job_title: props.jobs.filter((job) => job._id === emp.job_id)[0].title,
			salary: props.jobs.filter((job) => job._id === emp.job_id)[0].pay,
			present: props.atd.filter(
				(atd) => atd.employee_id === emp._id && atd.present === true
			).length,
			leaves: props.atd.filter(
				(atd) => atd.employee_id === emp._id && atd.leave === true
			).length,
			absents: props.atd.filter(
				(atd) =>
					atd.employee_id === emp._id &&
					atd.present === false &&
					atd.leave === false
			).length,
		})
	);

	let currentMonthAtd = () => {
		callAPI(cookies.session, {
			query: `query{
  readMonthlyAtd(month: ${
		new Date(Date.now()).getMonth() + 1
	}, year: ${new Date(Date.now()).getFullYear()}){
    employee_id
    job_id
			date
			entry_time
			present
			leave
			penalty
  }
}`,
		})
			.then((res) => props.gotMonthlyAtd(res.data.readMonthlyAtd))
			.then(() =>
				setTableData(
					props.employees.map((emp) =>
						Object.assign({}, emp, {
							joining_date: new Date(
								emp.joining_date * 1000
							).toLocaleDateString("en-US"),
							job_title: props.jobs.filter((job) => job._id === emp.job_id)[0]
								.title,
							salary: props.jobs.filter((job) => job._id === emp.job_id)[0].pay,
							present: props.atd.filter(
								(atd) => atd.employee_id === emp._id && atd.present === true
							).length,
							leaves: props.atd.filter(
								(atd) =>
									atd.employee_id === emp._id &&
									atd.leave === true &&
									atd.present === false
							).length,
							absents: props.atd.filter(
								(atd) =>
									atd.employee_id === emp._id &&
									atd.present === false &&
									atd.leave === false
							).length,
						})
					)
				)
			);
	};

	useEffect(() => {
		currentMonthAtd();
	}, []);

	let pay = 0;
	data.forEach((data) => (pay += data.salary));

	const columns = [
		{
			title: "Employee ID",
			dataIndex: "_id",
			key: "_id",
		},
		{
			title: "Name",
			dataIndex: "first_name",
			key: "_id",
		},
		{
			title: "Join Date",
			dataIndex: "joining_date",
			key: "_id",
		},
		{
			title: "Job Title",
			dataIndex: "job_title",
			key: "_id",
		},
		{
			title: "Absent",
			dataIndex: "absents",
			key: "_id",
		},
		{
			title: "Present",
			dataIndex: "present",
			key: "_id",
		},
		{
			title: "Leaves",
			dataIndex: "leaves",
			key: "_id",
		},
		{
			title: "Salary",
			dataIndex: "salary",
			key: "_id",
		},
		{
			title: "Mark Leave",
			dataIndex: "_id",
			key: "_id",
			render: (dataIndex) => (
				<Button
					type="primary"
					shape="round"
					onClick={(e) =>
						callAPI(cookies.session, {
							query: `mutation{
                markLeave(id: "${dataIndex}")
              }`,
						})
							.then((res) => {
								if (res.data.markLeave === 1)
									message.success("Leave marked for ID: " + dataIndex);
							})
							.then(() => currentMonthAtd())
					}
				>
					Mark
				</Button>
			),
		},
	];

	return (
		<>
			<Row style={{ padding: "30px 20px" }}>
				<Row>
					<Col span={23} className="col-display">
						<Title style={{ float: "left", color: "#878787" }} level={3}>
							Employee List
						</Title>
						<div style={{ width: 200, float: "right" }}>
							<Select
								className="form-items"
								showSearch
								style={{ width: 140 }}
								optionFilterProp="children"
								onChange={(e) => {
									if (e === "clear") setTableData(data);
									else setTableData(data.filter((data) => data._id === e));
								}}
								filterOption={(input, option) =>
									option.children.toLowerCase().indexOf(input.toLowerCase()) >=
									0
								}
							>
								{[
									<Option key="clear" value="clear">
										{" "}
									</Option>,
									...data.map((data) => (
										<Option key={data._id} value={data._id}>
											{data._id + " " + data.first_name}
										</Option>
									)),
								]}
							</Select>
						</div>

						<br />
						<Table
							width="100%"
							columns={columns}
							dataSource={tableData}
							size="middle"
							pagination={false}
							scroll={{ y: 310 }}
						/>
					</Col>
				</Row>
				<Row style={{ width: "100%", textAlign: "center", paddingTop: 10 }}>
					<Col span={12} className="col-display">
						<Title style={{ float: "left", color: "#878787" }} level={3}>
							Total Employees
						</Title>
						<Title level={1}>{data.length}</Title>
					</Col>
					<Col offset={1} span={11} className="col-display">
						<Title style={{ float: "left", color: "#878787" }} level={3}>
							Total Basic Salary
						</Title>
						<Title level={1}>Rs {pay}</Title>
					</Col>
				</Row>
			</Row>
		</>
	);
};

const mapStateToProps = (state, ownProps) => ({
	employees: state.employees,
	jobs: state.jobs,
	atd: state.monthlyAtd,
});

export default connect(mapStateToProps, { gotMonthlyAtd })(AdminEmployee);

function updateEmployee() {}
function disableAccount() {}
