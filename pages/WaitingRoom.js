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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import Notifications from '../components/webcam/Notifications';
import Options from '../components/webcam/Options';
import VideoPlayer from '../components/webcam/VideoPlayer';
import Draggable from 'react-draggable';
import PageLayout from '../components/PageLayout';
import { useState } from 'react';
export default function WaitingRoom(_a) {
    var useAuthInput = _a.useAuthInput;
    var _b = useState('default'), faceContainerWidth = _b[0], setFaceContainerWidth = _b[1];
    var sizeUp = function () {
        if (faceContainerWidth === 'default') {
            setFaceContainerWidth('up');
        }
        else {
            setFaceContainerWidth('default');
        }
    };
    var sizeDown = function () {
        if (faceContainerWidth === 'default') {
            setFaceContainerWidth('down');
        }
        else {
            setFaceContainerWidth('default');
        }
    };
    return (_jsx(PageLayout, __assign({ title: 'Waiting room', useAuthInput: useAuthInput }, { children: _jsx(Draggable, { children: _jsx(Container, { children: _jsxs(FaceContainer, __assign({ faceContainerWidth: faceContainerWidth }, { children: [_jsx(VideoPlayer, { widthController: [faceContainerWidth, sizeUp, sizeDown] }, void 0),
                        useAuthInput[0] ? (_jsx(Options, { children: _jsx(Notifications, {}, void 0) }, void 0)) : (_jsx(LoginIndicator, { children: "Join Our Meeting Assistant!" }, void 0))] }), void 0) }, void 0) }, void 0) }), void 0));
}
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-image: perfume;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-image: perfume;\n"])));
var FaceContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-top: 30px;\n  width: ", ";\n  cursor: pointer;\n"], ["\n  margin-top: 30px;\n  width: ",
    ";\n  cursor: pointer;\n"])), function (props) {
    if (window.location.pathname === '/') {
        return props.faceContainerWidth === 'default'
            ? '500px'
            : props.faceContainerWidth === 'up'
                ? '800px'
                : '300px';
    }
    else if (window.location.pathname === '/meeting-room') {
        return props.faceContainerWidth === 'default'
            ? '300px'
            : props.faceContainerWidth === 'up'
                ? '400px'
                : '0px';
    }
});
var LoginIndicator = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  border: 2px solid black;\n  margin-top: 10px;\n  width: 500px;\n  padding: 30px 0;\n  font-size: 24px;\n  text-align: center;\n"], ["\n  border: 2px solid black;\n  margin-top: 10px;\n  width: 500px;\n  padding: 30px 0;\n  font-size: 24px;\n  text-align: center;\n"])));
var templateObject_1, templateObject_2, templateObject_3;
