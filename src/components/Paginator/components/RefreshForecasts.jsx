import React from 'react';
import * as S from './RefreshForecasts.styled';
import refreshIcon from '../../../assets/refresh.png';
import { loadAllForecasts } from '../../../utils/Utils';

const RefreshForecasts = function RefreshForecasts({
  setLoadingForecasts,
  setForecasts,
}) {
  return (
    <S.Container>
      <S.Image
        src={refreshIcon}
        onClick={() => loadAllForecasts(setForecasts, setLoadingForecasts)}
      />
    </S.Container>
  );
};
export default RefreshForecasts;
