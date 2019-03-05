import PropTypes from 'prop-types';
import React from 'react';
import Turbolinks from 'turbolinks';

export default class O_SubMenubar extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBoards() {
    const { project, boards, currentBoard } = this.props
    let boardsToRender = []

    boards.map((board, i) => {
      if (currentBoard == board.name) {
        boardsToRender.push(
          <a className="active" key={ i }>{ board.name }</a>
        )
      } else {
        boardsToRender.push(
          <a key={ i }>{ board.name }</a>
        )
      }
    })

    return (
      <div className="boardsInMenu">
        { boardsToRender }
      </div>
    )
  }

  render() {
    const { project } = this.props

    return (
      <section className="O_SubMenubar">
        { project ? (<p className="ProjectName">{ project.name }</p>) : '' }
        { this.renderBoards() }
      </section>
    );
  }
}
