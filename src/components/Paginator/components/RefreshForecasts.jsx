import React from 'react';
import * as S from './RefreshForecasts.styled';
import refreshIcon from '../../../assets/refresh.png';
import { getStorageItem, getNewCityForecast } from '../../../utils/Utils';

const RefreshForecasts = function RefreshForecasts({
  setLoadingForecasts,
  setForecasts,
}) {
  const loadForecasts = function loadForecasts() {
    setLoadingForecasts(true);
    const allForecasts = getStorageItem('allForecasts');
    let forecasts = getStorageItem('forecasts');
    const onComplete = function onComplete() {
      if (getStorageItem('allForecasts').length === allForecasts.length) {
        // eslint-disable-next-line array-callback-return
        forecasts = getStorageItem('allForecasts').filter((allForecast) => (
          forecasts.find(
            (forecast) => forecast.location.name === allForecast.location.name,
          )));
        setForecasts(forecasts);
        setLoadingForecasts(false);
      }
    };
    localStorage.removeItem('allForecasts');
    localStorage.removeItem('forecasts');
    // eslint-disable-next-line array-callback-return
    allForecasts.map((forecast) => {
      getNewCityForecast(forecast.location.name, onComplete, onComplete, true);
    });
  };
  return (
    <S.Container>
      <S.Image src={refreshIcon} onClick={() => loadForecasts()} />
    </S.Container>
  );
};
export default RefreshForecasts;
