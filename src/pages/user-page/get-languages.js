export const getLanguages = (repos) => {
	const arr = repos ? repos.reduce((result, item) => {
		return [...result, item.language]
	}, []) : ''
	const unique = (arr) => {
		var obj = {};
		for(var i = 0;i < arr.length;i++) {
			arr[i] === null ? arr[i] = "None" : arr[i]
			var str = arr[i]
			obj[str] = true
		}
		return Object.keys(obj);
	}
	return unique(arr)
}