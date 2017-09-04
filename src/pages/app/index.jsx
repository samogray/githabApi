import React, {Component} from 'react';
import './App.scss';
import Icon from './../../components/icon'
//import Loading from './../../components/loading'
import classNames from 'classnames'
import {browserHistory} from 'react-router'
import {fetchUser} from './fetch-data'


class App extends Component {

	state = {
		value: '',
		error: false,
		data: null,
		link: ''
	}

	handleChange = (event) => {
		this.setState({value: event.target.value})
		if((event.charCode === 13) || (event.keyCode === 13)) {
			this.fetchUser()
		}
		this.state.error && this.setState({data: null, error: false})
	}

	clearInput = () => this.setState({value: '', data: null, error: false})
	goLink = (link) => browserHistory.push(`/${link}`)

	fetchUser = () => fetchUser(this.state.value).then(({data = null, error}) => {
		this.setState({data, error})
		!this.state.error && this.goLink(data.login)
	})

	render() {
		return (
		 <div className="app">
				<h1 className="app__title">Search Github user</h1>
				<div className="search">
					<div className="search__input-wrapper">
						{this.state.error && <div className="search__tooltip">Sorry, not found</div>}
						<input type="text"
							className={classNames('search__input',
								this.state.error && 'search__input_error shake')}
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
					<button className="search__button" onClick={this.fetchUser}
						title="Search">Search</button>
				</div>

			</div> )
	}
}

export default App;
