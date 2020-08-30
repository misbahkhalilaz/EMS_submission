import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reducer from "./reducer";

const logger = createLogger();

export const initState = {
	isFetching: false,
	error: null,
	user: {
		userid: null,
		name: null,
		role: null,
	},
	jobs: [{}],
	employees: [{ _id: "", first_name: "", last_name: "" }],
	projects: [{ tasks: [], other_members: [""] }],
	dailyAtd: [{}],
	monthlyAtd: [{}],
	currentSalary: [{}],
	bio: { first_name: "loading..", last_name: "please wait" },
	job: {},
	broadcasts: [{ msg: "loading..." }],
	projChat: [],
};

const store = createStore(reducer, initState, applyMiddleware(logger));

export default store;
