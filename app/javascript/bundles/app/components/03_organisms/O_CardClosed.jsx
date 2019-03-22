import PropTypes from 'prop-types';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import O_CardOpen from '../03_organisms/O_CardOpen';

export default class O_CardClosed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { triggerCard, name, card, index, priority } = this.props
    const { type, id } = card
    const link = '../react/projects/' + id

    let className = ''
    switch (priority) {
      // case 'None': {
      //   className = 'card_none'
      //   break
      // }

      case 'High': {
        className = 'card_high'
        break
      }

      case 'Middle': {
        className = 'card_middle'
        break
      }

      case 'Low': {
        className = 'card_low'
        break
      }
    }

    if (type == 'Project') {
      return (
        <Draggable draggableId={ card.id } index={ index }>
          {(provided) => (
            <a href={ link }>
              <div className={ "card closed " + className }
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
            <div className={ "card closed " + className }
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
