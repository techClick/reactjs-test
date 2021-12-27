/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import FavouritesTable from './FavouritesTable';
import '../../config';

afterEach(cleanup);

describe('unit tests', () => {
  test('component renders', () => {
    render(
      <FavouritesTable
        favourites={[]}
        setFavourites={() => {}}
        setSelectedForecast={() => {}}
      />,
    );
  });
  test('favourites table renders', () => {
    const { getAllByText } = render(
      <FavouritesTable
        favourites={[]}
        setFavourites={() => {}}
        setSelectedForecast={() => {}}
      />,
    );
    const favoritesHeader = getAllByText(/favorites/i)[0];
    expect(favoritesHeader).toBeInTheDocument();
  });
  test('correct data is shown on favourites table', () => {
    const favourites = [{
      location: { name: 'testc' },
      current:
      {
        weather_icons: [],
        temperature: 'testt',
        weather_descriptions: ['testD'],
      },
    }];
    const { getByText } = render(
      <FavouritesTable
        favourites={favourites}
        setFavourites={() => {}}
        setSelectedForecast={() => {}}
      />,
    );
    const city = getByText(/\btestc\b/i);
    const temperature = getByText(/\btestt\b/i);
    expect(city).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
  });
  test('child-component( paginator ) renders', () => {
    const { queryByTestId } = render(
      <FavouritesTable
        favourites={[]}
        setFavourites={() => {}}
        setSelectedForecast={() => {}}
      />,
    );
    const paginator = queryByTestId('paginator');
    expect(paginator).toBeTruthy();
  });
  test('favourites table paginates correctly', () => {
    const favourites = [];
    const { noOfForecastsPerPage } = global.config;
    for (let i = 0; i < (noOfForecastsPerPage * 2); i += 1) {
      favourites.push({
        location: { name: `testL${i}` },
        current: { weather_icons: [], weather_descriptions: ['testD'] },
      });
    }
    const { queryByTestId } = render(
      <FavouritesTable
        favourites={favourites}
        setFavourites={() => {}}
        setSelectedForecast={() => {}}
      />,
    );
    const firstFavouriteEntry = queryByTestId('favourite0');
    expect(firstFavouriteEntry.innerHTML).toBe('testL0');
    const page2OfPaginator = queryByTestId('page2');
    fireEvent.click(page2OfPaginator);
    expect(firstFavouriteEntry.innerHTML).toBe(`testL${noOfForecastsPerPage}`);
  });
});
