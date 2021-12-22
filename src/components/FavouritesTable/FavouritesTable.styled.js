import styled from 'styled-components';

export const Container = styled.div`
`;

export const ResultsTable = styled.table`
  width:100%;
  border-right: 1px solid #c9c9c9;
  border-bottom: 1px solid #c9c9c9;
  border-collapse: collapse;
  text-align: left;
  margin-top:79px;
  color: #3b3b3b;
`;

export const TH = styled.th`
  border-top: .75px solid #c9c9c9;
  border-left: .75px solid #c9c9c9;
  padding: 24px 10px 13px 10px;
  @media(max-width:350px){
    display: ${(props) => (props.removeAt2 ? 'none' : '')}
  }
  @media(max-width:275px){
    display: ${(props) => (props.removeAt1 ? 'none' : '')}
  }
`;

export const TD = styled.td`
  border-top: .75px solid #c9c9c9;
  border-left: .75px solid #c9c9c9;
  padding: 13px 10px 13px ${(props) => (props.extraPadding ? '48px' : '10px')};  
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
    display: ${(props) => (props.removeAt2 ? 'none' : '')}
  }
  @media(max-width:275px){
    display: ${(props) => (props.removeAt1 ? 'none' : '')}
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
  width:26px;
  height:26px;
  border-radius: 50%;
  position: absolute;
  bottom:8px;
  left:9px;
  background-color: lightgray;
`;
