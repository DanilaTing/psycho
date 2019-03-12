import PropTypes from 'prop-types';
import React from 'react';

import O_CardOpen from '../03_organisms/O_CardOpen';

export default class O_CardClosed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { triggerCard, name, card, provided, innerRef } = this.props
    const { type, id } = card
    const link = '../react/projects/' + id
    if (type == 'Project') {
      return (
        <a href={ link }>
          <div className="card closed"
            onClick={ triggerCard }
            ref={ innerRef }
            { ...provided.draggableProps }
            { ...provided.dragHandleProps }
          >
            <div className="content">
              <p>{ name }</p>
            </div>
          </div>
        </a>
      )
    } else if (type == 'Task') {
      return (
        <div className="card closed"
          onClick={ triggerCard }
          ref={ innerRef }
          { ...provided.draggableProps }
          { ...provided.dragHandleProps }
        >
          <div className="content">
            <p>{ name }</p>
          </div>
        </div>
      )
    }
  }
}
