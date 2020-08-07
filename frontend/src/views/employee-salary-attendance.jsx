import React from "react";
import "antd/dist/antd.css";
import { Row, Col, Typography, Descriptions } from "antd";
import "../components/employee-components/main-theme.css";
import MonthSalaryTable from "../components/employee-components/month-salary-table";
import AttendanceTable from "../components/employee-components/attendance-detailed-table";

const { Title } = Typography;
const totalSalary = 4000,
  basicSalary = 10000,
  bonus = 10000,
  penalty = 10000,
  present = 0,
  late = 0,
  absent = 0,
  leave = 0,
  earlyExit = 0,
  lateFine = 0,
  absentFine = 0,
  earlyExitFine = 0;

const EmployeeSalaryAttendanceTab = () => {
  return (
    <>
      <Row style={{ paddingTop: "30px" }} justify="space-around">
        <Col
          offset={1}
          className="col-display"
          flex="200px"
          style={{ textAlign: "center" }}
        >
          <MonthSalaryTable />
        </Col>
        <Col flex="auto">
          <Row justify="space-around">
            <Col className="col-display" span={12}>
              <Title className="basic-title-color" level={3}>
                Total Salary
              </Title>
              <Title
                style={{ textAlign: "center", marginTop: "5px" }}
                level={1}
              >
                {totalSalary + " "}Rs
              </Title>
            </Col>
            <Col className="col-display" offset={1} span={8} pull={1}>
              <Title className="basic-title-color" level={4}>
                Basic Salary
              </Title>
              <Title className="basic-title-value" level={4}>
                {basicSalary}
              </Title>
              <br />
              <Title
                style={{ color: "#00ff00" }}
                className="basic-title-"
                level={4}
              >
                Bonus
              </Title>
              <Title className="basic-title-value" level={4}>
                {bonus}
              </Title>
              <br />
              <Title
                style={{ color: "red" }}
                className="basic-title-"
                level={4}
              >
                Penalty
              </Title>
              <Title className="basic-title-value" level={4}>
                {penalty}
              </Title>
            </Col>
          </Row>
          <Row
            style={{
              borderRadius: 20,
              paddingTop: "20px",
            }}
          >
            <Col span={21} offset={1} className="col-display">
              <Title style={{ color: "#878787" }} level={3}>
                Attendance
              </Title>
              <Row
                style={{ backgroundColor: "#FFFFFF", borderRadius: 20 }}
                justify="space-around"
              >
                <Col span={4}>
                  <Title className="basic-title-color" level={4}>
                    Present
                  </Title>
                  <Title className="basic-title-value" level={4}>
                    {present}
                  </Title>
                </Col>
                <Col span={3}>
                  <Title className="basic-title-color" level={4}>
                    Late
                  </Title>
                  <Title className="basic-title-value" level={4}>
                    {late}
                  </Title>
                </Col>
                <Col span={4}>
                  <Title className="basic-title-color" level={4}>
                    Absent
                  </Title>
                  <Title className="basic-title-value" level={4}>
                    {absent}
                  </Title>
                </Col>
                <Col span={4}>
                  <Title className="basic-title-color" level={4}>
                    Leave
                  </Title>
                  <Title className="basic-title-value" level={4}>
                    {leave}
                  </Title>
                </Col>
                <Col span={5}>
                  <Title className="basic-title-color" level={4}>
                    Early Exit
                  </Title>
                  <Title className="basic-title-value" level={4}>
                    {earlyExit}
                  </Title>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="space-around" style={{ paddingTop: "20px" }}>
        <Col className="col-display basic-title-color" offset={1} span={16}>
          <AttendanceTable />
        </Col>
        <Col
          className="col-display basic-title-color"
          offset={2}
          pull={1}
          span={5}
        >
          <Title
            className="basic-title-color"
            level={4}
            style={{ paddingTop: 0, margin: 0 }}
          >
            Bonus Details
          </Title>
          <div>
            <Descriptions
              className="bonus-descrip-box scrollbar scrollbar-info"
              bordered
              colon={false}
              column={1}
              size="small"
            >
              <Descriptions.Item
                className="bonus-descrip-box-items"
                label="UserName
                Amount"
              >
                Z 123212321
              </Descriptions.Item>
              <Descriptions.Item
                className="bonus-descrip-box-items"
                label="UserName
                Amount"
              >
                Zhou Maomao
              </Descriptions.Item>
            </Descriptions>
          </div>
          <Title
            className="basic-title-color"
            style={{ paddingTop: 0, margin: 0 }}
            level={4}
          >
            Penalty Details
          </Title>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "0 10px",
              borderRadius: 20,
            }}
          >
            <label style={{ float: "left" }}>Late</label>
            <label style={{ float: "right" }}>{lateFine}Rs</label>
            <br />
            <label style={{ float: "left" }}>Absent</label>
            <label style={{ float: "right" }}>{absentFine}Rs</label>
            <br />
            <label style={{ float: "left" }}>Early Exit</label>
            <label style={{ float: "right" }}>{earlyExitFine}Rs</label>
            <br />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default EmployeeSalaryAttendanceTab;
