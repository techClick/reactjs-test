/* eslint-disable react/jsx-no-bind */
import React from 'react';
import * as S from './WeatherPanel.styled';
import ForecastTable from '../ForecastTable/ForecastTable';
import WhiteCard from '../WhiteCard/WhiteCard';
import FavouritesTable from '../FavouritesTable/FavouritesTable';
import DetailsTable from '../DetailsTable/DetailsTable';
import {
  getStorageItem,
  getGeoLocation,
  getNewCityForecast,
  initializeStorage,
  sortAlphabetically,
} from '../../utils/Utils';
// eslint-disable-next-line import/named

class WeatherPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingForecasts: !localStorage.getItem('usersLocation'),
      selectedForecast: null,
      isInitialLoad: false,
      favourites: getStorageItem('favourites'),
    };
    this.setFavourites = this.setFavourites.bind(this);
    this.setSelectedForecast = this.setSelectedForecast.bind(this);
    this.setLoadingForecasts = this.setLoadingForecasts.bind(this);
    this.showUsersCityDetails = this.showUsersCityDetails.bind(this);
    this.exitFromDetails = this.exitFromDetails.bind(this);
  }

  setFavourites(favourites) {
    this.setState({ favourites });
  }

  setSelectedForecast(selectedForecast) {
    this.setState({ selectedForecast });
  }

  setLoadingForecasts(loadingForecasts) {
    this.setState({ loadingForecasts });
  }

  exitFromDetails() {
    const { isInitialLoad, selectedForecast } = this.state;
    if (isInitialLoad) {
      const { forecasts, setForecasts } = this.props;
      const { setLoadingForecasts, setFavourites } = this;
      this.setState({ isInitialLoad: false });
      initializeStorage(forecasts, setForecasts, setFavourites, setLoadingForecasts);
    }
    localStorage.setItem('justAddedCity-noBlink', selectedForecast.location.name);
    const { setSelectedForecast } = this;
    setSelectedForecast(null);
  }

  showUsersCityDetails(city) {
    const { forecasts, setForecasts } = this.props;
    const { setLoadingForecasts, setSelectedForecast } = this;
    const setState = this.setState.bind(this);

    if (!city) {
      // eslint-disable-next-line
      alert('Could not locate you!');
      setLoadingForecasts(false);
      return;
    }

    let thisForecast = forecasts.find((forecast) => (
      forecast.location.name === city
    ));
    if (thisForecast) {
      // Forecast of your city exists on your records
      setLoadingForecasts(false);
      setSelectedForecast(thisForecast);
      return;
    }
    const onWeatherAPISuccess = function onWeatherAPISuccess() {
      let forecastsTemp = getStorageItem('forecasts');
      forecastsTemp = [...forecastsTemp, ...forecasts];
      forecastsTemp = sortAlphabetically(forecastsTemp);
      localStorage.setItem('forecasts', JSON.stringify(forecastsTemp));
      localStorage.setItem('allForecasts', JSON.stringify(forecastsTemp));
      const addThisCity = () => localStorage.setItem('justAddedCity', city);
      setTimeout(addThisCity, 800);
      thisForecast = forecastsTemp.find((forecast) => (
        forecast.location.name === city
      ));
      setSelectedForecast(thisForecast);
      setState({ isInitialLoad: true });
      setLoadingForecasts(false);
      setForecasts(forecastsTemp);
    };
    const onWeatherAPIFail = function onWeatherAPIFail() {
      // eslint-disable-next-line
      alert(`Your city: ${city}\nWas not found on weatherstack.com`);
      setLoadingForecasts(false);
    };
    getNewCityForecast(city, onWeatherAPISuccess, onWeatherAPIFail, false);
  }

  render() {
    const {
      favourites,
      selectedForecast,
      loadingForecasts,
    } = this.state;
    const { forecasts, setForecasts, setShowSearch } = this.props;
    const {
      setFavourites,
      setLoadingForecasts,
      setSelectedForecast,
      showUsersCityDetails,
      exitFromDetails,
    } = this;

    if (!localStorage.getItem('usersLocation')) {
      localStorage.setItem('usersLocation', 'stored');
      // eslint-disable-next-line
      if (confirm('Allow this site access your current location?')) {
        getGeoLocation(showUsersCityDetails);
      } else {
        setLoadingForecasts(false);
      }
    }

    return (
      <S.Container>
        { !loadingForecasts && selectedForecast
          && (
            <DetailsTable
              selectedForecast={selectedForecast}
              exitFromDetails={exitFromDetails}
            />
          )}
        { loadingForecasts
          && (
            <WhiteCard width="50%" isSearch>
              <S.Loading>
                Loading current forecasts.
                {/* eslint-disable-next-line react/jsx-indent */}
                <br />
                <small>This can take up to 2 minutes.</small>
              </S.Loading>
            </WhiteCard>
          )}
        { (!selectedForecast && !loadingForecasts)
          && (
            <>
              <FavouritesTable
                favourites={favourites}
                setFavourites={setFavourites}
                setSelectedForecast={setSelectedForecast}
              />
              <ForecastTable
                forecasts={forecasts}
                setForecasts={setForecasts}
                setFavourites={setFavourites}
                favourites={favourites}
                setSelectedForecast={setSelectedForecast}
                setShowSearch={setShowSearch}
                setLoadingForecasts={setLoadingForecasts}
              />
            </>
          )}
      </S.Container>
    );
  }
}

export default WeatherPanel;
