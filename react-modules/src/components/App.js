import React, { useState } from 'react';
import './App.scss';
import TabsBar from './TabsBar/TabsBar';

import tabsBarData from './TabsBar/tabsBarData';


function App() {

  const [activeTab, setActiveTab] = useState({ ...tabsBarData[0] })

  return (
    <div className="App">
      <TabsBar
        tabs={tabsBarData}
        activeTabId={activeTab.id}
        onTabChange={(nextActiveTab) => { setActiveTab({ ...nextActiveTab }) }}
      >
      </TabsBar>
    </div>
  );
}

export default App;
