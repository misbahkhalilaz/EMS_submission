import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { CookiesProvider } from "react-cookie";
import store from "./redux/store";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "./components/employee-components/main-theme.css";
import "./components/employee-components/month-table-css.css";
import "./components/employee-components/broadcast.css";

ReactDOM.render(
	<Provider store={store}>
		<CookiesProvider>
			<App />
		</CookiesProvider>
	</Provider>,
	document.getElementById("root")
);
