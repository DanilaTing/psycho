import PropTypes from 'prop-types';
import React from 'react';

export default class A_ProjectLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { projectId, boards } = this.props
    var project
    
    boards.map(b => {
      b.columns.map(c => {
        c.cards.map(card => {
          if (card.id == projectId) {
            project = card
          }
        })
      })
    })

    return (
      <div className="A_ProjectLabel">
        { project.name }
      </div>
    )
  }
}
