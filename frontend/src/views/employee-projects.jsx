import React, { useState } from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import ProjectTable from "../components/employee-components/project-detailed-table";
import TaskTable from "../components/employee-components/tasks-detailed-table";
import "../components/employee-components/main-theme.css";
import Chat from "./../components/employee-components/chat";

const EmployeeProjectTab = () => {
  const [members, setMembers] = useState([""]);
  const [tasks, setTasks] = useState([{}]);
  const [proj_id, setProj_id] = useState("");

  return (
    <>
      <Row>
        <Col span={16} style={{ padding: "20px 20px" }}>
          <Row>
            <Col span={24} className="basic-title-color col-display">
              <ProjectTable
                setMembers={setMembers}
                setTasks={setTasks}
                setProj_id={setProj_id}
              />
            </Col>
          </Row>
          <Row style={{ paddingTop: "15px" }}>
            <Col span={24} className="basic-title-color">
              <TaskTable members={members} tasks={tasks} proj_id={proj_id} />
            </Col>
          </Row>
        </Col>

        <Col span={8} className="col-display" style={{ marginTop: "20px" }}>
          <Chat />
        </Col>
      </Row>
    </>
  );
};

export default EmployeeProjectTab;
