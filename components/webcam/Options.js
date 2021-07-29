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
import { Button, TextField } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { SocketContext } from '../../providers/SocketProvider';
var Options = function (_a) {
    var children = _a.children;
    var _b = useContext(SocketContext), me = _b.me, callAccepted = _b.callAccepted, name = _b.name, setName = _b.setName, callEnded = _b.callEnded, leaveCall = _b.leaveCall, callUser = _b.callUser, roomId = _b.roomId, setRoomId = _b.setRoomId;
    // const [roomId, setRoomId] = useState('');
    return (_jsxs(Container, { children: [_jsxs(Row, { children: [_jsx(TextField, { label: "Type User Name", value: name, onChange: function (e) { return setName(e.target.value); }, fullWidth: true }, void 0),
                    _jsx(CopyToClipboard, __assign({ text: me }, { children: _jsx(Button, __assign({ variant: "contained", color: "primary", fullWidth: true, startIcon: _jsx(Assignment, { fontSize: "large" }, void 0) }, { children: "Copy room id" }), void 0) }), void 0)] }, void 0),
            _jsxs(Row, { children: [_jsx(TextField, { label: "Room ID to call", value: roomId, onChange: function (e) { return setRoomId(e.target.value); }, fullWidth: true }, void 0),
                    callAccepted && !callEnded ? (_jsx(Button, __assign({ variant: "contained", color: "secondary", startIcon: _jsx(PhoneDisabled, { fontSize: "large" }, void 0), fullWidth: true, onClick: leaveCall }, { children: "Leave a room" }), void 0)) : (_jsx(Button, __assign({ variant: "contained", color: "primary", startIcon: _jsx(Phone, { fontSize: "small" }, void 0), fullWidth: true, onClick: function () { return callUser(roomId); } }, { children: "Call" }), void 0))] }, void 0), children] }, void 0));
};
var Row = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var Container = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  padding: 10px;\n  border: 2px solid black;\n  margin-top: 10px;\n"], ["\n  width: 100%;\n  padding: 10px;\n  border: 2px solid black;\n  margin-top: 10px;\n"])));
export default Options;
var templateObject_1, templateObject_2;
