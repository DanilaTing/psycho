import PropTypes from 'prop-types';
import React from 'react';
import O_CardClosed from '../03_organisms/O_CardClosed';

export default class O_Column extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCards() {
    const { column, cards, cardInColumns } = this.props
    let columnCards = []

    cardInColumns.map((cardInColumn, i) => {
      cards.map((card, i) => {
        if (cardInColumn.card_id == card.id && cardInColumn.column_id == column.id && card.type != 'project') {
          columnCards.push (
            <O_CardClosed
              card={ card }
              key={ i }
              open={ false }
            />
          )
        }
      })
    })

    return columnCards
  }

  render() {
    const { name } = this.props.column

    return (
      <div className="column">
        <p className="columnHeading">{ name }</p>
        { this.renderCards() }
      </div>
    );
  }
}
