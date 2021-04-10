import React, { useState } from 'react';

import TabsBar from './TabsBar/TabsBar';
import Modal from './Modal/Modal';

import './App.scss';
import { Tab } from './TabsBar/tab.model';
import { ModalProps } from './Modal/modal.model';
import tabsBarData from './TabsBar/tabsBarData.js';


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>({
    ...tabsBarData[0],
  });

  const [isModalOpen, setModalOpenStatus] = useState<boolean>(
    false
  );

  const onModalTriggerClick = (): void => {
    setModalOpenStatus(true);
  };

  const onModalCompletedClose = (): void => {
    setModalOpenStatus(false)
  }

  const modalProps: ModalProps = {
    portalNodeId: "modal-root-2",
    title: 'ghegheh',
    description: 'nananaa',
    buttons: [
      {
        mode: "close",
        btnType: 'button',
        id: 'close',
        text: 'close leh',
      },
    ],
    onCompletedClose: onModalCompletedClose
  };



  return (
    <div className="App">
      <TabsBar
        label="Greek Tabs"
        tabs={ tabsBarData }
        activeTabId={ activeTab.id }
        onTabChange={ (nextActiveTab: Tab): void => {
          setActiveTab({ ...nextActiveTab });
        } }
      ></TabsBar>
      <button type="button" onClick={ onModalTriggerClick }>
        Click me!
      </button>
      {isModalOpen ? (<Modal className="random" { ...modalProps } />) : null }
    </div>
  );
};

export default App;
