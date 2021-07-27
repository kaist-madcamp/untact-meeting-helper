import React, { useEffect, useRef, useState } from 'react';
import * as go from 'gojs';
import styled from 'styled-components';
import { ReactDiagram } from 'gojs-react';
import { random_rgba } from './utils';
import './Diagram.css';
import html2canvas from 'html2canvas';

// import queryString from 'query-string';
import io from "socket.io-client";

interface TransDiagramType {
  word: string;
  posX: string;
  posY: string;
  color: string;
}

interface Props {
  transcriptArr: string[];
  screenFlag: boolean;
}

let model: go.GraphLinksModel;
let diagram: go.Diagram;

const ENDPOINT = 'http://192.249.18.120:80/';
let socket:any;

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
let initFlag = false;

const Diagram = React.forwardRef(({ transcriptArr, screenFlag }: Props) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('js');
  const [room, setRoom] = useState('1');
  const [users, setUsers] = useState('');
  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);
  // const [Diagram, setDiagram] = useState<string[]>([]);

  useEffect(() => {
    console.log('canvasRef:', canvasRef.current);
    if (initFlag) {
      if (!canvasRef.current) return;
      html2canvas(canvasRef.current, {}).then((canvas) => {
        saveAs(canvas.toDataURL(), `pciture${imgNum}.png`);
      });
      imgNum++;
    }
    initFlag = true;
  }, [screenFlag]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('join', { name, room }, (error: any) => {
      if(error) {
        alert(error);
      }
    });

    socket.on("roomData", ({ users }: { users: string }) => {
      setUsers(users);
    });

    socket.on('diagram', (dia: TransDiagramType) => {
      model.addNodeData({ key: dia.word, fill: dia.color, loc: `${dia.posX} ${dia.posY}` });
      diagram.model = model;
    });
  }, []);

  function saveAs(uri: string, filename: string) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }

  const wordClickHandler = (word: string) => {
    console.log('word clicked');
    const x = Math.random() * 900,
      y = Math.random() * 300;
    const color = random_rgba();
    let transdiagram: TransDiagramType = {
      word: word,
      posX: String(x),
      posY: String(y),
      color: color
    };
    model.addNodeData({ key: word, fill: color, loc: `${x} ${y}` });
    socket.emit('sendDiagram', transdiagram);
    diagram.model = model;
  };

  return (
    <Container>
      <div ref={canvasRef}>
        <ReactDiagram
          initDiagram={initDiagram}
          divClassName="diagram-component"
          nodeDataArray={[]}
          skipsDiagramUpdate={true}
        />
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

const Container = styled.section``;

const TranscriptBox = styled.div`
  height: 150px;
  width: 50%;
  background-color: #fff;
  color: black;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  overflow: scroll;
`;

export default Diagram;
