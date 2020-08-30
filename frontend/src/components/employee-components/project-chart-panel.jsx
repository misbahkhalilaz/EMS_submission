import React, { useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Typography } from "antd";
import { connect } from "react-redux";
import callAPI from "../callAPI";
import { useCookies } from "react-cookie";
import { gotProjects } from "../../redux/actionCreators";

const { Title } = Typography;
export const getProjects = (session) =>
	callAPI(session, {
		query: `query{
              readProjEmp{
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
				  assign_date
                  completed
                }
                chat{
                  message
                  sender_id
                  sender_name
                  timestamp
                }
              }
            }`,
	});

const ProjectChart = (props) => {
	const [cookies] = useCookies("session");

	const data = {
		title: "jkj",
		datasets: [
			{
				label: "Total Projects",
				backgroundColor: "rgb(0, 52, 255,0.8)",
				borderColor: "rgb(0, 52, 255,1)",
				borderWidth: 1,
				hoverBackgroundColor: "rgb(0, 52, 255,0.6)",
				hoverBorderColor: "rgb(0, 52, 255,1)",
				data: [props.projects.length, 0],
			},
			{
				label: "Projects Leaded",
				backgroundColor: "rgb(255, 151, 0,0.8)",
				borderColor: "rgb(255, 151, 0,1)",
				borderWidth: 1,
				hoverBackgroundColor: "rgb(255, 151, 0,0.6)",
				hoverBorderColor: "rgb(255, 151, 0,1)",
				data: [
					props.projects.filter((proj) => proj.leading_member === props.id)
						.length,
					0,
				],
			},
		],
	};

	useEffect(() => {
		getProjects(cookies.session).then((res) =>
			props.gotProjects(res.data.readProjEmp)
		);
	}, []);

	return (
		<>
			<Title style={{ color: "#878787" }} level={3}>
				Projects
			</Title>
			<HorizontalBar
				height={80}
				width={360}
				data={data}
				options={{
					legend: {
						align: "start",
						position: "left",
						labels: {
							boxWidth: 15,
						},
					},
				}}
			/>
		</>
	);
};

const mapStateToProps = (state, ownProps) => ({
	projects: state.projects,
	id: state.bio._id,
});

export default connect(mapStateToProps, { gotProjects })(ProjectChart);
