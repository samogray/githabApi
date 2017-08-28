import React, { Component } from 'react';
import {Link} from 'react-router'

class User extends Component {
  render () {
    return (
			<div>
			User Page
				<Link to="/repository">repository</Link>
			</div>
			
    );
  }
}

export default User;
