import PropTypes from 'prop-types';
import React from 'react';
import Turbolinks from 'turbolinks';
import classnames from 'classnames';

import O_Card from '../03_organisms/O_Card';

export default class O_Column extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayToRender: [],
      dragOverId: 0,
    }

    this.renderCards = this.renderCards.bind(this)
  }

  componentWillReceiveProps() {
    this.renderCards()
  }

  componentWillMount() {
    this.renderCards()
  }

  renderCards() {
    const { boards, column, cards, cardInColumns, project, projectTasks, ghostDragRef, dragging } = this.props
    let cardInColArr = []

    if (column.name == 'Inbox' || column.name == 'Done') {
      cardInColumns.map(c => {
        if (column.id == c.column_id) {
          cardInColArr.push(c)
        }
      })
    } else if (column.name == 'Inbox' || 'Done') {
      cardInColumns.map(c => {
        if (column.id == c.column_id) {
          const columnName = columns.find(item => item.id === c.column_id).name
          cardInColArr.push({...c, columnName })
        }
      })
    } else {
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
    }

    let arrayToRender = []

    cardInColArr.map((c, i) => {
      arrayToRender.push(
        <O_Card
          key          = { i }
          index        = { i }
          boards       = { boards }
          card         = { c.card }
          open         = { false }
          ghostDragRef = { ghostDragRef }
          dragging     = { dragging }
          actions      = { this.props.actions }
        />
      )
    })

    this.setState({
      arrayToRender: arrayToRender
    })
  }

  // updateCardInColumnColumnPosition(columnId) {
  //   const { cards } = this.props
  //   var card
  //   cards.map(c => {
  //     if (c.id == this.props.draggingCardId) {
  //       card = c
  //     }
  //   })
  //
  //   let newArrayToRender = []
  //   this.state.arrayToRender.map(a => { newArrayToRender.push(a) })
  //   const key = this.state.arrayToRender.length + 1
  //   newArrayToRender.push(
  //     <O_Card
  //       key          = { key }
  //       index        = { key }
  //       boards       = { this.props.boards }
  //       card         = { card }
  //       open         = { false }
  //     />
  //   )
  //
  //   this.setState({
  //     arrayToRender: newArrayToRender
  //   })
  // }

  render() {
    const { renderNewTask, column, actions } = this.props
    const { name, id } = column
    const { onDragOver, onDragEnter, onDragLeave, onDrop } = actions
    const { arrayToRender } = this.state

    let classes = classnames(
      { "column": true },
      { [`${name}`]: true },
    )

    return (
      <div className={ classes }
        onDrop={ (e) => onDrop(e, id) }
        onDragOver={ (e) => onDragOver(e, id) }
        onDragEnter={ (e) => onDragEnter(e, id) }
        onDragLeave={ (e) => onDragLeave(e, id) }>

        <p className="columnHeading">{ name }</p>
        { arrayToRender }

        { name != 'Done' && name != 'Inbox' ? (
          <div className="addTaskInColumn" onClick={ ()=>this.props.renderNewTask(id) }>Add a card...</div>
        ) : '' }
      </div>
    )
  }
}
