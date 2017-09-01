import React, {Component} from 'react';

class FilterPanel extends React.Component {


	render() {
		const {languages} = this.props

		return <div className="user__filter">
			<div className="container">
				<fieldset className="user__filter-item">
					<legend>Languges</legend>
					<select name="language" id="language">
						<option value="all">All</option>
						{languages.map((item, key) => <option value={item} key={key}>{item}</option>)}
					</select>
				</fieldset>
					<fieldset className="user__filter-item">
						<label htmlFor="issue">
							<input type="checkbox" id="issue" />
							Has open issues</label>
					</fieldset>
					<fieldset className="user__filter-item">
						<label htmlFor="topic">
							Has topics
							<input type="checkbox" id="topic" />
						</label>
					</fieldset>
					<fieldset className="user__filter-item">
						<label htmlFor="dateupdate">
							updated after X date	</label>
						<input type="date" id="dateupdate" />
						updated after X date
		</fieldset>
					<fieldset className="user__filter-item">
						<label htmlFor="all"> All <input type="radio" id="all" name="type" /></label>
						<label htmlFor="forks"> Forks <input type="radio" id="forks" name="type" /></label>
						<label htmlFor="sources"> Sources <input type="radio" id="sources" name="type" /></label>
					</fieldset>
			</div>
			</div>

			}
}
export default FilterPanel
