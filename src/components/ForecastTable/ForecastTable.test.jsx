/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ForecastTable from './ForecastTable';
import '../../config';

afterEach(cleanup);

describe('unit tests', () => {
  test('component renders', () => {
    render(
      <ForecastTable
        forecasts={[]}
        setForecasts={() => {}}
        setFavourites={() => {}}
        favourites={[]}
        setSelectedForecast={() => {}}
        setShowSearch={() => {}}
        setLoadingForecasts={() => {}}
      />,
    );
  });
  test('forecasts table renders', () => {
    const { getAllByText } = render(
      <ForecastTable
        forecasts={[]}
        setForecasts={() => {}}
        setFavourites={() => {}}
        favourites={[]}
        setSelectedForecast={() => {}}
        setShowSearch={() => {}}
        setLoadingForecasts={() => {}}
      />,
    );
    const citiesHeader = getAllByText(/all cities/i)[0];
    expect(citiesHeader).toBeInTheDocument();
  });
  test('correct data is shown on forecasts table', () => {
    const forecasts = [{
      location: { name: 'testc' },
      current:
      {
        weather_icons: [],
        temperature: 'testt',
        weather_descriptions: ['testD'],
      },
    }];
    const { getByText } = render(
      <ForecastTable
        forecasts={forecasts}
        setForecasts={() => {}}
        setFavourites={() => {}}
        favourites={[]}
        setSelectedForecast={() => {}}
        setShowSearch={() => {}}
        setLoadingForecasts={() => {}}
      />,
    );
    const city = getByText(/\btestc\b/i);
    const temperature = getByText(/\btestt\b/i);
    expect(city).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
  });
  test('child-component( paginator ) renders', () => {
    const { queryByTestId } = render(
      <ForecastTable
        forecasts={[]}
        setForecasts={() => {}}
        setFavourites={() => {}}
        favourites={[]}
        setSelectedForecast={() => {}}
        setShowSearch={() => {}}
        setLoadingForecasts={() => {}}
      />,
    );
    const paginator = queryByTestId('paginator');
    expect(paginator).toBeTruthy();
  });
  test('forecasts table paginates correctly', () => {
    const forecasts = [];
    const { noOfForecastsPerPage } = global.config;
    for (let i = 0; i < (noOfForecastsPerPage * 2); i += 1) {
      forecasts.push({
        location: { name: `testL${i}` },
        current: { weather_icons: [], weather_descriptions: ['testD'] },
      });
    }
    const { queryByTestId } = render(
      <ForecastTable
        forecasts={forecasts}
        setForecasts={() => {}}
        setFavourites={() => {}}
        favourites={[]}
        setSelectedForecast={() => {}}
        setShowSearch={() => {}}
        setLoadingForecasts={() => {}}
      />,
    );
    const firstLoginEntry = queryByTestId('forecast0');
    expect(firstLoginEntry.innerHTML).toBe('testL0');
    const page2OfPaginator = queryByTestId('page2');
    fireEvent.click(page2OfPaginator);
    expect(firstLoginEntry.innerHTML).toBe(`testL${noOfForecastsPerPage}`);
  });
});
