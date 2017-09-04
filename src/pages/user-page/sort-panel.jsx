import React from 'react';

class SortPanel extends React.Component {

	state = {
		sortType: this.props.sortTypeValue,
	}
	handleTypeChange = (event) => {
		this.props.SortType(event.target.value)
	}
	render() {
		const {sortType} = this.props
		console.log('state child', this.props.sortTypeValue.toLowerCase())
		
		return <div className="user__filter user__filter_sort">
			<div className="container">
				<fieldset className="user__filter-item">
				<legend>Sorting by list</legend>
				{sortType.map((item, key) => <label htmlFor={item.id.toLowerCase()} key={key}>
				{item.title} <input type="radio"
					id={item.id.toLowerCase()}
					name="sort"
					value={item.id.toLowerCase()}
					onChange={this.handleTypeChange}
					checked={item.id.toLowerCase() === this.props.sortTypeValue.toLowerCase()}/>
			</label>)}
				</fieldset>
			</div>
		</div>

	}
}
export default SortPanel
