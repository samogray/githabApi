import React from 'react'
import {Link} from 'react-router'
import Icon from './../../components/icon'

const SearchResult = ({name, url, avatar, location, login}) => <div className="result">
	<div className="panel panel_search">
		<div className="thumbnail thumbnail_search">
			<img src={avatar} className="thumbnail__pic" />
		</div>
		<div className="result__info">
			<div className="title">{name}</div>
			<div className="text">{location}</div>
			<a href={url} className="text text_link flex flex_inline flex_align_center">
				<Icon name="git-ico" height={15} width={15}/>GitHub page</a>
			<Link to={`/user/${login}`} className="result__button">More</Link>
		</div>
	</div>
</div>

export default SearchResult
