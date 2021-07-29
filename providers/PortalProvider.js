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
import { createContext, useState } from 'react';
import { createPortal } from 'react-dom';
export var PortalContext = createContext(null);
export function PortalProvider(_a) {
    var children = _a.children;
    var _b = useState(null), portalContainerRef = _b[0], setPortalContainerRef = _b[1];
    return (_jsxs(PortalContext.Provider, __assign({ value: portalContainerRef }, { children: [children, _jsx("div", { id: "portal-container", ref: function (elem) {
                    if (portalContainerRef !== null || elem === null) {
                        return;
                    }
                    setPortalContainerRef(elem);
                } }, void 0)] }), void 0));
}
export function PortalConsumer(_a) {
    var children = _a.children;
    return (_jsx(PortalContext.Consumer, { children: function (portalContainerRef) {
            if (portalContainerRef === null) {
                return null;
            }
            return createPortal(children, portalContainerRef);
        } }, void 0));
}
