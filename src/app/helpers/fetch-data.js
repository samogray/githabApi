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
	return fetch(`https://api.github.com/users/${username}`, 
	{
		headers: {
			'Accept': 'application/vnd.github.mercy-preview+json',
			'Content-Type': 'application/json'
		}
	})
		.then(status)
		.then(json)
		.then(data => ({data: data[0]}))
		.catch(error => ({error}))
}


export const fetchRepos = (username, page) => {
	return fetch(`https://api.github.com/users/${username}/repos?page=${page}`,
	{
		headers: {
			'Accept': 'application/vnd.github.mercy-preview+json',
			'Content-Type': 'application/json'
		}
	})
		.then(status)
		.then(json)
		.then(([data, nextPage]) => ({data, nextPage}))
		.catch(error => ({error}))
}

export const fetchReposInfo = (reposName, username) => {
	return fetch(`https://api.github.com/repos/${username}/${reposName}`)
		.then(status)
		.then(json)
		.then(([data, nextPage]) => ({data, nextPage}))
		.catch(error => ({error}))
}

export const fetchContributorInfo = (reposName, username) => {
	return fetch(`https://api.github.com/repos/${username}/${reposName}/contributors?per_page=3`)
		.then(status)
		.then(json)
		.then(([data, nextPage]) => ({data, nextPage}))
		.catch(error => ({error}))
}

export const fetchPrInfo = (reposName, username) => {
	return fetch(`https://api.github.com/repos/${username}/${reposName}/pulls?per_page=5`)
		.then(status)
		.then(json)
		.then(([data, nextPage]) => ({data, nextPage}))
		.catch(error => ({error}))
}

export const fetchLanguagesInfo = (reposName, username) => {
	return fetch(`https://api.github.com/repos/${username}/${reposName}/languages`)
		.then(status)
		.then(json)
		.then(([data, nextPage]) => ({data, nextPage}))
		.catch(error => ({error}))
}

