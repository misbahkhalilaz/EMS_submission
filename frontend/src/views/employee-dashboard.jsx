import React from "react";
import { Row, Col } from "antd";
import AttendancePanel1 from "../components/employee-components/attendance-panel-1";
import AttendancePanel2 from "../components/employee-components/attendance-panel-2";
import ProjectChart from "../components/employee-components/project-chart-panel";
import MiniProjectDetails from "../components/employee-components/mini-project-panel";
import EfficiencyChart from "../components/employee-components/efficiency-panel";

function EmployeeDashboard() {
	return (
		<>
			<Row style={{ paddingTop: "30px" }} justify="space-around">
				<Col
					style={{
						backgroundColor: "#f2f2f0",
						borderRadius: "20px",
						paddingTop: 20,
					}}
					flex="460px"
				>
					<AttendancePanel1 />
				</Col>
				<Col
					style={{
						backgroundColor: "#f2f2f0",
						borderRadius: "20px",
						paddingTop: 10,
					}}
					flex="600px"
				>
					<AttendancePanel2 />
				</Col>
			</Row>
			<Row justify="space-around" style={{ paddingTop: "10px" }}>
				<Col
					style={{
						backgroundColor: "#f2f2f0",
						borderRadius: "20px",
						padding: 20,
					}}
					flex="460px"
				>
					<ProjectChart />
				</Col>
				<Col
					style={{ backgroundColor: "#f2f2f0", borderRadius: "20px" }}
					flex="600px"
				>
					<EfficiencyChart />
				</Col>
			</Row>
			<Row style={{ padding: "10px 0 5px 5px" }}>
				<Col
					style={{
						backgroundColor: "#f2f2f0",
						borderRadius: "20px",
						padding: "10px 0px 10px 10px",
					}}
					span={24}
				>
					<MiniProjectDetails />
				</Col>
			</Row>
		</>
	);
}

export default EmployeeDashboard;
