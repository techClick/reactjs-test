import React from 'react';
import * as S from './Notes.styled';
import deleteIcon from '../../../assets/bin.png';
import editIcon from '../../../assets/edit.png';
import { getNotesFromStorage, saveNoteInStorage } from '../../../utils/Utils';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thisNote: '',
      isEditing: null,
      editText: null,
      notes: getNotesFromStorage(props.selectedForecast.location.name),
    };
    this.setThisNote = this.setThisNote.bind(this);
    this.setNotes = this.setNotes.bind(this);
    this.setIsEditing = this.setIsEditing.bind(this);
    this.setEditText = this.setEditText.bind(this);
  }

  setThisNote(thisNote) {
    this.setState({ thisNote });
  }

  setNotes(notes) {
    this.setState({ notes });
  }

  setIsEditing(isEditing) {
    this.setState({ isEditing });
  }

  setEditText(editText) {
    this.setState({ editText });
  }

  render() {
    const { selectedForecast } = this.props;
    const {
      notes,
      thisNote,
      isEditing,
      editText,
    } = this.state;
    const {
      setThisNote,
      setNotes,
      setIsEditing,
      setEditText,
    } = this;
    const { name } = selectedForecast.location;
    // This name refers to the selected city, calling it city is clearer
    const city = name;

    const saveThisNote = function saveThisNote() {
      if (thisNote) {
        saveNoteInStorage(city, thisNote);
        setThisNote('');
        setNotes(getNotesFromStorage(city));
        return;
      }
      // eslint-disable-next-line no-alert
      alert('Nothing to save. Write a note first');
    };

    const deleteNote = function deleteNote(index) {
      const newNotes = notes;
      newNotes.splice(index, 1);
      saveNoteInStorage(city, newNotes, true);
      setNotes(getNotesFromStorage(city));
    };

    const showAllNotes = function showAllNotes() {
      setIsEditing(null);
    };

    const saveEdit = function saveEdit() {
      if (!editText) {
        // eslint-disable-next-line no-alert
        alert('Nothing to save. Write a note first');
        return;
      }
      const newNotes = notes;
      newNotes[isEditing] = editText;
      saveNoteInStorage(city, newNotes, true);
      setNotes(getNotesFromStorage(city));
      showAllNotes();
    };

    const editNote = function editNote(index) {
      setIsEditing(index);
      setEditText(notes[index]);
    };

    return (
      <S.Container>
        <S.RelativeContainer>
          {/* eslint-disable-next-line eqeqeq */}
          { isEditing != undefined
            && (
              <>
                <S.EditLabel>
                  <small>EDIT NOTE</small>
                  <bold>{`-${isEditing + 1}`}</bold>
                </S.EditLabel>
                <S.Editor value={editText} onChange={(e) => setEditText(e.target.value)} />
                <S.Buttons>
                  <S.SaveEdit onClick={() => saveEdit()}>
                    SAVE EDIT
                  </S.SaveEdit>
                  <S.AllNotes onClick={() => showAllNotes()}>
                    ALL NOTES
                  </S.AllNotes>
                </S.Buttons>
              </>
            )}
          {/* eslint-disable-next-line eqeqeq */}
          { isEditing == undefined
            && (
            <>
              <S.AddNoteArea>
                <S.TextArea
                  data-testid="notesInput"
                  value={thisNote}
                  onChange={(e) => setThisNote(e.target.value)}
                  placeholder={`Enter new ${city} note`}
                />
                <S.AddNote onClick={() => saveThisNote()} data-testid="addNote">
                  Add Note
                </S.AddNote>
              </S.AddNoteArea>
              { notes && notes.length > 0
                && (
                  <S.NotesPanel>
                    { notes.map((note, i) => (
                      <S.SavedNote>
                        <S.Label>
                          <small>
                            {i + 1}
                            .
                            {' '}
                          </small>
                          {note}
                        </S.Label>
                        <S.DeleteIcon src={deleteIcon} onClick={() => deleteNote(i)} />
                        <S.EditIcon src={editIcon} onClick={() => editNote(i)} />
                      </S.SavedNote>
                    ))}
                  </S.NotesPanel>
                )}
            </>
            )}
        </S.RelativeContainer>
      </S.Container>
    );
  }
}

export default Notes;
