import React from 'react';
import Container from './styled';
import WeatherPanel from './components/WeatherPanel/WeatherPanel';
import Search from './components/Search/Search';
import initialForecast from './utils/Forecasts';
import { sortAlphabetically, getStorageItem } from './utils/Utils';
// eslint-disable-next-line import/named

class App extends React.Component {
  constructor(props) {
    super(props);
    // localStorage.clear();
    // localStorage.removeItem('usersLocation');
    this.state = {
      forecasts: localStorage.getItem('forecasts')
        ? getStorageItem('forecasts') : sortAlphabetically(initialForecast),
      showSearch: false,
    };
    this.setForecasts = this.setForecasts.bind(this);
    this.setShowSearch = this.setShowSearch.bind(this);
  }

  setForecasts(forecasts) {
    this.setState({ forecasts });
  }

  setShowSearch(showSearch) {
    this.setState({ showSearch });
  }

  render() {
    const { showSearch, forecasts } = this.state;
    const { setShowSearch, setForecasts } = this;
    return (
      <Container>
        { !showSearch
          && (
            <WeatherPanel
              forecasts={forecasts}
              setForecasts={setForecasts}
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
