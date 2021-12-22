/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import DetailsTable from './DetailsTable';
import '../../config';

afterEach(cleanup);

// Test variable
let selectedForecast = {
  location: { name: 'testc' },
  current:
  {
    temperature: 'testt',
  },
};

describe('unit tests', () => {
  test('component renders', () => {
    render(
      <DetailsTable
        selectedForecast={selectedForecast}
        setSelectedForecast={() => {}}
      />,
    );
  });
  test('forecasts table renders', () => {
    const { getAllByText } = render(
      <DetailsTable
        selectedForecast={selectedForecast}
        setSelectedForecast={() => {}}
      />,
    );
    const citiesHeader = getAllByText(/value/i)[0];
    expect(citiesHeader).toBeInTheDocument();
  });
  test('correct data is shown on forecasts table', () => {
    const { getByText } = render(
      <DetailsTable
        selectedForecast={selectedForecast}
        setSelectedForecast={() => {}}
      />,
    );
    const temperature = getByText(/\btestt\b/i);
    expect(temperature).toBeInTheDocument();
  });
  test('child-component( paginator ) renders', () => {
    const { queryByTestId } = render(
      <DetailsTable
        selectedForecast={selectedForecast}
        setSelectedForecast={() => {}}
      />,
    );
    const paginator = queryByTestId('paginator');
    expect(paginator).toBeTruthy();
  });
  test('forecasts table paginates correctly', () => {
    const current = {};
    const { noOfForecastsPerPage } = global.config;
    for (let i = 0; i < (noOfForecastsPerPage * 2); i += 1) {
      current[`testL${i}`] = 'testField';
    }
    selectedForecast = {
      location: { name: 'testc' },
      current,
    };
    const { queryByTestId } = render(
      <DetailsTable
        selectedForecast={{
          location: { name: 'testc' },
          current,
        }}
        setSelectedForecast={() => {}}
      />,
    );
    const firstDetailsEntry = queryByTestId('detail0');
    expect(firstDetailsEntry.innerHTML).toBe('testL0');
    const page2OfPaginator = queryByTestId('page2');
    fireEvent.click(page2OfPaginator);
    expect(firstDetailsEntry.innerHTML).toBe(`testL${noOfForecastsPerPage}`);
  });
});
