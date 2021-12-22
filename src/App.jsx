import React from 'react';
import Container from './styled';
import WeatherPanel from './components/WeatherPanel/WeatherPanel';
import DetailsTable from './components/DetailsTable/DetailsTable';
import Search from './components/Search/Search';
import initialForecast from './utils/Forecasts';
import { sortAlphabetically, getStorageItem } from './utils/Utils';
// eslint-disable-next-line import/named

class App extends React.Component {
  constructor(props) {
    super(props);
    // localStorage.clear();
    this.state = {
      forecasts: localStorage.getItem('forecasts')
        ? getStorageItem('forecasts') : sortAlphabetically(initialForecast),
      selectedForecast: null,
      showSearch: false,
    };
    this.setForecasts = this.setForecasts.bind(this);
    this.setSelectedForecast = this.setSelectedForecast.bind(this);
    this.setShowSearch = this.setShowSearch.bind(this);
  }

  setForecasts(forecasts) {
    this.setState({ forecasts });
  }

  setSelectedForecast(selectedForecast) {
    this.setState({ selectedForecast });
  }

  setShowSearch(showSearch) {
    this.setState({ showSearch });
  }

  render() {
    const { selectedForecast, showSearch, forecasts } = this.state;
    const { setSelectedForecast, setShowSearch, setForecasts } = this;
    const showDetailsTable = !showSearch && selectedForecast;
    const showWeatherPanel = !showSearch && !selectedForecast;
    return (
      <Container>
        { showDetailsTable
          && (
            <DetailsTable
              selectedForecast={selectedForecast}
              setSelectedForecast={setSelectedForecast}
            />
          )}
        { showWeatherPanel
          && (
            <WeatherPanel
              forecasts={forecasts}
              setForecasts={setForecasts}
              setSelectedForecast={setSelectedForecast}
              setShowSearch={setShowSearch}
            />
          )}
        { showSearch
          && (
            <Search
              setForecasts={setForecasts}
              setShowSearch={setShowSearch}
            />
          )}
      </Container>
    );
  }
}

export default App;
