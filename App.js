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
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import MeetingRoom from './pages/MeetingRoom';
import { routes } from './routes/index';
import { HelmetProvider } from 'react-helmet-async';
import useAuth from './hooks/useAuth';
import { GlobalStyles } from './styles/styles';
import { PortalProvider } from './providers/PortalProvider';
import WaitingRoom from './pages/WaitingRoom';
import Upload from './pages/Upload';
import './App.css';
import DetailMeetingLog from './pages/DetailMeetingLog';
function App() {
    var _a = useAuth(), isLoggedIn = _a[0], toggleAuth = _a[1];
    return (_jsx(PortalProvider, { children: _jsxs(HelmetProvider, { children: [_jsx(GlobalStyles, {}, void 0),
                _jsxs(Switch, { children: [_jsx(Route, __assign({ path: routes.root, exact: true }, { children: _jsx(WaitingRoom, { useAuthInput: [isLoggedIn, toggleAuth] }, void 0) }), void 0),
                        !isLoggedIn && _jsx(Redirect, { to: routes.root }, void 0),
                        _jsx(Route, __assign({ path: routes.home, exact: true }, { children: _jsx(Home, { useAuthInput: [isLoggedIn, toggleAuth] }, void 0) }), void 0),
                        _jsx(Route, __assign({ path: routes.meetingRoom }, { children: _jsx(MeetingRoom, { useAuthInput: [isLoggedIn, toggleAuth] }, void 0) }), void 0),
                        _jsx(Route, __assign({ path: routes.upload }, { children: _jsx(Upload, { useAuthInput: [isLoggedIn, toggleAuth] }, void 0) }), void 0),
                        _jsx(Route, __assign({ path: "/meeting-log/:logId", exact: true }, { children: _jsx(DetailMeetingLog, { useAuthInput: [isLoggedIn, toggleAuth] }, void 0) }), void 0)] }, void 0)] }, void 0) }, void 0));
}
export default App;
