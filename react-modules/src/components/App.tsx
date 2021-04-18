import React, { useState } from 'react'
import './App.scss'
import TabsBar from './TabsBar/TabsBar'
import Pagination from './Pagination/Pagination'
import ListingBase from './ListingBase/ListingBase'
import TableListingContainer from './TableListingContainer/TableListingContainer'
import TableListingItem from './TableListingItem/TableListingItem'
import { fetchListing, updateSomeListingFilters } from '../actions'
import CustomSelect from './CustomSelect/CustomSelect'

import { Tab } from './TabsBar/tab.model'
import tabsBarData from './TabsBar/tabsBarData.js'

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>({ ...tabsBarData[0] })
  const [selectedValue, setSelectedValue] = useState<string>('admin')

  const listingProps = {
    modulesConfig: {
      pagination: {
        hasPrevNextArrows: true,
        hasFirstLastPages: true,
        hasFirstLastArrows: true,
        itemsPerPage: 10,
      },
    },
    filtersStoreKey: 'someListingFilters',
    resultsStoreKey: 'listingResults',
    updateFiltersAction: updateSomeListingFilters,
    fetchListingAction: fetchListing,
    listingContainerConfig: {
      headers: ['id', 'name', 'title'],
    },
  }

  const customSelectProps = {
    fieldName: 'role',
    options: [
      { value: 'admin', text: 'ADMIN' },
      { value: 'beneficiary', text: 'BENEFICIARY' },
      { value: 'merchant', text: 'MERCHANT' },
    ],
    selectedValue,
    onOptionClick: (selectedOption: { value: string; text: string }) => {
      setSelectedValue(selectedOption.value)
    },
  }
  return (
    <div className="App">
      <TabsBar
        label="Greek Tabs"
        tabs={tabsBarData}
        activeTabId={activeTab.id}
        onTabChange={(nextActiveTab: Tab): void => {
          setActiveTab({ ...nextActiveTab })
        }}
      ></TabsBar>
      <CustomSelect {...customSelectProps}></CustomSelect>
      <ListingBase
        {...listingProps}
        ListingContainer={TableListingContainer}
        ListingItem={TableListingItem}
      ></ListingBase>
    </div>
  )
}

export default App
