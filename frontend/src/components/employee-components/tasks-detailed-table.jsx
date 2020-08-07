import React, { useState } from "react";
import {
  Row,
  Col,
  Typography,
  Checkbox,
  Button,
  Table,
  Modal,
  Input,
  Form,
  Select,
  DatePicker,
} from "antd";

const { Option } = Select;
const { Title } = Typography;

const TaskTable = () => {
  const [editTask, setTask] = useState(false);

  function deleteTask() {
    setTask(false);
  }
  function updateTask() {
    setTask(false);
  }

  const taskColumns = [
    {
      title: "Title",
      dataIndex: "Title",
    },
    {
      title: "Date Created",
      dataIndex: "DateCreated",
    },
    {
      title: "Deadline",
      dataIndex: "Deadline",
    },
    {
      title: "Status",
      dataIndex: "Status",
    },
    {
      title: "Mark",
      dataIndex: "Mark",
      render: () => <Checkbox />,
    },
    {
      title: "Edit Task",
      dataIndex: "Task",
      render: () => (
        <Button type="primary" shape="round" onClick={() => setTask(true)}>
          Edit
        </Button>
      ),
    },
  ];
  const taskData = [
    {
      Title: "ABC",
      DateCreated: "24/01/1020",
      Deadline: "24/01/1021",
      Status: "Active",
    },
    {
      Title: "ABC",
      DateCreated: "24/01/1020",
      Deadline: "24/01/1021",
      Status: "Active",
    },
    {
      Title: "ABC",
      DateCreated: "24/01/1020",
      Deadline: "24/01/1021",
      Status: "Active",
    },
    {
      Title: "ABC",
      DateCreated: "24/01/1020",
      Deadline: "24/01/1021",
      Status: "Active",
    },
  ];

  const memberColumn = [
    {
      title: "",
      dataIndex: "Member",
    },
  ];

  const membersData = [
    {
      Member: "ABC",
    },
    {
      Member: "ABC",
    },
    {
      Member: "ABC",
    },
  ];

  return (
    <>
      <Row>
        <Col span={4} className="col-display">
          <Title style={{ float: "left", color: "#878787" }} level={3}>
            Members
          </Title>
          <Table
            showHeader={false}
            columns={memberColumn}
            dataSource={membersData}
            size="middle"
            pagination={false}
            scroll={{ y: 120 }}
          />
        </Col>
        <Col span={19} push={1} className="col-display">
          <Table
            columns={taskColumns}
            dataSource={taskData}
            size="middle"
            pagination={false}
            scroll={{ y: 140 }}
          />
        </Col>
      </Row>
      <Modal
        style={{ borderRadius: "20px" }}
        visible={editTask}
        width="665px"
        title="Edit/Update Task"
        okText="Update"
        okButtonProps={{
          style: { backgroundColor: "#1890ff", borderRadius: 20 },
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        onOk={updateTask}
        onCancel={() => setTask(false)}
      >
        <Button
          type="primary"
          danger
          shape="round"
          style={{
            borderRadius: 20,
            position: "absolute",
            bottom: 10,
            left: 10,
          }}
          onClick={deleteTask}
        >
          Delete Task
        </Button>
        <Form size="middle" colon={false} labelAlign="left" layout="inline">
          <Form.Item label="Task">
            <Input className="form-items" />
          </Form.Item>
          <Form.Item>
            <Select
              className="form-items"
              showSearch
              style={{ width: 150 }}
              placeholder="Select a member"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {membersData
                .map((a) => a.Member)
                .map((member) => (
                  <Option value={member}>{member}</Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item label="Deadline">
            <DatePicker className="form-items" format={"DD/MM/YYYY"} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskTable;
