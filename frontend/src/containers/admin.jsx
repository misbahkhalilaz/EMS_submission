import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Row, Col, Typography, Divider } from "antd";
import NavBar from "../components/admin-components/navbar";
import BroadcastPanel from "../components/admin-components/broadcast-panel";
import AdminDashboard from "../views/admin-dashboard";
import AdminEmployee from "../views/admin-employee";
import AdminJobs from "../views/admin-jobs";
import AdminSalary from "../views/admin-salary";
import AdminProject from "../views/admin-projects";
import { socket } from "./App";

const { Title } = Typography;

function AppAdmin(props) {
	console.log(new Date(Date.now()).getFullYear());

	useEffect(() => {
		socket.emit("join", "broadcast");
		socket.on("joined", (room) => console.log(room));
	}, []);

	return (
		<>
			<Row style={{ backgroundColor: "#f2f2f0" }}>
				<Col span={5}>
					<Row style={{ justifyContent: "center" }}>
						<Title level={2} style={{ color: "#878787" }}>
							ADMIN
						</Title>
						<Divider
							style={{ paddingLeft: 100, border: "1px solid DodgerBlue" }}
						/>
					</Row>
					<Row>
						<BroadcastPanel />
					</Row>
				</Col>
				<Router>
					<Col style={{ backgroundColor: "#FFFFFF" }} span={19}>
						<Row style={{ height: 40 }}>
							<Col span={24}>
								<NavBar logout={props.logout} />
							</Col>
						</Row>
						<Switch>
							<Route path="/dashboard" component={AdminDashboard}></Route>
							<Route path="/employee" component={AdminEmployee}></Route>
							<Route path="/jobs" component={AdminJobs}></Route>
							<Route path="/salary" component={AdminSalary}></Route>
							<Route path="/projects" component={AdminProject}></Route>
							{/* <Route path="/contactemployee" component={}></Route> */}
							<Route path="/" exact component={AdminDashboard}></Route>
						</Switch>
					</Col>
				</Router>
			</Row>
		</>
	);
}

export default AppAdmin;
