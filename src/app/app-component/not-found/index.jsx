import React, {Component} from 'react';
import {Link} from 'react-router'
import Icon from './../../../components/icon'
import './not-found.scss'

class NotFound extends Component {
	render() {
		return (
			<div className="no-page">
				<div>
					<h1 className="no-page__title">Page not found</h1>
					<Icon name="404-ico"  width={300} height={300}/>
					<div className="no-page__button">
						<Link to={'/'} className="result__button btn">Go to Home page</Link>
					</div>
				</div>
			</div>

		);
	}
}

export default NotFound;
