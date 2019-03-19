import PropTypes from 'prop-types';
import React from 'react';

import O_CardOpen from '../03_organisms/O_CardOpen';

export default class O_CardClosed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { triggerCard, name, card, boards } = this.props
    const { type, id } = card
    const link = '../react/projects/' + id
    var project

    if (card.project_id != '') {
      boards.map(board => {
        board.columns.map(column => {
          column.cards.map(c => {
            if (c.id == card.project_id) {
              project = c
            }
          })
        })
      })
    }

    if (type == 'Project') {
      return (
        <a href={ link }>
          <div className="card closed" onClick={ triggerCard } draggable={ true }>
            <div className="content">
              <p>{ name }</p>
            </div>
          </div>
        </a>
      )
      
    } else if (type == 'Task') {
      return (
        <div className="card closed" onClick={ triggerCard } draggable={true}>
          <div className="content">
            <p>{ name }</p>
            { project ? (<a href={'../react/projects/' + project.id} className='projectLabel'>{ project.name }</a>) : '' }
          </div>
        </div>
      )
    }
  }
}
