export const getNextPage = (str) => {
	let nextPage = {}
	if (!str) {
		return nextPage = {
			iflast: true,
			page: 1
		}
	}
	let arr =  str.split(';')
	let iflast = str.indexOf('next') === -1 || !str 
	let page = !iflast && arr[0].slice(-2).charAt(0)
	return nextPage = {
		iflast,
		page
	}
}