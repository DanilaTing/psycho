import PropTypes from 'prop-types';
import React from 'react';
import O_Column from '../03_organisms/O_Column';

export default class O_Board extends React.Component {
  constructor(props) {
    super(props);
  }

  renderColumns() {
    const { columns } = this.props
    const htmlElements = []

    columns.map((column, i) => {
      htmlElements.push(
        <O_Column column={ column } key={ 'column_' + i } />
      )
    })

    return (
      <div>
        { htmlElements }
      </div>
    )
  }

  renderGeneralBoard() {
    const {
      project,
      currentBoard,
      generalBoard,
      projectsBoards,
      inboxColumn,
      doneColumn,
      cardInColumns,
      tasks,
      renderNewTask
    } = this.props

    let columnsForBoard = []
    let tasksForProject = []
    let cards

    if (project) {
      tasks.map((task, i)=> {
        if (task.project_id == project.id) {
          tasksForProject.push(
            task
          )
        }
      })
      cards = tasksForProject
    } else {
      cards = tasks
    }

    generalBoard.columns.map((column, i) => {
      columnsForBoard.push(
        <O_Column
          project=      { project }
          key=          { i }
          column=       { column }
          cards=        { cards }
          cardInColumns={ cardInColumns }
          renderNewTask={ renderNewTask }
        />
      )
    })

    return columnsForBoard
  }

  render() {
    const { currentBoard } = this.props

    if (currentBoard == 'General') {
      return (
        <div className="O_Board">
          { this.renderGeneralBoard() }
        </div>
      )
    } else {
      return (
        <div className="O_Board">
          { this.renderColumns( ) }
        </div>
      )
    }
  }
}
