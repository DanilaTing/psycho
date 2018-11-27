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
    let tabs = [
      {
        text: 'Tasks',
        link: '/tasks',
        active: true
      }, {
        text: 'Projects',
        link: '/projects',
        active: false
      }
    ]
    return (
      <section className="O_Menubar">
        <div className="leftside">
          <p className="logo">PSYCHO</p>
          <M_Tabs tabs={ tabs }/>
        </div>

        <div className="rightside">
          <div className="buttons">
            <A_TextButton text="New Task"/>
            <A_TextButton text="New Project"/>
          </div>
          <A_Avatar/>
        </div>
      </section>
    );
  }
}
