import PropTypes from 'prop-types';
import React from 'react';
import $ from 'jquery';

import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';

import O_Column from '../03_organisms/O_Column';

export default class O_Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardInColumns: this.props.cardInColumns
    }

    this.updateState = this.updateState.bind(this)
  }

  renderCurrentBoardColumns() {
    const { boards, board, cards, renderNewTask, projectTasks, project } = this.props
    const { cardInColumns } = this.state
    let columns = []

    board.columns.map((column, i) => {
      columns.push(
        <O_Column
          key           = { i }
          boards        = { boards }
          project       = { project }
          column        = { column }
          cards         = { cards }
          cardInColumns = { cardInColumns }
          projectTasks  = { projectTasks }
          renderNewTask = { renderNewTask }
        />
      )
    })

    return columns
  }

  updateState(cardInColumn) {
    const { cardInColumns } = this.state
    cardInColumns.map((c, i) => {
      if (c.id == cardInColumn.id) {
        cardInColumns.splice(i, 1, cardInColumn)
      }
    })
    this.setState({
      cardInColumns: cardInColumns
    })
  }

  updateCardInColumn(cardInColumn, data) {
    const { updateCardInColumns } = this.props
    const link = '../../card_in_columns/' + cardInColumn.id
    let self = this
    $.ajax({
      dataType: 'JSON',
      url: link,
      type: "PATCH",
      data: data,
      success: response => {
        console.log("updated card in column position", response);
        self.updateState(response)
      }
    })
    .done(function() {
      console.log( "success" );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });
  }

  updateCardInColumnsPosition(cardInColumn, index) {
    const data = {
      card_in_column: {
        position: index
      }
    }
    this.updateCardInColumn(cardInColumn, data)
  }

  updateCardInColumnColumnId(cardInColumn, columnWhereDraggedId) {
    const data = {
      card_in_column: {
        column_id: columnWhereDraggedId
      }
    }
    this.updateCardInColumn(cardInColumn, data)
  }

  updateOtherPositions(draggableId, columnWhereDraggedId, index) {
    const { cardInColumns } = this.state
    cardInColumns.map(cardInColumn => {
      if (cardInColumn.column_id == columnWhereDraggedId && cardInColumn.position >= index && cardInColumn.card.id != draggableId) {
        const position = cardInColumn.position + 1
        const data = {
          card_in_column: {
            position: position
          }
        }
        this.updateCardInColumn(cardInColumn, data)
      }
    })
  }

  onDragEnd = result => {
    console.log('DRAG END RESULT: ', result);
    const { boards, cards } = this.props
    const { draggableId, destination, source } = result
    var draggedCard, columnWhereDragged

    cards.map(card => {
      if (result.draggableId == card.id) {
        draggedCard = card
      }
    })

    boards.map(board => {
      board.columns.map(column => {
        if (result.destination.droppableId == column.id) {
          columnWhereDragged = column
        }
      })
    })

    draggedCard.card_in_columns.map(c => {
      // если поменялось положение только в колонке
      if (c.position != destination.index && c.column_id == destination.droppableId) {
        this.updateCardInColumnsPosition(c, destination.index)
        // повышаем остальной массив
        this.updateOtherPositions(draggableId, columnWhereDragged.id, destination.index)
      }

      // если поменялось положение между колонками
      if (c.column_id != columnWhereDragged.id) {
        this.updateCardInColumnsPosition(c, destination.index)
        this.updateCardInColumnColumnId(c, columnWhereDragged.id)
        // повышаем остальной массив
        this.updateOtherPositions(draggableId, columnWhereDragged.id, destination.index)
      }
    })
  }

  render() {
    return (
      <DragDropContext onDragEnd={ this.onDragEnd }>
        <div className="O_Board">
          { this.renderCurrentBoardColumns() }
        </div>
      </DragDropContext>
    )
  }
}
