import React, {Component} from 'react';
import {fetchUser, fetchRepos} from './../helpers/fetch-data'
import {getLanguages} from './../helpers/get-languages'
import Loader from './../../components/loading'
import UserPage from './user'

import './user.scss'


class User extends Component {
	state = {}

	fetchUserData = () => {
		this.setState({loading: true})

		fetchUser(this.props.params.user).then(({data = null, error}) => {
			return {userInfo: data, error}
		}).then(userData => {
			if (userData.error) {
				this.setState({loading: false, error: userData.error})
				return 
			}

			fetchRepos(this.props.params.user, 1)
			.then(({data = null, error, nextPage}) => {
				this.setState({
					...userData,
					repos: data,
					languages: getLanguages(data),
					error,
					nextPage,
					loading: false
				})
			})
		}) 
	}

	onLoadPage = () => {
		this.setState({loadingPage: true})
		fetchRepos(this.props.params.user, this.state.nextPage.page).then(({data, error, nextPage}) => {
			this.setState({
				repos: this.state.repos.concat(data),
				languages: getLanguages(data),
				error,
				nextPage,
				loadingPage: false
			}, )
		})
	}

	componentWillMount() {
		this.fetchUserData()
	}


	render() {
		const {loading, error, ...rest} = this.state

		if (error) {
			return <div>{error.message}</div>
		}

		return loading ? <Loader /> : <UserPage {...rest} onLoadPage={this.onLoadPage}/>
	}
}

export default User
