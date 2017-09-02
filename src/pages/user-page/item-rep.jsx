import React, {Component} from 'react';
import Icon from './../../components/icon';
import {color} from './colors'

class ItemRepository extends Component {
	static propTypes = {
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    forks: React.PropTypes.number,
    language: React.PropTypes.string,
    stargazers_count: React.PropTypes.number
  }
	render() {
		const {name, description, forks, language, stargazers_count, updated_at} = this.props
		return (
			<div className="card">
				<h3>
					<a href="#" className="card__name" title={name}>{name}</a>
				</h3>
				<p className="card__description">
					{description}
			 </p>
				<div className="card__footer">
					<div className="card__footer-item">
					<span className="card__badge" style={{backgroundColor: color[language]}}></span>{language}</div>
					<div className="card__footer-item"><Icon name="star-ico" width={16} height={16} />{stargazers_count}</div>
					<div className="card__footer-item"><Icon name="fork-ico" width={16} height={16} />{forks}</div>
					<div className="card__footer-item" >{updated_at}</div>
				</div>
			</div>
		);
	}
}

export default ItemRepository;
