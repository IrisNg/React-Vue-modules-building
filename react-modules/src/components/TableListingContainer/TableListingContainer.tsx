import React from 'react';

interface TableListingContainerProps {
  children?: React.ReactNode;
  headers?: string[];
}

const TableListingContainer: React.FC<TableListingContainerProps> = ({
  children,
  headers,
}) => {
  return (
    <div className="table-listing-container">
      <table>
        {headers && (
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {!children && <tr><td>show spinner</td></tr>}
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default TableListingContainer;
