import PropTypes from 'prop-types';
import React from 'react';
import O_Card from '../03_organisms/O_Card';
import Turbolinks from 'turbolinks';

export default class O_Column extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCards() {
    const { column, cards, cardInColumns, project } = this.props
    let columnCards = []

    cardInColumns.map((cardInColumn, i) => {
      cards.map((card, i) => {
        if (cardInColumn.card_id == card.id && cardInColumn.column_id == column.id) {
          columnCards.push (
            <O_Card
              project={ project }
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
    const { column } = this.props
    const { name, id } = column

    if (name == "Done") {
      return (
        <div className="column general done">
          <p className="columnHeading">{ name }</p>
          <div className="cardsWrapper">
            { this.renderCards() }
          </div>
        </div>
      );
    } else if (name == "Inbox") {
      return (
        <div className="column general inbox">
          <p className="columnHeading">{ name }</p>
          <div className="cardsWrapper">
            { this.renderCards() }
          </div>
        </div>
      );
    } else {
      return (
        <div className="column">
          <p className="columnHeading">{ name }</p>
          <div className="cardsWrapper">
            { this.renderCards() }
          </div>
          <div className="addTaskInColumn" onClick={ ()=>this.props.renderNewTask(id) }>Add a task...</div>
        </div>
      );
    }
  }
}
