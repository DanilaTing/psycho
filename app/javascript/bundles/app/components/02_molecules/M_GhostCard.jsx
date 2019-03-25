import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import A_ProjectLabel from '../01_atoms/A_ProjectLabel';

export default class M_GhostCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cards, boards, cardId, ghostRef } = this.props

    let classes = classnames(
      { 'card': true },
      { 'closed': true },
      { 'ghostDrag': true }
    )

    let card

    cards.map(c => {
      if (c.id == cardId) {
        card = c
      }
    })

    return (
      <div className={ classes } ref={ ghostRef }>
        <div className="content">
          { card ? (<p>{ card.name }</p>) : ''}
          { card && card.project_id ? (<A_ProjectLabel projectId={ card.project_id } boards={ boards } />) : '' }
        </div>
      </div>
    )
  }
}
