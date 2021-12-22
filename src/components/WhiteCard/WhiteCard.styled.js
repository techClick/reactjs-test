import styled, { keyframes } from 'styled-components';

const breatheAnimation = keyframes`
 0% { opacity: 0 }
 100% { opacity: 1 }`;

export const Container = styled.div`
  background-color: white;
  padding: ${(props) => (props.isPanelLink ? '15px' : '30px')};
  padding-bottom: ${(props) => (
    (props.isPanelLink || props.isSearch) ? '15px' : '70px')};
  border-radius: 8px;
  margin: auto;
  margin-top: ${(props) => (props.allCities ? '20px' : '0px')};
  margin-bottom: ${(props) => (props.favourites ? '20px' : '0px')};
  width: ${(props) => props.width || ''};
  height: ${(props) => props.height || ''};
  text-align: center;
  position: relative;
  &:hover{
    cursor: ${(props) => (props.isPanelLink ? 'pointer' : '')};
    background-color: ${(props) => (props.isPanelLink ? '#91c9e6' : 'white')};
  }
  animation-name: ${breatheAnimation};
  animation-duration: 0.45s;
  animation-iteration-count: 1;
`;

export const TableDescription = styled.div`
  margin-bottom: 1px;
  float:left;
  font-size:14px;
  color: #575757;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 56%;
  text-align: left;
  @media(max-width: 310px) {
    display: none;
  }
`;

export const GoBack = styled.div`
  margin-bottom: 1px;
  float:right;
  text-decoration: underline;
  color: #3cbaf0;
  font-size:12px;
  &:hover{
    cursor: pointer;
  }
`;

export const Line = styled.hr`
  height: 1px;
  width:100%;
  position:absolute;
  border:0;
  background-color: #c9c9c9;
  top: 66px;
  left:0;
`;
