import React, { useState } from 'react';
import cities from 'cities.json';
import WhiteCard from '../WhiteCard/WhiteCard';
import * as S from './Search.styled';
import { addNewStorageItem, getNewCityForecast, getStorageItem } from '../../utils/Utils';

const Search = function Search({ setForecasts, setShowSearch }) {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = function onSuccess(cityName, isNoAlert) {
    setIsLoading(false);
    localStorage.setItem('justAdded', cityName);
    setForecasts(getStorageItem('forecasts'));
    setShowSearch(false);
    if (!isNoAlert) {
      // eslint-disable-next-line no-alert
      alert(`${cityName} added to 'all Cities' Table.`);
    }
  };

  const onFail = function onFail() {
    setIsLoading(false);
    // eslint-disable-next-line no-alert
    alert(`Error from weatherstack API.
      \nNote: If the weatherstack API usages remaining is zero, it wont work.
      \n\nAPI usages remaining = ${localStorage.getItem('API-usage')}`);
  };

  const showSearchResults = function showSearchResults() {
    setIsLoading(true);
    // First, I check if the users input is a real city
    let thisSearchFound = cities.filter((city) => (
      city.name.toLowerCase().includes(searchText.toLowerCase())
    )).map((city) => city.name);
    thisSearchFound.splice(10, thisSearchFound.length);
    thisSearchFound = thisSearchFound.toString().split(',').join(', ');
    const thisExactSearchFound = cities.find((city) => (
      city.name.toLowerCase() === searchText.toLowerCase()
    ));
    if (thisExactSearchFound) {
      // Input City is real, I then check if the city's forecast is saved already
      const savedCityForecast = getStorageItem('forecasts').find(
        (forecast) => forecast.location.name.toLowerCase()
          .includes(thisExactSearchFound.name.toLowerCase())
          || thisExactSearchFound.name.toLowerCase()
            .includes(forecast.location.name.toLowerCase()),
      );
      if (savedCityForecast) {
        onSuccess(savedCityForecast.location.name, true);
        // eslint-disable-next-line no-alert
        alert('This city forecast exists already.'
          + '\nTo view it\'s recent forecast, refresh forecasts.');
        return;
      }
      const savedCityAllForecast = getStorageItem('allForecasts').find(
        (forecast) => (
          forecast.location.name.toLowerCase()
            .includes(thisExactSearchFound.name.toLowerCase())
            || thisExactSearchFound.name.toLowerCase()
              .includes(forecast.location.name.toLowerCase())
        ),
      );
      if (savedCityAllForecast) {
        addNewStorageItem('forecasts', savedCityAllForecast, true, false);
        onSuccess(savedCityAllForecast.location.name);
        // eslint-disable-next-line no-alert
        alert('This city forecast was DELETED by you.'
          + '\nIt has now been restored.');
        return;
      }
      // Input city's forecast has not been saved, save it in local storage
      getNewCityForecast(searchText, onSuccess, onFail, false);
      return;
    }
    // Input city is not real, make suggestions.
    // eslint-disable-next-line no-alert
    alert(`Search not found.
      ${thisSearchFound && `\nDid you mean any of these: ${thisSearchFound}?`}`);
    setIsLoading(false);
  };

  return (
    <WhiteCard width="25%" goBack={() => setShowSearch(false)} exitText="Back to forecasts" isSearch>
      <S.Container>
        <S.SearchInput
          placeholder="Search new cities"
          data-testid="searchInput"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div>
          <S.Submit
            isDisabled={isLoading}
            data-testid="submitButton"
            onClick={() => showSearchResults()}
            disabled={isLoading}
          >
            {isLoading ? 'loading' : 'Search'}
          </S.Submit>
        </div>
      </S.Container>
    </WhiteCard>
  );
};

export default Search;
