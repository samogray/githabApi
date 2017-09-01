import React, {Component} from 'react';
import {Link} from 'react-router'
import Icon from './../../components/icon'
import {fetchUser, fetchRepos} from './../app/fetch-data'
import {DataParse} from './date-parse'
import ItemRepository from './item-rep'
import {browserHistory} from 'react-router'
import './user.scss'

const LINK = 'https://api.github.com/users/`'

class User extends Component {
	state = {
		userInfo: null,
		loading: true,
		repos: null
	}
	componentWillMount() {
		fetchUser(this.props.params.user).then(({data = null, error}) => {
			this.setState({userInfo: data, error})
		})
		fetchRepos(this.props.params.user).then(({data = null, error}) => {
			this.setState({repos: data, error})
		})
	}
	render() {
		const userInfo = this.state.userInfo !== null && this.state.userInfo
		const repos = this.state.repos !== null && this.state.repos
		console.log(repos)
		return (
			(this.state.userInfo || this.state.repos) ? <div className="user">
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
				<div className="user__filter">
					<div className="container">
						<div className="user__filter-item">
							<select name="language" id="language">
								<option value="html">Html</option>
							</select>
						</div>
						<div className="user__filter-item">
							<label htmlFor="issue">
								<input type="checkbox" id="issue" />
								Has open issues</label>
						</div>
						<div className="user__filter-item">
							<label htmlFor="topics">
								Has topics
					<input type="checkbox" id="topic" />
								Has open issues</label>
						</div>
						<div className="user__filter-item">
							<label htmlFor="dateupdate">
								updated after X date	</label>
							<input type="date" id="dateupdate" />
							updated after X date
					</div>
						<div className="user__filter-item">
							<label htmlFor="All"> All <input type="radio" id="all" name="type" /></label>
							<label htmlFor="Forks"> All <input type="radio" id="forks" name="type" /></label>
							<label htmlFor="Sources"> All <input type="radio" id="sources" name="type" /></label>
						</div>
					</div>
				</div>
				<div className="user__list">
					<div className="container">
					<h3>{`${userInfo.name} have ${repos.length} repositories`}</h3>					
						{repos && repos.map((item, key) => <ItemRepository
							name={item.name} key={key}
							description={item.description}
							forks={item.forks}
							language={item.language}
							updated_at={DataParse(item.updated_at)}
							stargazers_count={item.stargazers_count} />)}
						<div className="user__pagination">
							<div className="pagination">
								<button className="pagination__btn pagination__btn_active">1</button>
								<button className="pagination__btn">2</button>
								<button className="pagination__btn">3</button>
							</div>
						</div>
					</div>
				</div>
			</div> : null

		);
	}
}

export default User;
