import PropTypes from 'prop-types';
import React from 'react';
import O_Menubar from '../03_organisms/O_Menubar';
import O_Column from '../03_organisms/O_Column';
import O_NewTask from '../03_organisms/O_NewTask';

export default class Projects extends React.Component {
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

  renderGeneralBoard() {
    const { columns, cards, cardInColumns } = this.props
    let boardColumns = []

    columns.map((column, i) => {
      boardColumns.push (
        <O_Column
          column={ column }
          cards={ cards }
          key={ i }
          cardInColumns={ cardInColumns }
        />
      )
    })

    return boardColumns
  }

  render() {
    const { board, cardInColumns } = this.props

    return (
      <section>
        { this.state.newTaskVisible ? (<O_NewTask closeNewTask={ this.closeNewTask } cardInColumns={ cardInColumns } columnId={ this.state.columnFromWhereCreated }/>) : ''}
        <O_Menubar activeTab="Projects" renderNewTask={ this.renderNewTask }/>
        <div className="O_Board">
          <div className="columns">
            { this.renderGeneralBoard() }
          </div>
        </div>
      </section>
    );
  }
}
