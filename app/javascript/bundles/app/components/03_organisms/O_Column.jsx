import PropTypes from 'prop-types';
import React from 'react';
import O_Card from '../03_organisms/O_Card';
import Turbolinks from 'turbolinks';

export default class O_Column extends React.Component {
  constructor(props) {
    super(props);
  }

  sortCards(c) {
    c.sort(function(a, b) {
      return b.id - a.id
    });
  }

  renderCards() {
    const { boards, column, cards, project, projectTasks } = this.props
    let cardsToRender = []

    if (project) {
      cards.map((card, i) => {
        if (card.project_id == project.id) {
          card.card_in_columns.map(card_in_column => {
            if (column.id == card_in_column.column_id) {
              cardsToRender.push(
                card
              )
            }
          })
        }
      })
    } else {
      cards.map((card, i) => {
        card.card_in_columns.map(card_in_column => {
          if (column.id == card_in_column.column_id) {
            cardsToRender.push(
              card
            )
          }
        })
      })
    }

    console.log('BEFORE SORT: ', cardsToRender);

    var sorted = cardsToRender.sort(function(a, b) {
      return b.id - a.id
    });

    console.log('AFTER SORT: ', sorted);

    let arrayToRender = []

    sorted.map((card, i) => {
      arrayToRender.push(
        <O_Card
          boards = { boards }
          key    = { i }
          card   = { card }
          open   = { false }
        />
      )
    })

    return arrayToRender
  }

  renderInboxAndDoneCards() {
    const { boards, column, cards } = this.props
    let cardsToRender = []

    cards.map((card, i) => {
      card.card_in_columns.map(card_in_column => {
        if (column.id == card_in_column.column_id) {
          cardsToRender.push(
            card
          )
        }
      })
    })

    this.sortCards(cardsToRender)

    let arrayToRender = []

    cardsToRender.map((cardToRender, i) => {
      arrayToRender.push(
        <O_Card
          boards = { boards }
          key    = { i }
          card   = { cardToRender }
          open   = { false }
        />
      )
    })

    return arrayToRender
  }

  render() {
    const { renderNewTask } = this.props
    const { name, id } = this.props.column

    if (name == "Done") {
      return (
        <div className="column general done">
          <p className="columnHeading">{ name }</p>
          { this.renderInboxAndDoneCards() }
        </div>
      )
    } else if (name == "Inbox") {
      return (
        <div className="column general inbox">
          <p className="columnHeading">{ name }</p>
          { this.renderInboxAndDoneCards() }
        </div>
      )
    } else {
      return (
        <div className="column">
          <p className="columnHeading">{ name }</p>
          { this.renderCards() }
          <div className="addTaskInColumn" onClick={ () => renderNewTask(id) }>Add a task...</div>
        </div>
      )
    }
  }
}
