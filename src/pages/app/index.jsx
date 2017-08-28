import React, {Component} from 'react';
import './App.scss';
import Icon from './../../components/icon'
import classNames from 'classnames'
import SearchResult from './search-result'
import {Link} from 'react-router'
import {fetchUser} from './fetch-data'

class App extends Component {

	state = {
		value: '',
		data: null
	}


	handleChange = (event) => {
		this.setState({value: event.target.value})
		if((event.charCode === 13) || (event.keyCode === 13)) {
			this.fetchUser()
		}
	}

	clearInput = () => this.setState({value: '', data: null})

	
	fetchUser = () => fetchUser(this.state.value, (data) => {
		this.setState({data})
	})

	render() {
		console.log(this.state.data)
		const userData = this.state.data
		return (
			<div className="app">
				<h1 className="app__title">Search Github user</h1>
				<div className="search">
					<div className="search__input-wrapper">
						<input type="text"
							className="search__input"
							onChange={this.handleChange}
							onKeyDown={this.handleChange}
							value={this.state.value}
							placeholder="Type username..." />
						<button className={classNames('search__clear', this.state.value !== '' && 'search__clear_active')}
							title="clear"
							onClick={this.clearInput}>
							<Icon name="clear-ico" />
						</button>
					</div>
					<button className="search__button" onClick={this.fetchUser} title="Search">Search</button>
					{this.state.data !== null && <SearchResult
						name={userData.name}
						avatar={userData.avatar_url}
						facebook={userData.blog}
						location={userData.location}
						url={userData.html_url} />}
				</div>
			</div>
		);
	}
}

export default App;
