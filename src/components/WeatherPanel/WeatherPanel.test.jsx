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
  test('child component( forecast table ) renders', () => {
    const { getAllByText } = render(
      <WeatherPanel
        forecasts={[]}
        setForecasts={() => {}}
        setShowSearch={() => {}}
      />,
    );
    const citiesHeader = getAllByText(/all cities/i)[0];
    expect(citiesHeader).toBeInTheDocument();
  });
  test('child component( favourites table ) renders', () => {
    const { getAllByText } = render(
      <WeatherPanel
        forecasts={[]}
        setForecasts={() => {}}
        setShowSearch={() => {}}
      />,
    );
    const citiesHeader = getAllByText(/favorites/i)[0];
    expect(citiesHeader).toBeInTheDocument();
  });
});
