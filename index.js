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
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import { SocketContextProvider } from './providers/SocketProvider';
var queryClient = new QueryClient();
ReactDOM.render(_jsx(QueryClientProvider, __assign({ client: queryClient }, { children: _jsx(BrowserRouter, { children: _jsx(SocketContextProvider, { children: _jsx(App, {}, void 0) }, void 0) }, void 0) }), void 0), document.getElementById('root'));
