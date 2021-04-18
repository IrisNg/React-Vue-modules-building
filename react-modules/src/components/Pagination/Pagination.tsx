import React from 'react'

enum PaginationIconClasses {
  NEXT_ICON = 'icon-angle-right',
  PREV_ICON = 'icon-angle-left',
  LAST_ICON = 'icon-chevron-right',
  FIRST_ICON = 'icon-chevron-left'
}

export interface StaticPaginationProps {
  itemsPerPage?: number;
  hasPrevNextArrows?: boolean;
  hasFirstLastArrows?: boolean;
  isShowDisabledArrows?: boolean;
  hasFirstLastPages?: boolean;
  maxVisiblePageNumbers?: 1 | 3 | 5;
}

export interface PaginationProps extends StaticPaginationProps {
  currentPage: number;
  totalItemsCount?: number;
  numberOfPages?: number;
  onPageChange: (selectedPageNumber: number) => void;
}

type pagesArrayType = (number | string)[];



//Generate an array of page numbers based on the currentPage number and maxVisiblePageNumbers 
//eg. if maxVisiblePageNubmers is 5, and currentPage is 5 -> [3,4,5,6,7] or currentPage is 3 ->[1,2,3,4,5]
const generateNeighboringPageNumbers = (currentPageNumber: number, lastPageNumber: number, maxVisiblePageNumbers: number): number[] => {

  const pagesArray = [currentPageNumber];

  let nextNum = currentPageNumber + 1,
    prevNum = currentPageNumber - 1;

  while (pagesArray.length < maxVisiblePageNumbers) {
    if (nextNum <= lastPageNumber) {
      pagesArray.push(nextNum);
      nextNum++;
    }
    if (prevNum >= 1) {
      pagesArray.unshift(prevNum);
      prevNum--;
    }
    if (pagesArray.length === lastPageNumber) {
      break;
    }
  }

  return pagesArray;
}


const addFirstLastPages = (pagesArray: number[], lastPageNumber: number) => {
  let newPagesArray: pagesArrayType = [...pagesArray];

  //Add last page number to pagesArray if valid
  let lastDifference = lastPageNumber - pagesArray[pagesArray.length - 1];

  if (lastDifference > 1) {
    //There are other page(s) between last page number and last pagesArray element
    newPagesArray = [...newPagesArray, '...-last', lastPageNumber]
  } else if (lastDifference === 1) {
    //last pagesArray element is not last page number and there are no other page(s) between them
    newPagesArray = [...newPagesArray, lastPageNumber]
  }

  //Add page 1 to pagesArray if valid
  let startDifference = pagesArray[0] - 1;

  if (startDifference > 1) {
    //There are other page(s) between first page and first pagesArray element
    newPagesArray = [1, '...-start', ...newPagesArray]
  } else if (startDifference === 1) {
    //first pagesArray element is not first page and there are no other page(s) between them
    newPagesArray = [1, ...newPagesArray]
  }

  return newPagesArray
}


//Add Next or Previous arrow if valid
const addPrevNextArrows = (pagesArray: pagesArrayType, currentPageNumber: number, lastPageNumber: number, isShowDisabledArrows: boolean) => {
  if (currentPageNumber < lastPageNumber) {
    pagesArray = [...pagesArray, 'next-arrow']
  } else if (isShowDisabledArrows) {
    pagesArray = [...pagesArray, 'next-arrow-disabled']
  }

  if (currentPageNumber > 1) {
    pagesArray = ['prev-arrow', ...pagesArray]
  } else if (isShowDisabledArrows) {
    pagesArray = ['prev-arrow-disabled', ...pagesArray]
  }

  return pagesArray
}

//Add skip to last or first page arrow if valid
const addFirstLastArrows = (pagesArray: pagesArrayType, currentPageNumber:number, lastPageNumber:number) => {
  if (currentPageNumber < lastPageNumber) {
    pagesArray = [...pagesArray, 'last-arrow']
  }

  if (currentPageNumber > 1) {
    pagesArray = ['first-arrow', ...pagesArray]
  }

  return pagesArray
}



const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    currentPage = 1,
    totalItemsCount = 0,
    itemsPerPage = 0,
    numberOfPages,
    hasPrevNextArrows,
    hasFirstLastArrows,
    isShowDisabledArrows = false,
    hasFirstLastPages,
    maxVisiblePageNumbers = 5,
    onPageChange
  } = props;

  const lastPageNumber: number = numberOfPages || Math.ceil(totalItemsCount / itemsPerPage) || 0,
    currentPageNumber: number = currentPage <= lastPageNumber ? currentPage : lastPageNumber;


  //Convert pagesArray to array of HTML tags
  const convertPageElementsToJSX = (pagesArray: pagesArrayType): JSX.Element[] => {

    return pagesArray.map(element => {

      switch (true) {

        case element === currentPageNumber:
          return (
            <li className="pagination__page current" key={ currentPageNumber }>
              { element.toString() }
            </li>
          );

        case typeof element === 'number':
          return (
            <li className="pagination__page" key={ element }>
              <button type="button" onClick={ () => { onPageChange(typeof element === 'number' ? element : parseInt(element, 10)) } }>
                { element.toString() }
              </button>
            </li>
          );

        case (element === '...-last' || element === '...-start'):
          return (
            <li className="pagination__dots" key={ element }>
              ...
            </li>
          );

        case element === 'next-arrow':
          return (
            <li className="pagination__next" key="next-arrow">
              <button type="button" onClick={ () => { onPageChange(currentPageNumber + 1) } }>
                <i className={ PaginationIconClasses.NEXT_ICON }></i>
              </button>
            </li>
          );

        case element === 'next-arrow-disabled':
          return (
            <li className="pagination__next is-disabled" key="next-arrow-disabled">
              <button type="button" disabled>
                <i className={ PaginationIconClasses.NEXT_ICON }></i>
              </button>
            </li>
          );

        case element === 'prev-arrow':
          return (
            <li className="pagination__prev" key="prev-arrow">
              <button type="button" onClick={ () => { onPageChange(currentPageNumber - 1) } }>
                <i className={ PaginationIconClasses.PREV_ICON }></i>
              </button>
            </li>
          );

        case element === 'prev-arrow-disabled':
          return (
            <li className="pagination__prev is-disabled" key="prev-arrow-disabled">
              <button type="button" disabled>
                <i className={ PaginationIconClasses.PREV_ICON }></i>
              </button>
            </li>
          );

        case element === 'first-arrow':
          return (
            <li className="pagination__first-arrow" key="first-arrow">
              <button type="button" onClick={ () => { onPageChange(1) } }>
                <i className={ PaginationIconClasses.FIRST_ICON }></i>
              </button>
            </li>
          );

        case element === 'last-arrow':
          return (
            <li className="pagination__last-arrow" key="last-arrow">
              <button type="button" onClick={ () => { onPageChange(lastPageNumber) } }>
                <i className={ PaginationIconClasses.LAST_ICON }></i>
              </button>
            </li>
          );

        default:
          return <></>
      }
    });
  }

  const renderPageElements = () => {

    //generate array of neighboring page numbers before and after currentPageNumber
    let neighbouringPageNumbers: number[] = generateNeighboringPageNumbers(currentPageNumber, lastPageNumber, maxVisiblePageNumbers),
      pagesArray: pagesArrayType = [...neighbouringPageNumbers];

    if (hasFirstLastPages) pagesArray = addFirstLastPages(neighbouringPageNumbers, lastPageNumber)

    if (hasPrevNextArrows) pagesArray = addPrevNextArrows(pagesArray, currentPageNumber, lastPageNumber, isShowDisabledArrows)

    if (hasFirstLastArrows) pagesArray = addFirstLastArrows(pagesArray, currentPageNumber, lastPageNumber)

    return convertPageElementsToJSX(pagesArray)
  }


  if (lastPageNumber <= 1) {
    //Clear pagination if there is only one page
    return <></>
  }

  return (
    <div className="pagination">
      <ul className="pagination__buttons">
        { renderPageElements() }
      </ul>
    </div>
  )
}


export default Pagination