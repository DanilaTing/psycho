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
    this.pushNewTaskToTasks = this.pushNewTaskToTasks.bind(this)

    this.state = {
      newTaskVisible: false,
      columnFromWhereCreated: '',
      currentBoard: 'General',
      tasks: [],
      projectTasks: this.props.project.tasks
    }
  }

  componentWillMount() {
    const { boards } = this.props
    let tasks = []
    var inboxId

    // Находим Tasks из всех Cards
    boards.map(board => {
      board.columns.map(column => {
        column.cards.map(card => {
          if (card.type == 'Task') {
            tasks.push(card)
          }
        })
      })
    })

    // находим inbox
    boards.map(board => {
      if (board.name == 'General') {
        board.columns.map(column => {
          if (column.name == 'Inbox') {
            inboxId = column.id
          }
        })
      }
    })

    this.setState({
      tasks: tasks,
      columnFromWhereCreated: inboxId,
      inboxId: inboxId
    })
  }

  renderNewTask(id) {
    this.setState({
      columnFromWhereCreated: id,
      newTaskVisible: true
    })
  }

  closeNewTask() {
    this.setState({
      newTaskVisible: false,
      columnFromWhereCreated: this.state.inboxId
    })
  }

  pushNewTaskToTasks(task) {
    const tasks = this.state.tasks
    tasks.push(task)
    console.log(tasks);

    this.setState({
      tasks: tasks
    })
  }


  renderCurrentBoard() {
    const { currentBoard, tasks, projectTasks } = this.state
    const { boards, project } = this.props
    let boardToRender

    boards.map(board => {
      if (board.name == currentBoard) {
        boardToRender = board
      }
    })

    return(
      <O_Board
        board              = { boardToRender }
        project            = { project }
        cards              = { tasks }
        projectTasks       = { projectTasks }
        renderNewTask      = { this.renderNewTask }
      />
    )
  }

  render() {
    const { boards, user, project } = this.props
    const { columnFromWhereCreated, inboxId } = this.state

    return (
      <section>
        { this.state.newTaskVisible ? (
          <O_NewTask
            closeNewTask       = { this.closeNewTask }
            project            = { project }
            boards             = { boards }
            user               = { user }
            columnId           = { columnFromWhereCreated }
            pushNewTaskToTasks = { this.pushNewTaskToTasks }
          />
        ) : '' }
        <O_Menubar
          renderNewTask={ this.renderNewTask }
          inboxId=      { inboxId }
        />
        <O_SubMenubar
          boards={ boards }
          currentBoard={ this.state.currentBoard }
        />
        { this.renderCurrentBoard() }
      </section>
    );
  }
}
