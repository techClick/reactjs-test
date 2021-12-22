/* eslint-disable no-undef */
import React from 'react';
import {
  render,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react';
import Notes from './Notes';

const selectedForecast = {
  location: { name: 'testc' },
  current:
  {
    temperature: 'testt',
  },
};

afterEach(cleanup);

describe('unit tests', () => {
  test('component renders', () => {
    render(<Notes selectedForecast={selectedForecast} />);
  });
  test('Notes input box renders', () => {
    render(<Notes selectedForecast={selectedForecast} />);
    const NotesInput = screen.queryByTestId('notesInput');
    expect(NotesInput).toBeTruthy();
  });
  test('add note button renders', () => {
    render(<Notes selectedForecast={selectedForecast} />);
    const addNoteButton = screen.queryByTestId('addNote');
    expect(addNoteButton).toBeTruthy();
  });
  test('Notes input changes correctly', () => {
    render(<Notes selectedForecast={selectedForecast} />);
    const notesInput = screen.queryByTestId('notesInput');
    fireEvent.change(notesInput, { target: { value: 'test' } });
    expect(notesInput.value).toBe('test');
  });
});
