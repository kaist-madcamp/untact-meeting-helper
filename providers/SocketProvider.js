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
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext } from 'react';
import { io } from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';
var SocketContext = createContext({});
var SOCKET_URL = 'https://video-chat-app-legitimation.herokuapp.com/';
var socket = io(SOCKET_URL);
var SocketContextProvider = function (_a) {
    var children = _a.children;
    var _b = useState(false), callAccepted = _b[0], setCallAccepted = _b[1];
    var _c = useState(false), callEnded = _c[0], setCallEnded = _c[1];
    var _d = useState(), stream = _d[0], setStream = _d[1];
    var _e = useState(''), name = _e[0], setName = _e[1];
    var _f = useState({}), call = _f[0], setCall = _f[1];
    var _g = useState(''), me = _g[0], setMe = _g[1];
    var _h = useState(''), roomId = _h[0], setRoomId = _h[1];
    var myVideo = useRef(null);
    var userVideo = useRef(null);
    var connectionRef = useRef(null);
    useEffect(function () {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(function (currentStream) {
            setStream(currentStream);
            if (!myVideo.current)
                return;
            myVideo.current.srcObject = currentStream;
        });
        socket.on('me', function (id) { return setMe(id); });
        socket.on('callUser', function (_a) {
            var from = _a.from, callerName = _a.name, signal = _a.signal;
            setCall({
                isReceivingCall: true,
                from: from,
                name: callerName,
                signal: signal,
            });
        });
    }, []);
    var answerCall = function () {
        setCallAccepted(true);
        var peer = new Peer({ initiator: false, trickle: false, stream: stream });
        peer.on('signal', function (data) {
            socket.emit('answerCall', { signal: data, to: call.from });
        });
        peer.on('stream', function (currentStream) {
            if (!userVideo.current)
                return;
            userVideo.current.srcObject = currentStream;
        });
        peer.signal(call.signal);
        connectionRef.current = peer;
    };
    var callUser = function (roomId) {
        var peer = new Peer({ initiator: true, trickle: false, stream: stream });
        peer.on('signal', function (data) {
            socket.emit('callUser', {
                userToCall: roomId,
                signalData: data,
                from: me,
                name: name,
            });
        });
        peer.on('stream', function (currentStream) {
            if (!userVideo.current)
                return;
            userVideo.current.srcObject = currentStream;
        });
        socket.on('callAccepted', function (signal) {
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    };
    var leaveCall = function () {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    };
    return (_jsx(SocketContext.Provider, __assign({ value: {
            call: call,
            callAccepted: callAccepted,
            myVideo: myVideo,
            userVideo: userVideo,
            stream: stream,
            name: name,
            setName: setName,
            callEnded: callEnded,
            me: me,
            callUser: callUser,
            leaveCall: leaveCall,
            answerCall: answerCall,
            roomId: roomId,
            setRoomId: setRoomId,
        } }, { children: children }), void 0));
};
export { SocketContextProvider, SocketContext };
