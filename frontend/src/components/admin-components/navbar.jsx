import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row, Menu, Tooltip, Button } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  ProjectOutlined,
  PayCircleOutlined,
  MessageOutlined,
  PoweroffOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

export default function NavBar({ logout }) {
  let [current, setCurrent] = useState("dashboard");
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
              key="/employee"
              icon={<UserOutlined style={{ fontSize: 24 }} />}
              onClick={(e) => setCurrent(e.key)}
            >
              Employee
            </Menu.Item>

            <Menu.Item
              key="/jobs"
              icon={<ShoppingOutlined style={{ fontSize: 24 }} />}
              onClick={(e) => setCurrent(e.key)}
            >
              Jobs
            </Menu.Item>

            <Menu.Item
              key="/salary"
              icon={<PayCircleOutlined style={{ fontSize: 24 }} />}
              onClick={(e) => setCurrent(e.key)}
            >
              Salary
            </Menu.Item>

            <Menu.Item
              key="/projects"
              icon={<ProjectOutlined style={{ fontSize: 24 }} />}
              onClick={(e) => setCurrent(e.key)}
            >
              Projects
            </Menu.Item>
            <Menu.Item
              key="/contactemployee"
              icon={<MessageOutlined style={{ fontSize: 24 }} />}
              onClick={(e) => setCurrent(e.key)}
            >
              Contact Employee
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
                console.log("clicked");
                logout("session");
                logout("role");
              }}
            />
          </Tooltip>
        </Col>
      </Row>
    </>
  );
}
