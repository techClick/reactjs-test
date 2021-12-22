import styled from 'styled-components';

export const Container = styled.div`
  width: 80%;
`;

export const ApiResponse = styled.div`
  margin-top: 80px;
  color: ${(props) => (props.isError ? 'red' : 'black')};
  font-size: 13px;
`;

export const Loading = styled.div`
  margin-bottom: 12px;
`;

export const Label = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: #787878;
`;
