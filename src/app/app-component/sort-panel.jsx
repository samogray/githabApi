import React from 'react'
const sortType = [
	{
		title: 'repo name',
		id: 'repoSort'
	},
	{
		title: 'stars count',
		id: 'starSort'
	},
	{
		title: 'open issues count',
		id: 'issueSort'
	},
	{
		title: 'updated date',
		id: 'dateSort'
	},
	{
		title: 'None',
		id: 'noneSort'
	}
]

class SortPanel extends React.Component {
	handleTypeChange = (event) => {
		this.props.SortType(event.target.value)
	}
	reverseSort = (event) => {
		this.props.reverseSort(event.target.checked)
	}
	render() {
		return <div className="user__filter user__filter_sort">
			<div className="container">
				<fieldset className="user__filter-item user__filter-item_full">
					<legend>Sorting by list</legend>
					{sortType.map((item, key) => <div className="user__filter-item user__filter-item_nomargin" key={key}>
						<input type="radio"
							id={item.id.toLowerCase()}
							name="sort"
							value={item.id.toLowerCase()}
							onChange={this.handleTypeChange}
							checked={item.id.toLowerCase() === this.props.sortTypeValue.toLowerCase()} />
						<label htmlFor={item.id.toLowerCase()} key={key}>{item.title} </label></div>)}
					<div className="user__filter-item user__filter-item_nomargin">
						<input type="checkbox" id="reverse" onChange = {this.reverseSort}/>
						<label htmlFor="reverse">Revers sort</label>
					</div>
				</fieldset>
			</div>
		</div>

	}
}
export default SortPanel
