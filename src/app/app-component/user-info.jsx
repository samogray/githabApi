import React from 'react';
import Icon from './../../components/icon'

const UserInfo = ({avatar_url, login, name, bio, location, blog}) => <div className="user__header">
	<div className="container">
		<div className="flex flex_align_flex_end">
			<div className="user__avatar">
				<div className="thumbnail thumbnail_rect">
					<img className="thumbnail__pic" src={avatar_url} alt={login} />
				</div>
			</div>
			<h1 className="user__name">{name}</h1>
		</div>
		<div className="user__info">
			<p className="user__description">{bio}</p>
			<div className="user__location">
				<Icon name="location-ico" width={16} height={16} />{location}</div>
			<a href={blog} className="user__blog">
				<Icon name="link-ico" width={10} height={16} />{blog}</a>
		</div>
	</div>
</div>

export default UserInfo
