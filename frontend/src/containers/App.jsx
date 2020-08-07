import React from "react";
import LoginForm from "../components/loginForm";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { gotError } from "../redux/actionCreators";
import AppAdmin from "./admin";
import Employee from "./employee";

function App(props) {
	const [cookies, setCookie, removeCookie] = useCookies(["session", "role"]);

	if (cookies.session)
		if (cookies.role === "department")
			return <AppAdmin logout={removeCookie} />;
		else if (cookies.role === "employee") return <Employee />;

	return <LoginForm cookies={cookies} setCookie={setCookie} />;
}

const mapStateToProps = (state, ownProps) => ({
	error: state.error,
});

export default connect(mapStateToProps, { gotError })(App);
