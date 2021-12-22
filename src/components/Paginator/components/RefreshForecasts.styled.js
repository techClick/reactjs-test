import styled from 'styled-components';

export const Container = styled.div`
  float: left;
  width: 30px;
  height: 100%;
  background-color: lightgrey;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 2px;
  @media(max-width: 310px) {
    display: none;
  }
  &:hover {
    background-color: grey;
    cursor: pointer;
  }
`;

export const Image = styled.img`
  width: 60%;
  height: 60%;
  opacity: 70%;
`;
