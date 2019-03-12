import PropTypes from 'prop-types';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import O_Column from '../03_organisms/O_Column';

export default class O_Board extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCurrentBoardColumns() {
    const { boards, board, cards, renderNewTask, projectTasks, project } = this.props
    let columns = []

    board.columns.map((column, i) => {
      columns.push(
        <Droppable droppableId={ column.id }>
          {(provided) => (
            <O_Column
              innerRef={ provided.innerRef }
              provided={provided}
              key           = { i }
              boards        = { boards }
              project       = { project }
              column        = { column }
              cards         = { cards }
              projectTasks  = { projectTasks }
              renderNewTask = { renderNewTask }
            >
              { provided.placeholder }
            </O_Column>
          )}
        </Droppable>
      )
    })

    return columns
  }

  onDragEnd = result => {

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
