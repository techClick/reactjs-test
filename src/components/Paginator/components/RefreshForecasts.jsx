import React from 'react';
import * as S from './RefreshForecasts.styled';
import refreshIcon from '../../../assets/refresh.png';
import { refreshAllForecasts } from '../../../utils/Utils';

const RefreshForecasts = function RefreshForecasts({
  setLoadingForecasts,
  setForecasts,
  setFavourites,
}) {
  return (
    <S.Container>
      <S.Image
        src={refreshIcon}
        onClick={() => refreshAllForecasts(setForecasts, setLoadingForecasts, setFavourites)}
      />
    </S.Container>
  );
};
export default RefreshForecasts;
