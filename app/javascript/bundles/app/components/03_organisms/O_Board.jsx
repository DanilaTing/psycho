import PropTypes from 'prop-types';
import React from 'react';
import $ from 'jquery';

import M_GhostCard from '../02_molecules/M_GhostCard';
import O_Column from '../03_organisms/O_Column';

export default class O_Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardInColumns: this.props.cardInColumns,
      columns: this.props.board.columns,
      dragging: false,
      dragStartColumnId: 0,
      dragOverId: 0,
      draggingCardId: 1,
      draggingCardInColumn: {},
    }

    // this.updateState = this.updateState.bind(this)
    // this.toggleDragging = this.toggleDragging.bind(this)
    // this.setDragOverId = this.setDragOverId.bind(this)
    this.renderGhostDrag = this.renderGhostDrag.bind(this)
    // this.setDraggingCardId = this.setDraggingCardId.bind(this)
    this.renderCurrentBoardColumns = this.renderCurrentBoardColumns.bind(this)

    this.ghostDragRef = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cardInColumns: nextProps.cardInColumns,
      columns: nextProps.board.columns,
    })

    this.renderCurrentBoardColumns()
  }

  renderCurrentBoardColumns() {
    const { boards, board, cards, renderNewTask, projectTasks, project, columns, cardInColumns, lowPriorityCards, middlePriorityCards, highPriorityCards } = this.props
    const { dragging, dragOverId } = this.state

    let actions = {
      toggleDragging: this.toggleDragging,
      setDragOverId: this.setDragOverId,
      setDraggingCardId: this.setDraggingCardId,
      onDragOver: this.onDragOver,
      onDragEnter: this.onDragEnter,
      onDragLeave: this.onDragLeave,
      onDrop: this.onDrop,
      onDragStart: this.onDragStart,
      onDragEnd: this.onDragEnd,
    }

    let columnsToRender = []

    columns.map((column, i) => {
      columnsToRender.push(
        <O_Column
          key            = { i }
          boards         = { boards }
          project        = { project }
          column         = { column }
          cards          = { cards }
          cardInColumns  = { cardInColumns }
          projectTasks   = { projectTasks }
          renderNewTask  = { renderNewTask }
          dragging       = { dragging }
          dragOverId     = { dragOverId }
          ghostDragRef   = { this.ghostDragRef }
          draggingCardId = { this.state.draggingCardId }
          columns       = { board.columns }
          lowPriorityCards = { lowPriorityCards }
          middlePriorityCards = { middlePriorityCards }
          highPriorityCards = { highPriorityCards }
          onSave = { this.props.onSave }
          actions        = { actions }
        />
      )
    })

    return columnsToRender
  }

  updateState(cardInColumn) {
    const { cardInColumns } = this.state
    console.log('cardInColumn.id: ', cardInColumn.id);
    cardInColumns.map((c, i) => {
      if (c.id == cardInColumn.id) {
        cardInColumns.splice(i, 1, cardInColumn)
        console.log('SPLICED');
      }
    })
    this.setState({
      cardInColumns: cardInColumns
    })
    console.log('STATE UPDATED')
  }

  updateCardInColumn(id, data) {
    const link = '../../card_in_columns/' + id
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

  //Для колонки

  onDragOver = (e, id) => {
    e.preventDefault()
    if (this.state.dragStartColumnId == 0) {
      let draggingCardInColumn
      this.state.cardInColumns.map(c => {
        if (c.card_id == this.state.draggingCardId && c.column_id == id) {
          draggingCardInColumn = c
        }
      })
      this.setState({
        dragStartColumnId: id,
        draggingCardInColumn: draggingCardInColumn
      })
    }
  }

  onDragEnter = (e, id) => {
    if (id != this.state.dragOverId) {

      const { cardInColumns, dragOverId, draggingCardId } = this.state

      cardInColumns.map((c, i) => {
        if (c.column_id == dragOverId && c.card_id == draggingCardId) {
          let newCardInColumn = {
            id: c.id,
            card_id: this.state.draggingCardId,
            column_id: id,
            card: {
              ...c.card,
              fake: true
            }
          }
          cardInColumns.splice(i, 1, newCardInColumn)
        }
      })

      this.setState({
        dragOverId: id
      })
    }
  }

  onDragLeave = (e, id) => {
  }

  onDrop = (e, id) => {
    const { cards } = this.props
    const { draggingCardInColumn, cardInColumns, dragStartColumnId, draggingCardId, dragOverId, columns } = this.state

    let data = {
      card_in_column: {
        column_id: id
      }
    }

    this.updateCardInColumn(draggingCardInColumn.id, data)


    this.setState({
      dragStartColumnId: 0,
      dragOverId: 0,
      draggingCardId: '',
      draggingCardInColumn: {}
    })
  }

  //Для карточки

  onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);

    this.setState({
      dragging: true,
      draggingCardId: id
    })

    let drag = this.ghostDragRef.current
    e.dataTransfer.setDragImage(drag, 10, 10)
  }

  onDragEnd = () => {
    this.setState({
      dragging: false
    })
  }

  renderGhostDrag() {
    const { cards, boards } = this.props
    const { draggingCardId } = this.state
    return(
      <M_GhostCard
        ghostRef={ this.ghostDragRef }
        cardId={ draggingCardId }
        cards={ cards }
        boards={ boards }
      />
    )
  }

  render() {
    return (
      <div className="O_Board container-drag">
        { this.renderCurrentBoardColumns() }
        { this.renderGhostDrag() }
      </div>
    )
  }
}
