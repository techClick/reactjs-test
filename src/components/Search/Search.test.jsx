/* eslint-disable no-undef */
import React from 'react';
import {
  render, cleanup, screen, fireEvent,
} from '@testing-library/react';
import Search from './Search';

afterEach(cleanup);

describe('unit tests', () => {
  test('component renders', () => {
    render(
      <Search
        setForecasts={() => {}}
        setShowSearch={() => {}}
      />,
    );
  });
  test('search box renders', () => {
    render(
      <Search
        setForecasts={() => {}}
        setShowSearch={() => {}}
      />,
    );
    const searchInput = screen.queryByTestId('searchInput');
    expect(searchInput).toBeTruthy();
  });
  test('submit button renders', () => {
    render(
      <Search
        setForecasts={() => {}}
        setShowSearch={() => {}}
      />,
    );
    const submitButton = screen.queryByTestId('submitButton');
    expect(submitButton).toBeTruthy();
  });
  test('search input changes correctly', () => {
    // eslint-disable-next-line no-var
    render(
      <Search
        setForecasts={() => {}}
        setShowSearch={() => {}}
      />,
    );
    const searchInput = screen.queryByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
  });
});
