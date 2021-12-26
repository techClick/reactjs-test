import React from 'react';
import * as S from './WhiteCard.styled';

const WhiteCard = function WhiteCard({
  width,
  goBack,
  children,
  panelLink,
  isSearch,
  setPanelShown,
  allCities,
  favourites,
  exitText,
  tableDescription,
  height,
}) {
  const showThisPanel = function showThisPanel() {
    if (panelLink) {
      setPanelShown(panelLink);
    }
  };

  return (
    <S.Container
      width={width}
      height={height}
      data-testid="whiteBackground"
      allCities={allCities}
      favourites={favourites}
      isPanelLink={Boolean(panelLink)}
      isSearch={isSearch}
      onClick={() => showThisPanel()}
    >
      <S.TableDescription>
        {tableDescription}
      </S.TableDescription>
      <S.Line />
      {goBack
        && (
          <S.GoBack onClick={() => goBack()} data-testid="goBack">
            {exitText || <>Search new cities</>}
          </S.GoBack>
        )}
      {children}
    </S.Container>
  );
};

export default WhiteCard;
