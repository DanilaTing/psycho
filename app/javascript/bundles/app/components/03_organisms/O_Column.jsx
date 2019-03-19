import PropTypes from 'prop-types';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import O_Card from '../03_organisms/O_Card';
import Turbolinks from 'turbolinks';

export default class O_Column extends React.Component {
  constructor(props) {
    super(props);
  }

  sortCards(cardInColumns) {
    cardInColumns.sort(function(a, b) {
      return a.position - b.position
    });
  }

  renderInboxAdDoneCards() {
    const { boards, column, cards, cardInColumns, project, projectTasks } = this.props
    let cardInColArr = []

    if (column.name == 'Inbox' || 'Done') {
      cardInColumns.map(c => {
        if (column.id == c.column_id) {
          cardInColArr.push(c)
        }
      })
    }

    this.sortCards(cardInColArr)

    let arrayToRender = []

    cardInColArr.map((c, i) => {
      arrayToRender.push(
        <O_Card
          key    = { i }
          index  = { i }
          boards = { boards }
          card   = { c.card }
          open   = { false }
        />
      )
    })

    return arrayToRender
  }

  renderCards() {
    const { boards, column, cards, cardInColumns, project, projectTasks } = this.props
    let cardInColArr = []

    if (project) {
      cardInColumns.map(c => {
        if (c.card.project_id == project.id && c.card.id == c.card_id && column.id == c.column_id) {
          cardInColArr.push(c)
        }
      })
    } else {
      cardInColumns.map(c => {
        if (column.id == c.column_id) {
          cardInColArr.push(c)
        }
      })
    }

    this.sortCards(cardInColArr)

    let arrayToRender = []

    cardInColArr.map((c, i) => {
      arrayToRender.push(
        <O_Card
          key    = { i }
          index  = { i }
          boards = { boards }
          card   = { c.card }
          open   = { false }
        />
      )
    })

    return arrayToRender
  }

  render() {
    const { renderNewTask, column } = this.props
    const { name, id } = this.props.column

    if (name == "Done") {
      return (
        <Droppable droppableId={ column.id.toString() }>
          {(provided) => (
            <div className="column general done" ref={ provided.innerRef } { ...provided.droppableProps }>
              <p className="columnHeading">{ name }</p>
              { this.renderInboxAdDoneCards() }
              { provided.placeholder }
            </div>
          )}
        </Droppable>
      )
    } else if (name == "Inbox") {
      return (
        <Droppable droppableId={ column.id.toString() }>
          {(provided) => (
            <div className="column general inbox" ref={ provided.innerRef } { ...provided.droppableProps }>
              <p className="columnHeading">{ name }</p>
              { this.renderInboxAdDoneCards() }
              { provided.placeholder }
            </div>
          )}
        </Droppable>
      )
    } else {
      return (
        <Droppable droppableId={ column.id.toString() }>
          {(provided) => (
            <div className="column" ref={ provided.innerRef } { ...provided.droppableProps }>
              <p className="columnHeading">{ name }</p>
              { this.renderCards() }
              { provided.placeholder }
              <div className="addTaskInColumn" onClick={ ()=>this.props.renderNewTask(id) }>Add a task...</div>
            </div>
          )}
        </Droppable>
      )
    }
  }
}
