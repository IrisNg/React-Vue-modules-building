import React, { useState } from 'react';
import './App.scss';
import TabsBar from './TabsBar/TabsBar';
import Pagination from './Pagination/Pagination'

import { Tab } from './TabsBar/tab.model'
import tabsBarData from './TabsBar/tabsBarData.js';


const App: React.FC = () => {

  const [activeTab, setActiveTab] = useState<Tab>({ ...tabsBarData[0] })

  const onPaginationPageChange = (selectedPageNumber: number) => {
    console.log('pg', selectedPageNumber)
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

      <Pagination currentPage={ 7 } totalItemsCount={ 120 } itemsPerPage={ 10 } hasPrevNextArrows hasFirstLastArrows hasFirstLastPages onPageChange={ onPaginationPageChange } />
    </div>
  );
}

export default App;
