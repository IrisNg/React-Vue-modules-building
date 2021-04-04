import React from 'react';
import cx from 'classnames';

import {Tab} from './tab.model';
import './TabsBar.scss';

interface TabsBarProps {
  label: string;
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (nextActiveTab: Tab)=>void;
}

const TabsBar: React.FC<TabsBarProps> = ({ label, tabs, activeTabId, onTabChange })=> {

  const mapTabToJSX=(tab: Tab)=> {
    const { id, text, panelId } = tab,
      isActive:boolean = id === activeTabId,
      className:string = cx('tabs-bar__tab', { 'is-active': isActive });

    return (
      <button
        className={className}
        onClick={!isActive && onTabChange ? () => { onTabChange(tab) } : undefined}
        key={id}
        role="tab"
        aria-selected={isActive}
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


TabsBar.defaultProps = {
  label: '', //Label for tabs bar
  tabs: [], //Array of tab objects
  activeTabId: '', //Should match a tab obj 'id' parameter
  onTabChange: function(nextActiveTab) {} //Callback to update activeTab state in parent component
}

export default TabsBar;
