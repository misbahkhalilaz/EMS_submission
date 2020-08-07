import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Card, Avatar, Divider, Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";
import callAPI from "../callAPI";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { gotBio, gotJob } from "../../redux/actionCreators";

const { Meta } = Card;

function Bio(props) {
	const [cookies] = useCookies("session");

	useEffect(() => {
		callAPI(cookies.session, {
			query: `query{
              readBio{
                _id
                first_name
                last_name
                email
                joining_date
                job_id
              }
            }`,
		})
			.then((res) => res.data.readBio)
			.then((bio) =>
				callAPI(cookies.session, {
					query: `query{
  						readJob(id: "${bio.job_id}"){
    						_id
							title
							pay
							start_time
							exit_time
							late_charges
							abs_charges
						}
				}`,
				})
					.then((job) => job.data.readJob)
					.then((job) => {
						props.gotBio(Object.assign({}, bio, { job_title: job.title }));
						props.gotJob(job);
					})
			);
	}, []);

	return (
		<div
			style={{
				padding: "15px",
			}}
		>
			<Meta
				avatar={<Avatar size={60} icon={<UserOutlined />} />}
				title={props.bio.first_name + " " + props.bio.last_name}
				description={props.bio.email}
			/>

			<Divider style={{ paddingLeft: 100, border: "1px solid DodgerBlue" }} />
			<Descriptions column={1} colon={false}>
				<Descriptions.Item label="Employee Code:">
					{props.bio._id}
				</Descriptions.Item>

				<Descriptions.Item label="Job Title:">
					{props.bio.job_title}
				</Descriptions.Item>
				<Descriptions.Item label="Join Date:">
					{new Date(props.bio.joining_date * 1000).toLocaleDateString("en-US")}
				</Descriptions.Item>
			</Descriptions>
		</div>
	);
}

const mapStateToProps = (state, ownProps) => ({ bio: state.bio });

export default connect(mapStateToProps, { gotBio, gotJob })(Bio);
