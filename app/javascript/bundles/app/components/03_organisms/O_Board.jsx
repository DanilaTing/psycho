import PropTypes from 'prop-types';
import React from 'react';
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
        <O_Column
          key           = { i }
          boards        = { boards }
          project       = { project }
          column        = { column }
          cards         = { cards }
          projectTasks  = { projectTasks }
          renderNewTask = { renderNewTask }
        />
      )
    })

    return columns
  }

  render() {
    return (
      <div className="O_Board">
        { this.renderCurrentBoardColumns() }
      </div>
    )
  }
}
