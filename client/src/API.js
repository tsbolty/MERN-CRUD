export default {
	getAllItems: () => fetch("/api/test"),
	updateItem: (data) =>
		fetch(`/api/test/${data.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		}),
	postItem: (data) =>
		fetch("/api/test", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		}),
	deleteItem: (id) =>
		fetch(`/api/test/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
};
