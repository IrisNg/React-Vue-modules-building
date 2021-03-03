import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import './TabsBar.scss';


function TabsBar({ label, tabs, activeTabId, onTabChange }) {

  function mapTabToJSX(tab) {
    const { id, text, panelId } = tab,
      isActive = id === activeTabId,
      className = cx('tabs-bar__tab', { 'is-active': isActive }),
      ariaSelected = isActive ? 'true' : 'false';

    return (
      <button
        className={className}
        onClick={!isActive && onTabChange ? () => { onTabChange(tab) } : null}
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
  }

  return (
    <div
      className="tabs-bar"
      role="tablist"
      aria-label={label}
    >
      {tabs.map(mapTabToJSX)}
    </div>
  );
}

/* ActiveTab state should be stored and managed in parent component */
/* E.g. in parent component:
const [activeTab, setActiveTab] = useState({ ...tabsBarData[0] })
<TabsBar
  tabs={tabsBarData}
  activeTabId={activeTab.id}
  onTabChange={(nextActiveTab) => { setActiveTab({ ...nextActiveTab }) }}
></TabsBar>
*/

//Sample tab obj in 'tabs' props array
//{ 
//  value: str, 
//  text: str, 
//  id: unqiue_id_str, 
//  [optional]panelId: unqiue_id_str //Id of ele that this tab controls visibility of, useful for sections changed by tabs
//}

TabsBar.defaultProps = {
  label: '', //Label for tabs bar
  tabs: [], //Array of tab objects
  activeTabId: '', //Should match a tab obj 'id' parameter
  onTabChange: function(nextActiveTab) {} //Callback to update activeTab state in parent component
}

export default TabsBar;
