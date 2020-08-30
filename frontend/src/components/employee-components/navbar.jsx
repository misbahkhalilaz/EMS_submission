import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row, Menu, Tooltip, Button } from "antd";
import {
	DashboardOutlined,
	ProjectOutlined,
	PayCircleOutlined,
	MessageOutlined,
	PoweroffOutlined,
} from "@ant-design/icons";
import { useCookies } from "react-cookie";
import { clearStore } from "../../redux/actionCreators";
import { connect } from "react-redux";

function NavBar(props) {
	let [current, setCurrent] = useState("dashboard");
	let [cookies, setCookie, removeCookie] = useCookies("session");
	const history = useHistory();
	history.push(current);

	return (
		<>
			<Row style={{ backgroundColor: "#f2f2f0" }}>
				<Col offset={1} span={20}>
					<Menu
						style={{ backgroundColor: "#f2f2f0" }}
						selectedKeys={current}
						mode="horizontal"
					>
						<Menu.Item
							key="/dashboard"
							icon={<DashboardOutlined style={{ fontSize: 24 }} />}
							onClick={(e) => {
								setCurrent(e.key);
							}}
						>
							Dashboard
						</Menu.Item>
						<Menu.Item
							key="/attendanceandsalary"
							icon={<PayCircleOutlined style={{ fontSize: 24 }} />}
							onClick={(e) => setCurrent(e.key)}
						>
							Attendance and Salary
						</Menu.Item>

						<Menu.Item
							key="/projects"
							icon={<ProjectOutlined style={{ fontSize: 24 }} />}
							onClick={(e) => setCurrent(e.key)}
						>
							Projects
						</Menu.Item>
						<Menu.Item
							key="/contactadmin"
							icon={<MessageOutlined style={{ fontSize: 24 }} />}
							onClick={(e) => setCurrent(e.key)}
						>
							Contact Admins
						</Menu.Item>
					</Menu>
				</Col>
				<Col pull={1} span={2} style={{ paddingTop: 10 }}>
					<Tooltip placement="bottom" title="Logout">
						<Button
							shape="circle"
							icon={<PoweroffOutlined />}
							size="small"
							style={{ float: "right", color: "rgba(0, 0, 0, 0.65)" }}
							onClick={() => {
								props.clearStore();
								console.clear();
								removeCookie("session");
								removeCookie("role");
							}}
						/>
					</Tooltip>
				</Col>
			</Row>
		</>
	);
}

export default connect(null, { clearStore })(NavBar);
