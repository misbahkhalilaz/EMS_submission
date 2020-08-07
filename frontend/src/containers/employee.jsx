import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import NavBar from "../components/employee-components/navbar";
import BroadcastPanel from "../components/employee-components/broadcast-panel";
import Bio from "../components/employee-components/bio-panel";
import EmployeeDashboard from "../views/employee-dashboard";
import EmployeeSalaryAttendanceTab from "../views/employee-salary-attendance";
import EmployeeProjectTab from "../views/employee-projects";
import EmployeeContactTab from "../views/employee-contact-admin";

function Employee() {
	var msgs = [
		{
			type: "Broadcast",
			msg: "dgadajdgajhgdjsadhgsjdgjhadjhdgasjdgjsagdhasgdjhsadgas",
			eventDate: "23/10/2020",
		},

		{
			type: "Broadcast",
			msg: "dgadajdgajhgdjsadhgsjdgjhadjhdgasjdgjsagdhasgdjhsadgas",
			eventDate: "23/12/2020",
		},

		{
			type: "Broadcast",
			msg: "dgadajdgajhgdjsadhgsjdgjhadjhdgasjdgjsagdhasgdjhsadgas",
			eventDate: "21/13/2020",
		},
		{
			type: "Broadcast",
			msg: "dgadajdgajhgdjsadhgsjdgjhadjhdgasjdgjsagdhasgdjhsadgas",
			eventDate: "2/13/2020",
		},
	];

	return (
		<>
			<Row style={{ backgroundColor: "#f2f2f0" }}>
				<Col span={5}>
					<Row>
						<Bio />
					</Row>
					<Row>
						<BroadcastPanel Msgs={msgs} />
					</Row>
				</Col>
				<Router>
					<Col style={{ backgroundColor: "#FFFFFF" }} span={19}>
						<Row style={{ height: 40 }}>
							<Col span={24}>
								<NavBar />
							</Col>
						</Row>
						<Switch>
							<Route path="/dashboard" component={EmployeeDashboard}></Route>
							<Route
								path="/attendanceandsalary"
								component={EmployeeSalaryAttendanceTab}
							></Route>
							<Route path="/projects" component={EmployeeProjectTab}></Route>
							<Route
								path="/contactadmin"
								component={EmployeeContactTab}
							></Route>
							<Route path="/" exact component={EmployeeDashboard}></Route>
						</Switch>
					</Col>
				</Router>
			</Row>
		</>
	);
}

export default Employee;
