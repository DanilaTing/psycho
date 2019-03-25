import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

export default class M_GhostCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cards, cardId, ghostRef } = this.props

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
        </div>
      </div>
    )
  }
}
