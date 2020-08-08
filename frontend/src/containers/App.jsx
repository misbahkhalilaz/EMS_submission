import React, { useEffect } from "react";
import LoginForm from "../components/loginForm";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { gotError, gotBroadcasts } from "../redux/actionCreators";
import AppAdmin from "./admin";
import Employee from "./employee";
import io from "socket.io-client";
import callAPI from "../components/callAPI";
export const socket = io.connect("localhost:4000");

function App(props) {
	const [cookies, setCookie, removeCookie] = useCookies(["session", "role"]);

	let rcvBroadcasts = () =>
		callAPI(cookies.session, {
			query: `query{
						readBroadcast{
							_id
							type
							msg
							date
							eventDate
						}
					}`,
		}).then((bc) => props.gotBroadcasts(bc.data.readBroadcast));

	useEffect(() => {
		rcvBroadcasts();
		socket.on("rcv_broadcast", () => {
			rcvBroadcasts();
		});
	}, []);

	if (cookies.session)
		if (cookies.role === "department")
			return <AppAdmin logout={removeCookie} />;
		else if (cookies.role === "employee") return <Employee />;

	return <LoginForm cookies={cookies} setCookie={setCookie} />;
}

const mapStateToProps = (state, ownProps) => ({
	error: state.error,
});

export default connect(mapStateToProps, { gotError, gotBroadcasts })(App);
