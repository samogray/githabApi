import React from 'react';

class FilterPanel extends React.Component {

	state = {
		selectedOption: this.props.filteredLanguageValue,
		date: this.props.fiterUpdateDateValue,
		type: this.props.fiterTypeValue,
		star: this.props.filterStarValue
	}

	handleChangeLanguage = (event) => {
		this.props.filterLanguage(event.target.value)
	}
	handleFilterIssue = (event) => {
		this.props.handleIssue(event.target.checked)
	}
	handleChangeDate = (event) => {
		this.props.fiterUpdateDate(event.target.value)
	}
	handleChangeStar = (event) => {
		this.props.fiterStar(event.target.value)
	}
	handleTypeChange = (event) => {
		this.props.fiterType(event.target.value)
	}
	handleFilterTopics = (event) => {
		this.props.FilterTopics(event.target.checked)
	}

	render() {
		console.log(this.props.filteredLanguageValue);
		const {languages, type} = this.props
		const {filterLanguage, filterIssue, filterTopics, filterDateUdate, fiterType, filterStar} = this.props.filter
		return <div className="user__filter">
			<div className="container">
				<fieldset className="user__filter-item">
					<legend>Languges</legend>
					<select name="language" id="language"
						value={filterLanguage} onChange={this.handleChangeLanguage}>
						<option value="all" key="all">All</option>
						{languages.map((item, key) => <option value={item.toLowerCase()} key={key}>{item}</option>)}
					</select>
				</fieldset>
				<fieldset className="user__filter-item">
				<legend>Updated after X date</legend>
					<input type="date"
						id="dateupdate"
						value={this.props.fiterUpdateDateValue}
						onChange={this.handleChangeDate} />
				</fieldset>
				<fieldset className="user__filter-item">
				<legend>starred >= X times</legend>
					<input type="number"
						value={this.props.fiterStarValue}
						onChange={this.handleChangeStar} />
				</fieldset>
				<fieldset className="user__filter-item">
					{type.map((item, key) => <div className="user__filter-item user__filter-item_nomargin">
						<input type="radio"
							id={item.toLowerCase()}
							name="type"
							value={item.toLowerCase()}
							onChange={this.handleTypeChange}
							checked={item === fiterType}/>
							<label htmlFor={item.toLowerCase()} key={key}> {item} </label>
				</div>)}
				</fieldset>
				<fieldset className="user__filter-item">
				<label htmlFor="issue">
					<input type="checkbox"
						id="issue"
						onChange={this.handleFilterIssue}
						checked={filterIssue} />
					Has open issues</label>
			</fieldset>
			<fieldset className="user__filter-item">
				<label htmlFor="topic">
					Has topics
						<input type="checkbox"
						id="topic"
						onChange={this.handleFilterTopics}
						checked={filterTopics} />
				</label>
			</fieldset>
			</div>
		</div>

	}
}
export default FilterPanel
