import PropTypes from 'prop-types';
import React from 'react';
import M_Tabs from '../02_molecules/M_Tabs';
import A_TextButton from '../01_atoms/A_TextButton';
import A_Avatar from '../01_atoms/A_Avatar';

export default class O_Menubar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activeTab, renderNewTask, closeNewTask, inboxId, project } = this.props
    const id = 7

    let tabs = [
      {
        text: 'Tasks',
        link: '../../react/tasks',
        activeTab: activeTab
      }, {
        text: 'Projects',
        link: '../../react/projects',
        activeTab: activeTab
      }
    ]

    if (project) {
      tabs.push(
        {
          text: project.name,
          link: '../../react/projects/' + project.id,
          activeTab: activeTab
        }
      )
    }
    return (
      <section className="O_Menubar">
        <div className="leftside">
          <p className="logo">PSYCHO</p>
          <M_Tabs tabs={ tabs }/>
        </div>

        <div className="rightside">
          <div className="buttons">
            <A_TextButton
              text="New Task"
              action={ renderNewTask }
              inboxId={ inboxId }
            />
            <A_TextButton
              text="New Project"
              link="../../../react/projects/new"
            />
          </div>
          <A_Avatar/>
        </div>
      </section>
    );
  }
}
