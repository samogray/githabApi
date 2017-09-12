import React, {Component} from 'react';
import {DataParse} from './../helpers/date-parse'
import ItemRepository from './../app-component/item-rep'
import Loader from './../../components/loading'
import Icon from './../../components/icon'
import FilterPanel from './../app-component/filter'
import SortPanel from './../app-component/sort-panel'
import UserInfo from './../app-component/user-info'
import {Link} from 'react-router'

import './user.scss'


const filtersChain = filters => {
	return arr => {
		let result = arr
		for(var i = filters.length - 1;i > -1;i--) {
			result = result.filter(item => filters[i].call(null, item))
		}

		return result
	}
}

class User extends Component {
	state = {
		loading: false,
		filter: {},
		sortBy: 'noneSort',
		reverseSort: false,
		modalOpened: false
	}


	filterChange = (type, value) => {
		this.setState({filter: {...this.state.filter, [type]: value}})
	}

	handleSortType = (sort) => {
		this.setState({sortBy: sort})
	}
	reverseSort = (reverse) => {
		this.setState({reverseSort: reverse})
	}

	setFilter = filter => this.setState({filter: {...this.state.filter, ...filter}})
	resetFilter = key => {
		const {filter = {}} = this.state

		const newFilter = Object.keys(filter).reduce((acc, filterName) => {
			if(filterName === key) {
				return acc
			}

			return {...acc, [filterName]: filter[filterName]}
		}, {})

		this.setState({filter: newFilter})
	}

	getReposByFilters = () => {
		const {filter} = this.state
		const {repos} = this.props

		const getFilterByKey = key => {
			switch(key) {
				case 'issue': {
					return item => item.open_issues > 0
				}

				case 'language': {
					return item => item.language && item.language.toLowerCase() === filter.language.toLowerCase()
				}

				case 'stars': {
					return item => item.stargazers_count > filter.stars
				}

				case 'type': {
					return item => filter.type === 'forks' ? item.fork : !item.fork
				}

				case 'topics': {
					return item => item.topics.length > 0
				}

				case 'date': {
					return item => ((new Date(item.pushed_at).getTime()) > (new Date(filter.date).getTime()))
				}

				default:
					return item => item
			}
		}
		const filters = Object.keys(filter || {}).map(key => getFilterByKey(key))
		return filtersChain(filters)(repos || [])
	}

	sortRepos = (reposA, reposB) => {
		if(this.state.sortBy === 'starsort') {
			return reposA.stargazers_count - reposB.stargazers_count;
		}

		if(this.state.sortBy === 'datesort') {
			return reposA.pushed_at > reposB.pushed_at ? -1 : 1
		}

		if(this.state.sortBy === 'reposort') {
			return reposA.name.toLowerCase() < reposB.name.toLowerCase() ? -1 : 1
		}

	}


	render() {
		const {userInfo = {}, repos = [], languages = [], onLoadPage, nextPage, loadingPage = false} = this.props
		const {filter} = this.state
		const filteredRepos = this.getReposByFilters()
		const sortRepos = filteredRepos && filteredRepos.sort(this.sortRepos)

		return (
			<div className="user">
			<Link to={`${process.env.PUBLIC_URL}/`} className="btn btn_home">
			<Icon name="home-ico"/>
			</Link>
				<div className="user__aside">
					<div className="user__aside-wrp">
						<UserInfo avatar_url={userInfo.avatar_url}
							login={userInfo.login}
							name={userInfo.name}
							bio={userInfo.bio}
							blog={userInfo.blog}
							location={userInfo.location}
						/>
						<FilterPanel
							languages={languages}
							setFilter={this.setFilter}
							resetFilter={this.resetFilter}
							filter={filter}
						/>
						<SortPanel sortTypeValue={this.state.sortBy}
							SortType={this.handleSortType}
							reverseSort={this.reverseSort}
						/>
					</div>
				</div>
				<section className="user__list">
					<div className="container">
						<div className="row">
							{((this.state.reverseSort ? sortRepos.reverse()
								: sortRepos) || repos || []).map((item, key) => <div className="col" key={key}>
									<ItemRepository
										name={item.name} key={key}
										description={item.description}
										owner={item.owner.login}
										forks={item.forks}
										html_url={item.html_url}
										openRepos={this.handleModalOpen}
										language={item.language}
										updated_at={DataParse(item.pushed_at)}
										stargazers_count={item.stargazers_count} />
								</div>)}
						</div>

						<div className="user__pagination">
							{!nextPage.iflast && <div className="user__load">
								{loadingPage ? <Loader absolute blue /> : <button className="btn" onClick={onLoadPage}>Load More</button>}
							</div>}
						</div>
					</div>
				</section>
			</div>
		)
	}
}

export default User;
