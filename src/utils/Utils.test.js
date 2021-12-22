/* eslint-disable no-undef */
import { cleanup } from '@testing-library/react';
import { getPaginatedData, getPagesToShow } from './Utils';
import '../config';

afterEach(cleanup);

describe('unit tests', () => {
  test('results table is split up correctly => getPaginatedData works', () => {
    const { noOfForecastsPerPage } = global.config;
    const results = [];
    for (let i = 0; i < (noOfForecastsPerPage * 2); i += 1) {
      results.push({ login: `testL${i}` });
    }
    const results2 = [];
    for (let i = 0; i < noOfForecastsPerPage - 1; i += 1) {
      results2.push({ login: `testL${i}` });
    }
    const resultsPageSet = [];
    for (let i = noOfForecastsPerPage; i < (noOfForecastsPerPage * 2); i += 1) {
      resultsPageSet.push({ login: `testL${i}` });
    }
    const selectedPage = 1;
    expect(getPaginatedData(results, selectedPage).length).toBe(noOfForecastsPerPage);
    expect(getPaginatedData(results, selectedPage)[noOfForecastsPerPage - 1].login).toBe(`testL${(noOfForecastsPerPage - 1)}`);
    // below asserts that forecasts tables
    // with fewer forecasts than the noOfForecastsPerPage are partitioned correctly
    expect(getPaginatedData(results2, selectedPage)[noOfForecastsPerPage - 2].login).toBe(`testL${(noOfForecastsPerPage - 2)}`);
    expect(getPaginatedData(results, 2)).toStrictEqual(resultsPageSet);
  });
  test('pagination pages are numbered correctly => getPagesToShow works', () => {
    const maxNoOfPages = global.config.maxNoOfPagesInPaginator;
    let correctPagesToShow;
    const pageNumbers = [3, 12, 4, 77, 89, 11];
    for (let i = 0; i < pageNumbers.length; i += 1) {
      const pageNumber = pageNumbers[i];
      correctPagesToShow = [];
      for (let j = pageNumber; j < (pageNumber + maxNoOfPages); j += 1) {
        correctPagesToShow.push(j);
      }
      // getPagesToShow is like this =>
      // getPagesToShow( startIndex, totalNoOfPages , setStartIndex:Function )
      expect(getPagesToShow(pageNumber - 1, 999, () => {})).toStrictEqual(correctPagesToShow);
    }
  });
});
