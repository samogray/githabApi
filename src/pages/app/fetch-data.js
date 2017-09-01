
const status = (response) => {
	if(response.status !== 200) {
		return Promise.reject(new Error(response.statusText))
	}
	return Promise.resolve(response)
}
const json = (response) => {
	return response.json()
}

const userData ={data: null}

export const fetchUser = (username) => {
return fetch(`https://api.github.com/users/${username}`)
		.then(status)
		.then(json)
		.then(data => ({data}))
		.catch(error => ({error}))
	}


export const fetchRepos = (username) => {
return fetch(`https://api.github.com/users/${username}/repos`)
		.then(status)
		.then(json)
		.then(data => ({data}))
		.catch(error => ({error}))
	}


