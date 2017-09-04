import React, {Component} from 'react';
import ModalWindow from './../../components/modal-window'
import {fetchReposInfo, fetchContributorInfo, fetchLanguagesInfo, fetchPrInfo} from './../app/fetch-data'
import Loader from './../../components/loading'
class Repository extends Component {
  state = {
    loading: false,
    reposInfo: null,
    forkName: '',
    forkLink: '',
    error: false,
    contributors: null,
    languages: null,
    languagesValue: null,
    prInfo: null
  }
  componentWillMount() {
    let {repoName, user} = this.props
    fetchReposInfo(repoName, user).then(({data = null, error}) => {
      this.setState({reposInfo: data}, () => {
        if(this.state.reposInfo.fork) {
          const {parent} = this.state.reposInfo
          this.setState({forkName: parent.full_name, forkLink: parent.forks_url, loading: false})
        }
      })
    })
    fetchContributorInfo(repoName, user).then(({data = null, error}) => {
      this.setState({contributors: data})
    })
    fetchLanguagesInfo(repoName, user).then(({data = null, error}) => {
      const langValue = Object.keys(data).map(x => data[x])
      this.setState({languages: data, languagesValue: langValue})
    })
    fetchPrInfo(repoName, user).then(({data = null, error}) => {
      this.setState({prInfo: data})
    })
  }
  getSize =(value)=> {
    let size = value > 1024 ? `${(value / 1024).toFixed(2)} Mb` : `${value} Kb`
    return size
  }

  render() {
    const {repoName, linkRepo, user} = this.props
    const {error,
      loading,
      reposInfo,
      forkName,
      forkLink,
      contributors,
      languages,
      languagesValue,
      prInfo} = this.state
    console.log(this.state.prInfo)
    return (
      <ModalWindow handleOpen={this.props.handleOpen}>
        {(reposInfo && !loading) ? <div className="repo">
          <h3 className="repo__name">
            {reposInfo.name}
          </h3>
          <a href={reposInfo.html_url} className="repo__link">
            {reposInfo.html_url}
          </a>
          <div className="repo__fork">
            <div className="repo__repo-fork-name">
              {forkName}
            </div>
            <a href={forkLink} className="repo__fork-link">{forkLink}</a>
          </div>
          <div className="repo__section">
          <h3 className="repo__title">Contributors</h3>
          {contributors && contributors.map((item, key) => <div className="contributors" key={key}>
            <div className="thumbnail thumbnail_xs">
              <img src={item.avatar_url} className="thumbnail__pic" />
            </div>
            <a href={item.html_url} className="contributors__name">
              {item.login}
            </a>
          </div>)}
          </div>
          <div className="repo__section">
          <h3 className="repo__title">Languages</h3>
          {languagesValue && languagesValue.map((item, key) => <div key={key} className="repo__lang-item">
          <span className="repo__lang-value">{Object.keys(languages)[key]}</span>
          <span className="repo__lang">- {this.getSize(item)}</span>
          </div>)}
          </div>
          <div className="repo__section">
          <h3 className="repo__title">Open PR</h3>
          {prInfo && prInfo.map((item, key) => <div key={key} className="repo__pr">
            <a href={item.html_url} className="repo__link_pr">{item.title}</a>
          </div>)}
          </div>
        </div> : <Loader />}
      </ModalWindow>
    );
  }
}

export default Repository;
