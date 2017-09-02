import {getNextPage} from './next-page'

const status = (response) => {
	if(response.status !== 200) {
		return Promise.reject(new Error(response.statusText))
	}

	return Promise.resolve(response)
}
const json = (response) => {
	const link = response.headers.get('Link')
	const nextPage = getNextPage(link)
	return Promise.all([response.json(), nextPage])
}


export const fetchUser = (username) => {
	return fetch(`https://api.github.com/users/${username}`)
		.then(status)
		.then(json)
		.then(data => ({data: data[0]}))
		.catch(error => ({error}))
}


export const fetchRepos = (username, page) => {
	return fetch(`https://api.github.com/users/${username}/repos?page=${page}`)
		.then(status)
		.then(json)
		.then(([data, nextPage]) => ({data, nextPage}))
		.catch(error => ({error}))
}

