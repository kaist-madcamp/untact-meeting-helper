import styled from 'styled-components';

export const ChatContainer = styled.div`
  position: relative;
  background-color: #222;
  color: #fff;
  height: 100%;
  z-index: 999;
  border-radius: 10px;
`;

export const ChatMainBox = styled.div`
  width: 100%;
  overflow-y: scroll;
  padding: 15px;
`;

export const ChatBlock = styled.div<{ location: string }>`
  display: flex;
  justify-content: ${(props) =>
    props.location === 'left' ? 'flex-start' : 'flex-end'};
  & + & {
    margin: 4px 0;
  }
`;

export const ChatBox = styled.div`
  display: inline-block;
  border-radius: 30px;
  padding: 10px;
  font-size: 11px;
  color: #fff;
  &.receive_box {
    background-color: #343434;
  }
  &.send_box {
    background-color: tomato;
  }
`;
