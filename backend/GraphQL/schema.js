const { buildSchema } = require("graphql");

const schema = buildSchema(`
		type Query {
			readDepartments: [department]
			readJobs: [job]
			readEmployees: [employee]
			readProjects: [project]
			readDailyAtd: [attendance]
			readMonthlyAtd(month: Int!, year: Int!): [attendance]
			readCurrentSalaries: [salary]
			readBio: bio!
			readJob(id: String!): job!
			readMonthlyAtdEmp(month: Int!, year: Int!): [attendance]
			readBroadcast: [broadcast]
			readProjEmp: [projectEmp]
		}

		type Mutation {
			createEmployee(employee: Employee!): Int
			createJob(job: Job!): Int
			updateJob(job: Job!): Int
			createProject(project: Project!): Int
			markLeave(id: String!): Int
			markAtd(id: String!): Int
			markTaskComp(_id: String!, assign_date: Int!, value: Boolean!): Int
			addTasks(_id: String!, tasks: [Task]!): Int
		}

		type bio {
			_id: String!,
			first_name: String!,
			last_name: String!,
			email: String!,
			joining_date: Int!,
			job_id: String!
		}

		type salary {
			employee_id: String!,
			timestamp: Int!,
			pay: Int!,
			penalty: Int!,
			total_salary: Int!
		}

		type broadcast {
			_id: String!,
			type: String!,
			msg: String!,
			date: Int!,
			eventDate: Int
		}

		type attendance {
			employee_id: String!,
			job_id: String!,
			date: Int!,
			entry_time: Int,
			present: Boolean!,
			leave: Boolean!,
			penalty: Int
		}

		input Employee {
			_id: String!,
			did: String!,
			job_id: String!,
			first_name: String!,
			last_name: String,
			mobile: String!,
			email: String!,
			address: String!,
			joining_date: Int!,
			password: String!
		}

		type employee {
			_id: String!,
			did: String!,
			job_id: String!,
			first_name: String!,
			last_name: String,
			mobile: String!,
			email: String!,
			address: String!,
			joining_date: Int!,
			password: String!
		}

		input Job {
			_id: String!,
			title: String!,
			pay: Int!,
			start_time: String!,
			exit_time: String!,
			late_charges: Int!,
			abs_charges: Int!,
		}

		type job {
			_id: String!,
			title: String!,
			pay: Int!,
			start_time: String!,
			exit_time: String!,
			late_charges: Int!,
			abs_charges: Int!,
		}

		
		input Project {
			_id: String!,
			title: String!,
			posted_date: Int!,
			deadline: Int!,
			leading_member: String!,
			other_members: [String]
		}
		

		type project {
			_id: String!,
			title: String!,
			posted_date: Int!,
			deadline: Int!,
			leading_member: String!,
			other_members: [String],
			completed: Boolean!,
			tasks: [task]
		}

		type projectEmp {
			_id: String!,
			title: String!,
			posted_date: Int!,
			deadline: Int!,
			leading_member: String!,
			other_members: [String],
			completed: Boolean!,
			tasks: [task]
			chat: [message]
		}

		

		type task {
			member_id: String!,
			task: String!,
			deadline: Int!,
			assign_date: Int!,
			completed: Boolean!
		}

		input Task {
			member_id: String!,
			task: String!,
			deadline: Int!,
			assign_date: Int!,
			completed: Boolean!
		}

		input User {
			name: String!,
			userid: String!,
			password: String!
		}

		type department {
			_id: String!,
			name: String!,
			admins: [user!]!
		}

		type message {
			message: String!,
			sender_id: String!
			sender_name: String!
			timestamp: Int!
		}

		type user {
			name: String!,
			userid: String!,
			password: String!
		}
		`);

module.exports = { schema };
