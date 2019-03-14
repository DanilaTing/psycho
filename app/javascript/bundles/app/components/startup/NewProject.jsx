import PropTypes from 'prop-types';
import React from 'react';
import O_Menubar from '../03_organisms/O_Menubar';
import O_ProjectBar from '../03_organisms/O_ProjectBar';
import O_Column from '../03_organisms/O_Column';
import O_NewTask from '../03_organisms/O_NewTask';

export default class NewProject extends React.Component {
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
      columnFromWhereCreated: 6
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

  render() {
    const { user, boards, project } = this.props
    const { inboxId } = this.state
    return (
      <section>
        { this.state.newTaskVisible ? (
          <O_NewTask
            closeNewTask={ this.closeNewTask }
            cardInColumns={ cardInColumns }
            columnId={ this.state.columnFromWhereCreated }
          />
        ) : ''}
        <O_Menubar
          activeTab="none"
          renderNewTask={ this.renderNewTask }
        />
        <O_ProjectBar
          user={ user }
          columnId={ inboxId }
        />
        <div className="board">
        </div>
      </section>
    );
  }
}
