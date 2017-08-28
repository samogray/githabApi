import React, { Component } from 'react';
import {Link} from 'react-router'

class UserPage extends Component {
  render () {
    return (
      <div>
				{this.props.children}
			</div>
			
    );
  }
}

export default UserPage;
