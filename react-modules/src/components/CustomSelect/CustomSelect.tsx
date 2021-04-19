import React from 'react'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from 'reactstrap'

interface optionType {
  value: string
  text: string
  config?: { [key: string]: any }
}

interface CustomSelectProps {
  fieldName: string
  options: optionType[]
  fieldValue: string
  onFieldValueChange?: (data: {
    nextFieldValue: string
    prevFieldValue: string
    fieldName: string
  }) => void
  placeholderText?: string
  toggleConfig?: { [key: string]: any }
  menuConfig?: { [key: string]: any }
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  fieldName,
  options,
  fieldValue,
  onFieldValueChange,
  placeholderText = '',
  toggleConfig = {},
  menuConfig = {},
}) => {
  const selectedOption = options.find(
      (option: optionType) => option.value === fieldValue,
    ),
    toggleText = selectedOption
      ? selectedOption.text
      : null || placeholderText || 'Select an option'

  return (
    <div className="custom-select">
      <Input type="select" value={fieldValue} name={fieldName} readOnly>
        {options &&
          options.map((option) => {
            const { text, value } = option

            return (
              <option value={value} key={value}>
                {text}
              </option>
            )
          })}
      </Input>
      <UncontrolledDropdown>
        <DropdownToggle {...toggleConfig}>{toggleText}</DropdownToggle>
        <DropdownMenu {...menuConfig}>
          {options &&
            options.map((option) => {
              const { text, value, config = {} } = option,
                isSelected = value === fieldValue
              return (
                <DropdownItem
                  {...config}
                  key={value}
                  active={isSelected}
                  onClick={
                    onFieldValueChange
                      ? () => {
                          onFieldValueChange({
                            nextFieldValue: value,
                            prevFieldValue: fieldValue,
                            fieldName,
                          })
                        }
                      : undefined
                  }
                >
                  {text}
                </DropdownItem>
              )
            })}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  )
}

export default CustomSelect
