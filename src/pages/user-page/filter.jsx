import React from 'react';

class FilterPanel extends React.Component {

	state = {
		selectedOption: this.props.filteredLanguageValue,
		date: this.props.fiterUpdateDateValue,
		type: this.props.fiterTypeValue,
		star: this.props.filterStarValue
	}

	handleChangeLanguage = (event) => {
		//this.setState({selectedOption: event.target.value})
		this.props.filterLanguage(event.target.value)
	}
	handleChangeDate = (event) => {
		//this.setState({date: event.target.value})
		this.props.fiterUpdateDate(event.target.value)
	}
	handleChangeStar = (event) => {
		//this.setState({star: event.target.value})
		this.props.fiterStar(event.target.value)
	}
	handleTypeChange = (event) => {
		//this.setState({type: event.target.value})
		this.props.fiterType(event.target.value)
	}

	render() {
		console.log(this.props.filteredLanguageValue);
		const {languages, type} = this.props
		return <div className="user__filter">
			<div className="container">
				<fieldset className="user__filter-item">
					<legend>Languges</legend>
					<select name="language" id="language"
						value={this.props.filteredLanguageValue} onChange={this.handleChangeLanguage}>
						<option value="all" key="all">All</option>
						{languages.map((item, key) => <option value={item.toLowerCase()} key={key}>{item}</option>)}
					</select>
				</fieldset>
				<fieldset className="user__filter-item">
					<label htmlFor="issue">
						<input type="checkbox"
							id="issue"
							onChange={() => this.props.handleFilterIssue(this.props.checkedIssue)}
							checked={this.props.checkedIssue} />
						Has open issues</label>
				</fieldset>
				<fieldset className="user__filter-item">
					<label htmlFor="topic">
						Has topics
							<input type="checkbox"
							id="topic"
							onChange={() => this.props.handleFilterTopics(this.props.checkedIssue)}
							checked={this.props.checkedTopics} />
					</label>
				</fieldset>
				<fieldset className="user__filter-item">
					<label htmlFor="dateupdate">
						updated after X date	</label>
					<input type="date"
						id="dateupdate"
						value={this.props.fiterUpdateDateValue}
						onChange={this.handleChangeDate} />
				</fieldset>
				<fieldset className="user__filter-item">
					<label htmlFor="dateupdate">
					starred >= X times</label>
					<input type="number"
						value={this.props.fiterStarValue}
						onChange={this.handleChangeStar} />
				</fieldset>
				<fieldset className="user__filter-item">
					{type.map((item, key) => <label htmlFor={item.toLowerCase()} key={key}>
						{item} <input type="radio"
							id={item.toLowerCase()}
							name="type"
							value={item.toLowerCase()}
							onChange={this.handleTypeChange}
							checked={item === this.props.fiterTypeValue}/>
					</label>)}
				</fieldset>
			</div>
		</div>

	}
}
export default FilterPanel
