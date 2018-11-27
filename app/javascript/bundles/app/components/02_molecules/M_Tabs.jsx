import PropTypes from 'prop-types';
import React from 'react';
import A_TabItem from '../01_atoms/A_TabItem';

export default class M_Tabs extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTabItems() {
    const { tabs } = this.props
    let TabItems = []

    tabs.map((tab, i) => {
      TabItems.push(
        <A_TabItem tab={ tab } key={ i }/>
      )
    })

    return TabItems
  }

  render() {
    return (
      <section className="M_Tabs">
        { this.renderTabItems() }
      </section>
    );
  }
}
