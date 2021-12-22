import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 60px;
`;

export const SearchInput = styled.input`
  width:97%;
  height:30px;
`;

export const Submit = styled.button`
  margin-top: 10px;
  background-color: ${(props) => (props.isDisabled ? 'grey' : '#15d47b')};
  border:none;
  border-radius: 5px;
  height: 35px;
  width: 40%;
  min-width:60px;
  max-width:85px;
  color: white;
  font-weight: bold;
  font-size: 13px;
  &:hover{
    cursor: ${(props) => (props.isDisabled ? '' : 'pointer')};
    background-color: ${(props) => (props.isDisabled ? '' : '#a7d6c0')};
  }
`;
