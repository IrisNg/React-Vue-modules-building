import React from 'react';

interface TableListingItemProps {
  item?: string;
}

const TableListingItem: React.FC<TableListingItemProps> = ({item}) => {
 
  return (<tr className="table-listing-item" ><td>{item}</td></tr>)
}

export default TableListingItem