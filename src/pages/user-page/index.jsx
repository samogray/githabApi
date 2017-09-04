import React, {Component} from 'react';
import {fetchUser, fetchRepos} from './../app/fetch-data'
import {DataParse} from './date-parse'
import {getLanguages} from './get-languages'
import ItemRepository from './item-rep'
import Loader from './../../components/loading'
import FilterPanel from './filter'
import SortPanel from './sort-panel'
import UserInfo from './user-info'
import './user.scss'

const type = ['all', 'forks', 'sources']
const sortType = [
	{
		title: 'repo name',
		id: 'repoSort'
	},
	{
		title: 'stars count',
		id: 'starSort'
	},
	{
		title: 'open issues count',
		id: 'issueSort'
	},
	{
		title: 'updated date',
		id: 'dateSort'
	},
	{
		title: 'None',
		id: 'noneSort'
	}
]
class User extends Component {
	state = {
		userInfo: null,
		loading: false,
		repos: null,
		reposFiltered: [],
		languages: [],
		error: false,
		nextPage: null,
		filterLanguage: 'all',
		filterIssue: false,
		filterTopics: false,
		filterDateUdate: '',
		fiterType: 'all',
		filterStar: '0',
		isfiltered: false,
		sortTypes: 'none'
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
				languages: getLanguages(data), error, nextPage, loading: false
			}, )
		})
	}

	onLoadPage = (page) => {
		fetchRepos(this.props.params.user, page).then(({data, error, nextPage}) => {
			this.setState({loading: true})
			this.setState({
				repos: this.state.repos.concat(data),
				languages: getLanguages(data), error, nextPage, loading: false
			}, )
		})
	}

	filterIssue = () => {
		this.setState({filterIssue: !this.state.filterIssue})
		this.getFilteredData.issueFilter()
	}

	handleFilterLanguage = (newOption) => {
		this.setState({filterLanguage: newOption}, () => {
			this.getFilteredData.languageFilter()
		})
	}

	handleFilterTopics = () => {
		this.setState({filterTopics: !this.state.filterTopics}, () => {
			this.getFilteredData.topicsFilter()
		})
	}

	handleFilterDate = (newDate) => {
		this.setState({filterDateUdate: newDate}, () => {
			this.getFilteredData.dateUpdateFilter()
		})
	}

	handleFilterType = (newType) => {
		this.setState({fiterType: newType}, () => {
			this.getFilteredData.typeFilter()
		})
	}

	handleFilterStar = (newValue) => {
		this.setState({filterStar: newValue}, () => {
			this.getFilteredData.StarFilter()
		})
	}

	handleSortType = (sort) => {
		this.setState({sortTypes: sort})
		console.log('handle sort', sort)
		//this.getFilteredData().StarFilter()
	}

	getFilteredData = {
		issueFilter: () => {
			if(this.state.filterIssue) {
				let filteredArr = this.state.reposFiltered
				filteredArr = this.state.repos.filter((item) => item.open_issues > 0)
				this.setState({reposFiltered: filteredArr, isfiltered: true})
			} else this.isFilteredRepos()
		},
		languageFilter: () => {
			if(this.state.filterLanguage !== 'all') {
				let filteredArr = this.state.reposFiltered
				filteredArr = this.state.repos.filter((item) => item.language.toLowerCase() === this.state.filterLanguage)
				this.setState({reposFiltered: filteredArr, isfiltered: true})
			} else this.isFilteredRepos()
		},
		StarFilter: () => {
			if(this.state.filterStar > 0) {
				let filteredArr = this.state.reposFiltered
				filteredArr = this.state.repos.filter((item) => item.stargazers_count > this.state.filterStar)
				this.setState({reposFiltered: filteredArr, isfiltered: true})
			} else this.isFilteredRepos()
		},
		typeFilter: () => {
			if(this.state.fiterType !== 'all') {
				let filteredArr = this.state.reposFiltered
				if(this.state.fiterType === 'forks') {
					filteredArr = this.state.repos.filter((item) => item.fork)
				} else filteredArr = this.state.repos.filter((item) => !item.fork)
				this.setState({reposFiltered: filteredArr, isfiltered: true})
			} else this.isFilteredRepos()
		},
		topicsFilter: () => {
			if(this.state.filterTopics) {
				let filteredArr = this.state.reposFiltered
				filteredArr = this.state.repos.filter((item) => item.topics.length > 0)
				this.setState({reposFiltered: filteredArr, isfiltered: true})
			} else this.isFilteredRepos()
			console.log('filtered topics', this.state.reposFiltered)
		},
		dateUpdateFilter: () => {
			const stateDate = this.state.filterDateUdate
			let filteredArr = this.state.reposFiltered
			if(stateDate !== '') {
				filteredArr = this.state.repos.filter((item) => {
					return ((new Date(item.pushed_at).getTime()) > (new Date(stateDate).getTime()))
				})
				this.setState({reposFiltered: filteredArr, isfiltered: true})
			} else this.isFilteredRepos()
			console.log('filtered date', this.state.reposFiltered)
		}
	}

	isFilteredRepos = () => {
		const {filterLanguage, filterIssue, filterTopics, filterDateUdate, fiterType} = this.state
		if(filterLanguage === 'all' && !filterIssue && !filterTopics && filterDateUdate === '' && fiterType === 'all') {
			this.setState({isfiltered: false, reposFiltered: []})
		}
	}

	render() {
		const userInfo = this.state.userInfo !== null && this.state.userInfo
		const repos = this.state.repos !== null && this.state.repos
		const nextPage = !this.state.error && this.state.nextPage !== null && this.state.nextPage
		const listRepos = this.state.isfiltered ? this.state.reposFiltered : repos
		console.log('state child parent', this.state.sortTypes)

		return (
			(!this.state.error || this.state.repos !== null) ? <div className="user">
				<UserInfo avatar_url={userInfo.avatar_url}
					login={userInfo.login}
					name={userInfo.name}
					bio={userInfo.bio}
					blog={userInfo.blog}
					location={userInfo.location}
				/>
				<FilterPanel
					languages={this.state.languages}
					checkedIssue={this.state.filterIssue}
					handleFilterIssue={this.filterIssue}
					filteredLanguageValue={this.state.filterLanguage}
					filterLanguage={this.handleFilterLanguage}
					handleFilterTopics={this.handleFilterTopics}
					fiterUpdateDateValue={this.state.filterDateUdate}
					fiterUpdateDate={this.handleFilterDate}
					type={type}
					fiterTypeValue={this.state.fiterType}
					fiterType={this.handleFilterType}
					fiterStar={this.handleFilterStar}
					fiterStarValue={this.state.filterStar}
				/>
				<SortPanel sortType={sortType}
					sortTypeValue={this.state.sortTypes}
					SortType={this.handleSortType}
				/>
				<div className="user__list">
					<div className="container">
						{listRepos && listRepos.map((item, key) => <ItemRepository
							name={item.name} key={key}
							description={item.description}
							owner={item.owner.login}
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
