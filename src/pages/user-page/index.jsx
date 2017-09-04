import React, {Component} from 'react';
import {fetchUser, fetchRepos} from './../app/fetch-data'
import {DataParse} from './date-parse'
import {getLanguages} from './get-languages'
import ItemRepository from './item-rep'
import Loader from './../../components/loading'
import FilterPanel from './filter'
import SortPanel from './sort-panel'
import UserInfo from './user-info'
import {browserHistory} from 'react-router'

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

function compose (fns) {
  return function (result) {
    for (var i = fns.length - 1; i > -1; i--) {
      result = fns[i].call(this, result)
    }

    return result
  }
}

class User extends Component {
	state = {
		userInfo: null,
		loading: false,
		repos: null,
		reposFiltered: [],
		languages: [],
		error: false,
		nextPage: null,
		filter: {
			filterLanguage: 'all',
			filterIssue: true,
			filterTopics: false,
			filterDateUdate: '',
			fiterType: 'all',
			filterStar: '0',
		},
		isfiltered: false,		
		sortTypes: 'none',
		modalOpened: false,
		activeRepos: ''
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

	filterChange= (type, value) => {
		
		this.setState({ filter: { ...this.state.filter, [type]: value } })
	}

	handleFilterLanguage = (newOption) => {
		//this.setState({filterLanguage: newOption}, this.getFilteredData.languageFilter)
		this.setFilter({filterLanguage: newOption})
		
	}

	filterIssue = (newOption) => {
		this.setFilter({language: newOption})
	}

	handleFilterTopics = () => {
	/* 	this.setState({filterTopics: !this.state.filterTopics}, () => {
			this.getFilteredData.topicsFilter()
		}) */
		this.setFilter({filterTopics: !this.state.filterTopics})
		
	}

	handleFilterDate = (newDate) => {
		/* this.setState({filterDateUdate: newDate}, () => {
			this.getFilteredData.dateUpdateFilter()
		}) */
		this.setFilter({filterDateUdate: newDate})
		
	}

	handleFilterType = (fiterType) => {
		/* this.setState({fiterType: newType}, () => {
			this.getFilteredData.typeFilter()
		}) */
		this.setFilter(fiterType)
		
	}

	handleFilterStar = (newValue) => {
		/* this.setState({filterStar: newValue}, () => {
			this.getFilteredData.StarFilter()
		}) */
		this.setFilter({filterStar: newValue})
		
	}

	//filterSetValue = (type, value) => this.setState({ filters: { ...this.state.filters, [type]: value } })

	handleSortType = (sort) => {
		this.setState({sortTypes: sort})
		console.log('handle sort', sort)
		//this.getFilteredData().StarFilter()
	}


	getFilteredData = {
		issueFilter: () => {
			if(this.state.filterIssue) {
				let filteredArr = this.state.isfiltered ? this.state.reposFiltered : this.state.repos
				const filtered = filteredArr.filter((item) => item.open_issues > 0)
				this.setState({reposFiltered: filtered, isfiltered: true})
			} else this.isFilteredRepos()
		},
		languageFilter: () => {
			if(this.state.filterLanguage !== 'all') {
				const filteredArr = this.state.isfiltered ? this.state.reposFiltered : this.state.repos
				const filtered = filteredArr.filter((item) => item.language.toLowerCase() === this.state.filterLanguage)

				console.log(filteredArr, 'filtered buy languages', this.state.filterLanguage)
				this.setState({reposFiltered: filtered, isfiltered: true})
			} else this.isFilteredRepos()
		},
		StarFilter: () => {
			if(this.state.filterStar > 0) {
				let filteredArr = this.state.isfiltered ? this.state.reposFiltered : this.state.repos
				const filtered = filteredArr.filter((item) => item.stargazers_count > this.state.filterStar)
				this.setState({reposFiltered: filtered, isfiltered: true})
			} else this.isFilteredRepos()
		},
		typeFilter: () => {
			if(this.state.fiterType !== 'all') {
				let filteredArr = this.state.isfiltered ? this.state.reposFiltered : this.state.repos
				let filtered = []
				if(this.state.fiterType === 'forks') {
					filtered = filteredArr.filter((item) => item.fork)
				} else  {
					filtered = filteredArr.filter((item) => !item.fork)
				}
				this.setState({reposFiltered: filtered, isfiltered: true})
			} else this.isFilteredRepos()
		},
		topicsFilter: () => {
			if(this.state.filterTopics) {
				let filteredArr = this.state.isfiltered ? this.state.reposFiltered : this.state.repos
				const filtered = filteredArr.filter((item) => item.topics.length > 0)
				this.setState({reposFiltered: filtered, isfiltered: true})
			} else this.isFilteredRepos()
			console.log('filtered topics', this.state.reposFiltered)
		},
		dateUpdateFilter: () => {
			const stateDate = this.state.filterDateUdate
			let filteredArr = this.state.isfiltered ? this.state.reposFiltered : this.state.repos
			if(stateDate !== '') {
				const filtered = filteredArr.filter((item) => {
					return ((new Date(item.pushed_at).getTime()) > (new Date(stateDate).getTime()))
				})
				this.setState({reposFiltered: filtered, isfiltered: true})
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


	setFilter = filter => this.setState({filter: {...this.state.filter, ...filter}})
	resetFilter = key => {
		const {filter = {}} = this.state
	
		const newFilter = Object.keys(filter).reduce((acc, filterName) => {
			if (filterName === key) {
				 return acc
			}
	
			return {...acc, [filterName]: filter[filterName]}
		})
	
	this.setState({filter: newFilter})
	}
	// this.setFilter({language: 'javascript'})
	// this.resetFilter('language')
	getReposByFilters = () => {
		const {filters, repos} = this.state

		const getFilterByKey = key => {
			switch (key) {
				case 'filterIssue': {
					return item => item.open_issues > 0
				}

				case 'filterLanguage': {
					return item => item.language.toLowerCase() === filters.language
				}

				case 'stars': {
					return item => item.stargazers_count > filters.stars
				}

				case 'fiterType': {
					return item => item.fork === filters.fork
				}

				case 'filterStar': {
					item => item.topics.length > 0
				}

				case 'filterDateUdate': {
					(item) => ((new Date(item.pushed_at).getTime()) > (new Date(filters.date).getTime()))
				}

				default:
					item => item
			}
		}

		const filtersCompose = compose(Object.keys(filters || {}).map(getFilterByKey))

		return (repos || []).filter(filtersCompose)
	}

	render() {
		const userInfo = this.state.userInfo !== null && this.state.userInfo
		const repos = this.state.repos !== null && this.state.repos
		const nextPage = !this.state.error && this.state.nextPage !== null && this.state.nextPage
		const filteredRepos = this.getReposByFilters()
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
					checkedIssue={this.state.filter.filterIssue}
					handleIssue={this.filterIssue}
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
					filterSetValue = {this.filterSetValue}
				/>
				<SortPanel sortType={sortType}
					sortTypeValue={this.state.sortTypes}
					SortType={this.handleSortType}
				/>
				<div className="user__list">
					<div className="container">
						{filteredRepos.map((item, key) => <ItemRepository
							name={item.name} key={key}
							description={item.description}
							owner={item.owner.login}
							forks={item.forks}
							html_url={item.html_url}
							openRepos={this.handleModalOpen}
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
