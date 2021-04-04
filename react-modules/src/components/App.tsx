import React, { useState } from 'react';
import './App.scss';
import TabsBar from './TabsBar/TabsBar';

import {Tab} from './TabsBar/tab.model'
import tabsBarData from './TabsBar/tabsBarData';


const App:React.FC=()=> {

  const [activeTab, setActiveTab] = useState<Tab>({ ...tabsBarData[0] })

  return (
    <div className="App">
      <TabsBar
      label="Greek Tabs"
        tabs={tabsBarData}
        activeTabId={activeTab.id}
        onTabChange={(nextActiveTab: Tab):void => { setActiveTab({ ...nextActiveTab }) }}
      >
      </TabsBar>
    </div>
  );
}

export default App;
