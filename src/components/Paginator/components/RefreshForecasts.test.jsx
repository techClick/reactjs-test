/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import RefreshForecasts from './RefreshForecasts';

afterEach(cleanup);

describe('unit tests', () => {
  test('component renders', () => {
    render(
      <RefreshForecasts
        setForecasts={() => {}}
        setLoadingForecasts={() => {}}
      />,
    );
  });
  test('refreshButton renders', () => {
    const { queryByTestId } = render(
      <RefreshForecasts
        setForecasts={() => {}}
        setLoadingForecasts={() => {}}
      />,
    );
    const firstPage = queryByTestId('refreshButton');
    expect(firstPage).toBeTruthy();
  });
});
