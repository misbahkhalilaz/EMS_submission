import React from "react";
import Clock from "react-live-clock";
import "antd/dist/antd.css";
import { Typography, Row, Col, Button, message } from "antd";
import { connect } from "react-redux";
import callAPI from "../callAPI";
import { useCookies } from "react-cookie";
import { gotMonthlyAtd } from "../../redux/actionCreators";

const { Title } = Typography;

const year = new Date(Date.now()).getFullYear();
const month = new Date(Date.now()).getMonth() + 1;

const AttendancePanel1 = (props) => {
	const [cookies] = useCookies("session");

	return (
		<>
			<Row>
				<Col offset={3} span={8}>
					<label style={{ fontSize: 13 }}>Time</label>
					<Title level={2}>
						<Clock
							format="hh:mm a"
							interval={60000}
							ticking={true}
							timezone="Asia/Karachi"
						/>
					</Title>
				</Col>
				<Col offset={2} span={9}>
					<label style={{ color: "#878787", fontSize: 13 }}>Date</label>
					<Title style={{ color: "#878787" }} level={2}>
						<Clock format="D MM YYYY" interval={8.64e7} ticking={true} />
					</Title>
				</Col>
			</Row>
			<Row>
				<Col offset={3} span={8}>
					<label style={{ fontSize: 13 }}>Entrance Time</label>
					<Title level={2}>{props.job.start_time}</Title>
				</Col>
				<Col offset={2} span={9}>
					<label style={{ color: "#878787", fontSize: 13 }}>Exit Time</label>
					<Title style={{ color: "#878787" }} level={2}>
						{props.job.exit_time}
					</Title>
				</Col>
			</Row>
			<Row>
				<Col offset={5} span={16}>
					<Button
						style={{
							backgroundColor: "#1890ff",
							borderColor: "#1890ff",
							color: "white",
						}}
						shape="round"
						size="large"
						onClick={() =>
							callAPI(cookies.session, {
								query: `mutation{
                          markAtd(id: "${props.bio._id}")
                        }`,
							})
								.then((res) => res.data.markAtd)
								.then((res) => {
									if (res === 1) {
										message.success("Marked attendance, ID: " + props.bio._id);
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
									} else message.warning("already marked");
								})
						}
					>
						Mark Attendance
					</Button>
				</Col>
			</Row>
		</>
	);
};

const mapStateToProps = (state, ownProps) => ({
	bio: state.bio,
	job: state.job,
});

export default connect(mapStateToProps, { gotMonthlyAtd })(AttendancePanel1);
