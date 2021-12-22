/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Paginator from './Paginator';
import '../../config';

afterEach(cleanup);

describe('unit tests', () => {
  test('component renders', () => {
    const { queryByTestId } = render(<Paginator noOfPages={1} thisPage={1} />);
    const firstPage = queryByTestId('page1');
    expect(firstPage).toBeTruthy();
  });
  test('pagination starts from the first page', () => {
    const { queryByTestId } = render(<Paginator noOfPages={17} thisPage={1} />);
    const firstPage = queryByTestId('page1');
    expect(firstPage.innerHTML).toBe('1');
  });
  // assertion if numbering of paginator is correct is found in src/utils/Utils.tests
});
