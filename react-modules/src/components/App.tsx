import React, { useState } from 'react';
import './App.scss';
import TabsBar from './TabsBar/TabsBar';
import Pagination from './Pagination/Pagination'
import ListingBase from './ListingBase/ListingBase'
import TableListingContainer from './TableListingContainer/TableListingContainer'
import TableListingItem from './TableListingItem/TableListingItem'
import { fetchListing, updateSomeListingFilters } from '../actions'

import { Tab } from './TabsBar/tab.model'
import tabsBarData from './TabsBar/tabsBarData.js';

const App: React.FC = () => {

  const [activeTab, setActiveTab] = useState<Tab>({ ...tabsBarData[0] })


  const listingProps = {
    modulesConfig: {
      pagination: {
        hasPrevNextArrows: true,
        hasFirstLastPages: true,
        hasFirstLastArrows: true,
        itemsPerPage: 10
      }
    },
    filtersStoreKey: 'someListingFilters',
    resultsStoreKey: 'listingResults',
    updateFiltersAction: updateSomeListingFilters,
    fetchListingAction: fetchListing,
    listingContainerConfig: {
      headers: ['id', 'name', 'title']
    }

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

      <ListingBase { ...listingProps } ListingContainer={ TableListingContainer } ListingItem={TableListingItem}>

      </ListingBase>
    </div>
  );
}

export default App;
