import React, {Component} from 'react';

class UserPage extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default UserPage;
