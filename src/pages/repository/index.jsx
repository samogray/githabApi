import React, {Component} from 'react';
import ModalWindow from './../../components/modal-window'
class Repository extends Component {
  state ={
    loading: false
  }
  componentWillMount() {

		/* fetchReposInfo(owner, repos, fork).then(({data = null, error}) => {
			this.setState({loading: true})
			this.setState({
			
			}, )
		}) */
	}
  render() {
    const {repoName, user} = this.props
    console.log('user',this.props.user)
    return (
      <ModalWindow handleOpen = {this.props.handleOpen}>
        <div className="repo">
         <div className="repo__name">
          {repoName}
         </div>
      </div>
      </ModalWindow>
    );
  }
}

export default Repository;
