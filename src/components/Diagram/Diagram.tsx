import React from 'react';
import * as go from 'gojs';
import styled from 'styled-components';
import { ReactDiagram } from 'gojs-react';
import { random_rgba } from './utils';
import './Diagram.css';

interface Props {
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
  diagram.nodeTemplate = 
  $(
    go.Node, 'Auto',
    {
      resizable: true, resizeObjectName: "Shape"
    },
    new go.Binding('location', 'loc', go.Point.parse),
    $(
      go.Shape,
      'Circle',
      {
        fill: color,
        name: "Shape",
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
      { editable: true, stroke: 'black', margin: 8, font: "bold 16px sans-serif" },
      new go.Binding('text', 'key'),
    ),
  );

  diagram.linkTemplate = 
      $(go.Link, { relinkableFrom: true, relinkableTo: true},
        $(go.Shape),
        $(go.Shape, { toArrow: "Standard"})
      );

  diagram.toolManager.relinkingTool.fromHandleArchetype =
    $(go.Shape, "Diamond", { desiredSize: new go.Size(9, 9), stroke: "green", fill: "lime", segmentIndex: 0});
  
  diagram.toolManager.relinkingTool.toHandleArchetype =
    $(go.Shape, "Diamond", { desiredSize: new go.Size(9, 9), stroke: "red", fill: "pink", segmentIndex: -1});
      

  return diagram;
}

let name = 1;

const Diagram = ({ transcriptArr }: Props) => {
  const wordClickHandler = (word: string) => {
    console.log('word clicked');
    const x = Math.random() * 900,
      y = Math.random() * 300;
    const color = random_rgba();
    model.addNodeData({ key: word, fill: color, loc: `${x} ${y}` });
    diagram.model = model; 
  };

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
