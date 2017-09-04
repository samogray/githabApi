import React, {Component} from 'react';
import Icon from './../../components/icon';
import {color} from './colors'
import {Link} from 'react-router'


class ItemRepository extends Component {
	static propTypes = {
		name: React.PropTypes.string,
		owner: React.PropTypes.string,
		description: React.PropTypes.string,
		forks: React.PropTypes.number,
		language: React.PropTypes.string,
		stargazers_count: React.PropTypes.number
	}

	//handleOpenRepos = (owner, name) => this.props.openRepos(this.props.owner, this.props.name)
	state = {
		activeRepos: ''
	}
	handleActiveRepos =()=> this.props.openRepos(this.props.name)
	

	render() {
		const {name, description, forks, language, stargazers_count, updated_at, owner} = this.props
		const parseStar = (count) => {
			let star = count > 1000 ? `${(count / 1000).toFixed(2)}k` : count
			return star
		}

		return (
			<div className="card">
				<h3>
					<button className="card__name"
						title={name}
						onClick={this.handleActiveRepos}>{name}</button>
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
			</div>
		);
	}
}

export default ItemRepository;
