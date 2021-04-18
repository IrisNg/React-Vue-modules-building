import React from 'react';

interface TableListingContainerProps {
  items?: string[];
}

const TableListingContainer: React.FC<TableListingContainerProps> = ({
  items,
}) => {
  if (!items) {
    return <div>Nothing</div>;
  }
  return (
    <div className="table-listing-container">
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default TableListingContainer;
