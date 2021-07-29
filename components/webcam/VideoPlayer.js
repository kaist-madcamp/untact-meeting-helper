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
import { useContext } from 'react';
import styled from 'styled-components';
import { SocketContext } from '../../providers/SocketProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
var VideoPlayer = function (_a) {
    var widthController = _a.widthController;
    var _b = useContext(SocketContext), name = _b.name, callAccepted = _b.callAccepted, myVideo = _b.myVideo, userVideo = _b.userVideo, callEnded = _b.callEnded, stream = _b.stream, call = _b.call;
    return (_jsxs(Container, { children: [stream && (
            //   Our own video
            _jsxs(VideoContainer, { children: [_jsx(VideoTitle, { children: _jsxs(Title, { children: [name || window.location.pathname === '/'
                                    ? 'Waiting Room'
                                    : 'Invite Colleagues', _jsx(SButton, __assign({ className: "plus", onClick: widthController[1] }, { children: _jsx(FontAwesomeIcon, { icon: faPlus }, void 0) }), void 0),
                                _jsx(SButton, __assign({ className: "minus", onClick: widthController[2] }, { children: _jsx(FontAwesomeIcon, { icon: faMinus }, void 0) }), void 0)] }, void 0) }, void 0),
                    _jsx(SVideo, { videoWidthRatio: widthController[0], playsInline: true, muted: true, ref: myVideo, autoPlay: true }, void 0)] }, void 0)),
            callAccepted && !callEnded && (
            // users video
            _jsxs(VideoContainer, { children: [_jsx(VideoTitle, { children: (call === null || call === void 0 ? void 0 : call.name) || 'Name' }, void 0),
                    _jsx(SVideo, { videoWidthRatio: widthController[0], playsInline: true, ref: userVideo, autoPlay: true }, void 0)] }, void 0))] }, void 0));
};
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  cursor: pointer;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  cursor: pointer;\n"])));
var VideoTitle = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background-color: #fff;\n  padding: 15px;\n  text-align: center;\n  font-size: 24px;\n  font-weight: 500;\n  white-space: pre;\n"], ["\n  background-color: #fff;\n  padding: 15px;\n  text-align: center;\n  font-size: 24px;\n  font-weight: 500;\n  white-space: pre;\n"])));
var Title = styled.h1(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: black;\n  font-size: 24px;\n  /* padding: 0em 0em; */\n  font-weight: bold;\n  font-family: Times;\n"], ["\n  color: black;\n  font-size: 24px;\n  /* padding: 0em 0em; */\n  font-weight: bold;\n  font-family: Times;\n"])));
var VideoContainer = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  padding: 0px;\n  border: 2px solid black;\n  min-width: 300px;\n"], ["\n  padding: 0px;\n  border: 2px solid black;\n  min-width: 300px;\n"])));
var SVideo = styled.video(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: ", ";\n"], ["\n  width: ",
    ";\n"])), function (props) {
    if (window.location.pathname === '/') {
        return props.videoWidthRatio === 'default'
            ? '500px'
            : props.videoWidthRatio === 'up'
                ? '800px'
                : '300px';
    }
    else if (window.location.pathname === '/meeting-room') {
        return props.videoWidthRatio === 'default'
            ? '300px'
            : props.videoWidthRatio === 'up'
                ? '400px'
                : '200px';
    }
});
var SButton = styled.button(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  border: 0;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  float: right;\n  margin: 0 5px;\n  cursor: pointer;\n  &.minus {\n    background-color: tomato;\n  }\n  &.plus {\n    background-color: lightblue;\n  }\n"], ["\n  border: 0;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  float: right;\n  margin: 0 5px;\n  cursor: pointer;\n  &.minus {\n    background-color: tomato;\n  }\n  &.plus {\n    background-color: lightblue;\n  }\n"])));
export default VideoPlayer;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
