/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import WeatherPanel from './WeatherPanel';
import '../../config';

afterEach(cleanup);

describe('unit tests', () => {
  test('component renders', () => {
    render(
      <WeatherPanel
        forecasts={[]}
        setForecasts={() => {}}
        setShowSearch={() => {}}
      />,
    );
  });
  test('Forecast table renders', () => {
    const { getAllByText } = render(
      <WeatherPanel
        forecasts={[]}
        setForecasts={() => {}}
        setShowSearch={() => {}}
      />,
    );
    const citiesHeader = getAllByText(/cities/i)[0];
    expect(citiesHeader).toBeInTheDocument();
  });
  test('favourites table renders', () => {
    const { getAllByText } = render(
      <WeatherPanel
        forecasts={[]}
        setForecasts={() => {}}
        setShowSearch={() => {}}
      />,
    );
    const citiesHeader = getAllByText(/city/i)[0];
    expect(citiesHeader).toBeInTheDocument();
  });
});
