import React, { useState, useEffect } from "react";
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
import { gotEmployees } from "../redux/actionCreators";
import { connect } from "react-redux";
import callAPI from "../components/callAPI";
import { useCookies } from "react-cookie";

function Employee(props) {
	console.log(parseInt(new Date(Date.now()).getTime() / 1000 + 5 * 3600));
	console.log(new Date(1597005599 * 1000));
	const [cookies] = useCookies("session");
	const getEmployees = () => {
		callAPI(cookies.session, {
			query: `query{
		  readEmployees{
		  	_id
			first_name
			last_name
		}
	}`,
		}).then((res) => props.gotEmployees(res.data.readEmployees));
	};

	useEffect(() => {
		getEmployees();
	}, []);

	return (
		<>
			<Row style={{ backgroundColor: "#f2f2f0" }}>
				<Col span={5}>
					<Row>
						<Bio />
					</Row>
					<Row>
						<BroadcastPanel />
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

export default connect(null, { gotEmployees })(Employee);
