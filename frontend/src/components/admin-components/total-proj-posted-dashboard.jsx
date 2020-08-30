import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import {
  Typography,
  Button,
  Input,
  Modal,
  Form,
  Space,
  DatePicker,
  Select,
  message,
} from "antd";
import { useCookies } from "react-cookie";
import { MinusCircleOutlined } from "@ant-design/icons";
import callAPI from "../callAPI";
import { gotProjects } from "../../redux/actionCreators";

const { Option } = Select;
const { Title } = Typography;

function randomNum() {
  return (
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString()
  );
}

const ProjectPosted = (props) => {
  const [newProject, setnewProject] = useState(false);
  const [cookies] = useCookies("session");
  const [projid, setProjid] = useState(randomNum());
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [deadline, setDeadline] = useState();
  const [leadingMember, setLeadingMember] = useState();
  const [totalMembers, setTotalMembers] = useState({});
  let arr = [projid, title, date, deadline, leadingMember];

  let members = totalMembers;
  let membersArr = Object.values(totalMembers);

  const fetchProjects = () => {
    callAPI(cookies.session, {
      query: `query{
                  readProjects{
                    _id
                    title
                    posted_date
                    deadline
                    leading_member
                    other_members
                    completed
                    tasks{
                      member_id
                      task
                      deadline
                      completed
                  }
                }
              }`,
    })
      .then((res) => res.data.readProjects)
      .then((res) => props.gotProjects(res));
  };

  const createProject = () =>
    callAPI(cookies.session, {
      query: `mutation {
                createProject(
                    project: {
                      _id: "${projid}"
                      title: "${title}"
                      posted_date: ${date}
                      deadline: ${deadline}
                      leading_member: "${leadingMember}"
                      other_members: [${membersArr.map(
                        (mem) => '"' + mem + '"'
                      )}]
                      }
                )
              }`,
    }).then((res) => res.data.createProject);

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let list = props.employees.map((emp) => (
    <Option key={emp._id} value={emp._id}>
      {emp._id + " " + emp.first_name}
    </Option>
  ));

  return (
    <>
      <Title style={{ float: "left", color: "#878787" }} level={3}>
        Total Projects Posted
      </Title>
      <Title level={1}>{props.projects.length}</Title>
      <br />
      <Button
        type="primary"
        shape="round"
        size="large"
        onClick={() => setnewProject(true)}
      >
        Create New Project
      </Button>
      <Modal
        style={{ borderRadius: "20px" }}
        visible={newProject}
        width="580px"
        title="New Project"
        okText="Post Project"
        okButtonProps={{
          style: { backgroundColor: "#1890ff", borderRadius: 20 },
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        onOk={() => {
          if (arr.includes("") || arr.includes(undefined))
            message.warning("Fill all fields");
          else {
            createProject()
              .then((res) => {
                if (res === 1) {
                  message.success("Project Created with ID: " + projid);
                  fetchProjects();
                  setnewProject(false);
                  setProjid(randomNum());
                } else message.error("error occured");
              })
              .catch((err) => message.error(err));
          }
        }}
        onCancel={() => {
          setnewProject(false);
          setProjid(randomNum());
        }}
      >
        <Form size="middle" colon={false} labelAlign="left" layout="inline">
          <Form.Item label="ID" style={{ width: "-webkit-fill-available" }}>
            <Title level={4} className="form-items">
              {projid}
            </Title>
          </Form.Item>
          <Form.Item label="Title">
            <Input
              value={title}
              className="form-items"
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value[0] && e.target.value[1] && e.target.value[2])
                  setProjid(
                    e.target.value[0] +
                      e.target.value[1] +
                      e.target.value[2] +
                      projid.slice(3, 8)
                  );
              }}
            />
          </Form.Item>
          <Form.Item label="Date" style={{ paddingBottom: 10 }}>
            <DatePicker
              className="form-items"
              format={"DD/MM/YYYY"}
              onChange={(e) =>
                setDate(
                  parseInt((new Date(e.toDate()).getTime() / 1000).toFixed(0))
                )
              }
            />
          </Form.Item>
          <Form.Item label="Leading Member" style={{ paddingBottom: 10 }}>
            <Select
              className="form-items"
              showSearch
              style={{ width: 150 }}
              placeholder="Select a member"
              optionFilterProp="children"
              onChange={(e) => {
                setLeadingMember(e);
                if (membersArr.includes(e)) return;
                setTotalMembers(
                  Object.assign({}, totalMembers, { leadingMember: e })
                );
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {list}
            </Select>
          </Form.Item>
          <Form.Item label="Deadline">
            <DatePicker
              className="form-items"
              format={"DD/MM/YYYY"}
              onChange={(e) =>
                setDeadline(
                  parseInt((new Date(e.toDate()).getTime() / 1000).toFixed(0))
                )
              }
            />
          </Form.Item>
          <Title
            level={4}
            className="form-items"
            style={{ color: "#878787", width: "-webkit-fill-available" }}
          >
            Other members
          </Title>

          <Form.List name="users">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="start"
                    >
                      <Form.Item
                        label="Name/ID"
                        {...field}
                        name={[field.name, "name"]}
                        fieldKey={[field.fieldKey, "name"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing employee entry",
                          },
                        ]}
                      >
                        <Select
                          className="form-items"
                          showSearch
                          style={{ width: 150 }}
                          placeholder="Select a member"
                          optionFilterProp="children"
                          onChange={(e) => {
                            if (membersArr.includes(e)) return;
                            setTotalMembers(
                              Object.assign({}, totalMembers, {
                                [field.name]: e,
                              })
                            );
                          }}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {list}
                        </Select>
                      </Form.Item>
                      <MinusCircleOutlined
                        style={{
                          fontSize: 18,
                          color: "#ff0000",
                          paddingTop: 5,
                        }}
                        onClick={() => {
                          delete members[field.name];
                          setTotalMembers(members);
                          membersArr = Object.values(totalMembers);
                          console.log(totalMembers, membersArr);
                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}
                  <Button
                    shape="round"
                    style={{
                      backgroundColor: "#00ff00",
                      borderRadius: 20,
                      position: "absolute",
                      bottom: 10,
                      left: 10,
                    }}
                    onClick={() => {
                      add();
                    }}
                  >
                    Add Member
                  </Button>
                </div>
              );
            }}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  employees: state.employees,
  projects: state.projects,
});

export default connect(mapStateToProps, { gotProjects })(ProjectPosted);
