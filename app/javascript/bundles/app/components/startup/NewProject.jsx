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

  render() {
    const { cardInColumns } = this.props
    return (
      <section>
        { this.state.newTaskVisible ? (<O_NewTask closeNewTask={ this.closeNewTask } cardInColumns={ cardInColumns } columnId={ this.state.columnFromWhereCreated }/>) : ''}
        <O_Menubar activeTab="none" renderNewTask={ this.renderNewTask }/>
        <O_ProjectBar/>
        <div className="board">
        </div>
      </section>
    );
  }
}
