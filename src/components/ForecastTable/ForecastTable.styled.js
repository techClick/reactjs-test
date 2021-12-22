import styled, { keyframes } from 'styled-components';
import deleteImage from '../../assets/bin2.png';

const animation = keyframes`
  from {background-color: #cadce3;}
  to {background-color: white;}`;

export const Table = styled.table`
  width:100%;
  border-right: 1px solid #c9c9c9;
  border-bottom: 1px solid #c9c9c9;
  border-collapse: collapse;
  text-align: left;
  margin-top:79px;
  color: #3b3b3b;
  tr:nth-of-type(1){
    border-top: 0;
  }
`;

export const TH = styled.th`
  border-top: .75px solid #c9c9c9;
  border-bottom: .75px solid #c9c9c9;
  border-left: .75px solid #c9c9c9;
  padding: 24px 10px 13px 10px;
  color: #525252;
  @media(max-width:350px){
    display: ${(props) => (props.removeAt2 ? 'none' : '')};
  }
  @media(max-width:275px){
    display: ${(props) => (props.removeAt1 ? 'none' : '')};
  }
`;

export const TR = styled.tr`
  border-top: .75px solid #f2f2f2;
  animation-name: ${(props) => (props.isJustAdded ? animation : 'none')};
  animation-duration: 0.65s;
  animation-iteration-count: 3;
`;

export const TD = styled.td`
  color: #525252;
  border-left: .75px solid #c9c9c9;
  padding: 13px 10px 13px ${(props) => (props.extraPadding ? '43px' : '10px')};  
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
  max-width: 5px;
  font-size:13.5px;
  position:relative;
  &:hover {
    text-overflow: clip;
    white-space: normal;
    word-break: break-all;
  }
  @media(max-width:350px){
    display: ${(props) => (props.removeAt2 ? 'none' : '')};
  }
  @media(max-width:275px){
    display: ${(props) => (props.removeAt1 ? 'none' : '')};
  }
`;

export const ImageC = styled.div`
  width:30px;
  height:30px;
  border-radius:100%;
  position: absolute;
  bottom:6px;
  left:5px;
  background-color: lightgray;
`;

export const Image = styled.img`
  width:19px;
  height:19px;
  border-radius: 50%;
  position: absolute;
  bottom:12px;
  left:9px;
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

export const FavouritesIcon = styled.img`
  width:18px;
  height:17px;
  position: absolute;
  bottom:13px;
  right:45px;
  padding-left: 5px;
  &:hover{
    cursor: pointer;
  }
`;

export const CityLink = styled.div`
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;
