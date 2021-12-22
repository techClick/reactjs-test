import styled from 'styled-components';

export const AddNote = styled.button`
`;

export const Table = styled.table`
  width:calc(60% - 45px);
  position: absolute;
  border-right: 1px solid #c9c9c9;
  border-bottom: 1px solid #c9c9c9;
  border-collapse: collapse;
  text-align: left;
  margin-top:79px;
  right: 30px;
  color: #3b3b3b;
  tr:nth-of-type(1){
    border-top: 0;
  }
  @media(max-width: 370px) {
    width: 79%;
  }
  @media(max-width: 200px) {
    right: 12px;
  }
`;
