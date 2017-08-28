import React from 'react'
import {Link} from 'react-router'

const SearchResult = ({name, url, avatar, location, facebook}) => <div className="result">
	<div className="panel panel_search">
		<div className="thumbnail thumbnail_search">
			<img src={avatar} className="thumbnail__pic" />
		</div>
		<div>
			<div className="title">{name}</div>
			<div className="title">{location}</div>
			<a href={url} className="title">{url}</a>
			<div className="title">{facebook}</div>
			<Link to="/user">More</Link>
		</div>
	</div>
</div>

export default SearchResult
