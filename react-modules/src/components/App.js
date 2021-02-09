import React, {useState} from 'react';
import './App.scss';
import TabsBar from './TabsBar/TabsBar';

import TabsBarData from './TabsBar/TabsBarData';

function onTabChangeCallback(nextTab) {
console.log('next tab callback', nextTab)
}

function App() {

  return (
    <div className="App">
      <TabsBar initialTabs={TabsBarData} onTabChangeCallback={onTabChangeCallback}></TabsBar>
    </div>
  );
}

export default App;
