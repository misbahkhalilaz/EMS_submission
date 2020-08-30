import React, { useEffect } from "react";
import { Typography, Row, Col } from "antd";
import moment from "moment";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";
import { gotMonthlyAtd } from "../../redux/actionCreators";
import callAPI from "../callAPI";
import { useCookies } from "react-cookie";

const { Title } = Typography;

var date = moment();
date = date.format("MMMM, YYYY");

const AttendancePanel2 = (props) => {
	const data = {
		datasets: [
			{
				backgroundColor: ["#1890ff", "orange", "red"],

				data: [
					props.attendance.filter((atd) => atd.present === true).length,
					props.attendance.filter((atd) => atd.leave === true).length,
					props.attendance.filter(
						(atd) => atd.present === false && atd.leave === false
					).length,
				],
			},
		],

		labels: ["Presents", "Leaves", "Absents"],
	};

	const data1 = {
		datasets: [
			{
				backgroundColor: ["#00ff00", "#CCCC00"],

				data: [
					props.attendance.filter(
						(atd) => atd.present === true && atd.penalty === 0
					).length,
					props.attendance.filter(
						(atd) => atd.present === true && atd.penalty > 0
					).length,
				],
			},
		],

		labels: ["On Time", "Late"],
	};

	const year = new Date(Date.now()).getFullYear();
	const month = new Date(Date.now()).getMonth() + 1;

	const [cookies] = useCookies("session");
	useEffect(() => {
		callAPI(cookies.session, {
			query: `query{
            readMonthlyAtdEmp(month: ${month}, year: ${year}){
              employee_id
                job_id
                date
                entry_time
                present
                leave
                penalty
            }
          }`,
		})
			.then((res) => res.data.readMonthlyAtdEmp)
			.then((res) => props.gotMonthlyAtd(res));
	}, []);

	return (
		<>
			<Row style={{ width: "100%" }}>
				<Row style={{ width: "100%", justifyContent: "center" }}>
					<Col>
						<Title style={{ color: "#878787" }} level={3}>
							{date}
						</Title>
					</Col>
				</Row>
				<Row style={{ width: "100%", justifyContent: "center" }}>
					<Col flex="260px">
						<Pie
							height={200}
							width={230}
							data={data}
							options={{
								responsive: false,
								maintainAspectRatio: false,
								legend: {
									align: "start",
									position: "left",
									labels: {
										boxWidth: 15,
									},
								},
							}}
						/>
					</Col>
					<Col flex="260px">
						<Pie
							height={200}
							width={245}
							data={data1}
							options={{
								responsive: false,
								maintainAspectRatio: false,
								legend: {
									align: "start",
									position: "right",
									labels: {
										boxWidth: 15,
									},
								},
							}}
						/>
					</Col>
				</Row>
			</Row>
		</>
	);
};

const mapStateToProps = (state, ownProps) => ({ attendance: state.monthlyAtd });

export default connect(mapStateToProps, { gotMonthlyAtd })(AttendancePanel2);
