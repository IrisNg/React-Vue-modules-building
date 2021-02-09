import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import './TabsBar.scss';


function onTabChange(clickedTab, state, onTabChangeCallback) {
  state.setTabs(state.tabs.map(tab => ({ ...tab, isActive: tab.id === clickedTab.id })))

  if (onTabChangeCallback) {
    onTabChangeCallback(clickedTab)
  }
}

function renderTabs(state, callbacks) {

  return state.tabs.map((tab) => {

    const { id, isActive, text, panelId } = tab,
      className = cx('tabs-bar__tab', { 'is-active': isActive }),
      ariaSelected = isActive ? 'true' : 'false';

    return (
      <button
        className={className}
        onClick={isActive ? null : () => { onTabChange(tab, state, callbacks.onTabChangeCallback) }}
        key={id}
        role="tab"
        aria-selected={ariaSelected}
        aria-controls={panelId}
        id={id}
        tab-index="0"
      >
        {text}
      </button>
    );
  })
}

function TabsBar({ label, initialTabs, onTabChangeCallback }) {

  const [tabs, setTabs] = useState([])

  useEffect(() => {
    setTabs(initialTabs)
  }, [label]);


  return (
    <div
      className="tabs-bar"
      role="tablist"
      aria-label={label}
    >
      {renderTabs({tabs, setTabs}, {onTabChangeCallback})}
    </div>
  );
}

TabsBar.defaultProps = {
  label: '',
  tabs: []
}

export default TabsBar;
