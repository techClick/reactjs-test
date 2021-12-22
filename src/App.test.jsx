/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';
import './config';

afterEach(cleanup);

describe('unit tests', () => {
  test('component renders', () => {
    render(<App />);
  });
  test('internet works', async () => {
    const searchText = 'john';
    const url = `https://api.github.com/search/users?q=${searchText} in:login`;
    const sortedResult = await fetch(url).then((res) => res.json())
      .then((data) => {
        if (!data || !data.items) return [];
        if (data.items.length === 0) return [{ login: 'willPassCheck' }];
        return data.items;
      }).catch(() => ([]));
    expect(sortedResult.length).toBeGreaterThan(0);
  });
});
