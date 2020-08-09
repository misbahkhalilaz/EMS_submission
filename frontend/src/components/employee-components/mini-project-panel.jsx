import React from "react";
import "antd/dist/antd.css";
import { Descriptions, Typography } from "antd";
import { connect } from "react-redux";

const { Title, Paragraph } = Typography;

const MiniProjectDetails = (props) => {
	// console.log(props.projects.filter((proj) => proj.completed === "false"));
	return (
		<>
			<div className="miniproject-panel-body scrollbar scrollbar-info">
				<Descriptions
					title={
						<Title style={{ color: "#878787", margin: 0 }} level={3}>
							Active Projects
						</Title>
					}
					size="middle"
					colon={false}
				>
					{props.projects
						.filter((proj) => proj.completed === false)
						.map((proj) => (
							<Descriptions.Item
								style={{ borderRadius: 20, padding: 0, background: "white" }}
								label={<Title level={3}>{proj.title}</Title>}
							>
								<Paragraph strong style={{ paddingLeft: 5 }}>
									Status:{"      "}
									{proj.deadline >
									parseInt(new Date(Date.now()).getTime() / 1000 + 5 * 3600)
										? "Active"
										: "Delayed"}
									<br /> Deadline: {"  "}
									{new Date(proj.deadline * 1000).toLocaleDateString("en-US")}
								</Paragraph>
							</Descriptions.Item>
						))}
				</Descriptions>
			</div>
		</>
	);
};

const mapStateToProps = (state, ownProps) => ({ projects: state.projects });

export default connect(mapStateToProps)(MiniProjectDetails);
