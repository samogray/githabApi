import React, {Component} from 'react';
import {Link} from 'react-router'
import Icon from './../../components/icon'
import {fetchUser, fetchRepos} from './../app/fetch-data'
import {DataParse} from './date-parse'
import ItemRepository from './item-rep'
import Loader from './../../components/loading'
import FilterPanel from './filter'
import {browserHistory} from 'react-router'
import './user.scss'

const LINK = 'https://api.github.com/users/`'

class User extends Component {
	state = {
		userInfo: null,
		loading: false,
		repos: null,
		languages: [],
		error: false,
		nextPage: null
	}
	componentWillMount() {
		this.setState({loading: true})
		fetchUser(this.props.params.user).then(({data = null, error}) => {
			this.setState({userInfo: data, error, loading: false})
		})
		fetchRepos(this.props.params.user, 1).then(({data = null, error, nextPage}) => {
			this.setState({loading: true})
			this.setState({
				repos: data,
				languages: this.getLanguages(data), error, nextPage, loading: false
			}, )
		})
	}
	onLoadPage = (page) => {
		fetchRepos(this.props.params.user, page).then(({data, error, nextPage}) => {
			this.setState({loading: true})
			this.setState({
				repos: this.state.repos.concat(data),
				languages: this.getLanguages(data), error, nextPage, loading: false
			}, )
		})
	}
	getLanguages = (repos) => {
		const arr = repos ? repos.reduce((result, item) => {
			return [...result, item.language]
		}, []) : ''
		const unique = (arr) => {
			var obj = {};
			for(var i = 0;i < arr.length;i++) {
				arr[i] === null ? arr[i] = "None" : arr[i]
				var str = arr[i]
				obj[str] = true
			}
			return Object.keys(obj);
		}
		return unique(arr)
	}

	render() {
		const userInfo = this.state.userInfo !== null && this.state.userInfo
		const repos = this.state.repos !== null && this.state.repos
		const nextPage = !this.state.error && this.state.nextPage !== null && this.state.nextPage
		console.log(repos)
		return (
			(!this.state.error || this.state.repos !== null) ? <div className="user">
				<div className="user__header">
					<div className="container">
						<div className="flex">
							<div className="user__avatar">
								<div className="thumbnail thumbnail_rect">
									<img className="thumbnail__pic" src={userInfo.avatar_url} alt={userInfo.login} />
								</div>
							</div>
							<div className="user__info">
								<h1 className="user__name">{userInfo.name}</h1>
								<p className="user__description">{userInfo.bio}</p>
								<div className="user__location">
									<Icon name="location-ico" width={16} height={16} />{userInfo.location}</div>
								<a href={userInfo.blog} className="user__blog">
									<Icon name="link-ico" width={10} height={16} />{userInfo.blog}</a>
							</div>
						</div>
					</div>
				</div>
				<FilterPanel languages={this.state.languages} />
				<div className="user__list">
					<div className="container">
						<h3>{`${userInfo.name} have ${repos.length} repositories`}</h3>
						{repos && repos.map((item, key) => <ItemRepository
							name={item.name} key={key}
							description={item.description}
							forks={item.forks}
							language={item.language}
							updated_at={DataParse(item.pushed_at)}
							stargazers_count={item.stargazers_count} />)}
						<div className="user__pagination">
							{!nextPage.iflast && <button className="btn" onClick={() => this.onLoadPage(nextPage.page)}>Load More</button>}
						</div>
					</div>
					{this.state.loading && <Loader />}
				</div>
			</div> : <div>{this.state.error.message}</div>

		);
	}
}

export default User;
