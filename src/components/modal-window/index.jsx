import React, {PropTypes} from 'react';
//import classNames from 'classnames'
import Icon from './../icon'
import './modal.scss'


class ModalWindow extends React.Component {
  render() {
    return (<div className="modal">
      <div className="modal__overlay">
        <div className="modal__window">
          <div className="modal__close-btn">
            <Icon name="clear-ico" />
          </div>
          {this.props.children}
        </div>
      </div>
    </div>)
  }
}

/* Icon.propTypes = {
  name: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  className: PropTypes.string
} */
export default ModalWindow
