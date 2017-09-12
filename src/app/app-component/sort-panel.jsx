import React from 'react'
import Icon from './../../components/icon'
const sortType = [
	{
		title: 'None',
		id: 'noneSort'
	},
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
	}
]

class SortPanel extends React.Component {
	state = {
		reverseEnable: false
	}
	handleTypeChange = (event) => {
		this.props.SortType(event.target.value)
		event.target.value === "nonesort" ? this.setState({reverseEnable: false}) : this.setState({reverseEnable: true})
	}
	reverseSort = (event) => {
		this.props.reverseSort(event.target.checked)
	}
	render() {
		return <div className="user__filter">
			<h3 className="user__filter-title">Sorting by list</h3>
			<div className="container">
				<div className="user__filter-item user__filter-item_flex">
					<select className="user__input user__input_text user__input_width-auto" onChange={this.handleTypeChange}>
						{sortType.map((item, key) => <option value={item.id.toLowerCase()} key={key}>{item.title}</option>)}
					</select>
					{this.state.reverseEnable && <div className="checkbox checkbox_icon">
						<input type="checkbox" id="reverse" onChange={this.reverseSort} className="checkbox__input" />
						<label htmlFor="reverse" className="checkbox__label" title="reverse">
							<Icon name="sort-ico" />
						</label>
					</div>}
				</div>
			</div>
		</div>

	}
}
export default SortPanel
