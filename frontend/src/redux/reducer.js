import {
	CHANGE_IS_FETCHING,
	GOT_USER,
	GOT_ERROR,
	GOT_JOBS,
	GOT_EMPLOYEES,
	GOT_PROJECTS,
	GOT_DAILY_ATD,
	GOT_MONTHLY_ATD,
	GOT_CURRENT_SALARIES,
	GOT_BIO,
	GOT_JOB,
	GOT_BROADCASTS,
	CLEAR_STORE,
	ADD_PROJ_CHAT,
} from "./actionTypes";
import React from "react";
import { Checkbox } from "antd";
import { initState } from "./store";
import callAPI from "./../components/callAPI";
import { message } from "antd";
import store from "./store";
import chat from "../components/employee-components/chat";

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

const checkTaskComp = (id, timestamp, value) =>
	callAPI(getCookie("session"), {
		query: `
  mutation{
    markTaskComp(_id: "${id}", assign_date: ${timestamp}, value: ${value})
}`,
	}).then((res) => res.data.markTaskComp);

export default function reducer(state, action) {
	let _id = {};
	switch (action.type) {
		case CHANGE_IS_FETCHING:
			return Object.assign({}, state, { isFetching: true, error: null });
		case GOT_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.payload,
			});
		case GOT_USER:
			return Object.assign({}, state, {
				isFetching: false,
				error: null,
				user: action.payload,
			});
		case GOT_JOBS:
			return Object.assign({}, state, { jobs: action.payload });

		case GOT_EMPLOYEES:
			return Object.assign({}, state, { employees: action.payload });

		case GOT_PROJECTS:
			return Object.assign({}, state, {
				projects: action.payload.map((proj) => ({
					...proj,
					status: proj.completed
						? "Completed"
						: proj.deadline >
						  parseInt(new Date(Date.now()).getTime() / 1000 + 5 * 3600)
						? "Active"
						: "Delayed",
					tasks: proj.tasks.map((task) => ({
						...task,
						status: task.completed
							? "Completed"
							: task.deadline >
							  parseInt(new Date(Date.now()).getTime() / 1000 + 5 * 3600)
							? "Active"
							: "Delayed",
					})),
				})),
				// projChat: action.payload.map((proj) => ({
				// 	_id: proj._id,
				// 	chat: proj.chat,
				// })),
			});

		case GOT_DAILY_ATD:
			return Object.assign({}, state, { dailyAtd: action.payload });

		case GOT_MONTHLY_ATD:
			return Object.assign({}, state, { monthlyAtd: action.payload });

		case GOT_CURRENT_SALARIES:
			return Object.assign({}, state, { currentSalary: action.payload });

		case GOT_BIO: {
			_id = action.payload._id;
			return Object.assign({}, state, { bio: action.payload });
		}

		case GOT_JOB:
			return Object.assign({}, state, { job: action.payload });

		case GOT_BROADCASTS:
			return Object.assign({}, state, {
				broadcasts: action.payload.reverse(),
			});

		case ADD_PROJ_CHAT:
			return Object.assign({}, state, {
				projChat: [...state.projChat, action.payload],
			});

		case CLEAR_STORE:
			return initState;

		default:
			return state;
	}
}
