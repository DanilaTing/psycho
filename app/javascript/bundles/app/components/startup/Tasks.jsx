import PropTypes from 'prop-types';
import React from 'react';
import $ from 'jquery';
import Turbolinks from 'turbolinks';
import O_Menubar from '../03_organisms/O_Menubar';
import O_Column from '../03_organisms/O_Column';
import O_NewTask from '../03_organisms/O_NewTask';

export default class Tasks extends React.Component {
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
      newTaskVisible: false
    }
  }

  renderNewTask() {
    console.log('new task rendered');

    this.setState({
      newTaskVisible: true
    })
  }

  closeNewTask() {
    this.setState({
      newTaskVisible: false
    })
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
        { this.state.newTaskVisible ? (<O_NewTask closeNewTask={ this.closeNewTask }/>) : ''}
        <O_Menubar activeTab="Tasks" renderNewTask={ this.renderNewTask }/>
        <div className="O_Board">
          { this.rednerDoneColumn() }
          <div className="columns">
            { this.renderGeneralBoard() }
          </div>
          { this.rednerInboxColumn() }
        </div>
      </section>
    );
  }
}
