import React from "react";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";

const TotalProjects = (props) => {
	const data = {
		datasets: [
			{
				backgroundColor: ["#CCCC00", "#ff9700", "#00ff00"],
				data: [
					props.projects.filter(
						(proj) =>
							proj.completed === false &&
							proj.deadline >
								parseInt((new Date(Date.now()).getTime() / 1000).toFixed(0))
					).length,
					props.projects.filter(
						(proj) =>
							proj.completed === false &&
							proj.deadline <
								parseInt((new Date(Date.now()).getTime() / 1000).toFixed(0))
					).length,
					props.projects.filter((proj) => proj.completed === true).length,
				],
			},
		],

		labels: ["Total Active", "Total Delayed", "Total Completed"],
	};

	return (
		<>
			<Pie
				height={160}
				width={120}
				data={data}
				options={{
					maintainAspectRatio: false,
					legend: {
						align: "start",
						position: "right",
						labels: {
							boxWidth: 15,
						},
					},
					title: {
						display: true,
						text: "Total Projects",
						fontSize: 22,
						fontColor: "#878787",
						fontStyle: "bold",
					},
				}}
			/>
		</>
	);
};

const mapStateToProps = (state, ownProps) => ({
	projects: state.projects,
});

export default connect(mapStateToProps)(TotalProjects);
