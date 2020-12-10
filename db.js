//User Schema
//Each User resource should conform to the following structure (AKA schema):

// {
//   id: "a_unique_id", // hint: use the shortid npm package to generate it
//   name: "Jane Doe", // String, required
//   bio: "Not Tarzan's Wife, another Jane",  // String, required
// }
let users = [
	{ id: "1", name: "Jane Doe", bio: "Not Tarzan's Wife, another Jane" },
	{ id: "2", name: "John Doe", bio: "36 feeling young and restless" },
	{ id: "3", name: "Jack Doe", bio: "me againg! :)" },
]
const shortid = require("shortid");
function getUsers() {
	return users
}

function getUserById(id) {
	return users.find(u => u.id === id)
}

function createUser(data) {
	const payload = {
		id: shortid.generate(),
		//id: String(users.length + 1),
		...data,
	}

	users.push(payload)
	return payload
}

function updateUser(id, data) {
	const index = users.findIndex(u => u.id === id)
	users[index] = {
		...users[index],
		...data,
	}
	
	return users[index]
}

function deleteUser(id) {
	users = users.filter(u => u.id != id)
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}