import PropTypes from 'prop-types';
import React from 'react';

export default class A_TasksCounter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, boards } = this.props
    let tasks = []

    boards.map(b => {
      b.columns.map(c => {
        c.cards.map(card => {
          if (card.project_id == id) {
            tasks.push(card)
          }
        })
      })
    })

    var amountOfTasks = tasks.length

    if (amountOfTasks != 0) {
      return (
        <div className="A_TasksCounter">
          <i className="far fa-sticky-note"></i>
          { amountOfTasks }
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }
}
