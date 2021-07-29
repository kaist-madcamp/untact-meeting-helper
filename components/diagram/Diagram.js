var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useContext, useRef } from 'react';
import * as go from 'gojs';
import styled from 'styled-components';
import { ReactDiagram } from 'gojs-react';
import { random_rgba } from './utils';
import './Diagram.css';
import html2canvas from 'html2canvas';
import { SocketContext } from '../../providers/SocketProvider';
var model;
var diagram;
var socket;
function initDiagram() {
    var $ = go.GraphObject.make;
    model = new go.GraphLinksModel();
    var color = random_rgba();
    diagram = $(go.Diagram, {
        'undoManager.isEnabled': true,
        model: $(go.GraphLinksModel, {
            linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }),
    });
    // define a simple Node template
    diagram.nodeTemplate = $(go.Node, 'Auto', {
        resizable: true,
        resizeObjectName: 'Shape',
    }, new go.Binding('location', 'loc', go.Point.parse), $(go.Shape, 'Circle', {
        fill: color,
        name: 'Shape',
        portId: '',
        cursor: 'pointer',
        fromLinkable: true,
        toLinkable: true,
        fromLinkableDuplicates: true,
        toLinkableDuplicates: true,
    }, new go.Binding('fill')), $(go.TextBlock, {
        editable: true,
        stroke: 'black',
        margin: 8,
        font: 'bold 16px sans-serif',
    }, new go.Binding('text', 'key')));
    diagram.linkTemplate = $(go.Link, { relinkableFrom: true, relinkableTo: true }, $(go.Shape), $(go.Shape, { toArrow: 'Standard' }));
    diagram.toolManager.relinkingTool.fromHandleArchetype = $(go.Shape, 'Diamond', {
        desiredSize: new go.Size(9, 9),
        stroke: 'green',
        fill: 'lime',
        segmentIndex: 0,
    });
    diagram.toolManager.relinkingTool.toHandleArchetype = $(go.Shape, 'Diamond', {
        desiredSize: new go.Size(9, 9),
        stroke: 'red',
        fill: 'pink',
        segmentIndex: -1,
    });
    return diagram;
}
var imgNum = 1;
var Diagram = React.forwardRef(function (_a) {
    var transcriptArr = _a.transcriptArr, socket = _a.socket;
    var canvasRef = useRef(null);
    var _b = useContext(SocketContext), roomId = _b.roomId, myUsername = _b.name, callAccepted = _b.callAccepted, callEnded = _b.callEnded;
    useEffect(function () {
        socket.on('receive-diagram', function (receivedDiagram) {
            model.addNodeData({
                key: receivedDiagram.word,
                fill: receivedDiagram.color,
                loc: receivedDiagram.posX + " " + receivedDiagram.posY,
            });
            diagram.model = model;
        });
    }, []);
    useEffect(function () {
        if (callAccepted && !callEnded) {
            console.log('my name : ', myUsername);
            console.log('room Id : ', roomId);
            if (!myUsername || !roomId)
                return;
            socket.emit('join-meeting', { name: myUsername, roomId: roomId }, function (error) {
                alert(error);
            });
        }
    }, [callAccepted, callEnded]);
    var saveAs = function (uri, filename) {
        var link = document.createElement('a');
        console.log('link : ', link);
        if (typeof link.download === 'string') {
            link.href = uri;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        else {
            window.open(uri);
        }
    };
    var wordClickHandler = function (word) {
        var posX = Math.random() * 900;
        var posY = Math.random() * 300;
        var color = random_rgba();
        var diagramData = {
            word: word,
            posX: posX,
            posY: posY,
            color: color,
        };
        model.addNodeData({ key: word, fill: color, loc: posX + " " + posY });
        diagram.model = model;
        socket.emit('send-diagram', diagramData);
    };
    var captureBtnHandler = function () {
        if (!canvasRef.current)
            return;
        html2canvas(canvasRef.current, {}).then(function (canvas) {
            saveAs(canvas.toDataURL(), "picture-" + imgNum + ".png");
        });
        imgNum++;
    };
    return (_jsxs(Container, { children: [_jsxs("div", __assign({ ref: canvasRef, style: { position: 'relative' } }, { children: [_jsx(ReactDiagram, { initDiagram: initDiagram, divClassName: "diagram-component", nodeDataArray: [], skipsDiagramUpdate: true }, void 0),
                    _jsx(CaptureBtn, __assign({ onClick: captureBtnHandler }, { children: "capture" }), void 0)] }), void 0),
            _jsx(TranscriptBox, { children: transcriptArr.map(function (word, idx) { return (_jsxs(_Fragment, { children: [_jsx("span", __assign({ onClick: function () { return wordClickHandler(word); } }, { children: word }), idx), ' '] }, void 0)); }) }, void 0)] }, void 0));
});
var Container = styled.section(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  max-width: calc(100vw - 400px);\n  min-width: 300px;\n  width: 100%;\n"], ["\n  max-width: calc(100vw - 400px);\n  min-width: 300px;\n  width: 100%;\n"])));
var CaptureBtn = styled.button(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  right: 10px;\n  top: 10px;\n  z-index: 10;\n"], ["\n  position: absolute;\n  right: 10px;\n  top: 10px;\n  z-index: 10;\n"])));
var TranscriptBox = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  height: 150px;\n  background-color: aliceblue;\n  color: black;\n  margin-top: 10px;\n  padding: 10px;\n  border: 2px solid black;\n  border-radius: 20px;\n  overflow: scroll;\n"], ["\n  height: 150px;\n  background-color: aliceblue;\n  color: black;\n  margin-top: 10px;\n  padding: 10px;\n  border: 2px solid black;\n  border-radius: 20px;\n  overflow: scroll;\n"])));
var Containerbackground = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin: 3rem;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  z-index: -1;\n  transform: rotate(300deg);\n  -webkit-transform: rotate(300deg);\n  color: #c6afaf;\n"], ["\n  margin: 3rem;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  z-index: -1;\n  transform: rotate(300deg);\n  -webkit-transform: rotate(300deg);\n  color: #c6afaf;\n"])));
export default Diagram;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
