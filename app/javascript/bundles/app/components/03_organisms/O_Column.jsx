import PropTypes from 'prop-types';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
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
        <Draggable draggableId={ card.id } index={ i }>
          {(provided) => (
            <O_Card
              innerRef = { provided.innerRef }
              provided = { provided }
              boards = { boards }
              key    = { i }
              card   = { card }
              open   = { false }
            />
          )}
        </Draggable>
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

    cardsToRender.map((card, i) => {
      arrayToRender.push(
        <Draggable draggableId={ card.id } index={ i }>
          {(provided) => (
            <O_Card
              innerRef = { provided.innerRef }
              provided = { provided }
              boards   = { boards }
              key      = { i }
              card     = { card }
              open     = { false }
            />
          )}
        </Draggable>
      )
    })

    return arrayToRender
  }

  render() {
    const { renderNewTask, provided, innerRef } = this.props
    const { name, id } = this.props.column

    if (name == "Done") {
      return (
        <div className="column general done" ref={innerRef} { ...provided.droppableProps }>
          <p className="columnHeading">{ name }</p>
          { this.renderInboxAndDoneCards() }
        </div>
      )
    } else if (name == "Inbox") {
      return (
        <div className="column general inbox" ref={innerRef} { ...provided.droppableProps }>
          <p className="columnHeading">{ name }</p>
          { this.renderInboxAndDoneCards() }
        </div>
      )
    } else {
      return (
        <div className="column" ref={innerRef} { ...provided.droppableProps }>
          <p className="columnHeading">{ name }</p>
          { this.renderCards() }
          <div className="addTaskInColumn" onClick={ () => renderNewTask(id) }>Add a task...</div>
        </div>
      )
    }
  }
}
