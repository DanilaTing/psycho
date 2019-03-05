import PropTypes from 'prop-types';
import React from 'react';
import O_Menubar from '../03_organisms/O_Menubar';
import O_Board from '../03_organisms/O_Board';
import O_Column from '../03_organisms/O_Column';

export default class Tasks extends React.Component {
  static propTypes = {
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);
<<<<<<< HEAD

    this.renderNewTask = this.renderNewTask.bind(this)
    this.closeNewTask = this.closeNewTask.bind(this)

    this.state = {
      newTaskVisible: false,
      columnFromWhereCreated: '',
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
      columnFromWhereCreated: ''
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
=======
  }

  renderGeneralBoard() {
    const { columns, cards, cardInColumns } = this.props
    let boardColumns = []

    columns.sort((a,b) => a.position - b.position);
    columns.map((column, i) => {
      if (column.name != "Done" && column.name != "Inbox") {
        boardColumns.push (
          <O_Column
            column={ column }
            cards={ cards }
            key={ i }
            cardInColumns={ cardInColumns }
          />
        )
      }
    })

    return boardColumns
>>>>>>> psycho/addingUsers
  }

  rednerInboxColumn() {
    const { columns, cards, cardInColumns } = this.props
    let inboxColumn = []

    columns.map((column, i) => {
      if (column.name == "Inbox") {
        inboxColumn.push (
          <O_Column
            column={ column }
            cards={ cards }
            key={ i }
            cardInColumns={ cardInColumns }
          />
        )
      }
    })

    return inboxColumn
  }

  rednerDoneColumn() {
    const { columns, cards, cardInColumns } = this.props
    let doneColumn = []

    columns.map((column, i) => {
      if (column.name == "Done") {
        doneColumn.push (
          <O_Column
            column={ column }
            cards={ cards }
            key={ i }
            cardInColumns={ cardInColumns }
          />
        )
      }
    })

    return doneColumn
  }

  render() {
    const { board } = this.props

    return (
      <section>
<<<<<<< HEAD
        { this.state.newTaskVisible ? (<O_NewTask closeNewTask={ this.closeNewTask } cardInColumns={ cardInColumns } columnId={ this.state.columnFromWhereCreated }/>) : ''}
        <O_Menubar activeTab="Tasks" renderNewTask={ this.renderNewTask }/>
        { this.renderCurrentBoard() }
=======
        <O_Menubar activeTab="Tasks"/>
        <div className="O_Board">
          { this.rednerDoneColumn() }
          <div className="columns">
            { this.renderGeneralBoard() }
          </div>
          { this.rednerInboxColumn() }
        </div>
>>>>>>> psycho/addingUsers
      </section>
    );
  }
}
