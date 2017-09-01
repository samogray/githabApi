export const getNextPage = (str) => {
	let nextPage ={}
	let arr = str.split(';')
	console.log('str', str)
	let iflast = str.indexOf('next') === -1 || !str 
	let page = !iflast && arr[1].slice(-2).charAt(0)
	return nextPage = {
		iflast,
		page
	}
}