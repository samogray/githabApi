import React from 'react';
//import classNames from 'classnames'
import Icon from './../icon'
import './modal.scss'


class ModalWindow extends React.Component {
  render() {
    return (<div className="modal">
      <div className="modal__overlay" onClick={this.props.handleOpen}></div>
      <div className="modal__window">
      <div className="modal__close-btn" onClick={this.props.handleOpen}>
        <Icon name="clear-ico" />
      </div>
      {this.props.children}
    </div>
    </div>)
  }
}

export default ModalWindow
