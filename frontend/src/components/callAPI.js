export default function callAPI(cookie, obj) {
	var myHeaders = new Headers();
	myHeaders.append("role", "department");
	myHeaders.append("Authorization", "Bearer " + cookie);
	myHeaders.append("Content-Type", "application/json");

	var graphql = JSON.stringify({
		...obj,
	});
	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: graphql,
		redirect: "follow",
	};

	return fetch("http://localhost:4000/", requestOptions)
		.then((response) => response.text())
		.then((result) => JSON.parse(result))
		.catch((error) => console.log("error", error));
}
