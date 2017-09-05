import React, {Component, PropTypes} from 'react';
import Icon from './../../components/icon';
import {color} from './../helpers/colors'
import {Link} from 'react-router'
import ReposInfo from './repository'



class ItemRepository extends Component {
	static propTypes = {
		name: PropTypes.string,
		owner: PropTypes.string,
		description: PropTypes.string,
		forks: PropTypes.number,
		language: PropTypes.string,
		stargazers_count: PropTypes.number
	}

	//handleOpenRepos = (owner, name) => this.props.openRepos(this.props.owner, this.props.name)
	state = {
		activeRepos: '',
		modalOpened: false
	}
	//handleActiveRepos =()=> this.props.openRepos(this.props.name)
	handleModalOpen = () => this.setState({modalOpened: !this.state.modalOpened})

	render() {
		const {name, description, forks, language, stargazers_count, updated_at, owner, html_url} = this.props
		const parseStar = (count) => {
			let star = count > 1000 ? `${(count / 1000).toFixed(2)}k` : count
			return star
		}

		return (
			<div className="card">
				<h3>
					<button className="card__name"
						title={name}
						onClick={this.handleModalOpen}>{name}</button>
				</h3>
				<p className="card__description">
					{description}
				</p>
				<div className="card__footer">
					<div className="card__footer-item">
						<span className="card__badge" style={{backgroundColor: color[language]}}></span>{language}</div>
					<div className="card__footer-item">
						<Icon name="star-ico" width={16} height={16} />{parseStar(stargazers_count)}</div>
					<div className="card__footer-item"><Icon name="fork-ico" width={16} height={16} />{forks}</div>
					<div className="card__footer-item" >{updated_at}</div>
				</div>
				{this.state.modalOpened && <ReposInfo
					handleOpen={this.handleModalOpen}
					user={owner}
					repoName={name}
					linkRepo={html_url}
					/>}
			</div>
		);
	}
}

export default ItemRepository;
