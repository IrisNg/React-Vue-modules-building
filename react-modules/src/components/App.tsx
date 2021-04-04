import React, { useState } from 'react';

import TabsBar from './TabsBar/TabsBar';
import Modal from './Modal/Modal'

import './App.scss';
import { Tab } from './TabsBar/tab.model'
import tabsBarData from './TabsBar/tabsBarData.js';


const App: React.FC = () => {

  const [activeTab, setActiveTab] = useState<Tab>({ ...tabsBarData[0] });

  const [isModalOpen, setModalStatus] = useState<boolean>(false);
  const onModalTriggerClick = (): void => {
    setModalStatus(true)
  }

  return (
    <div className="App">
      <TabsBar
        label="Greek Tabs"
        tabs={ tabsBarData }
        activeTabId={ activeTab.id }
        onTabChange={ (nextActiveTab: Tab): void => { setActiveTab({ ...nextActiveTab }) } }
      >
      </TabsBar>
      <button type="button" onClick={ onModalTriggerClick }></button>
      {isModalOpen ? <Modal></Modal> : null }

    </div>
  );
}

export default App;
