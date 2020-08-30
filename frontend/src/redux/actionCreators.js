import {
	GOT_USER,
	CHANGE_IS_FETCHING,
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
// import store from "./store";

export const changeIsFetching = () => ({
	type: CHANGE_IS_FETCHING,
});

export const gotUser = (user) => ({
	type: GOT_USER,
	payload: user,
});

export const gotError = (err) => ({
	type: GOT_ERROR,
	payload: err,
});

export const gotJobs = (jobs) => ({
	type: GOT_JOBS,
	payload: jobs,
});

export const gotEmployees = (employees) => ({
	type: GOT_EMPLOYEES,
	payload: employees,
});

export const gotProjects = (projects) => ({
	type: GOT_PROJECTS,
	payload: projects,
});

export const gotDailyAtd = (atd) => ({
	type: GOT_DAILY_ATD,
	payload: atd,
});

export const gotMonthlyAtd = (atd) => ({
	type: GOT_MONTHLY_ATD,
	payload: atd,
});

export const gotCurrentSalaries = (salaries) => ({
	type: GOT_CURRENT_SALARIES,
	payload: salaries,
});

export const gotBio = (bio) => ({
	type: GOT_BIO,
	payload: bio,
});

export const gotJob = (job) => ({
	type: GOT_JOB,
	payload: job,
});

export const gotBroadcasts = (broadcasts) => ({
	type: GOT_BROADCASTS,
	payload: broadcasts,
});

export const clearStore = () => ({ type: CLEAR_STORE });

export const addProjChat = (_id, msg) => {
	return {
		type: ADD_PROJ_CHAT,
		payload: { _id, message: msg },
	};
};
