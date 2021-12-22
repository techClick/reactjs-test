import styled from 'styled-components';
import deleteImage from '../../../assets/bin2.png';

export const Container = styled.div`
  position: absolute;
  left: 30px;
  margin-top:79px;
  width: calc(40% - 45px);
  height: 360px;
  overflow: auto;
  @media(max-width: 370px) {
    display: none;
  }
`;

export const RelativeContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  text-align: left;
`;

export const AddNoteArea = styled.div`
  height: 25%;
  display: flex;
`;

export const TextArea = styled.textarea`
  width: 60%;
  height: 93.5%;
  padding-left: 6px;
`;

export const AddNote = styled.button`
  background-color: #15d47b;
  border:none;
  border-radius: 5px;
  height: 35px;
  width: 40%;
  max-width:85px;
  color: white;
  font-weight: bold;
  font-size: 13px;
  margin-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover{
    cursor: pointer;
    background-color: #a7d6c0;
  }
  @media(max-width: 370px) {
    display: none;
  }
`;

export const NotesPanel = styled.div`
  overflow: hidden;
  overflow-y: auto;
  height: calc(73.5% - 10px);
  width: 99.2%;
  margin-top: 10px;
  border: .75px solid #c9c9c9;
  border-radius: 2px;
`;

export const SavedNote = styled.div`
  height: 42px;
  width: 100%;
  display: inline-block;
  border-bottom: .75px solid #f2f2f2;
  position: relative;
`;

export const Label = styled.div`
  width:70%;
  height:14px;
  position: absolute;
  left: 10px;
  bottom: 50%;
  font-size: 11px;
  padding-top: 2.5px;
  color: #4a4a4a;
  transform: translate(0, 50%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media(max-width: 980px) {
    width: 50%;
  }
  @media(max-width: 560px) {
    width: 30%;
  }
  @media(max-width: 450px) {
    display: none;
  }
`;

export const DeleteIcon = styled.img`
  width:14px;
  height:14px;
  position: absolute;
  bottom:14px;
  right:15px;
  &:hover{
    cursor: pointer;
    content:url(${deleteImage});
  }
`;

export const EditIcon = styled.img`
  width:18px;
  height:17px;
  position: absolute;
  bottom:12px;
  right:45px;
  padding-left: 5px;
  opacity: 70%;
  &:hover{
    cursor: pointer;
  }
`;

export const Editor = styled.textarea`
  width: 60%;
  height: 90px;
  right: 50%;
  bottom: 65%;
  transform: translate(50%, 50%);
  position: absolute;
`;

export const EditLabel = styled.div`
  padding: 0 5px;
  height: 30px;
  right: 50%;
  bottom: 85%;
  transform: translate(50%, 50%);
  position: absolute;
  border-radius: 6px;
  background-color: #e2e2e2;
  color: grey;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Buttons = styled.div`
  width: 60%;
  height: 35px;
  position: absolute;
  right: 50%;
  bottom: 44%;
  transform: translate(50%, 50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SaveEdit = styled.button`
  background-color: #15d47b;
  border:none;
  border-radius: 5px;
  height: 35px;
  width: 40%;
  min-width:60px;
  max-width:85px;
  color: white;
  font-weight: bold;
  font-size: 13px;
  margin-right: 7px;
  &:hover{
    cursor: pointer;
    background-color: #a7d6c0;
  }
  @media(max-width: 370px) {
    display: none;
  }
`;

export const AllNotes = styled.button`
  background-color: #e2e2e2;
  border:none;
  border-radius: 5px;
  height: 35px;
  width: 60%;
  min-width:80px;
  max-width:105px;
  color: grey;
  font-weight: bold;
  font-size: 13px;
  &:hover{
    cursor: pointer;
    background-color: #a7d6c0;
  }
  @media(max-width: 370px) {
    display: none;
  }
`;
