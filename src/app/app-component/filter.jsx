import React from 'react';
const types = ['all', 'forks', 'sources']

class FilterPanel extends React.Component {


	handleChangeLanguage = (event) => {
		if(event.target.value === 'all') {
			this.props.resetFilter('language')
			return
		}
		this.props.setFilter({language: event.target.value})
	}
	handleFilterIssue = (event) => {
		if(!event.target.checked) {
			this.props.resetFilter('issue')
			return
		}
		this.props.setFilter({issue: event.target.checked})
	}
	handleChangeDate = (event) => {
		if(event.target.value === '') {
			this.props.resetFilter('date')
			return
		}
		this.props.setFilter({date: event.target.value})
	}
	handleChangeStar = (event) => {
		if(event.target.value === '0') {
			this.props.resetFilter('stars')
			return
		}
		this.props.setFilter({stars: event.target.value})
	}
	handleTypeChange = (event) => {
		if(event.target.value === 'all') {
			this.props.resetFilter('type')
			return
		}
		this.props.setFilter({type: event.target.value})
	}
	handleFilterTopics = (event) => {
		if(!event.target.checked) {
			this.props.resetFilter('topics')
			return
		}
		this.props.setFilter({topics: event.target.checked})
	}

	render() {
		const {languages} = this.props
		const {language, issue, topics, date, type = 'all', stars} = this.props.filter
		return <div className="user__filter">
			<h3 className="user__filter-title">Filters</h3>
			<div className="container">
				<fieldset className="user__filter-item">
					<legend className="user__label">Languges</legend>
					<select name="language"
						id="language"
						className="user__input user__input_text"
						value={language}
						onChange={this.handleChangeLanguage}>
						<option value="all" key="all">All</option>
						{languages.map((item, key) => <option value={item.toLowerCase()} key={key}>{item}</option>)}
					</select>
				</fieldset>
				<fieldset className="user__filter-item">
					<legend className="user__label">Updated after X date</legend>
					<input type="date"
						id="dateupdate"
						value={date}
						className="user__input user__input_text"
						onChange={this.handleChangeDate} />
				</fieldset>
				<fieldset className="user__filter-item">
					<legend className="user__label">Starred >= X times</legend>
					<input type="number"
						value={stars}
						className="user__input user__input_text"
						onChange={this.handleChangeStar} />
				</fieldset>
				<fieldset className="user__filter-item">
					{types.map((item, key) => <div className="user__filter-item user__filter-item_nomargin" key={key}>
						<input type="radio"
							id={item.toLowerCase()}
							name="type"
							value={item}
							onChange={this.handleTypeChange}
							checked={item === type} />
						<label htmlFor={item.toLowerCase()} key={key}> {item} </label>
					</div>)}
				</fieldset>
				<fieldset className="user__filter-item">
					<label htmlFor="issue">
						<input type="checkbox"
							id="issue"
							onChange={this.handleFilterIssue}
							checked={issue} />
						Has open issues</label>
				</fieldset>
				<fieldset className="user__filter-item">
					<label htmlFor="topic">
						Has topics
						<input type="checkbox"
							id="topic"
							onChange={this.handleFilterTopics}
							checked={topics} />
					</label>
				</fieldset>
			</div>
		</div>

	}
}
export default FilterPanel
