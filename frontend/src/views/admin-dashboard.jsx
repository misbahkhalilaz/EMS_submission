import React from "react";
import { Row, Col } from "antd";
import "../components/employee-components/main-theme.css";
import TotalEmployee from "../components/admin-components/total-employee-dashboard";
import EmployeeCurrentAttendance from "../components/admin-components/attendance-employee-dashboard";
import TotalJobs from "../components/admin-components/total-jobs-dashboard";
import TotalProjects from "../components/admin-components/total-projects-dashboard";
import ProjectPosted from "../components/admin-components/total-proj-posted-dashboard";
import PostBroadcast from "../components/admin-components/broadcast-dashboard";
import PostEvent from "../components/admin-components/event-dashboard";

const AdminDashboard = () => {
	return (
		<>
			<Row style={{ padding: "30px 20px" }}>
				<Row style={{ width: "100%" }}>
					<Col span={8} style={{ textAlign: "center" }} className="col-display">
						<TotalEmployee />
					</Col>
					<Col offset={1} span={15} className="col-display">
						<EmployeeCurrentAttendance />
					</Col>
				</Row>
				<Row style={{ paddingTop: 15, width: "100%" }}>
					<Col span={7} style={{ textAlign: "center" }} className="col-display">
						<TotalJobs />
					</Col>
					<Col offset={1} span={8} className="col-display">
						<TotalProjects />
					</Col>
					<Col
						offset={1}
						span={7}
						style={{ textAlign: "center" }}
						className="col-display"
					>
						<ProjectPosted />
					</Col>
				</Row>
				<Row style={{ paddingTop: 15, width: "100%" }}>
					<Col span={11} className="col-display">
						<PostBroadcast />
					</Col>
					<Col offset={1} span={12} className="col-display">
						<PostEvent />
					</Col>
				</Row>
			</Row>
		</>
	);
};

export default AdminDashboard;
