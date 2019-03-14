import PropTypes from 'prop-types';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import O_CardOpen from '../03_organisms/O_CardOpen';

export default class O_CardClosed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { triggerCard, name, card, index } = this.props
    const { type, id } = card
    const link = '../react/projects/' + id
    if (type == 'Project') {
      return (
        <Draggable draggableId={ card.id } index={ index }>
          {(provided) => (
            <a href={ link }>
              <div className="card closed"
                onClick={ triggerCard }
                ref={ provided.innerRef }
                { ...provided.draggableProps }
                { ...provided.dragHandleProps }
              >
                <div className="content">
                  <p>{ name }</p>
                </div>
              </div>
            </a>
          )}
        </Draggable>
      )
    } else if (type == 'Task') {
      return (
        <Draggable draggableId={ card.id } index={ index }>
          {(provided) => (
            <div className="card closed"
              onClick={ triggerCard }
              ref={ provided.innerRef }
              { ...provided.draggableProps }
              { ...provided.dragHandleProps }
            >
              <div className="content">
                <p>{ name }</p>
              </div>
            </div>
          )}
        </Draggable>
      )
    }
  }
}
