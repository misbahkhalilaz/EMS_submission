import React, { useState, useEffect } from "react";
import {
	Row,
	Col,
	Typography,
	Button,
	Table,
	Input,
	Menu,
	Select,
	Space,
} from "antd";
import { connect } from "react-redux";
import { gotCurrentSalaries } from "../redux/actionCreators";
import { useCookies } from "react-cookie";
import callAPI from "../components/callAPI";
import { DownOutlined } from "@ant-design/icons";
import moment from "moment";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const columns = [
	{
		title: "Empoyee ID",
		dataIndex: "employee_id",
	},

	{
		title: "Basic Salary",
		dataIndex: "pay",
	},
	{
		title: "Penalty",
		dataIndex: "penalty",
	},
	{
		title: "Total",
		dataIndex: "total_salary",
	},
];

const AdminSalary = (props) => {
	const [cookies] = useCookies("session");
	const [data, setData] = useState(props.salaries);

	useEffect(() => {
		callAPI(cookies.session, {
			query: `query{
				readCurrentSalaries{
					employee_id
					timestamp
					pay
					penalty
					total_salary
				}
				}`,
		}).then((res) => {
			// setData(res);
			props.gotCurrentSalaries(res.data.readCurrentSalaries);
		});
	}, []);

	return (
		<Row style={{ padding: "30px 20px" }}>
			<Col span={24} className="col-display">
				<Title style={{ float: "left", color: "#878787" }} level={3}>
					Current Month Salaries
				</Title>
				<div style={{ float: "right", display: "inline-block" }}>
					<Space>
						<Select
							className="form-items"
							showSearch
							style={{ width: 140 }}
							optionFilterProp="children"
							onChange={(e) => {
								if (e === "clear") setData(props.salaries);
								else
									setData(
										props.salaries.filter((data) => data.employee_id === e)
									);
							}}
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							{[
								<Option key="clear" value="clear">
									{" "}
								</Option>,
								...props.employee.map((data) => (
									<Option key={data._id} value={data._id}>
										{data._id + " " + data.first_name}
									</Option>
								)),
							]}
						</Select>
					</Space>
				</div>
				<br />
				<Table
					columns={columns}
					dataSource={data}
					size="middle"
					pagination={false}
					scroll={{ y: 450 }}
				/>
			</Col>
		</Row>
	);
};

const mapStateToProps = (state, ownProps) => ({
	salaries: state.currentSalary,
	employee: state.employees,
});

export default connect(mapStateToProps, { gotCurrentSalaries })(AdminSalary);
