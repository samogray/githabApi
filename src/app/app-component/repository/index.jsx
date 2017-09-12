import React, {Component} from 'react';
import ModalWindow from './../../../components/modal-window'
import Loader from './../../../components/loading'
import './repository.scss'
class Repository extends Component {
  state = {}

  getSize =(value)=> {
    let size = value > 1024 ? `${(value / 1024).toFixed(2)} Mb` : `${value} Kb`
    return size
  }

  render() {
    const {
      loading,
      reposInfo={},
      forkName,
      forkLink,
      contributors,
      languages,
      langValue=[],
      prInfo} = this.props
    return (
      <ModalWindow handleOpen={this.props.handleOpen}>
        {!loading ? <div className="repo">
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
              <img src={item.avatar_url} className="thumbnail__pic" alt={item.login}/>
            </div>
            <a href={item.html_url} className="contributors__name">
              {item.login}
            </a>
          </div>)}
          </div>
          <div className="repo__section">
          <h3 className="repo__title">Languages</h3>
          {langValue.map((item, key) => <div key={key} className="repo__lang-item">
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
