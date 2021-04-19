import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//@ts-ignore
import { RootState } from '../../reducers/index.ts'

type filtersType = {
  [key: string]: string | number | boolean
} & { currentPage?: number }

interface filterComponent {
  Component: React.ComponentType<any>
  config: { [key: string]: any }
  fieldName: string
}

interface ListingFiltersProps {
  Components: (filterComponent[] | filterComponent)[]
  initialValues?: { [key: string]: string }
  filtersStoreKey: string
  updateFiltersAction: (
    newFiltersKeyValues: filtersType,
  ) => { type: string; payload: { [key: string]: any } }
}

const ListingFilters: React.FC<ListingFiltersProps> = (props) => {
  const {
    Components,
    initialValues = null,
    filtersStoreKey,
    updateFiltersAction,
  } = props

  const dispatch = useDispatch()

  const filters = useSelector((state: RootState) => {
    return state[filtersStoreKey]
  })

  const onFilterChange = (newKeyValues: filtersType) => {
    dispatch(updateFiltersAction({ ...newKeyValues }))
  }

  useEffect(() => {
    if (initialValues) {
      onFilterChange(initialValues)
    }
  }, [])

  const onFieldValueChange = ({
    nextFieldValue,
    fieldName,
  }: {
    nextFieldValue: string
    fieldName: string
  }) => {
    onFilterChange({ [fieldName]: nextFieldValue })
  }

  const mapComponent = (componentObj: filterComponent) => {
    const { Component, config, fieldName } = componentObj

    return (
      <Component
        {...config}
        fieldName={fieldName}
        fieldValue={filters[fieldName] || ''}
        onFieldValueChange={onFieldValueChange}
      ></Component>
    )
  }

  return (
    <div className="listing-filters">
      <form>
        {Components.map((componentOrRow) => {
          if (Array.isArray(componentOrRow)) {
            //Is row
            return (
              <div className="listing-filters__row">
                {componentOrRow.map((componentObj) => {
                  return mapComponent(componentObj)
                })}
              </div>
            )
          }

          //Is single row components
          return mapComponent(componentOrRow)
        })}
      </form>
    </div>
  )
}

export default ListingFilters
