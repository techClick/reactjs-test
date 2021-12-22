import React from 'react';
import * as S from './WeatherPanel.styled';
import ForecastTable from '../ForecastTable/ForecastTable';
import WhiteCard from '../WhiteCard/WhiteCard';
import FavouritesTable from '../FavouritesTable/FavouritesTable';
import { getStorageItem, getGeoLocation, getNewCityForecast } from '../../utils/Utils';
// eslint-disable-next-line import/named

class WeatherPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelShown: 'all cities',
      loadingForecasts: false,
      favourites: getStorageItem('favourites'),
    };
    this.setPanelShown = this.setPanelShown.bind(this);
    this.setFavourites = this.setFavourites.bind(this);
    this.setLoadingForecasts = this.setLoadingForecasts.bind(this);
  }

  setPanelShown(panelShown) {
    this.setState({ panelShown });
  }

  setFavourites(favourites) {
    this.setState({ favourites });
  }

  setLoadingForecasts(loadingForecasts) {
    this.setState({ loadingForecasts });
  }

  render() {
    const {
      panelShown,
      favourites,
      loadingForecasts,
    } = this.state;
    const {
      setSelectedForecast,
      forecasts,
      setForecasts,
      setShowSearch,
    } = this.props;
    const {
      setPanelShown,
      setFavourites,
      setLoadingForecasts,
    } = this;

    const showUsersCityDetails = function showUsersCityDetails(city) {
      let thisForecast = forecasts.find((forecast) => (
        forecast.location.name === city
      ));
      if (thisForecast) {
        setLoadingForecasts(false);
        setSelectedForecast(thisForecast);
        return;
      }
      const onWeatherAPISuccess = function onSuccess() {
        setForecasts(getStorageItem('forecasts'));
        setLoadingForecasts(false);
        thisForecast = getStorageItem('forecasts').find((forecast) => (
          forecast.location.name === city
        ));
        setSelectedForecast(thisForecast);
      };
      const onWeatherAPIFail = function onFail() {
        // eslint-disable-next-line
        alert(`Your city: ${city}\n
          Was not found on weatherstack.com`);
      };
      getNewCityForecast(city, onWeatherAPISuccess, onWeatherAPIFail, false);
    };
    if (!localStorage.getItem('usersLocation')) {
      localStorage.setItem('usersLocation', 'stored');
      // eslint-disable-next-line
      if (confirm('Allow this site access your current location?')) {
        setLoadingForecasts(true);
        console.log('seen');
        getGeoLocation(showUsersCityDetails);
      }
    }

    return (
      <S.Container>
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
        { (!loadingForecasts && panelShown === 'all cities')
          && (
            <>
              <WhiteCard width="40%" panelLink="favourites" setPanelShown={setPanelShown}>
                <S.Label>FAVOURITES</S.Label>
              </WhiteCard>
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
        { (!loadingForecasts && panelShown === 'favourites')
          && (
            <>
              <FavouritesTable
                favourites={favourites}
                setFavourites={setFavourites}
                setSelectedForecast={setSelectedForecast}
                setShowSearch={setShowSearch}
                setLoadingForecasts={setLoadingForecasts}
                setForecasts={setForecasts}
              />
              <WhiteCard width="40%" panelLink="all cities" setPanelShown={setPanelShown}>
                <S.Label>ALL CITIES</S.Label>
              </WhiteCard>
            </>
          )}
      </S.Container>
    );
  }
}

export default WeatherPanel;
