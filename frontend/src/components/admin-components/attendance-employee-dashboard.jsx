import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import callAPI from "../callAPI";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import { gotDailyAtd } from "../../redux/actionCreators";

const EmployeeCurrentAttendance = (props) => {
	const [cookies] = useCookies("session");

	useEffect(() => {
		callAPI(cookies.session, {
			query: `query{
        readDailyAtd{
            employee_id
            job_id
            date
            entry_time
            present
            leave
            penalty
  }
}`,
		}).then((res) => props.gotDailyAtd(res.data.readDailyAtd));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const data = {
		datasets: [
			{
				backgroundColor: ["#00ff00", "red"],
				data: [
					props.atd.filter((atd) => atd.present === true).length,
					props.atd.filter((atd) => atd.present === false).length,
				],
			},
		],

		labels: ["Present", "Absent"],
	};
	return (
		<>
			<Pie
				height={200}
				width={180}
				data={data}
				options={{
					maintainAspectRatio: false,
					legend: {
						align: "start",
						position: "left",
						labels: {
							boxWidth: 15,
						},
					},
					title: {
						display: true,
						text: "Total Employee Present/Absent",
						fontSize: 22,
						fontColor: "#878787",
						fontStyle: "bold",
					},
				}}
			/>
		</>
	);
};

const mapStateToProps = (state, ownProps) => ({ atd: state.dailyAtd });

export default connect(mapStateToProps, { gotDailyAtd })(
	EmployeeCurrentAttendance
);
