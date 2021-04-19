import React, { useState } from 'react'
import './App.scss'
import TabsBar from './TabsBar/TabsBar'
import Pagination from './Pagination/Pagination'
import ListingBase from './ListingBase/ListingBase'
import TableListingContainer from './TableListingContainer/TableListingContainer'
import TableListingItem from './TableListingItem/TableListingItem'
import { fetchListing, updateSomeListingFilters } from '../actions'
import ListingFilters from './ListingFilters/ListingFilters'
import CustomSelect from './CustomSelect/CustomSelect'

import { Tab } from './TabsBar/tab.model'
import tabsBarData from './TabsBar/tabsBarData.js'

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>({ ...tabsBarData[0] })
  // const [selectedValue, setSelectedValue] = useState<string>('admin')

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

  // const customSelectProps = {
  //   onOptionClick: (selectedOption: { value: string; text: string }) => {
  //     setSelectedValue(selectedOption.value)
  //   },
  // }

  const listingFiltersProps = {
    filtersStoreKey: 'someListingFilters',
    updateFiltersAction: updateSomeListingFilters,
    initialValues: { role: 'beneficiary' },
    Components: [
      [
        {
          Component: CustomSelect,
          fieldName: 'role',
          config: {
            options: [
              { value: 'admin', text: 'ADMIN' },
              { value: 'beneficiary', text: 'BENEFICIARY' },
              { value: 'merchant', text: 'MERCHANT' },
            ],
          },
        },
      ],
      [],
    ],
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
      <ListingFilters {...listingFiltersProps}></ListingFilters>
      <ListingBase
        {...listingProps}
        ListingContainer={TableListingContainer}
        ListingItem={TableListingItem}
      ></ListingBase>
    </div>
  )
}

export default App
