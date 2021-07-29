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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Button from '../components/UI/Button';
import Diagram from '../components/diagram/Diagram';
import SpeechRecognition, { useSpeechRecognition, } from 'react-speech-recognition';
import VideoPlayer from '../components/webcam/VideoPlayer';
import Options from '../components/webcam/Options';
import Notifications from '../components/webcam/Notifications';
import PageLayout from '../components/PageLayout';
import Draggable from 'react-draggable';
import Modal from '../components/UI/Modal';
import { ChatContainer, ChatMainBox, ChatBox, ChatBlock, } from '../components/chat/ChatContainer';
import { ChatControlBox, ChatController, } from '../components/chat/ChatController';
import io from 'socket.io-client';
import { SOCKET_ENDPOINT } from '../lib/constant';
import { ChatForm, ChatFormButton, ChatFormTextarea, } from '../components/chat/ChatForm';
import { SocketContext } from '../providers/SocketProvider';
export default function MeetingRoom(_a) {
    var useAuthInput = _a.useAuthInput;
    var _b = useState(io(SOCKET_ENDPOINT)), socket = _b[0], setSocket = _b[1];
    var _c = useState([]), transcriptArr = _c[0], setTranscriptArr = _c[1];
    var _d = useState(false), recording = _d[0], setRecording = _d[1];
    var _e = useState(false), showChatBox = _e[0], setShowChatBox = _e[1];
    var _f = useState('default'), faceContainerWidth = _f[0], setFaceContainerWidth = _f[1];
    var _g = useState(''), keystroke = _g[0], setKeystroke = _g[1];
    var _h = useState(''), attendingUser = _h[0], setAttendingUser = _h[1];
    var _j = useState([]), chatArray = _j[0], setChatArray = _j[1];
    var _k = useSpeechRecognition(), transcript = _k.transcript, resetTranscript = _k.resetTranscript;
    var _l = useContext(SocketContext), roomId = _l.roomId, myUsername = _l.name, callAccepted = _l.callAccepted, callEnded = _l.callEnded;
    useEffect(function () {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            alert("Browser doesn't support speech recognition.");
        }
        socket.on('notification-user', function (_a) {
            var text = _a.text;
            console.log('notify user : ', text);
            setAttendingUser(text);
        });
        socket.on('left-user', function (_a) {
            var username = _a.username, message = _a.message;
            setAttendingUser(message);
        });
        socket.on('receive-message', function (_a) {
            var username = _a.username, message = _a.message;
            console.log('username : ', username);
            console.log('message : ', message);
            setChatArray(function (prev) { return __spreadArray(__spreadArray([], prev), [{ username: username, message: message }]); });
        });
    }, []);
    useEffect(function () {
        var container = document.getElementById('chat-main-box');
        if (!container)
            return;
        container.scrollTop = container.scrollHeight;
    }, [chatArray]);
    useEffect(function () {
        // 통화 끊었을 때 socket disconnect
        if (callEnded) {
            socket.disconnect();
            console.log('client disconnected!');
        }
    }, [callEnded]);
    useEffect(function () {
        // 통화 받았을 때, 채팅 시작.
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
    useEffect(function () {
        var newTranscriptArr = transcript.split(' ');
        setTranscriptArr(newTranscriptArr);
    }, [transcript]);
    var toggleListening = useCallback(function () {
        if (recording) {
            SpeechRecognition.stopListening();
            setRecording(false);
        }
        else {
            SpeechRecognition.startListening({
                language: 'ko-KR',
                continuous: true,
            });
            setRecording(true);
        }
    }, [recording]);
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
    var chatClickHandler = function () {
        setShowChatBox(!showChatBox);
    };
    var sendMessageHandler = function (e) {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        if (keystroke.length === 0)
            return;
        console.log('submit!');
        // socket emit
        socket.emit('send-message', keystroke);
        setChatArray(function (prev) { return __spreadArray(__spreadArray([], prev), [
            { username: myUsername, message: keystroke },
        ]); });
        setKeystroke('');
    };
    var msgChangeHandler = function (e) {
        if (e.target.value.includes('\n')) {
            sendMessageHandler();
            return;
        }
        setKeystroke(e.target.value);
    };
    return (_jsx(PageLayout, __assign({ title: "Room", useAuthInput: useAuthInput }, { children: _jsxs(Container, { children: [_jsxs(DiagramContainer, { children: [_jsx(Diagram, { transcriptArr: transcriptArr, socket: socket }, void 0),
                        _jsxs(ControlBox, { children: [_jsxs(Button, __assign({ type: "mic", onClick: toggleListening }, { children: ["STT Start", _jsx(RecordingIndicator, { recording: recording }, void 0)] }), void 0),
                                _jsx(Button, __assign({ type: "remove", onClick: resetTranscript }, { children: "Reset" }), void 0),
                                _jsx(Button, __assign({ type: "chat", onClick: chatClickHandler }, { children: "Chatting" }), void 0)] }, void 0)] }, void 0),
                _jsx(Draggable, { children: _jsxs(FaceContainer, __assign({ faceContainerWidth: faceContainerWidth }, { children: [_jsx(VideoPlayer, { widthController: [faceContainerWidth, sizeUp, sizeDown] }, void 0),
                            faceContainerWidth !== 'down' ? (_jsx(Options, { children: _jsx(Notifications, {}, void 0) }, void 0)) : null] }), void 0) }, void 0),
                showChatBox && (_jsx(Modal, { children: _jsx(Draggable, { children: _jsxs(ChatContainer, { children: [_jsx(ChatControlBox, { children: _jsx(ChatController, __assign({ onClick: function () { return setShowChatBox(false); }, className: "close" }, { children: "x" }), void 0) }, void 0),
                                _jsxs(ChatMainBox, __assign({ id: "chat-main-box" }, { children: [_jsx(AttendingNotification, { children: attendingUser }, void 0),
                                        chatArray.map(function (chat, idx) { return (_jsx(ChatBlock, __assign({ location: chat.username === myUsername ? 'right' : 'left' }, { children: _jsx(ChatBox, __assign({ className: chat.username === myUsername
                                                    ? 'send_box'
                                                    : 'receive_box' }, { children: chat.message }), void 0) }), idx)); })] }), void 0),
                                _jsxs(ChatForm, __assign({ method: "post", name: "SendMessageForm", onSubmit: sendMessageHandler }, { children: [_jsx(ChatFormTextarea, { name: "messageTextArea", onChange: msgChangeHandler, value: keystroke, maxLength: 60, rows: 5 }, void 0),
                                        _jsx(ChatFormButton, __assign({ type: "submit" }, { children: "\uC804\uC1A1" }), void 0)] }), void 0)] }, void 0) }, void 0) }, void 0))] }, void 0) }), void 0));
}
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  padding: 20px;\n"], ["\n  display: flex;\n  padding: 20px;\n"])));
var DiagramContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
var ControlBox = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
var AttendingNotification = styled.p(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  text-align: center;\n  font-size: 10px;\n"], ["\n  text-align: center;\n  font-size: 10px;\n"])));
export var FaceContainer = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: absolute;\n  right: 30px;\n  z-index: 888;\n  width: ", ";\n"], ["\n  position: absolute;\n  right: 30px;\n  z-index: 888;\n  width: ",
    ";\n"])), function (props) {
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
var RecordingIndicator = styled.span(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  background-color: ", ";\n  border: 1px solid #fff;\n  border-radius: 50%;\n  margin-left: 9px;\n"], ["\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  background-color: ", ";\n  border: 1px solid #fff;\n  border-radius: 50%;\n  margin-left: 9px;\n"])), function (props) { return (props.recording ? 'red' : '#ccc'); });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
