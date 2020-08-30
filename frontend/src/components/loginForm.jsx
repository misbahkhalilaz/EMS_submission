import React, { useState } from "react";
import img from "./loginpage.jpg";
import {
	Row,
	Col,
	Typography,
	Input,
	Button,
	Divider,
	message,
	Form,
} from "antd";
import { connect } from "react-redux";
import { changeIsFetching, gotUser, gotError } from "../redux/actionCreators";
import "./employee-components/main-theme.css";

const { Title } = Typography;

function LoginForm(props) {
	const [id, setId] = useState("");
	const [pass, setPass] = useState("");
	const loginApi = (credentials, role) => {
		const requestOptions = {
			method: "GET",
			headers: {
				role: role,
				Authorization: "Basic " + btoa(credentials),
				"Content-Type": "application/json",
			},
			redirect: "follow",
		};
		props.changeIsFetching(true);
		fetch("http://localhost:4000/", requestOptions)
			.then((response) => response.text())
			.then((res) => JSON.parse(res))
			.then((result) => {
				if (result.user) {
					props.gotUser(result.user);
					props.setCookie("session", result.token, { path: "/" });
					props.changeIsFetching(false);
					if (result.user.first_name)
						message.success("Welcome " + result.user.first_name);
					else message.success("Welcome " + result.user.userid);
				} else {
					props.changeIsFetching(false);
					message.error(result);
				}
			})
			.catch((error) => {
				props.gotError(JSON.stringify(error));
			});
	};
	return (
		<>
			<Row justify="space-around" align="middle" style={{ minHeight: "100vh" }}>
				<Col span={17}>
					<img
						src={img}
						width="100%"
						height="100%"
						unselectable="on"
						draggable="false"
					></img>
				</Col>
				<Col span={6} pull={1} style={{ textAlign: "center" }}>
					<Title level={3} className="basic-title-color">
						Welcome to EMS
					</Title>
					<div
						style={{
							width: 250,
							margin: "0 auto",
							padding: 20,
							boxShadow:
								"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
							borderRadius: 20,
							textAlign: "center",
						}}
					>
						<Form.Item label="UserID" name="UserID">
							<Input
								className="form-items"
								style={{ marginBottom: 10, borderRadius: "20px" }}
								onChange={(e) => setId(e.target.value)}
							/>
						</Form.Item>
						<Form.Item label="Password" name="Password">
							<Input.Password
								className="form-items"
								style={{ marginBottom: 20, borderRadius: "20px" }}
								onChange={(e) => setPass(e.target.value)}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								style={{ borderRadius: 10 }}
								onClick={() => {
									if (id.length > 0 && pass.length > 0) {
										props.setCookie("role", "employee", { path: "/" });
										loginApi(id + ":" + pass, "employee");
									} else message.warning("Input credentials");
								}}
							>
								SignIn
							</Button>
						</Form.Item>
						<Divider>or</Divider>
						<Form.Item>
							<Button
								type="primary"
								style={{ borderRadius: 10 }}
								onClick={() => {
									if (id.length > 0 && pass.length > 0) {
										props.setCookie("role", "department", { path: "/" });
										loginApi(id + ":" + pass, "department");
									} else message.warning("Input credentials");
								}}
							>
								Admin SignIn
							</Button>
						</Form.Item>
					</div>
				</Col>
			</Row>
		</>
	);
}

const mapStateToProps = (state, ownProps) => ({
	cookies: ownProps.cookies,
	isFetching: state.isFetching,
	user: state.user,
	setCookie: ownProps.setCookie,
	error: state.error,
});

export default connect(mapStateToProps, {
	changeIsFetching,
	gotUser,
	gotError,
})(LoginForm);
