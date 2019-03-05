import PropTypes from 'prop-types';
import React from 'react';
import O_Menubar from '../03_organisms/O_Menubar';
import O_SubMenubar from '../03_organisms/O_SubMenubar';
import O_Board from '../03_organisms/O_Board';
import O_Column from '../03_organisms/O_Column';
import O_NewTask from '../03_organisms/O_NewTask';

export default class Project extends React.Component {
  static propTypes = {
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    this.renderNewTask = this.renderNewTask.bind(this)
    this.closeNewTask = this.closeNewTask.bind(this)

    this.state = {
      newTaskVisible: false,
      columnFromWhereCreated: 6,
      currentBoard: 'General'
    }
  }

  renderNewTask(id) {
    console.log('new task rendered');

    this.setState({
      newTaskVisible: true,
      columnFromWhereCreated: id
    })
  }

  closeNewTask() {
    this.setState({
      newTaskVisible: false,
      columnFromWhereCreated: 6
    })
  }

  renderCurrentBoard() {
    const { currentBoard } = this.state
    const {
      project,
      generalBoard,
      projectsBoards,
      inboxColumn,
      doneColumn,
      cards,
      cardInColumns,
      tasks
    } = this.props

    return(
      <O_Board
        project=       { project }
        currentBoard=  { currentBoard }
        generalBoard=  { generalBoard }
        projectsBoards={ projectsBoards }
        inboxColumn=   { inboxColumn }
        doneColumn=    { doneColumn }
        cards=         { cards }
        cardInColumns= { cardInColumns }
        tasks=         { tasks }
        renderNewTask= { this.renderNewTask }
      />
    )
  }

  render() {
    const {
      project,
      boards,
      generalBoard,
      projectsBoards,
      inboxColumn,
      doneColumn,
      cards,
      cardInColumns,
      tasks
    } = this.props

    return (
      <section>
        { this.state.newTaskVisible ? (
          <O_NewTask
            project=      { project }
            closeNewTask= { this.closeNewTask }
            cardInColumns={ cardInColumns }
            columnId=     { this.state.columnFromWhereCreated }
          />
        ) : ''}

        <O_Menubar activeTab="none" renderNewTask={ this.renderNewTask }/>
        <O_SubMenubar
          project={ project }
          boards={ boards }
          currentBoard={ this.state.currentBoard }
        />

        { this.renderCurrentBoard() }

      </section>
    );
  }
}
