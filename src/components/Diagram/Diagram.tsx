import React, { useCallback } from 'react';
import * as go from 'gojs';
import styled from 'styled-components';
import { ReactDiagram } from 'gojs-react';
import { random_rgba } from './utils';
import './Diagram.css';

interface Props {
  ballArr: string[];
  transcriptArr: string[];
}

let model: go.GraphLinksModel;
let diagram: go.Diagram;

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
    new go.Binding('location', 'loc', go.Point.parse),
    $(
      go.Shape,
      'Circle',
      {
        fill: color,
        portId: '',
        cursor: 'pointer',
        fromLinkable: true,
        toLinkable: true,
        fromLinkableDuplicates: true,
        toLinkableDuplicates: true,
        fromLinkableSelfNode: true,
        toLinkableSelfNode: true,
      },
      new go.Binding('fill'),
    ),
    $(
      go.TextBlock,
      { stroke: 'white', margin: 3 },
      new go.Binding('text', 'key'),
    ),
  );

  return diagram;
}

const Diagram = ({ ballArr, transcriptArr }: Props) => {
  const wordClickHandler = (word: string) => {
    console.log('word clicked');
    const x = Math.random() * 150,
      y = Math.random() * 150;
    const color = random_rgba();
    model.addNodeData({ key: word, fill: color, loc: `${x} ${y}` });
    diagram.model = model;
  };

  //   const wordClickHandler = useCallback(
  //     (word: string) => {
  //       setBallArr((prev) => [...prev, word]);
  //     },
  //     [ballArr],
  //   );

  return (
    <Container>
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="diagram-component"
        nodeDataArray={[]}
        skipsDiagramUpdate={true}
      />

      <TranscriptBox>
        {transcriptArr.map((word, idx) => (
          <>
            <span key={idx} onClick={() => wordClickHandler(word)}>
              {word}
            </span>{' '}
          </>
        ))}
      </TranscriptBox>

      {ballArr.map((ball, idx) => (
        <>
          <span key={idx}>{ball}</span>{' '}
        </>
      ))}
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
`;

const TranscriptBox = styled.div`
  height: 50px;
  width: 50%;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  overflow: scroll;
`;

export default Diagram;
