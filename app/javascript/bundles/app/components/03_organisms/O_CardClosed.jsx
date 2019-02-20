import PropTypes from 'prop-types';
import React from 'react';

import O_CardOpen from '../03_organisms/O_CardOpen';

export default class O_CardClosed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { triggerCard, name } = this.props

    return (
      <div className="card closed" onClick={ triggerCard }>
        <div className="content">
          <p>{ name }</p>
        </div>
      </div>
    )
  }
}
