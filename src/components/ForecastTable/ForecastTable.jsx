/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import WhiteCard from '../WhiteCard/WhiteCard';
import * as S from './ForecastTable.styled';
import {
  getPaginatedData,
  getSelectedItemFromList,
  addNewStorageItem,
  getStorageItem,
  getForecastPage,
  initializeStorage,
} from '../../utils/Utils';
import Paginator from '../Paginator/Paginator';
import deleteIcon from '../../assets/bin.png';
import starOff from '../../assets/star2.png';
import starOn from '../../assets/star.png';

const ForecastTable = function ForecastTable({
  forecasts,
  setForecasts,
  setFavourites,
  favourites,
  setSelectedForecast,
  setShowSearch,
  setLoadingForecasts,
}) {
  const [thisPage, setThisPageMain] = useState(1);
  const [justAddedCity, setJustAddedCity] = useState(null);
  function setThisPage(page) {
    if (justAddedCity) {
      setJustAddedCity(null);
    }
    setThisPageMain(page);
  }
  // Below variables are used to paginate forecasts
  const paginatedForecasts = getPaginatedData(forecasts, thisPage);
  const totalForecasts = forecasts.length;
  const forecastsPerPage = global.config.noOfForecastsPerPage;
  const noOfPages1 = (totalForecasts % forecastsPerPage) === 0
    ? (totalForecasts / forecastsPerPage) : (Math.floor(totalForecasts / forecastsPerPage) + 1);
  const noOfPages = (totalForecasts / forecastsPerPage) < 1 ? 1 : noOfPages1;

  function getIsFavouriteArray() {
    const isFavourite = paginatedForecasts.map((forecast) => {
      const favouriteEntry = favourites.filter((entry) => (
        entry.location.name === forecast.location.name
      ));
      if (favouriteEntry[0]) {
        return true;
      }
      return false;
    });
    return isFavourite;
  }
  const [isFavourite, setIsFavourite] = useState([getIsFavouriteArray()]);

  function deleteEntry(index) {
    const selectedForecastIndex = getSelectedItemFromList(
      'index',
      paginatedForecasts[index].location.name,
    );
    forecasts.splice(selectedForecastIndex, 1);
    localStorage.setItem('forecasts', JSON.stringify(forecasts));
    setForecasts([...forecasts]);
  }

  function removeFavourite(index) {
    const savedFavourites = favourites;
    savedFavourites.splice(index, 1);
    localStorage.setItem('favourites', JSON.stringify(savedFavourites));
    setFavourites([...getStorageItem('favourites')]);
  }

  function addFavourite(index) {
    const selectedForecastIndex = getSelectedItemFromList(
      'index',
      paginatedForecasts[index].location.name,
    );
    let foundFavourite = [];
    let foundIndex;
    foundFavourite = favourites.find((savedFavourite, i) => {
      const thisFavouriteIsSaved = savedFavourite.location.name
        === forecasts[selectedForecastIndex].location.name;
      if (thisFavouriteIsSaved) {
        foundIndex = i;
      }
      return thisFavouriteIsSaved;
    });
    if (foundFavourite) {
      removeFavourite(foundIndex);
      return;
    }
    addNewStorageItem('favourites', forecasts[selectedForecastIndex]);
    setFavourites([...getStorageItem('favourites')]);
  }

  function showDetails(index) {
    const selectedForecast = getSelectedItemFromList(
      'item',
      paginatedForecasts[index].location.name,
    );
    setSelectedForecast(selectedForecast);
  }

  useEffect(() => {
    if (!localStorage.getItem('forecasts')) {
      // eslint-disable-next-line
      initializeStorage(forecasts, setForecasts, setLoadingForecasts);
    }
  }, []);

  useEffect(() => {
    setIsFavourite([...getIsFavouriteArray()]);
  }, [thisPage, forecasts, favourites]);

  useEffect(() => {
    if (thisPage > 1 && thisPage > noOfPages) {
      setThisPage(noOfPages);
    }
    const justAddedCityInStorage = localStorage.getItem('justAddedCity')
      || localStorage.getItem('justAddedCity-noBlink');
    if (justAddedCityInStorage) {
      const pageOfCity = getForecastPage(justAddedCityInStorage, forecasts, noOfPages);
      setThisPage(pageOfCity);
      if (localStorage.getItem('justAddedCity')) setJustAddedCity(justAddedCityInStorage);
      localStorage.removeItem('justAddedCity');
      localStorage.removeItem('justAddedCity-noBlink');
    }
  });

  return (
    <WhiteCard
      width="70%"
      height="440px"
      goBack={() => setShowSearch(true)}
      allCities
      tableDescription="ALL CITIES"
    >
      <S.Table data-testid="forecastsTable">
        <thead>
          <tr>
            <S.TH>CITY</S.TH>
            <S.TH removeAt1>WEATHER</S.TH>
          </tr>
        </thead>
        <tbody>
          { paginatedForecasts.map((forecast, i) => (
            <S.TR isJustAdded={forecast.location.name === justAddedCity}>
              <S.TD>
                <S.CityLink
                  onClick={() => showDetails(i)}
                  data-testid={`forecast${i}`}
                >
                  {forecast.location.name}
                </S.CityLink>
              </S.TD>
              <S.TD removeAt1 extraPadding>
                <S.Image src={forecast.current.weather_icons[0]} />
                {forecast.current.temperature}
                &deg;C
                {'.  '}
                <small>
                  {forecast.current.weather_descriptions[0].toString()
                    .replace(/\s/g, '-').split(',').join('')}
                </small>
                <S.FavouritesIcon
                  src={isFavourite[i] ? starOn : starOff}
                  onClick={() => addFavourite(i)}
                />
                <S.DeleteIcon src={deleteIcon} onClick={() => deleteEntry(i)} />
              </S.TD>
            </S.TR>
          ))}
        </tbody>
      </S.Table>
      <Paginator
        noOfPages={noOfPages}
        thisPage={thisPage}
        setThisPage={setThisPage}
        setLoadingForecasts={setLoadingForecasts}
        setForecasts={setForecasts}
      />
    </WhiteCard>
  );
};

export default ForecastTable;
