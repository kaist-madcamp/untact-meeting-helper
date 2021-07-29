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
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
import { useContext } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from '../../providers/SocketProvider';
var Notifications = function () {
    var _a = useContext(SocketContext), answerCall = _a.answerCall, call = _a.call, callAccepted = _a.callAccepted;
    return (_jsx(Container, { children: (call === null || call === void 0 ? void 0 : call.isReceivingCall) && !callAccepted && (_jsxs(Row, { children: [_jsxs(Title, { children: [call === null || call === void 0 ? void 0 : call.name, " is calling:"] }, void 0),
                _jsx(Button, __assign({ variant: "contained", color: "primary", onClick: answerCall }, { children: "Answer" }), void 0)] }, void 0)) }, void 0));
};
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-top: 30px;\n"], ["\n  margin-top: 30px;\n"])));
var Row = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-around;\n"], ["\n  display: flex;\n  justify-content: space-around;\n"])));
var Title = styled.h1(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
export default Notifications;
var templateObject_1, templateObject_2, templateObject_3;
