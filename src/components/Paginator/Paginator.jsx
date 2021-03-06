import React, { useState, useEffect } from 'react';
import * as S from './Paginator.styled';
import { getPagesToShow } from '../../utils/Utils';
import leftArrow from '../../assets/arrowleft.png';
import rightArrow from '../../assets/arrowright.png';
import RefreshForecasts from './RefreshForecasts/RefreshForecasts';

const Paginator = function Paginator({
  noOfPages,
  thisPage,
  setThisPage,
  setLoadingForecasts,
  setForecasts,
  setFavourites,
  adjustPaginatorPages,
  setAdjustPaginatorPages,
}) {
  const [startIndex, setStartIndex] = useState(0);

  // Variable below is the object of pages that are seen e.g 1,2 or 2,3
  const pagesToShow = getPagesToShow(startIndex, noOfPages, setStartIndex);

  useEffect(() => {
    if (adjustPaginatorPages) {
      const thisIndex = thisPage - global.config.maxNoOfPagesInPaginator;
      setStartIndex(thisIndex < 0 ? 0 : thisIndex);
      setAdjustPaginatorPages(false);
    }
  }, [thisPage]);

  return (
    <S.Container data-testid="paginator">
      <S.RelativeContainer>
        { setLoadingForecasts
          && (
            <RefreshForecasts
              setForecasts={setForecasts}
              setFavourites={setFavourites}
              setLoadingForecasts={setLoadingForecasts}
            />
          )}
        <S.QuickPage
          disabled={pagesToShow[pagesToShow.length - 1] === noOfPages}
          onClick={() => {
            setThisPage(noOfPages);
            setStartIndex(noOfPages - 1);
          }}
        >
          {pagesToShow[pagesToShow.length - 1] !== noOfPages ? noOfPages : ' '}
        </S.QuickPage>
        <S.Page
          disabled={pagesToShow[pagesToShow.length - 1] === noOfPages}
          onClick={() => {
            if (pagesToShow[pagesToShow.length - 1] === noOfPages) return;
            setThisPage(thisPage + 1);
            setStartIndex(startIndex + 1);
          }}
          onThisPage={false}
        >
          {pagesToShow[pagesToShow.length - 1] !== noOfPages ? <S.Image src={rightArrow} /> : ' '}
        </S.Page>

        {/* these are the pages in the middle of the navigation buttons */}
        { pagesToShow.slice().reverse().map((num) => (
          <S.Page onClick={() => setThisPage(num)} onThisPage={thisPage === num} data-testid={`page${num}`}>
            {num}
          </S.Page>
        ))}

        <S.Page
          disabled={pagesToShow[0] === 1}
          onClick={() => {
            if (pagesToShow[0] === 1) return;
            setThisPage(thisPage - 1);
            setStartIndex(startIndex - 1);
          }}
          onThisPage={false}
        >
          { pagesToShow[0] !== 1 ? <S.Image src={leftArrow} /> : ' ' }
        </S.Page>
        <S.QuickPage
          disabled={pagesToShow[0] === 1}
          onClick={() => {
            setThisPage(1);
            setStartIndex(0);
          }}
        >
          { pagesToShow[0] !== 1 ? 1 : ' ' }
        </S.QuickPage>
      </S.RelativeContainer>
    </S.Container>
  );
};

export default Paginator;
