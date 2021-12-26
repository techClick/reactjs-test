// eslint-disable-next-line no-nested-ternary
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 28px;
  float:right;
  position: absolute;
  left: 0;
  bottom: 30px;
  text-align: center;
  margin-top:20px;
`;

export const RelativeContainer = styled.div`
  width: calc(100% - 60px);
  height: 100%;
  text-align: right;
  position: relative;
  margin: auto;
  @media(max-width: 250px){
    width: 100%;
  }
`;

export const Page = styled.div`
  box-sizing: border-box;
  border: 1px solid ${(props) => (props.onThisPage ? '#70c29b' : '#c9c9c9')};
  width: 24%;
  height: 100%;
  margin-left:3px;
  float: right;
  display:flex;
  justify-content: center;
  align-items: center;
  font-size:13px;
  border-radius: 2px;
  max-width:32px;
  min-width:18px;
  color: #4f4f4f;
  opacity: ${(props) => (props.disabled ? '30%' : '')};
  background-color: ${(props) => (props.onThisPage ? '#99ffcf' : 'white')};
  &:hover{
    cursor: ${(props) => (props.disabled ? '' : 'pointer')};
    background-color: ${(props) => {
    const isDisabled = props.disabled ? '' : '#d1d1d1';
    return props.onThisPage ? '#99ffcf' : isDisabled;
  }}
  }
  @media(max-width:250px){
    width: 21%;
    margin-left:1px;
  }
`;

export const QuickPage = styled.div`
  background-color: none;
  width: 4%;
  height: 100%;
  min-width:6px;
  max-width:20px;
  margin-left:3px;
  float: right;
  border-radius: 2px;
  display:flex;
  justify-content: center;
  align-items: center;
  color: #3cbaf0;
  font-size: 13px;
  &:hover{
    cursor: ${(props) => (props.disabled ? '' : 'pointer')};
    background-color: ${(props) => (props.disabled ? 'white' : '#d1d1d1')};
  }
  @media(max-width:250px){
    margin-left:2px;
  }
`;

export const Image = styled.img`
  width:25%;
  height:25%
`;
