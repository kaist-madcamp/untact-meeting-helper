import styled from 'styled-components';

export const ChatContainer = styled.div`
  position: relative;
  background-color: #222;
  color: #fff;
  height: 100%;
  z-index: 999;
  border-radius: 10px;
  overflow: hidden;
`;

export const ChatMainBox = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  overscroll-behavior-y: contain;
  scroll-snap-type: y proximity;
  padding: 15px;
  padding-bottom: 100px;
  scroll-snap-align: end;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    margin-bottom: 100px;
  }
`;

export const ChatBlock = styled.div<{ location: string }>`
  display: flex;
  justify-content: ${(props) =>
    props.location === 'left' ? 'flex-start' : 'flex-end'};
  & + & {
    margin: 6px 0;
  }
`;

export const ChatBox = styled.div`
  display: inline-block;
  border-radius: 30px;
  padding: 10px;
  font-size: 11px;
  color: #fff;
  box-shadow: 0 3rem 10rem hsl(0, 0%, 60%);
  &.receive_box {
    background-color: #343434;
  }
  &.send_box {
    background-color: tomato;
  }
`;
