export const DataParse = (date) => {

	const optionsYear = {
		year: 'numeric',
		day: 'numeric',
		month: 'short'
	}
	const optionsMonth = {
		day: 'numeric',
		month: 'short'
	}
	const repdata = new Date(date)
	const currenDate = new Date()

	const fullYear = currenDate.getFullYear() - repdata.getFullYear()
	console.log(fullYear)

	const resultYear = Math.floor((currenDate - repdata) / 31536000000)
	const resultMonth = Math.floor((currenDate - repdata) / 2592000000)
	const resultDay = Math.floor((currenDate - repdata) / 86400000)
	const resultHour = Math.floor((currenDate - repdata) / 3600000)
	const resultMinute = Math.floor((currenDate - repdata) / 60000)
	const resultsecound = Math.floor((currenDate - repdata) / 1000)

	if(fullYear >= 1) {
		return `Updated on ${repdata.toLocaleString("en-GB", optionsYear)}`
	}
	else if(resultMonth > 0 && resultYear <= 0) {
		if(resultMonth === 1) {
			return `Updated an month ago`
		}
		else return `Updated on ${repdata.toLocaleString("en-GB", optionsMonth)}`
	}
	else if(resultDay > 0 && resultYear <= 0 && resultMonth <= 0) {
		if(resultDay === 1) {
			return `Updated an day ago`
		}
		return `Updated ${resultDay} days ago`
	}
	else if(resultHour > 0) {
		if(resultHour === 1) {
			return `Updated an hour ago`
		}
		return `Updated ${resultHour} hours ago`
	}
	else if(resultMinute > 0) {
		if(resultMinute === 1) {
			return `Updated an minute ago`
		}
		return `Updated ${resultMinute} minutes ago`
	}
	else return `Updated ${resultsecound} secounds ago`
}