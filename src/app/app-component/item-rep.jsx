import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Icon from './../../components/icon';
import {color} from './../helpers/colors'
import ReposInfo from './repository'
import {fetchReposInfo, fetchContributorInfo, fetchLanguagesInfo, fetchPrInfo} from '../helpers/fetch-data'

class ItemRepository extends Component {
	static propTypes = {
		name: PropTypes.string,
		owner: PropTypes.string,
		description: PropTypes.string,
		forks: PropTypes.number,
		language: PropTypes.string,
		stargazers_count: PropTypes.number
	}

	state = {
		activeRepos: '',
		modalOpened: false
	}

	handlerLoadData = ({data, error}) => {
		if(error) {
			throw error
		}

		return data
	}

	handleModalOpen = () => {
		this.setState({loading: true})
		const {name, owner} = this.props
		fetchReposInfo(name, owner)
			.then(this.handlerLoadData)
			.then(reposInfo =>
				fetchContributorInfo(name, owner)
					.then(this.handlerLoadData)
					.then(contributors => ({contributors, reposInfo}))
			)
			.then(data =>
				fetchLanguagesInfo(name, owner)
					.then(this.handlerLoadData)
					.then(languages => {
						const langValue = Object.keys(languages).map(lng => languages[lng])
						return {...data, languages, langValue}
					})
			)
			.then(data =>
				fetchPrInfo(name, owner)
					.then(this.handlerLoadData)
					.then(prInfo => ({...data, prInfo}))
			)
			.then(data => this.setState({...data, loading: false}))
			.catch(error => {
				console.log(error)
				this.setState({error, loading: false})
			})
		this.setState({modalOpened: !this.state.modalOpened})
	}
	parseStar = (count) => {
		let star = count > 1000 ? `${(count / 1000).toFixed(2)}k` : count
		return star
	}
	render() {
		const {name, description, forks, language, stargazers_count, updated_at} = this.props
		const {...rest} = this.state
		return (
			<article className="card">
				<div>
					<header>
						<h3 className="card__title">
							<button className="card__link ellipsis"
								title={name}
								onClick={this.handleModalOpen} title={name}>{name}</button>
						</h3>
					</header>
					<p className="card__description ellipsis">
						{description}
					</p>
				</div>
				<footer className="card__footer">
					<div className="card__footer-item">
						<span className="card__badge" style={{backgroundColor: color[language]}}></span>{language}</div>
					<div className="card__footer-item">
						<Icon name="star-ico" width={16} height={16} />{this.parseStar(stargazers_count)}</div>
					<div className="card__footer-item"><Icon name="fork-ico" width={16} height={16} />{forks}</div>
					<div className="card__footer-item" >{updated_at}</div>
				</footer>
				{this.state.modalOpened && <ReposInfo
					{...rest}
					handleOpen={this.handleModalOpen}
				/>}
			</article>
		);
	}
}

export default ItemRepository;
