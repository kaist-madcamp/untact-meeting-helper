import React, { useEffect, useContext, useRef } from 'react';
import * as go from 'gojs';
import styled from 'styled-components';
import { ReactDiagram } from 'gojs-react';
import { random_rgba } from './utils';
import './Diagram.css';
import html2canvas from 'html2canvas';
import io from 'socket.io-client';
import { SOCKET_ENDPOINT } from '../../lib/constant';
import { SocketContext } from '../../providers/SocketProvider';

interface Props {
  transcriptArr: string[];
}

interface DiagramProperty {
  word: string;
  posX: number;
  posY: number;
  color: string;
}

let model: go.GraphLinksModel;
let diagram: go.Diagram;
let socket: any;
function initDiagram() {
  const $ = go.GraphObject.make;
  model = new go.GraphLinksModel();
  const color = random_rgba();

  diagram = $(go.Diagram, {
    'undoManager.isEnabled': true,
    model: $(go.GraphLinksModel, {
      linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
  });

  // define a simple Node template
  diagram.nodeTemplate = $(
    go.Node,
    'Auto',
    {
      resizable: true,
      resizeObjectName: 'Shape',
    },
    new go.Binding('location', 'loc', go.Point.parse),
    $(
      go.Shape,
      'Circle',
      {
        fill: color,
        name: 'Shape',
        portId: '',
        cursor: 'pointer',
        fromLinkable: true,
        toLinkable: true,
        fromLinkableDuplicates: true,
        toLinkableDuplicates: true,
      },
      new go.Binding('fill'),
    ),
    $(
      go.TextBlock,
      {
        editable: true,
        stroke: 'black',
        margin: 8,
        font: 'bold 16px sans-serif',
      },
      new go.Binding('text', 'key'),
    ),
  );

  diagram.linkTemplate = $(
    go.Link,
    { relinkableFrom: true, relinkableTo: true },
    $(go.Shape),
    $(go.Shape, { toArrow: 'Standard' }),
  );

  diagram.toolManager.relinkingTool.fromHandleArchetype = $(
    go.Shape,
    'Diamond',
    {
      desiredSize: new go.Size(9, 9),
      stroke: 'green',
      fill: 'lime',
      segmentIndex: 0,
    },
  );

  diagram.toolManager.relinkingTool.toHandleArchetype = $(go.Shape, 'Diamond', {
    desiredSize: new go.Size(9, 9),
    stroke: 'red',
    fill: 'pink',
    segmentIndex: -1,
  });

  return diagram;
}

let imgNum = 1;

const Diagram = React.forwardRef(({ transcriptArr }: Props) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const { roomId, name: myUsername, callAccepted, callEnded } = useContext(
    SocketContext,
  );

  useEffect(() => {
    socket = io(SOCKET_ENDPOINT);

    socket.on('receive-diagram', (receivedDiagram: DiagramProperty) => {
      model.addNodeData({
        key: receivedDiagram.word,
        fill: receivedDiagram.color,
        loc: `${receivedDiagram.posX} ${receivedDiagram.posY}`,
      });
      diagram.model = model;
    });
  }, []);

  useEffect(() => {
    if (callAccepted && !callEnded) {
      console.log('my name : ', myUsername);
      console.log('room Id : ', roomId);
      if (!myUsername || !roomId) return;
      socket.emit(
        'join-meeting',
        { name: myUsername, roomId },
        (error: string) => {
          alert(error);
        },
      );
    }
  }, [callAccepted, callEnded]);

  const saveAs = (uri: string, filename: string) => {
    const link = document.createElement('a');
    console.log('link : ', link);
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  };

  const wordClickHandler = (word: string) => {
    const posX = Math.random() * 900;
    const posY = Math.random() * 300;
    const color = random_rgba();

    const diagramData: DiagramProperty = {
      word,
      posX,
      posY,
      color,
    };
    model.addNodeData({ key: word, fill: color, loc: `${posX} ${posY}` });
    diagram.model = model;
    socket.emit('send-diagram', diagramData);
  };

  const captureBtnHandler = () => {
    if (!canvasRef.current) return;
    html2canvas(canvasRef.current, {}).then((canvas) => {
      saveAs(canvas.toDataURL(), `picture-${imgNum}.png`);
    });
    imgNum++;
  };

  return (
    <Container>
      <div ref={canvasRef} style={{ position: 'relative' }}>
        <ReactDiagram
          initDiagram={initDiagram}
          divClassName="diagram-component"
          nodeDataArray={[]}
          skipsDiagramUpdate={true}
        />
        <CaptureBtn onClick={captureBtnHandler}>capture</CaptureBtn>
      </div>

      <TranscriptBox>
        {transcriptArr.map((word, idx) => (
          <>
            <span key={idx} onClick={() => wordClickHandler(word)}>
              {word}
            </span>{' '}
          </>
        ))}
      </TranscriptBox>
    </Container>
  );
});

const Container = styled.section`
  max-width: calc(100vw - 400px);
  min-width: 300px;
  width: 100%;
`;

const CaptureBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10;
`;

const TranscriptBox = styled.div`
  height: 150px;
  background-color: #fff;
  color: black;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  overflow: scroll;
`;

export default Diagram;
