import React, {PropTypes} from 'react';
import classNames from 'classnames'
import './icon.scss'


const Icon = ({name, width, height, fill, stroke, className}) => <i className={classNames('icon', className)}>
  <svg className="icon__svg" width={width} height={height} fill={fill} stroke={stroke}>
    <use xlinkHref={`#icon-${name}`} />
  </svg>
</i>

Icon.PropTypes = {
  name: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  className: PropTypes.string
}
export default Icon
