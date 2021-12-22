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
        setSelectedForecast={() => {}}
        setShowSearch={() => {}}
      />,
    );
  });
});
