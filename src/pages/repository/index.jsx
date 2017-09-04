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
   // const {repository, user} = this.props.params
    return (
      <ModalWindow>
        <div className="repo">
         <div className="repo__name">
        Reposi
         </div>
      </div>
      </ModalWindow>
    );
  }
}

export default Repository;
